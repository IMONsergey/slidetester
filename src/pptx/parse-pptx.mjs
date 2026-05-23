import { mkdir, readFile, writeFile } from 'node:fs/promises';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

const INPUT_PPTX = 'input/draft.pptx';
const OUTPUT_JSON = 'output/slides.raw.json';
const PRESENTATION_XML = 'ppt/presentation.xml';
const SLIDE_PATTERN = /^ppt\/slides\/slide(\d+)\.xml$/;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  trimValues: false,
  processEntities: true
});

function extractTexts(node, bucket = []) {
  if (typeof node === 'string') {
    return bucket;
  }

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
    if ((key === 'a:t' || key === 't') && typeof value === 'string') {
      const normalized = value.replace(/\s+/g, ' ').trim();
      if (normalized) {
        bucket.push(normalized);
      }
      continue;
    }

    extractTexts(value, bucket);
  }

  return bucket;
}

async function readSlideSize(zip) {
  const entry = zip.file(PRESENTATION_XML);
  if (!entry) {
    return null;
  }

  const parsed = parser.parse(await entry.async('string'));
  const presentation = parsed['p:presentation'] ?? parsed.presentation ?? parsed;
  const size = presentation?.['p:sldSz'] ?? presentation?.sldSz ?? null;
  if (!size) {
    return null;
  }

  return {
    cx: Number(size.cx ?? 0),
    cy: Number(size.cy ?? 0)
  };
}

function buildNormalizedText(texts) {
  return texts.join(' ').replace(/\s+/g, ' ').trim();
}

async function main() {
  await mkdir('output', { recursive: true });

  const fileBuffer = await readFile(INPUT_PPTX);
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
    const slideNumber = Number(slidePath.match(SLIDE_PATTERN)[1]);
    const xml = await zip.file(slidePath).async('string');
    const parsed = parser.parse(xml);
    const texts = extractTexts(parsed);
    const normalizedText = buildNormalizedText(texts);

    slides.push({
      slideNumber,
      slidePath,
      textCount: texts.length,
      title: texts[0] ?? `Slide ${slideNumber}`,
      texts,
      normalizedText
    });
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceFile: INPUT_PPTX,
    slideCount: slides.length,
    slideSize,
    slides
  };

  await writeFile(OUTPUT_JSON, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${OUTPUT_JSON} with ${slides.length} slide(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
