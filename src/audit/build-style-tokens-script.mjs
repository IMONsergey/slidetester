import {
  DECK_ATLAS_OUTPUT,
  SOURCE_GEOMETRY_CACHE,
  STYLE_TOKENS_OUTPUT,
  isDirectExecution,
  readJson,
  toHexColor,
  writeJson
} from '../pipeline/current-pipeline-shared.mjs';

function token(tokenId, value, sourceFrameIds, confidence, usageNotes) {
  return { tokenId, value, sourceFrameIds, confidence, usageNotes };
}

function firstFrame(frames, frameId) {
  return frames.find((frame) => frame.id === frameId);
}

export async function buildStyleTokens(options = {}) {
  const atlas = options.atlas || await readJson(DECK_ATLAS_OUTPUT);
  const geometry = options.geometry || await readJson(SOURCE_GEOMETRY_CACHE);
  const coverFrame = firstFrame(geometry.frames || [], '25:6981');
  const analyticsFrame = firstFrame(geometry.frames || [], '25:7247');
  const glowNode = analyticsFrame.visibleNodes.find((node) => node.id === '25:7248');
  const coverHero = coverFrame.textNodes.find((node) => node.id === '25:7006');
  const coverEyebrow = coverFrame.textNodes.find((node) => node.id === '25:7008');
  const coverSpeaker = coverFrame.textNodes.find((node) => node.id === '25:7007');
  const analyticsTitle = analyticsFrame.textNodes.find((node) => node.id === '25:7249');
  const analyticsCardTitle = analyticsFrame.textNodes.find((node) => node.id === '25:7250');
  const analyticsMetric = analyticsFrame.textNodes.find((node) => node.inferredRole === 'metricValue');

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceFileKey: '735drrzVTmf4AhQJwQe6vX',
    notes: [
      'Exact tokens come from the inspected cover and analytics source frames.',
      'Layout families without direct geometry are marked as inferred with lower confidence.'
    ],
    typography: [
      token('typography.family.primary', { family: 'X5 Sans', styles: ['Light', 'Regular', 'Medium', 'Bold'] }, ['25:6981', '25:7247'], 0.99, 'Primary family for all generated slides.'),
      token('typography.hero.title.size', coverHero.fontSize, ['25:6981'], 0.99, 'Use for annual-report hero covers only.'),
      token('typography.hero.title.lineHeight', coverHero.lineHeight.value, ['25:6981'], 0.99, 'Cover hero title line height.'),
      token('typography.hero.title.letterSpacing', coverHero.letterSpacing.value, ['25:6981'], 0.99, 'Tight hero tracking used on executive covers.'),
      token('typography.cover.eyebrow.size', coverEyebrow.fontSize, ['25:6981'], 0.99, 'Small upper-context cover line.'),
      token('typography.cover.speaker.size', coverSpeaker.fontSize, ['25:6981'], 0.99, 'Speaker / author caption size.'),
      token('typography.slide.title.size', analyticsTitle.fontSize, ['25:7247'], 0.99, 'Default left-aligned section title size.'),
      token('typography.slide.title.lineHeight', analyticsTitle.lineHeight.value, ['25:7247'], 0.99, 'Default section title line height.'),
      token('typography.card.title.size', analyticsCardTitle.fontSize, ['25:7247'], 0.99, 'Card and panel title size.'),
      token('typography.metric.number.size', analyticsMetric.fontSize, ['25:7247'], 0.99, 'Metric figure size for chart or KPI callouts.'),
      token('typography.body.size', 26, ['25:7247'], 0.66, 'Inferred body size from analytics annotation labels.'),
      token('typography.footnote.size', 26, ['25:7247'], 0.61, 'Use for muted notes and low-priority qualifiers.')
    ],
    grid: [
      token('grid.slide.size', { width: 1920, height: 1080 }, ['25:6981', '25:7247'], 1, 'Canonical deck frame size.'),
      token('grid.cover.title.box', { x: coverHero.x, y: coverHero.y, width: coverHero.width, height: coverHero.height }, ['25:6981'], 0.99, 'Primary cover title placement.'),
      token('grid.cover.eyebrow.box', { x: coverEyebrow.x, y: coverEyebrow.y, width: coverEyebrow.width, height: coverEyebrow.height }, ['25:6981'], 0.99, 'Cover eyebrow placement.'),
      token('grid.cover.speaker.box', { x: coverSpeaker.x, y: coverSpeaker.y, width: coverSpeaker.width, height: coverSpeaker.height }, ['25:6981'], 0.99, 'Speaker line placement on cover slides.'),
      token('grid.analytics.title.box', { x: analyticsTitle.x, y: analyticsTitle.y, width: analyticsTitle.width, height: analyticsTitle.height }, ['25:7247'], 0.99, 'Main business-slide title area.'),
      token('grid.analytics.left.panel', { x: 60, y: 201, width: 1194, height: 735 }, ['25:7247'], 0.97, 'Large left content zone.'),
      token('grid.analytics.right.panel', { x: 1273, y: 201, width: 587, height: 735 }, ['25:7247'], 0.97, 'Secondary right content zone.'),
      token('grid.layout.three-card', { x: 60, y: 252, cardWidth: 560, cardHeight: 300, gap: 50 }, ['25:7044'], 0.58, 'Inferred from the metrics-summary family.'),
      token('grid.layout.four-card', { x: 60, y: 252, cardWidth: 412, cardHeight: 268, gap: 32 }, ['25:11194', '25:7544'], 0.53, 'Inferred for dense result grids.'),
      token('grid.layout.five-card', { x: 60, y: 228, cardWidth: 336, cardHeight: 210, gap: 24 }, ['25:9043', '25:10717'], 0.47, 'Inferred for principle or driver rails.'),
      token('grid.footer.zone', { x: 60, y: 972, width: 550, height: 48 }, ['25:7247'], 0.44, 'Reserved muted note zone.'),
      token('grid.logo.zone', { x: 656, y: 897, width: 607, height: 63 }, ['25:6981'], 0.92, 'Brand mark zone borrowed from the cover family.')
    ],
    colors: [
      token('color.background.cover', toHexColor(coverFrame.fills[0].color), ['25:6981'], 1, 'Pure black cover background.'),
      token('color.background.analytics', toHexColor(analyticsFrame.fills[0].color), ['25:7247'], 1, 'Primary near-black working background.'),
      token('color.text.primary', '#ffffff', ['25:6981', '25:7247'], 0.99, 'Main text color.'),
      token('color.text.secondary', toHexColor(coverSpeaker.fills[0].color), ['25:6981'], 0.99, 'Muted text for speaker lines and annotations.'),
      token('color.accent.red', '#eb2417', ['25:7247'], 0.98, 'Core X5 red accent from analytics lines.'),
      token('color.accent.orange', '#eb5c17', ['25:7247'], 0.96, 'Supporting orange accent.'),
      token('color.accent.amber', '#f7a610', ['25:7247'], 0.93, 'Warm highlight used in multicolor analytical strokes.'),
      token('color.card.fill.dark-glass', 'rgba(255,255,255,0.055)', ['25:7044', '25:7544'], 0.57, 'Inferred dark-glass card fill from the deck family.'),
      token('color.card.border.soft', 'rgba(255,255,255,0.12)', ['25:7044', '25:7544'], 0.55, 'Inferred thin card border for glass shells.'),
      token('color.gradient.red-horizon', { fill: toHexColor(glowNode.fills[0].color), opacity: glowNode.fills[0].opacity }, ['25:7247'], 0.98, 'Primary red/orange glow source.')
    ],
    shapes: [
      token('shape.card.radius.lg', 32, ['25:7044', '25:11194'], 0.52, 'Inferred large card radius used across metric slides.'),
      token('shape.card.radius.md', 24, ['25:7544', '25:10434'], 0.49, 'Inferred medium card radius for dense boards.'),
      token('shape.pill.radius', 999, ['25:10717'], 0.41, 'Pill labels should stay fully rounded.'),
      token('shape.glow.red.ellipse', { width: glowNode.width, height: glowNode.height, blurRadius: glowNode.effects[0].radius }, ['25:7247'], 0.98, 'Reuse as a bottom-stage ambient glow.'),
      token('shape.line.system.analytics', { strokeWidth: 2, family: 'accent polylines + neutral baselines' }, ['25:7247'], 0.86, 'For comparison and process overlays.'),
      token('shape.chart.panel.shell', { left: { x: 60, y: 201, width: 1194, height: 735 }, right: { x: 1273, y: 201, width: 587, height: 735 } }, ['25:7247'], 0.97, 'Canonical dual-panel chart shell.')
    ],
    opacityLevels: [
      token('opacity.secondary-text', 0.74, ['25:6981'], 0.99, 'Speaker and muted support text opacity.'),
      token('opacity.glow.red', glowNode.fills[0].opacity, ['25:7247'], 0.98, 'Ambient glow opacity.'),
      token('opacity.card.fill', 0.055, ['25:7044', '25:7544'], 0.57, 'Recommended dark-glass card fill opacity.')
    ],
    alignmentPatterns: [
      token('alignment.cover.centered-hero', { horizontal: coverHero.textAlignHorizontal, vertical: coverHero.textAlignVertical }, ['25:6981'], 0.99, 'Cover family uses centered text.'),
      token('alignment.business.left-title', { horizontal: analyticsTitle.textAlignHorizontal, vertical: analyticsTitle.textAlignVertical }, ['25:7247'], 0.99, 'Business slides use left-aligned titles.'),
      token('alignment.metric.callout', { horizontal: analyticsMetric.textAlignHorizontal, vertical: analyticsMetric.textAlignVertical }, ['25:7247'], 0.99, 'Metrics remain top-aligned inside local cards.')
    ],
    auditedFramesReferenced: atlas.frames.length
  };

  await writeJson(options.outputPath || STYLE_TOKENS_OUTPUT, payload);
  return payload;
}

if (isDirectExecution(import.meta)) {
  buildStyleTokens().then(() => {
    console.log(`Wrote ${STYLE_TOKENS_OUTPUT}.`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
