import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { buildCoverTemplate } from '../templates/01-cover.mjs';
import { buildProblemMapTemplate } from '../templates/02-problem-map.mjs';
import { buildTargetStateTemplate } from '../templates/03-target-state.mjs';
import { buildSolutionEngineTemplate } from '../templates/04-solution-engine.mjs';
import { buildMetricsEffectTemplate } from '../templates/05-metrics-effect.mjs';
import { buildRoadmapTemplate } from '../templates/06-roadmap.mjs';
import { buildFigmaScript } from './figma-helpers.mjs';

const SLIDES_INPUT = 'output/slides.json';
const REFERENCES_INPUT = 'output/pilot-reference-map.json';
const OUTPUT = 'output/figma-create-pilot.generated.js';

const templateBuilders = {
  1: buildCoverTemplate,
  2: buildProblemMapTemplate,
  3: buildTargetStateTemplate,
  4: buildSolutionEngineTemplate,
  5: buildMetricsEffectTemplate,
  6: buildRoadmapTemplate
};

async function main() {
  await mkdir('output', { recursive: true });

  const slidesPayload = JSON.parse(await readFile(SLIDES_INPUT, 'utf8'));
  const referencesPayload = JSON.parse(await readFile(REFERENCES_INPUT, 'utf8'));
  const referencesBySlide = new Map(
    referencesPayload.pilotSlides.map((item) => [item.slideNumber, item])
  );

  const slides = slidesPayload.slides.map((slide) => {
    const builder = templateBuilders[slide.slideNumber];
    if (!builder) {
      throw new Error(`No template builder found for slide ${slide.slideNumber}`);
    }

    return builder(slide, referencesBySlide.get(slide.slideNumber));
  });

  const deckData = {
    generatedAt: new Date().toISOString(),
    sourceFigmaFileKey: slidesPayload.deck.sourceFigmaFileKey,
    sourceFigmaPageId: slidesPayload.deck.sourceFigmaPageId,
    referencePriority: slidesPayload.deck.designRulePriority,
    slides
  };

  const script = buildFigmaScript(deckData);
  await writeFile(OUTPUT, `${script}\n`, 'utf8');
  console.log(`Wrote ${OUTPUT}. Run it through ChatGPT/Figma MCP use_figma.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
