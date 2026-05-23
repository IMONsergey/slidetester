import {
  ASSET_BANK_OUTPUT,
  CURRENT_PLAN_OUTPUT,
  CURRENT_RAW_OUTPUT,
  DECK_ATLAS_OUTPUT,
  buildSlideCountMismatch,
  isDirectExecution,
  readJson,
  writeJson
} from '../pipeline/current-pipeline-shared.mjs';
import { classifySlideRole } from './classify-slide-role.mjs';
import { extractSlideContentArchitecture } from './extract-slide-content-architecture.mjs';

const ROLE_ALIASES = {
  'numeric-overview': ['numeric-overview', 'metrics-summary', 'business-effect'],
  achievements: ['achievements', 'business-effect', 'metric-summary'],
  'efficiency-result': ['efficiency-result', 'process', 'operating-model'],
  transformation: ['transformation', 'section-divider', 'strategy'],
  roadmap: ['roadmap', 'operating-model', 'process'],
  'project-of-year': ['project-of-year', 'table', 'dense-analytics'],
  strategy: ['strategy', 'three-pillars', 'priorities'],
  cover: ['cover', 'section-divider']
};

const ROLE_FEATURES = {
  cover: ['hasHeroTitle', 'hasImages'],
  'numeric-overview': ['hasLargeNumbers', 'hasCharts'],
  achievements: ['hasLargeNumbers', 'hasCards'],
  'efficiency-result': ['hasCards', 'hasProcessFlow'],
  transformation: ['hasHeroTitle', 'hasCards'],
  roadmap: ['hasProcessFlow', 'hasCards'],
  'project-of-year': ['hasTable', 'hasCharts'],
  strategy: ['hasPillars', 'hasCards']
};

const ROLE_ASSET_TYPES = {
  cover: ['background', 'glow', 'logo'],
  'numeric-overview': ['card-shell', 'glow', 'chart-shell', 'line-system'],
  achievements: ['card-shell', 'glow', 'line-system'],
  'efficiency-result': ['card-shell', 'icon', 'line-system'],
  transformation: ['background', 'glow', 'card-shell'],
  roadmap: ['card-shell', 'icon', 'line-system'],
  'project-of-year': ['table/card-shell', 'chart-shell', 'icon'],
  strategy: ['card-shell', 'icon', 'glow']
};

function roleMatchesFrame(role, frame) {
  const aliases = ROLE_ALIASES[role] || [role];
  const values = [
    frame.slideType,
    frame.semanticRole,
    ...(Array.isArray(frame.suitableForDraftRoles) ? frame.suitableForDraftRoles : [])
  ]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());

  return aliases.some((alias) => values.some((value) => value.includes(alias.toLowerCase())));
}

function scoreFrameForRole(role, frame) {
  let score = 0;

  if (roleMatchesFrame(role, frame)) {
    score += 40;
  }

  for (const feature of ROLE_FEATURES[role] || []) {
    if (frame[feature]) {
      score += 12;
    }
  }

  if (frame.reusableAsCleanClone) {
    score += 6;
  }

  if (frame.reusableAsStyleReference) {
    score += 5;
  }

  if (frame.densityLevel === 'low') {
    score += 3;
  }

  if (role !== 'cover' && Array.isArray(frame.dangerousToKeep) && frame.dangerousToKeep.some((item) => /old chart data|old legend|old years/i.test(item))) {
    score -= 4;
  }

  return score;
}

function getForbiddenContent(role) {
  const universal = [
    'old chart data',
    'old legend',
    'old years',
    'old source note',
    'old competitor names',
    'old department/topic labels',
    'any inherited text not present in current PPTX content'
  ];

  if (role === 'cover') {
    return universal.concat(['old speaker names', 'old cover title']);
  }

  if (role === 'project-of-year') {
    return universal.concat(['old market labels', 'irrelevant process copy']);
  }

  return universal;
}

function getIntegrityNotes(slide, role, mismatch) {
  const notes = [];

  if (mismatch && slide.slideIndex === 4) {
    notes.push('The real PPTX merges the prompt slide 4 and slide 5 topics into one execution slide.');
  }

  if (mismatch && slide.slideIndex === 6) {
    notes.push('The real PPTX merges the prompt slide 7 and slide 8 topics into one roadmap + Q1 results slide.');
  }

  if (slide.rawText.some((line) => /евгений козлов/i.test(line))) {
    notes.push('Speaker line should not compete with the main content hierarchy.');
  }

  if (role === 'project-of-year' && slide.tables.length > 0) {
    notes.push('The production table must remain editable and preserve only project data from the current PPTX.');
  }

  if (slide.rawText.some((line) => /_{2,}/.test(line))) {
    notes.push('The PPTX title includes placeholder underscores and needs copy cleanup before visual production.');
  }

  return notes;
}

function copyEditingNeeded(slide) {
  return slide.rawText.some((line) => /_{2,}| \.|\. /.test(line));
}

function pickSelectedStyleReferences(candidates, role) {
  return candidates.slice(0, 3).map((frame, index) => ({
    frameId: frame.frameId,
    frameName: frame.frameName,
    priority: index + 1,
    borrowed:
      index === 0
        ? ['title system', 'grid logic', 'background family']
        : index === 1
          ? ['card shell family', 'metric hierarchy']
          : ['supporting asset language', 'microcopy density'],
    rationale: `Reference ${frame.frameId} best matches the ${role} role without requiring blind inheritance.`
  }));
}

function pickSelectedAssets(role, assetBank) {
  const allowedTypes = ROLE_ASSET_TYPES[role] || [];
  return assetBank.assets
    .filter((asset) => allowedTypes.includes(asset.assetType))
    .slice(0, 5)
    .map((asset) => ({
      assetId: asset.assetId,
      assetType: asset.assetType,
      sourceFrameId: asset.sourceFrameId,
      reason: asset.role
    }));
}

export async function buildCurrentSlidePlan(options = {}) {
  const raw = options.raw || await readJson(CURRENT_RAW_OUTPUT);
  const atlas = options.atlas || await readJson(DECK_ATLAS_OUTPUT);
  const assetBank = options.assetBank || await readJson(ASSET_BANK_OUTPUT);
  const mismatch = buildSlideCountMismatch(raw.slideCount);

  const slides = raw.slides.map((slide) => {
    const semanticRole = classifySlideRole(slide);
    const architecture = extractSlideContentArchitecture(semanticRole);
    const candidateSourceFrames = atlas.frames
      .map((frame) => ({
        ...frame,
        score: scoreFrameForRole(semanticRole, frame)
      }))
      .filter((frame) => frame.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 5)
      .map((frame) => ({
        frameId: frame.frameId,
        frameName: frame.frameName,
        slideType: frame.slideType,
        score: frame.score,
        reusableVisualParts: frame.reusableVisualParts,
        reason: frame.visualNotes
      }));

    const selectedStyleReferences = pickSelectedStyleReferences(candidateSourceFrames, semanticRole);
    const selectedAssetReferences = pickSelectedAssets(semanticRole, assetBank);

    return {
      slideIndex: slide.slideIndex,
      sourceTitle: slide.possibleTitle,
      semanticRole,
      communicationGoal: architecture.communicationGoal,
      contentArchitecture: architecture.contentArchitecture,
      requiredBlocks: architecture.requiredBlocks,
      optionalBlocks: architecture.optionalBlocks,
      forbiddenInheritedContent: getForbiddenContent(semanticRole),
      recommendedProductionMode: architecture.recommendedProductionMode,
      preferredLayoutFamilies: architecture.preferredLayoutFamilies,
      candidateSourceFrames,
      selectedStyleReferences,
      selectedAssetReferences,
      dataIntegrityNotes: getIntegrityNotes(slide, semanticRole, mismatch),
      copyEditingNeeded: copyEditingNeeded(slide),
      generationPriority:
        semanticRole === 'project-of-year' || semanticRole === 'numeric-overview'
          ? 'high'
          : semanticRole === 'transformation'
            ? 'medium'
            : 'high'
    };
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    deckName: raw.deckName,
    sourceFile: raw.sourceFile,
    slideCount: raw.slideCount,
    expectedSlideCount: raw.expectedSlideCount,
    slideCountMismatch: raw.slideCountMismatch,
    slides
  };

  await writeJson(options.outputPath || CURRENT_PLAN_OUTPUT, payload);
  return payload;
}

if (isDirectExecution(import.meta)) {
  buildCurrentSlidePlan().then((payload) => {
    console.log(`Wrote ${CURRENT_PLAN_OUTPUT} with ${payload.slides.length} planned slide(s).`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
