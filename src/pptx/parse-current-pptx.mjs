import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import { readFile } from 'node:fs/promises';
import {
  CURRENT_DECK_NAME,
  CURRENT_PPTX_INPUT,
  CURRENT_RAW_OUTPUT,
  EXPECTED_CURRENT_SLIDE_COUNT,
  buildSlideCountMismatch,
  detectSections,
  extractNumbersFromText,
  guessSubtitle,
  isDirectExecution,
  normalizeTextArray,
  normalizeWhitespace,
  writeJson
} from '../pipeline/current-pipeline-shared.mjs';

const PRESENTATION_XML = 'ppt/presentation.xml';
const SLIDE_PATTERN = /^ppt\/slides\/slide(\d+)\.xml$/;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  trimValues: false,
  processEntities: true,
  parseTagValue: false
});

function extractTexts(node, bucket = []) {
  if (Array.isArray(node)) {
    for (const item of node) {
      extractTexts(item, bucket);
    }
    return bucket;
  }

  if (!node || typeof node !== 'object') {
    return bucket;
  }

  for (const [key, value] of Object.entries(node)) {
    if ((key === 'a:t' || key === 't') && (typeof value === 'string' || typeof value === 'number')) {
      const normalized = normalizeWhitespace(value);
      if (normalized) {
        bucket.push(normalized);
      }
      continue;
    }

    extractTexts(value, bucket);
  }

  return bucket;
}

function findTables(node, bucket = []) {
  if (Array.isArray(node)) {
    for (const item of node) {
      findTables(item, bucket);
    }
    return bucket;
  }

  if (!node || typeof node !== 'object') {
    return bucket;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === 'a:tbl' || key === 'tbl') {
      const rawRows = value['a:tr'] || value.tr || [];
      const rows = (Array.isArray(rawRows) ? rawRows : [rawRows])
        .map((row) => {
          const cells = row['a:tc'] || row.tc || [];
          return (Array.isArray(cells) ? cells : [cells])
            .map((cell) => normalizeWhitespace(extractTexts(cell, []).join(' ')))
            .filter(Boolean);
        })
        .filter((row) => row.length > 0);

      if (rows.length > 0) {
        bucket.push(rows);
      }
      continue;
    }

    findTables(value, bucket);
  }

  return bucket;
}

async function readSlideSize(zip) {
  const entry = zip.file(PRESENTATION_XML);
  if (!entry) {
    return null;
  }

  const parsed = parser.parse(await entry.async('string'));
  const presentation = parsed['p:presentation'] || parsed.presentation || parsed;
  const size = presentation['p:sldSz'] || presentation.sldSz || null;
  if (!size) {
    return null;
  }

  return {
    cx: Number(size.cx || 0),
    cy: Number(size.cy || 0)
  };
}

function buildSlideNotes(rawText, tables) {
  const notes = [];

  if (rawText.some((line) => /евгений козлов/i.test(line))) {
    notes.push('Speaker line detected in slide content.');
  }

  if (tables.length > 0) {
    notes.push(`Detected ${tables.length} table block(s).`);
  }

  if (rawText.some((line) => /\b[qQ]\b/.test(line)) || rawText.join(' ').includes('1 Q 2026')) {
    notes.push('Quarterly performance callout detected.');
  }

  return notes;
}

export async function parseCurrentPptx(options = {}) {
  const inputPath = options.inputPath || CURRENT_PPTX_INPUT;
  const outputPath = options.outputPath || CURRENT_RAW_OUTPUT;
  const fileBuffer = await readFile(inputPath);
  const zip = await JSZip.loadAsync(fileBuffer);
  const slideEntries = Object.keys(zip.files)
    .filter((name) => SLIDE_PATTERN.test(name))
    .sort((left, right) => {
      const leftIndex = Number(left.match(SLIDE_PATTERN)[1]);
      const rightIndex = Number(right.match(SLIDE_PATTERN)[1]);
      return leftIndex - rightIndex;
    });

  const slideSize = await readSlideSize(zip);
  const slides = [];

  for (const slidePath of slideEntries) {
    const slideIndex = Number(slidePath.match(SLIDE_PATTERN)[1]);
    const xml = await zip.file(slidePath).async('string');
    const parsed = parser.parse(xml);
    const rawText = normalizeTextArray(extractTexts(parsed));
    const tables = findTables(parsed);
    const numbers = extractNumbersFromText(rawText);
    const possibleTitle = rawText[0] || `Slide ${slideIndex}`;
    const possibleSubtitle = guessSubtitle(rawText);
    const detectedSections = detectSections(rawText);
    const notes = buildSlideNotes(rawText, tables);

    slides.push({
      slideIndex,
      rawText,
      tables,
      numbers,
      possibleTitle,
      possibleSubtitle,
      detectedSections,
      notes
    });
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    deckName: CURRENT_DECK_NAME,
    sourceFile: inputPath,
    expectedSlideCount: EXPECTED_CURRENT_SLIDE_COUNT,
    slideCount: slides.length,
    slideCountMismatch: buildSlideCountMismatch(slides.length),
    slideSize,
    slides
  };

  await writeJson(outputPath, payload);
  return payload;
}

if (isDirectExecution(import.meta)) {
  parseCurrentPptx().then((payload) => {
    console.log(`Wrote ${CURRENT_RAW_OUTPUT} with ${payload.slideCount} slide(s).`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
