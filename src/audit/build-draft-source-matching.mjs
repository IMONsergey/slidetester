import { mkdir, readFile, writeFile } from 'node:fs/promises';

const SLIDES_PATH = 'output/slides.json';
const ATLAS_PATH = 'output/deck-atlas.json';
const OUTPUT_PATH = 'output/draft-to-source-matching.json';

function scoreCandidate(frame, draftRole, selectedFrameId) {
  const draftRoleMatch = frame.suitableForDraftRoles.includes(draftRole);
  const semanticFitBase = draftRoleMatch ? 82 : 42;
  const visualFitBase = frame.reusableAsBase ? 78 : 54;
  const architectureFitBase = draftRoleMatch ? 80 : 40;

  let semanticFit = semanticFitBase;
  let visualFit = visualFitBase;
  let contentArchitectureFit = architectureFitBase;

  if (frame.frameId === selectedFrameId) {
    semanticFit += 14;
    visualFit += 12;
    contentArchitectureFit += 16;
  }

  if (frame.frameId === '25:7247') {
    semanticFit = 8;
    visualFit = 63;
    contentArchitectureFit = 4;
  }

  if (frame.frameId === '25:9782') {
    semanticFit = 28;
    visualFit = 61;
    contentArchitectureFit = 18;
  }

  if (frame.frameId === '25:9538') {
    semanticFit = 36;
    visualFit = 68;
    contentArchitectureFit = 24;
  }

  return {
    semanticFit: Math.min(100, semanticFit),
    visualFit: Math.min(100, visualFit),
    contentArchitectureFit: Math.min(100, contentArchitectureFit)
  };
}

function buildReason(frame, decision, draftRole) {
  if (decision === 'selected' && frame.frameId !== '25:7044') {
    return `Selected as the strongest current ${draftRole} semantic match from the deck atlas.`;
  }
  if (frame.frameId === '25:7044') {
    return 'Selected because the source already uses three independent KPI cards on a dark open stage, which matches the draft architecture after content cleanup.';
  }
  if (draftRole === 'business-effect' && frame.frameId === '25:7247') {
    return 'Rejected because it is a market-comparison slide with legacy chart lines, legend, years, and source notes that conflict with a self-contained KPI summary.';
  }
  if (draftRole === 'business-effect' && frame.frameId === '25:7544') {
    return 'Rejected as primary but kept as backup because the card language is useful, yet the left table and issue taxonomy still push the slide toward results-vs-plan narrative.';
  }
  if (draftRole === 'business-effect' && frame.frameId === '25:8018') {
    return 'Rejected as primary because the strong product photo and goals matrix create a goals-and-targets slide, not a clean business-effect summary.';
  }
  if (draftRole === 'business-effect' && frame.frameId === '25:9538') {
    return 'Rejected because the dashboard is too dense and year-driven for a simple three-metric executive summary.';
  }
  if (draftRole === 'business-effect' && frame.frameId === '25:9043') {
    return 'Rejected because the composition is a five-focus-direction priorities slide rather than a KPI outcome slide.';
  }
  if (draftRole === 'business-effect' && frame.frameId === '25:9782') {
    return 'Rejected because the architecture is a factor waterfall and causal process explanation, not an outcome summary.';
  }
  return decision === 'selected'
    ? `Selected as the strongest current ${draftRole} semantic match from the deck atlas.`
    : `Rejected because its architecture is weaker for ${draftRole} than the selected reference family.`;
}

function buildEntry(slide, atlas, config) {
  const draftRole = config.draftRole;
  const candidateFrames = config.candidateFrameIds
    .map((frameId) => atlas.frames.find((frame) => frame.frameId === frameId))
    .filter(Boolean)
    .map((frame) => {
      const scores = scoreCandidate(frame, draftRole, config.selectedFrameId);
      const decision = frame.frameId === config.selectedFrameId ? 'selected' : 'rejected';
      const risks = [...frame.dangerousToKeep];

      return {
        frameId: frame.frameId,
        frameName: frame.frameName,
        semanticFit: scores.semanticFit,
        visualFit: scores.visualFit,
        contentArchitectureFit: scores.contentArchitectureFit,
        risks,
        decision,
        reason: buildReason(frame, decision, draftRole)
      };
    });

  return {
    draftSlide: slide.slideNumber,
    draftRole,
    contentArchitecture: config.contentArchitecture,
    requiredBlocks: config.requiredBlocks,
    forbiddenSourceContent: config.forbiddenSourceContent,
    candidateFrames,
    selectedProductionMode: config.selectedProductionMode
  };
}

async function main() {
  await mkdir('output', { recursive: true });

  const slidesPayload = JSON.parse(await readFile(SLIDES_PATH, 'utf8'));
  const atlasPayload = JSON.parse(await readFile(ATLAS_PATH, 'utf8'));

  const slidesByNumber = new Map(slidesPayload.slides.map((slide) => [slide.slideNumber, slide]));

  const configs = [
    {
      slideNumber: 1,
      draftRole: 'cover',
      contentArchitecture: 'hero title over full-bleed image',
      requiredBlocks: ['eyebrow', 'heroTitle', 'footer'],
      forbiddenSourceContent: ['old speaker names', 'old cover title'],
      candidateFrameIds: ['25:6981', '25:8619', '25:10302'],
      selectedFrameId: '25:6981',
      selectedProductionMode: 'direct-clone-replace-text'
    },
    {
      slideNumber: 2,
      draftRole: 'problem',
      contentArchitecture: 'problem statement plus multiple friction blocks',
      requiredBlocks: ['title', 'problemStatement', 'frictionBlock1', 'frictionBlock2', 'frictionBlock3'],
      forbiddenSourceContent: ['old market chart', 'old growth claims', 'old CVP labels'],
      candidateFrameIds: ['25:7544', '25:9043', '25:9782'],
      selectedFrameId: '25:7544',
      selectedProductionMode: 'clean-clone-remove-content-rebuild'
    },
    {
      slideNumber: 3,
      draftRole: 'target-state',
      contentArchitecture: 'three outcome pillars',
      requiredBlocks: ['title', 'pillar1', 'pillar2', 'pillar3'],
      forbiddenSourceContent: ['old HR wording', 'old image semantics'],
      candidateFrameIds: ['25:10717', '25:9043', '25:10598'],
      selectedFrameId: '25:10717',
      selectedProductionMode: 'direct-clone-replace-text'
    },
    {
      slideNumber: 4,
      draftRole: 'solution-engine',
      contentArchitecture: 'operating model with mechanism blocks',
      requiredBlocks: ['title', 'mechanism1', 'mechanism2', 'mechanism3', 'mechanism4'],
      forbiddenSourceContent: ['old HR concepts', 'old role-model copy'],
      candidateFrameIds: ['25:10434', '25:10876', '25:10479'],
      selectedFrameId: '25:10434',
      selectedProductionMode: 'hybrid-source-composition'
    },
    {
      slideNumber: 5,
      draftRole: 'business-effect',
      contentArchitecture: 'three independent KPI cards',
      requiredBlocks: ['title', 'metricCard1', 'metricCard2', 'metricCard3'],
      forbiddenSourceContent: ['market chart', 'competitor legend', 'old years', 'old source note'],
      candidateFrameIds: ['25:7044', '25:7544', '25:8018', '25:9538', '25:9043', '25:9782', '25:7247'],
      selectedFrameId: '25:7044',
      selectedProductionMode: 'clean-clone-remove-content-rebuild'
    },
    {
      slideNumber: 6,
      draftRole: 'roadmap',
      contentArchitecture: 'staged roadmap / evolution path',
      requiredBlocks: ['title', 'stage1', 'stage2', 'stage3'],
      forbiddenSourceContent: ['old HR maturity labels', 'old office-specific copy'],
      candidateFrameIds: ['25:10664', '25:11061', '25:10876'],
      selectedFrameId: '25:10664',
      selectedProductionMode: 'direct-clone-replace-text'
    }
  ];

  const matching = {
    generatedAt: new Date().toISOString(),
    fileKey: atlasPayload.fileKey,
    page: atlasPayload.page,
    draftSlides: configs.map((config) => buildEntry(slidesByNumber.get(config.slideNumber), atlasPayload, config))
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(matching, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${OUTPUT_PATH}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
