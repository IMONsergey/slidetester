import { existsSync, readFileSync } from 'node:fs';

const required = [
  'MASTER_CODEX_PROMPT.md',
  'DESIGN_FIDELITY_ADDENDUM.md',
  'AGENTS.md',
  'README.md',
  'package.json',
  'docs/00-project-context.md',
  'docs/01-design-system.md',
  'docs/02-slide-patterns.md',
  'docs/03-production-rules.md',
  'docs/04-figma-mcp-audit-plan.md',
  'docs/05-qa-rubric.md',
  'docs/06-pilot-v1-postmortem.md',
  'docs/07-pilot-v2-method.md',
  'schemas/slides.schema.json',
  'schemas/pattern-library.schema.json',
  'schemas/pilot-reference-map.schema.json',
  'src/pptx/parse-pptx.mjs',
  'src/classify-slides.mjs',
  'src/audit/build-pattern-library.mjs',
  'src/audit/build-figma-index-script.mjs',
  'src/audit/build-source-frame-geometry-script.mjs',
  'src/audit/parse-audit-archive.mjs',
  'src/figma/figma-helpers.mjs',
  'src/figma/print-create-pilot-script.mjs',
  'src/figma/print-create-pilot-v2-script.mjs',
  'src/templates/01-cover.mjs',
  'src/templates/02-problem-map.mjs',
  'src/templates/03-target-state.mjs',
  'src/templates/04-solution-engine.mjs',
  'src/templates/05-metrics-effect.mjs',
  'src/templates/06-roadmap.mjs'
];

let ok = true;
for (const file of required) {
  if (!existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    ok = false;
  }
}

const forbidden = ['figp_', '_authToken', 'PRIVATE KEY', '.npmrc'];

const priorityFiles = ['README.md', 'AGENTS.md', 'docs/00-project-context.md', 'docs/03-production-rules.md'];
for (const file of priorityFiles) {
  const body = readFileSync(file, 'utf8');
  if (!body.includes('DESIGN_FIDELITY_ADDENDUM')) {
    console.error(`Priority rule is not explicitly referenced in ${file}`);
    ok = false;
  }
}

const derivedChecks = [
  {
    file: 'output/slides.json',
    requiredAfter: 'classify'
  },
  {
    file: 'output/pattern-library.json',
    requiredAfter: 'patterns'
  },
  {
    file: 'output/pilot-reference-map.json',
    requiredAfter: 'patterns'
  },
  {
    file: 'output/figma-create-pilot.generated.js',
    requiredAfter: 'figma:pilot-script'
  },
  {
    file: 'output/source-frame-geometry-script.generated.js',
    requiredAfter: 'build-source-frame-geometry-script'
  },
  {
    file: 'output/pilot-v2-reference-map.json',
    requiredAfter: 'print-create-pilot-v2-script'
  },
  {
    file: 'output/figma-create-pilot-v2.generated.js',
    requiredAfter: 'print-create-pilot-v2-script'
  }
];

let pending = 0;
for (const item of derivedChecks) {
  if (!existsSync(item.file)) {
    console.log(`Pending derived artifact: ${item.file} (expected after ${item.requiredAfter})`);
    pending += 1;
  }
}

const generatedScript = 'output/figma-create-pilot.generated.js';
if (existsSync(generatedScript)) {
  const body = readFileSync(generatedScript, 'utf8');
  const frameNames = [
    'PILOT / 01 / Task Manager / Cover',
    'PILOT / 02 / Task Manager / Problem',
    'PILOT / 03 / Task Manager / Target State',
    'PILOT / 04 / Task Manager / Solution Engine',
    'PILOT / 05 / Task Manager / Business Effect',
    'PILOT / 06 / Task Manager / Roadmap'
  ];

  for (const frameName of frameNames) {
    if (!body.includes(frameName)) {
      console.error(`Generated Figma script is missing frame name: ${frameName}`);
      ok = false;
    }
  }

  for (const token of forbidden) {
    if (body.includes(token)) {
      console.error(`Forbidden token pattern found in ${generatedScript}: ${token}`);
      ok = false;
    }
  }
}

const generatedV2Script = 'output/figma-create-pilot-v2.generated.js';
if (existsSync(generatedV2Script)) {
  const body = readFileSync(generatedV2Script, 'utf8');
  const requiredV2FrameNames = [
    'PILOT V2 / 01 / Task Manager / Cover',
    'PILOT V2 / 05 / Task Manager / Business Effect'
  ];

  for (const frameName of requiredV2FrameNames) {
    if (!body.includes(frameName)) {
      console.error(`Generated V2 Figma script is missing frame name: ${frameName}`);
      ok = false;
    }
  }

  if (!body.includes('X5 Sans is required but not available.')) {
    console.error('Generated V2 Figma script does not enforce strict X5 Sans availability.');
    ok = false;
  }

  const v2Forbidden = ['Inter', 'figp_', '_authToken', 'PRIVATE KEY'];
  for (const token of v2Forbidden) {
    if (body.includes(token)) {
      console.error(`Forbidden token pattern found in ${generatedV2Script}: ${token}`);
      ok = false;
    }
  }

  if (body.includes('remove()') || body.includes('figma.currentPage.children =')) {
    console.error('Generated V2 Figma script appears to delete or replace source frames.');
    ok = false;
  }

  if (body.includes("25:11279") && body.includes('clone()') && body.includes('Icons')) {
    console.error('Generated V2 Figma script appears to target the Icons frame.');
    ok = false;
  }
}

if (!ok) {
  process.exit(1);
}

console.log(
  pending === 0
    ? 'Slidetester project check passed with all derived artifacts present.'
    : `Slidetester scaffold check passed. Pending derived artifacts: ${pending}.`
);
