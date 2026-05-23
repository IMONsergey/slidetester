import { CURRENT_DECK_NAME } from '../pipeline/current-pipeline-shared.mjs';

export function slideFrameName(index, label) {
  return `CURRENT / ${String(index).padStart(2, '0')} / ${label}`;
}

export function textElement(id, text, tokenId, box, options = {}) {
  return {
    id,
    type: 'text',
    text,
    tokenId,
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
    align: options.align || 'LEFT',
    colorTokenId: options.colorTokenId || 'color.text.primary'
  };
}

export function assetElement(id, assetId, box, options = {}) {
  return {
    id,
    type: 'asset-ref',
    assetId,
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
    mode: options.mode || 'style-reference',
    opacity: typeof options.opacity === 'number' ? options.opacity : 1
  };
}

export function metricCardElement(id, title, value, support, box, options = {}) {
  return {
    id,
    type: 'metric-card',
    title,
    value,
    support,
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
    accent: options.accent || 'color.accent.red',
    titleTokenId: options.titleTokenId || 'typography.card.title.size',
    valueTokenId: options.valueTokenId || 'typography.metric.number.size'
  };
}

export function bulletListElement(id, title, items, box, options = {}) {
  return {
    id,
    type: 'bullet-list',
    title,
    items,
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
    columns: options.columns || 1
  };
}

export function tableElement(id, title, headers, rows, box) {
  return {
    id,
    type: 'table',
    title,
    headers,
    rows,
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height
  };
}

export function pillarGridElement(id, title, items, box, options = {}) {
  return {
    id,
    type: 'pillar-grid',
    title,
    items,
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
    columns: options.columns || 3
  };
}

export function splitRows(values, size) {
  const rows = [];
  for (let index = 0; index < values.length; index += size) {
    rows.push(values.slice(index, index + size));
  }
  return rows;
}

export function lineAfter(rawText, matcher, fallback = '') {
  const index = rawText.findIndex((line) => matcher.test(line));
  if (index === -1 || index === rawText.length - 1) {
    return fallback;
  }
  return rawText[index + 1];
}

export function collectBulletRange(rawText, startMatcher, endMatcher) {
  const startIndex = rawText.findIndex((line) => startMatcher.test(line));
  if (startIndex === -1) {
    return [];
  }

  const results = [];
  for (let index = startIndex + 1; index < rawText.length; index += 1) {
    const line = rawText[index];
    if (endMatcher && endMatcher.test(line)) {
      break;
    }
    if (line) {
      results.push(line);
    }
  }
  return results;
}

export function buildBaseSlide(planSlide, rawSlide, label) {
  return {
    name: slideFrameName(planSlide.slideIndex, label),
    role: planSlide.semanticRole,
    productionMode: planSlide.recommendedProductionMode,
    sourcePptxTitle: rawSlide.possibleTitle,
    content: {
      deckName: CURRENT_DECK_NAME,
      rawText: rawSlide.rawText
    },
    styleRefs: planSlide.selectedStyleReferences,
    assetRefs: planSlide.selectedAssetReferences,
    elements: [],
    forbiddenContent: planSlide.forbiddenInheritedContent,
    qaExpectations: [
      'Use X5 Sans only.',
      'Do not inherit irrelevant source text.',
      'Preserve source-deck hierarchy and spacing logic.'
    ]
  };
}
