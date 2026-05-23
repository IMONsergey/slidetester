import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'MASTER_CODEX_PROMPT.md',
  'DESIGN_FIDELITY_ADDENDUM.md',
  'AGENTS.md',
  'README.md',
  'package.json',
  'docs/00-project-context.md',
  'docs/01-design-system.md',
  'docs/02-slide-patterns.md',
  'docs/03-production-rules.md',
  'docs/10-slide-design-engine.md',
  'docs/11-runner-architecture.md',
  'docs/12-style-token-system.md',
  'docs/13-asset-bank-method.md',
  'docs/14-layout-composer-method.md',
  'docs/15-no-manual-workflow.md',
  'docs/16-current-pptx-pipeline.md',
  'docs/17-production-spec-contract.md',
  'docs/18-runner-readiness-and-fonts.md',
  'docs/19-current-draft-slide-plan-review.md',
  'docs/20-current-2slides-composer.md',
  'docs/21-font-fallback-preview-runner.md',
  'src/pipeline/run-current-pipeline.mjs',
  'src/pptx/parse-current-pptx.mjs',
  'src/planner/build-current-slide-plan.mjs',
  'src/planner/classify-slide-role.mjs',
  'src/planner/extract-slide-content-architecture.mjs',
  'src/audit/build-deck-atlas-script.mjs',
  'src/audit/build-style-tokens-script.mjs',
  'src/audit/build-asset-bank-script.mjs',
  'src/composer/build-production-spec.mjs',
  'src/composer/compose-cover.mjs',
  'src/composer/compose-numeric-overview.mjs',
  'src/composer/compose-achievements.mjs',
  'src/composer/compose-efficiency-result.mjs',
  'src/composer/compose-transformation.mjs',
  'src/composer/compose-roadmap.mjs',
  'src/composer/compose-project-of-year.mjs',
  'src/composer/compose-strategy.mjs',
  'src/runners/runner-types.mjs',
  'src/runners/check-runtime-readiness.mjs',
  'src/runners/mcp-runner-spec.mjs',
  'src/runners/local-plugin-runner-spec.mjs',
  'src/runners/production-spec-runner.mjs',
  'src/runners/preview-runner.mjs',
  'src/runners/build-current-2slides-runner.mjs',
  'src/runners/build-current-2slides-font-fallback-runner.mjs',
  'src/qa/build-qa-report.mjs',
  'src/qa/validate-content-purity.mjs',
  'src/qa/validate-style-token-usage.mjs'
];

const outputFiles = [
  'output/current-draft-raw.json',
  'output/current-slide-plan.json',
  'output/deck-atlas.json',
  'output/style-tokens.json',
  'output/asset-bank.json',
  'output/production-spec.json',
  'output/runtime-readiness-report.json',
  'output/qa-report.json',
  'output/figma-mcp-script.generated.js',
  'output/figma-current-2slides.generated.js',
  'output/current-2slides-qa-report.json',
  'output/figma-current-2slides-font-fallback.generated.js'
];

let ok = true;

function fail(message) {
  console.error(message);
  ok = false;
}

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    fail(`Missing required file: ${file}`);
  }
}

for (const file of outputFiles) {
  if (!existsSync(file)) {
    fail(`Missing generated artifact: ${file}`);
  }
}

for (const file of ['README.md', 'AGENTS.md', 'docs/00-project-context.md']) {
  const body = readFileSync(file, 'utf8');
  if (!body.includes('DESIGN_FIDELITY_ADDENDUM')) {
    fail(`Priority rule is not explicitly referenced in ${file}`);
  }
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
if (!packageJson.scripts || packageJson.scripts['pipeline:current'] !== 'node src/pipeline/run-current-pipeline.mjs') {
  fail('package.json is missing the pipeline:current script.');
}
if (!packageJson.scripts || packageJson.scripts['figma:current-2slides-font-fallback'] !== 'node src/runners/build-current-2slides-font-fallback-runner.mjs') {
  fail('package.json is missing the figma:current-2slides-font-fallback script.');
}

const raw = JSON.parse(readFileSync('output/current-draft-raw.json', 'utf8'));
if (raw.sourceFile !== 'input/current-draft.pptx') {
  fail('current-draft raw output must point to input/current-draft.pptx.');
}
if (!Array.isArray(raw.slides) || raw.slides.length < 1) {
  fail('current-draft raw output must contain parsed slides.');
}

const plan = JSON.parse(readFileSync('output/current-slide-plan.json', 'utf8'));
if (!Array.isArray(plan.slides) || plan.slides.length !== raw.slides.length) {
  fail('current slide plan must exist for every parsed slide.');
}

const atlas = JSON.parse(readFileSync('output/deck-atlas.json', 'utf8'));
if (!Array.isArray(atlas.frames) || atlas.frames.length < 70) {
  fail('deck-atlas.json must classify the original slide deck.');
}
if (atlas.frames.some((frame) => /pilot|generated/i.test(String(frame.frameName || '')))) {
  fail('deck-atlas.json must exclude PILOT/generated frames.');
}
if (atlas.frames.some((frame) => frame.frameId === '25:11279')) {
  fail('deck-atlas.json must exclude the Icons frame as a slide.');
}

const styleTokens = JSON.parse(readFileSync('output/style-tokens.json', 'utf8'));
if (!Array.isArray(styleTokens.typography) || !styleTokens.typography.some((token) => token.tokenId === 'typography.family.primary')) {
  fail('style-tokens.json must include primary typography tokens.');
}

const assetBank = JSON.parse(readFileSync('output/asset-bank.json', 'utf8'));
if (!Array.isArray(assetBank.assets) || assetBank.assets.length < 10) {
  fail('asset-bank.json must include a substantial reusable asset bank.');
}

const productionSpec = JSON.parse(readFileSync('output/production-spec.json', 'utf8'));
if (!productionSpec.deck || productionSpec.deck.name !== 'Эксплуатация и ИТ — Годовой отчёт 2025') {
  fail('production-spec.json must contain the current PPTX deck name.');
}
if (!Array.isArray(productionSpec.slides) || productionSpec.slides.length !== raw.slides.length) {
  fail('production-spec.json must contain every current PPTX slide.');
}

const readiness = JSON.parse(readFileSync('output/runtime-readiness-report.json', 'utf8'));
if (!readiness.mcpRunner || readiness.mcpRunner.x5SansAvailable !== false) {
  fail('runtime-readiness-report.json must report MCP as blocked by X5 Sans.');
}
if (!readiness.localPluginRunner || readiness.localPluginRunner.primaryWorkflow !== false) {
  fail('local plugin runner must not be primary.');
}

const qa = JSON.parse(readFileSync('output/qa-report.json', 'utf8'));
if (!Array.isArray(qa.slides) || qa.slides.length !== raw.slides.length) {
  fail('qa-report.json must contain one entry per current slide.');
}

const generatedScript = readFileSync('output/figma-mcp-script.generated.js', 'utf8');
if (!generatedScript.includes("REQUIRED_FONT_FAMILY = 'X5 Sans'")) {
  fail('Generated Figma script must enforce X5 Sans.');
}

const currentTwoSlidesScript = readFileSync('output/figma-current-2slides.generated.js', 'utf8');
for (const token of ['Inter', 'figp_', '_authToken', 'PRIVATE KEY', '??', '?.']) {
  if (currentTwoSlidesScript.includes(token)) {
    fail(`Forbidden token found in two-slide Figma script: ${token}`);
  }
}

const fallbackScript = readFileSync('output/figma-current-2slides-font-fallback.generated.js', 'utf8');
if (!fallbackScript.includes('TEXT_TO_X5 /')) {
  fail('Fallback script must mark all text layers with TEXT_TO_X5.');
}
if (!fallbackScript.includes('CURRENT / VISUAL / 01 / Cover / FONT-FALLBACK')) {
  fail('Fallback script is missing the fallback cover frame.');
}
if (!fallbackScript.includes('CURRENT / VISUAL / 02 / Year In Numbers / FONT-FALLBACK')) {
  fail('Fallback script is missing the fallback year-in-numbers frame.');
}
if (fallbackScript.includes('CURRENT / VISUAL / 03 /')) {
  fail('Fallback script must create only two slides.');
}
for (const token of ['??', '?.']) {
  if (fallbackScript.includes(token)) {
    fail(`Unsupported syntax found in fallback script: ${token}`);
  }
}
if (fallbackScript.includes('remove()') || fallbackScript.includes('figma.currentPage.children =')) {
  fail('Fallback script appears to modify or replace original frames.');
}
if (fallbackScript.includes("25:11279")) {
  fail('Fallback script must not touch the Icons frame.');
}
if (!generatedScript.includes('X5 Sans is required but not available in this Figma environment.')) {
  fail('Generated Figma script must throw the strict X5 Sans blocker.');
}
for (const token of ['Inter', 'figp_', '_authToken', 'PRIVATE KEY', '??', '?.']) {
  if (generatedScript.includes(token)) {
    fail(`Forbidden token found in generated Figma script: ${token}`);
  }
}

const specSerialized = JSON.stringify(
  productionSpec.slides.map((slide) => ({
    content: slide.content,
    elements: slide.elements
  }))
).toLowerCase();
for (const token of ['competitor', 'конкурент', 'old chart data', 'old legend']) {
  if (specSerialized.includes(token)) {
    fail(`production-spec.json contains forbidden inherited content token: ${token}`);
  }
}

if (!ok) {
  process.exit(1);
}

console.log('check-project: OK');
