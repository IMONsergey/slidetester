import {
  ASSET_BANK_OUTPUT,
  DECK_ATLAS_OUTPUT,
  SOURCE_GEOMETRY_CACHE,
  isDirectExecution,
  readJson,
  writeJson
} from '../pipeline/current-pipeline-shared.mjs';

function asset(assetId, sourceFrameId, sourceNodeId, assetType, role, box, canReuseDirectly, canReuseAsStyleOnly, semanticRisk, reuseRules, notes) {
  return {
    assetId,
    sourceFrameId,
    sourceNodeId,
    assetType,
    role,
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
    canReuseDirectly,
    canReuseAsStyleOnly,
    semanticRisk,
    reuseRules,
    notes
  };
}

export async function buildAssetBank(options = {}) {
  const atlas = options.atlas || await readJson(DECK_ATLAS_OUTPUT);
  const geometry = options.geometry || await readJson(SOURCE_GEOMETRY_CACHE);
  const coverFrame = geometry.frames.find((frame) => frame.id === '25:6981');
  const analyticsFrame = geometry.frames.find((frame) => frame.id === '25:7247');

  const assets = [
    asset(
      'cover-background-photo',
      '25:6981',
      '25:6982',
      'background',
      'Executive photo cover backdrop',
      { x: -173, y: -118, width: 2265, height: 1275 },
      true,
      false,
      'medium',
      'Reuse only for cover or section-divider roles; remove old people/topic semantics if the image conflicts with new content.',
      'Best direct visual base for the annual-report cover.'
    ),
    asset(
      'cover-brand-mark',
      '25:6981',
      '25:6983',
      'logo',
      'Bottom brand mark / footer lockup',
      { x: 656.1, y: 896.73, width: 606.9, height: 62.54 },
      true,
      true,
      'low',
      'Can be kept if it represents neutral deck branding only.',
      'Safe branding reuse from the cover family.'
    ),
    asset(
      'analytics-red-glow',
      '25:7247',
      '25:7248',
      'glow',
      'Ambient red/orange stage glow',
      { x: 97, y: 936, width: 1726, height: 612 },
      true,
      true,
      'low',
      'Safe to reuse directly as a non-semantic atmosphere layer.',
      'Core glow primitive from the business slide family.'
    ),
    asset(
      'analytics-right-chart-shell',
      '25:7247',
      '25:7253',
      'chart-shell',
      'Secondary chart or callout panel shell',
      { x: 1273, y: 201, width: 587, height: 735 },
      false,
      true,
      'medium',
      'Reuse the shell and rebuild all chart content from scratch.',
      'Useful for right-hand comparison or tracker panels.'
    ),
    asset(
      'analytics-left-chart-shell',
      '25:7247',
      '25:7298',
      'chart-shell',
      'Primary left content panel shell',
      { x: 60, y: 201, width: 1194, height: 735 },
      false,
      true,
      'medium',
      'Use only as a structural shell; never keep original chart traces or labels.',
      'Main wide panel for numeric-overview and project slides.'
    ),
    asset(
      'analytics-line-system',
      '25:7247',
      '25:7344',
      'line-system',
      'Accent analytic polyline family',
      { x: 149, y: 440, width: 1029, height: 376 },
      false,
      true,
      'low',
      'Reuse only as decorative / analytical line logic, not as inherited data.',
      'Encodes the red-orange analytical line language.'
    ),
    asset(
      'metric-card-shell-family',
      '25:7044',
      null,
      'card-shell',
      'Large KPI card shell family',
      { x: 60, y: 252, width: 560, height: 300 },
      false,
      true,
      'low',
      'Rebuild card contents entirely for new metrics.',
      'Primary shell family for achievements and year-in-numbers slides.'
    ),
    asset(
      'result-grid-shell-family',
      '25:7544',
      null,
      'card-shell',
      'Matrix + stacked result card family',
      { x: 60, y: 201, width: 1800, height: 735 },
      false,
      true,
      'medium',
      'Reuse the shell only after deleting all old labels, footnotes, and matrix content.',
      'Useful when a slide needs dense narrative plus numeric proofs.'
    ),
    asset(
      'architecture-board-shell',
      '25:10434',
      null,
      'card-shell',
      'Multi-zone architecture board shell',
      { x: 60, y: 201, width: 1800, height: 735 },
      false,
      true,
      'low',
      'Safe as a structural layout reference for initiatives and driver boards.',
      'Supports structured operational content.'
    ),
    asset(
      'process-rail-system',
      '25:10876',
      null,
      'line-system',
      'Horizontal process / roadmap rail',
      { x: 60, y: 250, width: 1800, height: 520 },
      false,
      true,
      'low',
      'Keep the directional rail logic, rebuild all nodes and labels.',
      'Good for 2026 roadmap and rollout slides.'
    ),
    asset(
      'three-pillar-card-family',
      '25:10717',
      null,
      'card-shell',
      'Three-pillar statement cards',
      { x: 60, y: 300, width: 1800, height: 500 },
      false,
      true,
      'low',
      'Safe for strategy slides after replacing every label and supporting image.',
      'Best strategy close family in the source deck.'
    ),
    asset(
      'priority-card-grid',
      '25:11194',
      null,
      'card-shell',
      'Priority/result card grid',
      { x: 60, y: 240, width: 1800, height: 560 },
      false,
      true,
      'medium',
      'Reuse grid logic only; remove HR-specific copy.',
      'Good fallback for achievements or principle grids.'
    ),
    asset(
      'icons-library-index',
      '25:11279',
      null,
      'icon',
      'Neutral icon source frame',
      { x: 0, y: 0, width: 1920, height: 1080 },
      false,
      true,
      'low',
      'Index as a source only; do not treat the Icons frame as a slide.',
      'Supports future icon retrieval without polluting slide atlas.'
    ),
    asset(
      'cover-hero-title-style',
      '25:6981',
      '25:7006',
      'decorative-vector',
      'Hero title treatment reference',
      { x: coverFrame.textNodes[0].x, y: coverFrame.textNodes[0].y, width: coverFrame.textNodes[0].width, height: coverFrame.textNodes[0].height },
      false,
      true,
      'low',
      'Reuse as a style reference only; regenerate text content from the current PPTX.',
      'Captures the exact cover title scale and treatment.'
    ),
    asset(
      'analytics-title-style',
      '25:7247',
      '25:7249',
      'footer',
      'Business slide title and footer system',
      { x: 60, y: 50, width: 1595, height: 55 },
      false,
      true,
      'low',
      'Use as a typography and alignment guide for section slides.',
      'Encodes the left title system used by the deck.'
    )
  ];

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceFileKey: '735drrzVTmf4AhQJwQe6vX',
    auditedFramesReferenced: atlas.frames.length,
    assets
  };

  await writeJson(options.outputPath || ASSET_BANK_OUTPUT, payload);
  return payload;
}

if (isDirectExecution(import.meta)) {
  buildAssetBank().then(() => {
    console.log(`Wrote ${ASSET_BANK_OUTPUT}.`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
