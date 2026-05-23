import {
  RUNTIME_READINESS_OUTPUT,
  isDirectExecution,
  writeJson
} from '../pipeline/current-pipeline-shared.mjs';
import { getLocalPluginRunnerSpec } from './local-plugin-runner-spec.mjs';
import { getMcpRunnerSpec } from './mcp-runner-spec.mjs';
import { getPreviewRunnerSpec } from './preview-runner.mjs';

export async function checkRuntimeReadiness(options = {}) {
  const mcpSpec = getMcpRunnerSpec();
  const localSpec = getLocalPluginRunnerSpec();
  const previewSpec = getPreviewRunnerSpec();
  const blockingIssues = [
    'MCP runtime currently cannot load X5 Sans, so final editable Figma generation must remain blocked.',
    'Fallback fonts are forbidden.'
  ];

  const payload = {
    generatedAt: new Date().toISOString(),
    mcpRunner: {
      canAccessFigma: mcpSpec.canAccessFigma,
      canWriteFigma: mcpSpec.canWriteFigma,
      x5SansAvailable: false,
      blockingIssues
    },
    localPluginRunner: {
      availableAsFallback: localSpec.availableAsFallback,
      primaryWorkflow: localSpec.primaryWorkflow
    },
    previewRunner: previewSpec,
    recommendedNextAction: localSpec.availableAsFallback
      ? 'Keep MCP as the primary path, wait for X5 Sans support there, and only use the local plugin as an explicit fallback if editable output is urgently required.'
      : 'Keep building from production-spec and wait for MCP runtime font readiness.',
    canGenerateFinalEditableFigmaNow: false
  };

  await writeJson(options.outputPath || RUNTIME_READINESS_OUTPUT, payload);
  return payload;
}

if (isDirectExecution(import.meta)) {
  checkRuntimeReadiness().then(() => {
    console.log(`Wrote ${RUNTIME_READINESS_OUTPUT}.`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
