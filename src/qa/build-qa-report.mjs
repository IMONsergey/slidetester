import {
  CURRENT_PLAN_OUTPUT,
  PRODUCTION_SPEC_OUTPUT,
  QA_REPORT_OUTPUT,
  RUNTIME_READINESS_OUTPUT,
  STYLE_TOKENS_OUTPUT,
  isDirectExecution,
  readJson,
  writeJson
} from '../pipeline/current-pipeline-shared.mjs';
import { validateContentPurity } from './validate-content-purity.mjs';
import { validateStyleTokenUsage } from './validate-style-token-usage.mjs';

function semanticCompleteness(specSlide) {
  const count = specSlide.elements.length;
  if (count >= 6) {
    return 92;
  }
  if (count >= 4) {
    return 84;
  }
  return 72;
}

function assetReuseQuality(specSlide) {
  const count = Array.isArray(specSlide.assetRefs) ? specSlide.assetRefs.length : 0;
  return count >= 3 ? 90 : count === 2 ? 82 : 70;
}

function layoutConfidence(specSlide) {
  if (specSlide.productionMode === 'hybrid-source-composition') {
    return 88;
  }
  if (specSlide.productionMode === 'clean-clone-remove-content-rebuild') {
    return 85;
  }
  return 78;
}

export async function buildQaReport(options = {}) {
  const plan = options.plan || await readJson(CURRENT_PLAN_OUTPUT);
  const spec = options.productionSpec || await readJson(PRODUCTION_SPEC_OUTPUT);
  const styleTokens = options.styleTokens || await readJson(STYLE_TOKENS_OUTPUT);
  const readiness = options.readiness || await readJson(RUNTIME_READINESS_OUTPUT);
  const planByName = new Map(plan.slides.map((slide) => [slide.slideIndex, slide]));

  const slides = spec.slides.map((specSlide, index) => {
    const planSlide = planByName.get(index + 1);
    const purity = validateContentPurity(specSlide);
    const styleUsage = validateStyleTokenUsage(specSlide, styleTokens);
    const risks = []
      .concat(purity.risks)
      .concat(styleUsage.risks);

    if (!readiness.mcpRunner.x5SansAvailable) {
      risks.push('Editable MCP generation remains blocked by X5 Sans runtime availability.');
    }

    if (planSlide.copyEditingNeeded) {
      risks.push('Source copy contains punctuation artifacts that should be normalized before final production.');
    }

    return {
      slideName: specSlide.name,
      semanticCompleteness: semanticCompleteness(specSlide),
      contentPurity: purity.score,
      styleTokenUsage: styleUsage.score,
      assetReuseQuality: assetReuseQuality(specSlide),
      layoutConfidence: layoutConfidence(specSlide),
      risks,
      manualReviewNeeded: specSlide.role === 'project-of-year' && risks.length > 2
    };
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    deckName: spec.deck.name,
    slides
  };

  await writeJson(options.outputPath || QA_REPORT_OUTPUT, payload);
  return payload;
}

if (isDirectExecution(import.meta)) {
  buildQaReport().then(() => {
    console.log(`Wrote ${QA_REPORT_OUTPUT}.`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
