import { writeFile } from 'node:fs/promises';
import {
  RUNTIME_READINESS_OUTPUT,
  isDirectExecution,
  readJson
} from '../pipeline/current-pipeline-shared.mjs';
import { buildCurrent2SlidesVisualModel } from '../composer/build-current-2slides-visual-model.mjs';

const OUTPUT_PATH = 'output/current-2slides-qa-report.json';

function buildSlideRisk(slide, readiness) {
  if (slide.role === 'cover') {
    return {
      slideName: slide.outputFrameName,
      contentFitRisk: 'medium',
      visualFidelityRisk: 'medium',
      layoutComplexityRisk: 'low',
      sourceAssetRisk: 'medium',
      fontRuntimeRisk: readiness.mcpRunner.x5SansAvailable ? 'low' : 'blocker',
      screenshotReviewRequired: true,
      sourceFramesUsed: slide.sourceFramesUsed,
      sourceAssetsUsed: slide.sourceAssetsUsed,
      sourceTokensUsed: slide.sourceTokensUsed,
      reviewNotes: [
        'Background image is reused from the source cover family and must be checked for semantic neutrality.',
        'Hero title is intentionally split into two lines to avoid overload.',
        'Department and speaker are secondary lines and must not compete with the hero.'
      ]
    };
  }

  return {
    slideName: slide.outputFrameName,
    contentFitRisk: 'medium',
    visualFidelityRisk: 'medium',
    layoutComplexityRisk: 'medium',
    sourceAssetRisk: 'low',
    fontRuntimeRisk: readiness.mcpRunner.x5SansAvailable ? 'low' : 'blocker',
    screenshotReviewRequired: true,
    sourceFramesUsed: slide.sourceFramesUsed,
    sourceAssetsUsed: slide.sourceAssetsUsed,
    sourceTokensUsed: slide.sourceTokensUsed,
    reviewNotes: [
      'Three KPI zones are rebuilt from primitives; screenshot review must confirm they still feel native.',
      'No old chart traces, legends, market labels, or competitor visuals are allowed.',
      'Lower information rail must stay supportive and not collapse the KPI hierarchy.'
    ]
  };
}

export async function buildCurrent2SlidesQaReport() {
  const visualModel = await buildCurrent2SlidesVisualModel();
  const readiness = await readJson(RUNTIME_READINESS_OUTPUT);

  const payload = {
    generatedAt: new Date().toISOString(),
    deckName: visualModel.deck.name,
    scriptPath: 'output/figma-current-2slides.generated.js',
    mcpReady: true,
    x5SansBlocksExecution: !readiness.mcpRunner.x5SansAvailable,
    slides: visualModel.slides.map((slide) => buildSlideRisk(slide, readiness))
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  return payload;
}

if (isDirectExecution(import.meta)) {
  buildCurrent2SlidesQaReport().then((payload) => {
    console.log(JSON.stringify(payload, null, 2));
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
