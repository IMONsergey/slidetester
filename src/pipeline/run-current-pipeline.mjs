import { buildAssetBank } from '../audit/build-asset-bank-script.mjs';
import { buildDeckAtlas } from '../audit/build-deck-atlas-script.mjs';
import { buildStyleTokens } from '../audit/build-style-tokens-script.mjs';
import { buildProductionSpec } from '../composer/build-production-spec.mjs';
import { parseCurrentPptx } from '../pptx/parse-current-pptx.mjs';
import { buildCurrentSlidePlan } from '../planner/build-current-slide-plan.mjs';
import { buildQaReport } from '../qa/build-qa-report.mjs';
import { checkRuntimeReadiness } from '../runners/check-runtime-readiness.mjs';
import { buildProductionSpecRunner } from '../runners/production-spec-runner.mjs';

async function main() {
  const raw = await parseCurrentPptx();
  const atlas = await buildDeckAtlas();
  const styleTokens = await buildStyleTokens({ atlas });
  const assetBank = await buildAssetBank({ atlas });
  const plan = await buildCurrentSlidePlan({ raw, atlas, assetBank });
  const productionSpec = await buildProductionSpec({ raw, plan });
  const readiness = await checkRuntimeReadiness();
  await buildProductionSpecRunner({ productionSpec, readiness });
  const qa = await buildQaReport({ plan, productionSpec, styleTokens, readiness });

  console.log(JSON.stringify({
    slideCount: raw.slideCount,
    deckAtlasFrames: atlas.frames.length,
    productionSpecSlides: productionSpec.slides.length,
    qaSlides: qa.slides.length,
    mcpBlockedByX5Sans: !readiness.mcpRunner.x5SansAvailable
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exit(1);
});
