import {
  DECK_ATLAS_OUTPUT,
  isDirectExecution,
  readJson,
  writeJson
} from '../pipeline/current-pipeline-shared.mjs';

const LEGACY_ATLAS_CACHE = 'output/deck-atlas.json';
const SLIDE_TYPES = {
  cover: 'cover',
  'analytics-slide': 'dense-analytics',
  'market-share-analytics': 'comparison',
  'metrics-summary': 'metric-summary',
  'performance-review': 'table',
  'goals-matrix': 'metric-summary',
  'focus-pillars': 'strategy',
  'three-pillars': 'strategy',
  'operating-model': 'process',
  'architecture-breakdown': 'process',
  'results-priorities': 'achievements',
  'narrative-slide': 'unknown',
  'improvement-potential': 'comparison'
};

function normalizeReusableParts(frame) {
  const parts = frame.reusableVisualParts || frame.reusableAssets || [];
  return Array.from(new Set(parts.map((value) => String(value).replace(/\s+/g, ' ').trim()).filter(Boolean)));
}

function normalizeFrame(frame) {
  if ('reusableAsDirectClone' in frame) {
    return {
      ...frame,
      x: typeof frame.x === 'number' ? frame.x : 0,
      y: typeof frame.y === 'number' ? frame.y : 0,
      width: typeof frame.width === 'number' ? frame.width : 1920,
      height: typeof frame.height === 'number' ? frame.height : 1080
    };
  }

  const normalizedSlideType = SLIDE_TYPES[frame.slideType] || 'unknown';
  const notes = frame.visualNotes || frame.notes || '';

  return {
    frameId: frame.frameId,
    frameName: frame.frameName,
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
    slideType: normalizedSlideType,
    semanticRole: frame.semanticRole || 'unknown',
    contentArchitecture: frame.contentArchitecture || 'unknown',
    visualStructure: frame.visualStructure || 'unknown',
    densityLevel: frame.densityLevel || 'medium',
    hasCards: Boolean(frame.hasCards),
    hasCharts: Boolean(frame.hasCharts),
    hasImages: Boolean(frame.hasImages),
    hasLargeNumbers: Boolean(frame.hasLargeNumbers),
    hasTimeline: Boolean(frame.hasTimeline),
    hasProcessFlow: Boolean(frame.hasProcessFlow),
    hasPillars: Boolean(frame.hasPillars),
    hasHeroTitle: Boolean(frame.hasHeroTitle),
    hasIconGrid: /icon/i.test(notes) || /icons/i.test(JSON.stringify(frame.reusableAssets || [])),
    hasTable:
      normalizedSlideType === 'table' ||
      /table|matrix|grid|rows|summary/i.test(frame.contentArchitecture || '') ||
      /table/i.test(notes),
    reusableAsDirectClone:
      Boolean(frame.reusableAsBase) &&
      (normalizedSlideType === 'cover' || normalizedSlideType === 'metric-summary') &&
      frame.densityLevel === 'low',
    reusableAsCleanClone: Boolean(frame.reusableAsBase),
    reusableAsAssetSource: true,
    reusableAsStyleReference: true,
    reusableVisualParts: normalizeReusableParts(frame),
    dangerousToKeep: frame.dangerousToKeep || [],
    suitableForDraftRoles: frame.suitableForDraftRoles || [],
    visualNotes: notes
  };
}

export async function buildDeckAtlas(options = {}) {
  const seed = await readJson(options.seedPath || LEGACY_ATLAS_CACHE);
  const sourceFrames = Array.isArray(seed.frames) ? seed.frames : [];
  const frames = sourceFrames
    .filter((frame) => !/pilot|generated/i.test(String(frame.frameName || '')))
    .filter((frame) => frame.frameId !== '25:11279')
    .map(normalizeFrame);

  const payload = {
    generatedAt: new Date().toISOString(),
    metadataVersion: 'current-slide-engine-v1',
    sourceFileKey: '735drrzVTmf4AhQJwQe6vX',
    pageId: '0:1',
    coordinateMode: 'frame-local-normalized',
    notes: [
      'Atlas is built from the checked-in audit cache and preserves frame-local bounds.',
      'The Icons frame is excluded as a slide but may be referenced separately by the asset bank.'
    ],
    frames
  };

  await writeJson(options.outputPath || DECK_ATLAS_OUTPUT, payload);
  return payload;
}

if (isDirectExecution(import.meta)) {
  buildDeckAtlas().then((payload) => {
    console.log(`Wrote ${DECK_ATLAS_OUTPUT} with ${payload.frames.length} frame(s).`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
