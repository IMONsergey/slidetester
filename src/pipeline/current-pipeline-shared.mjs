import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CURRENT_PPTX_INPUT = 'input/current-draft.pptx';
export const CURRENT_RAW_OUTPUT = 'output/current-draft-raw.json';
export const CURRENT_PLAN_OUTPUT = 'output/current-slide-plan.json';
export const DECK_ATLAS_OUTPUT = 'output/deck-atlas.json';
export const STYLE_TOKENS_OUTPUT = 'output/style-tokens.json';
export const ASSET_BANK_OUTPUT = 'output/asset-bank.json';
export const PRODUCTION_SPEC_OUTPUT = 'output/production-spec.json';
export const RUNTIME_READINESS_OUTPUT = 'output/runtime-readiness-report.json';
export const FIGMA_SCRIPT_OUTPUT = 'output/figma-mcp-script.generated.js';
export const QA_REPORT_OUTPUT = 'output/qa-report.json';
export const SOURCE_GEOMETRY_CACHE = 'output/source-frame-geometry.json';

export const TARGET_FIGMA_FILE_KEY = '735drrzVTmf4AhQJwQe6vX';
export const TARGET_FIGMA_PAGE = { id: '0:1', name: 'Page 1' };
export const EXPECTED_CURRENT_SLIDE_COUNT = 10;
export const CURRENT_DECK_NAME = 'Эксплуатация и ИТ — Годовой отчёт 2025';
export const SLIDE_SIZE = { width: 1920, height: 1080 };

export function normalizeWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

export function normalizeTextArray(values) {
  return (Array.isArray(values) ? values : [])
    .map((value) => normalizeWhitespace(value))
    .filter(Boolean);
}

export function uniqueValues(values) {
  return Array.from(new Set((Array.isArray(values) ? values : []).filter(Boolean)));
}

export function mergeNumericFragments(tokens) {
  const merged = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const current = normalizeWhitespace(tokens[index]);
    const next = normalizeWhitespace(tokens[index + 1] || '');
    const nextNext = normalizeWhitespace(tokens[index + 2] || '');

    if (/^[+-]?\d[\d\s.,]*$/.test(current) && next === '.' && /^\d+$/.test(nextNext)) {
      merged.push(`${current}.${nextNext}`.replace(/\s+/g, ''));
      index += 2;
      continue;
    }

    if (/^[+-]?\d[\d\s.,]*$/.test(current) && /^\.\d+$/.test(next)) {
      merged.push(`${current}${next}`.replace(/\s+/g, ''));
      index += 1;
      continue;
    }

    merged.push(current);
  }

  return merged.filter(Boolean);
}

export function extractNumbersFromText(tokens) {
  const mergedTokens = mergeNumericFragments(tokens);
  const joined = mergedTokens.join(' ');
  const matches = joined.match(/[+-]?\d[\d.\s,]*(?:%|кВт|м2|млрд\.руб|млн\.руб|руб|бут|шт|ТТ|РЦ|Q)?/g) || [];

  return uniqueValues(
    matches
      .map((value) => normalizeWhitespace(value))
      .filter((value) => /\d/.test(value))
  );
}

export function buildSlideCountMismatch(actualCount) {
  if (actualCount === EXPECTED_CURRENT_SLIDE_COUNT) {
    return null;
  }

  return {
    expected: EXPECTED_CURRENT_SLIDE_COUNT,
    actual: actualCount,
    delta: actualCount - EXPECTED_CURRENT_SLIDE_COUNT,
    note:
      actualCount < EXPECTED_CURRENT_SLIDE_COUNT
        ? 'The real PPTX merges several prompt-described topics into fewer slides.'
        : 'The real PPTX contains more slides than the prompt draft outline.'
  };
}

export function guessSubtitle(rawText) {
  const candidates = rawText.slice(1).filter((line) => {
    if (!line) {
      return false;
    }

    if (/евгений козлов/i.test(line)) {
      return false;
    }

    if (/^x5(\.ru)?$/i.test(line)) {
      return false;
    }

    return line.length > 6;
  });

  return candidates[0] || null;
}

export function detectSections(rawText) {
  const joined = rawText.join(' ').toLowerCase();
  const sections = [];
  const sectionMatchers = [
    ['объемы', 'volumes'],
    ['сервис', 'service'],
    ['затраты', 'costs'],
    ['фокус', 'focus'],
    ['итог', 'result'],
    ['оптимизация', 'optimization'],
    ['автоматизация', 'automation'],
    ['проекты', 'projects'],
    ['путем', 'methods'],
    ['результаты 1 q 2026', 'q1-results'],
    ['стратегия', 'strategy']
  ];

  for (const [needle, label] of sectionMatchers) {
    if (joined.includes(needle)) {
      sections.push(label);
    }
  }

  return sections;
}

export async function ensureOutputDir() {
  await mkdir('output', { recursive: true });
}

export async function writeJson(filePath, payload) {
  await ensureOutputDir();
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  return filePath;
}

export async function readJson(filePath) {
  const body = await readFile(filePath, 'utf8');
  return JSON.parse(body);
}

export async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function toHexColor(color) {
  if (!color || typeof color !== 'object') {
    return null;
  }

  const toChannel = (value) => {
    const scaled = Math.max(0, Math.min(255, Math.round(Number(value || 0) * 255)));
    return scaled.toString(16).padStart(2, '0');
  };

  return `#${toChannel(color.r)}${toChannel(color.g)}${toChannel(color.b)}`;
}

export function isDirectExecution(importMeta) {
  if (!process.argv[1]) {
    return false;
  }

  return path.resolve(process.argv[1]) === fileURLToPath(importMeta.url);
}
