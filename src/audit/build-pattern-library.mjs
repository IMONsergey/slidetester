import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const SLIDES_INPUT = 'output/slides.json';
const PATTERN_OUTPUT = 'output/pattern-library.json';
const REFERENCE_OUTPUT = 'output/pilot-reference-map.json';

const directMcpAuditFrames = {
  '25:6981': {
    name: '1',
    role: 'cover / hero title',
    observed: [
      'black base',
      'red/orange horizon glow',
      'large central title',
      'top small uppercase line',
      'bottom mark logic'
    ]
  },
  '25:7247': {
    name: '6',
    role: 'dense executive analytics / chart slide',
    observed: [
      'top-left title',
      'large glass chart panel left',
      'secondary red/dark chart panel right',
      'footnote bottom-left',
      'dense but controlled information hierarchy'
    ]
  },
  '25:10434': {
    name: '4609',
    role: 'structured architecture / numbered strategic system slide',
    observed: [
      'numbered story blocks',
      'dark card clusters',
      'strong title',
      'executive narrative with semantic callouts'
    ]
  },
  '25:10717': {
    name: '4615',
    role: 'three-pillar strategic foundation slide',
    observed: [
      'three-column logic',
      'large section title',
      'clean supporting statements',
      'balanced white/red accent usage'
    ]
  },
  '25:10876': {
    name: '4618',
    role: 'end-to-end operating journey / process architecture slide',
    observed: [
      'longitudinal process flow',
      'platform/system storyline',
      'modular stages',
      'dense operational annotations'
    ]
  },
  '25:10355': {
    name: '4608',
    role: 'strategy metrics overview slide',
    observed: [
      'metric-led hierarchy',
      'executive dashboard density',
      'top-row year comparison'
    ]
  },
  '25:10664': {
    name: '4614',
    role: 'evolution / maturity roadmap slide',
    observed: [
      'year anchor',
      'horizontal maturity progression',
      'phase cards with concise descriptions'
    ]
  },
  '25:11061': {
    name: '4622',
    role: 'priorities / rollout agenda slide',
    observed: [
      'year-specific priorities',
      'modular agenda blocks',
      'operational rollout framing'
    ]
  },
  '25:10479': {
    name: '4610',
    role: 'role model / operating role card slide',
    observed: [
      'central role framing',
      'supporting cards',
      'dark card stack'
    ]
  },
  '25:8501': {
    name: '4584',
    role: 'section cover / annual plans opener',
    observed: [
      'minimal section opener',
      'year anchor',
      'spacious composition'
    ]
  }
};

const patterns = [
  {
    patternId: 'hero_cover_glow',
    sourceFrameIds: ['25:6981'],
    sourceFrameNames: ['1'],
    visualRole: 'cover / hero title',
    composition: 'central large title, black background, red/orange horizon glow, top small uppercase label, bottom mark logic',
    reuseFor: ['cover', 'initiative title', 'section opening']
  },
  {
    patternId: 'dense_market_chart',
    sourceFrameIds: ['25:7247'],
    sourceFrameNames: ['6'],
    visualRole: 'dense executive analytics / chart slide',
    composition: 'large chart panel left, smaller chart panel right, top-left title, bottom-left footnote, dark glass cards, red/orange emphasis',
    reuseFor: ['business metrics', 'market dynamics', 'multi-series comparison', 'effect proof']
  },
  {
    patternId: 'three_pillar_outcome_architecture',
    sourceFrameIds: ['25:10717', '25:8560'],
    sourceFrameNames: ['4615', '4585'],
    visualRole: 'three-pillar strategic outcome slide',
    composition: 'strong title followed by three controlled content pillars with disciplined spacing and restrained accent logic',
    reuseFor: ['target state', 'strategic pillars', 'future-state proof']
  },
  {
    patternId: 'operating_model_architecture',
    sourceFrameIds: ['25:10434', '25:10876', '25:10479'],
    sourceFrameNames: ['4609', '4618', '4610'],
    visualRole: 'operating model / process engine / structured system slide',
    composition: 'numbered or staged operating system with dark panels, semantic red accents, and executive narrative blocks',
    reuseFor: ['solution engine', 'process loop', 'capability architecture']
  },
  {
    patternId: 'strategy_metric_strip',
    sourceFrameIds: ['25:7247', '25:10355'],
    sourceFrameNames: ['6', '4608'],
    visualRole: 'metric-heavy strategy effect slide',
    composition: 'asymmetric metric treatment, large numerical focus, supporting commentary, glass panels',
    reuseFor: ['KPI effect', 'business impact', 'value proof']
  },
  {
    patternId: 'evolution_roadmap',
    sourceFrameIds: ['25:10664', '25:11061', '25:8501'],
    sourceFrameNames: ['4614', '4622', '4584'],
    visualRole: 'roadmap / year-based evolution slide',
    composition: 'clear annual anchors, phased progression, strong narrative line from pilot to scale',
    reuseFor: ['roadmap', 'timeline', 'scale plan']
  }
];

const pilotReferenceBlueprint = {
  1: {
    primaryReferenceFrameId: '25:6981',
    primaryReferenceFrameName: '1',
    sourcePatternFrameId: '25:6981',
    sourcePatternFrameName: '1',
    sourcePatternId: 'hero_cover_glow',
    whatIsBorrowed: [
      'central hero title composition',
      'black base and horizon glow',
      'small uppercase eyebrow',
      'controlled secondary line',
      'cinematic opening mood'
    ],
    visualFidelityScore: 4.8,
    referenceStatus: 'ready'
  },
  2: {
    primaryReferenceFrameId: '25:10434',
    primaryReferenceFrameName: '4609',
    secondaryReferenceFrameId: '25:7247',
    secondaryReferenceFrameName: '6',
    tertiaryReferenceFrameId: '25:11194',
    tertiaryReferenceFrameName: '4625',
    sourcePatternFrameId: '25:10434',
    sourcePatternFrameName: '4609',
    sourcePatternId: 'operating_model_architecture',
    whatIsBorrowed: [
      'numbered system-breakdown logic from 4609',
      'dark glass panel density from 6',
      'priority framing from 4625'
    ],
    visualFidelityScore: 4.1,
    referenceStatus: 'needs_more_mcp_reference'
  },
  3: {
    primaryReferenceFrameId: '25:10717',
    primaryReferenceFrameName: '4615',
    secondaryReferenceFrameId: '25:8560',
    secondaryReferenceFrameName: '4585',
    sourcePatternFrameId: '25:10717',
    sourcePatternFrameName: '4615',
    sourcePatternId: 'three_pillar_outcome_architecture',
    whatIsBorrowed: [
      'three-pillar strategic card rhythm',
      'balanced spacing and hierarchy',
      'restrained accent linework'
    ],
    visualFidelityScore: 4.4,
    referenceStatus: 'ready'
  },
  4: {
    primaryReferenceFrameId: '25:10876',
    primaryReferenceFrameName: '4618',
    secondaryReferenceFrameId: '25:10479',
    secondaryReferenceFrameName: '4610',
    tertiaryReferenceFrameId: '25:11061',
    tertiaryReferenceFrameName: '4622',
    sourcePatternFrameId: '25:10876',
    sourcePatternFrameName: '4618',
    sourcePatternId: 'operating_model_architecture',
    whatIsBorrowed: [
      'process-stage sequencing from 4618',
      'role card semantics from 4610',
      'priority framing from 4622'
    ],
    visualFidelityScore: 4.2,
    referenceStatus: 'needs_more_mcp_reference'
  },
  5: {
    primaryReferenceFrameId: '25:7247',
    primaryReferenceFrameName: '6',
    secondaryReferenceFrameId: '25:10355',
    secondaryReferenceFrameName: '4608',
    sourcePatternFrameId: '25:7247',
    sourcePatternFrameName: '6',
    sourcePatternId: 'strategy_metric_strip',
    whatIsBorrowed: [
      'large-left/smaller-right metric zone logic',
      'executive chart-card treatment',
      'footnote and commentary hierarchy'
    ],
    visualFidelityScore: 4.5,
    referenceStatus: 'ready'
  },
  6: {
    primaryReferenceFrameId: '25:10664',
    primaryReferenceFrameName: '4614',
    secondaryReferenceFrameId: '25:11061',
    secondaryReferenceFrameName: '4622',
    tertiaryReferenceFrameId: '25:8501',
    tertiaryReferenceFrameName: '4584',
    sourcePatternFrameId: '25:10664',
    sourcePatternFrameName: '4614',
    sourcePatternId: 'evolution_roadmap',
    whatIsBorrowed: [
      'year-anchored evolution line from 4614',
      'priority rollout framing from 4622',
      'section opener restraint from 4584'
    ],
    visualFidelityScore: 4.0,
    referenceStatus: 'needs_more_mcp_reference'
  }
};

async function main() {
  await mkdir('output', { recursive: true });
  const slidesPayload = JSON.parse(await readFile(SLIDES_INPUT, 'utf8'));

  const pilotSlides = slidesPayload.slides.map((slide) => ({
    slideNumber: slide.slideNumber,
    slideTitle: slide.title,
    patternId: slide.patternId,
    ...pilotReferenceBlueprint[slide.slideNumber]
  }));

  const patternLibraryPayload = {
    generatedAt: new Date().toISOString(),
    generatedFrom: {
      slidesJson: SLIDES_INPUT,
      designRulePriority: 'DESIGN_FIDELITY_ADDENDUM.md > MASTER_CODEX_PROMPT.md > docs/*',
      directFigmaMcpAvailable: true,
      auditArchivePresent: existsSync('input/figma_slide_factory_audit.zip'),
      designFidelityArchivePresent: existsSync('input/figma-slide-factory-design-fidelity-addendum.zip')
    },
    directMcpAuditFrames,
    patterns
  };

  const pilotReferencePayload = {
    generatedAt: new Date().toISOString(),
    generatedFrom: {
      sourceFigmaFileKey: slidesPayload.deck.sourceFigmaFileKey,
      sourceFigmaPageId: slidesPayload.deck.sourceFigmaPageId,
      notes: [
        'Built from direct compact Figma MCP inspection plus master prompt guidance.',
        'Entries marked needs_more_mcp_reference should receive deeper targeted MCP follow-up before final production.'
      ]
    },
    pilotSlides
  };

  await writeFile(PATTERN_OUTPUT, `${JSON.stringify(patternLibraryPayload, null, 2)}\n`, 'utf8');
  await writeFile(REFERENCE_OUTPUT, `${JSON.stringify(pilotReferencePayload, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${PATTERN_OUTPUT}.`);
  console.log(`Wrote ${REFERENCE_OUTPUT}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
