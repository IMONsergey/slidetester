import {
  CURRENT_PLAN_OUTPUT,
  CURRENT_RAW_OUTPUT,
  PRODUCTION_SPEC_OUTPUT,
  SLIDE_SIZE,
  TARGET_FIGMA_FILE_KEY,
  isDirectExecution,
  readJson,
  writeJson
} from '../pipeline/current-pipeline-shared.mjs';
import { composeAchievements } from './compose-achievements.mjs';
import { composeCover } from './compose-cover.mjs';
import { composeEfficiencyResult } from './compose-efficiency-result.mjs';
import { composeNumericOverview } from './compose-numeric-overview.mjs';
import { composeProjectOfYear } from './compose-project-of-year.mjs';
import { composeRoadmap } from './compose-roadmap.mjs';
import { composeStrategy } from './compose-strategy.mjs';
import { composeTransformation } from './compose-transformation.mjs';

const COMPOSERS = {
  cover: composeCover,
  'numeric-overview': composeNumericOverview,
  achievements: composeAchievements,
  'efficiency-result': composeEfficiencyResult,
  transformation: composeTransformation,
  roadmap: composeRoadmap,
  'project-of-year': composeProjectOfYear,
  strategy: composeStrategy
};

export async function buildProductionSpec(options = {}) {
  const plan = options.plan || await readJson(CURRENT_PLAN_OUTPUT);
  const raw = options.raw || await readJson(CURRENT_RAW_OUTPUT);
  const rawByIndex = new Map(raw.slides.map((slide) => [slide.slideIndex, slide]));

  const slides = plan.slides.map((planSlide) => {
    const rawSlide = rawByIndex.get(planSlide.slideIndex);
    const composer = COMPOSERS[planSlide.semanticRole];
    if (!composer) {
      throw new Error(`No composer registered for role ${planSlide.semanticRole}.`);
    }
    return composer(planSlide, rawSlide);
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    deck: {
      name: raw.deckName,
      targetFigmaFileKey: TARGET_FIGMA_FILE_KEY,
      slideSize: SLIDE_SIZE,
      sourcePptx: raw.sourceFile
    },
    slides
  };

  await writeJson(options.outputPath || PRODUCTION_SPEC_OUTPUT, payload);
  return payload;
}

if (isDirectExecution(import.meta)) {
  buildProductionSpec().then((payload) => {
    console.log(`Wrote ${PRODUCTION_SPEC_OUTPUT} with ${payload.slides.length} slide(s).`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
