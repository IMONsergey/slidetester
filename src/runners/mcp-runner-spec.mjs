import { RUNNER_TYPES } from './runner-types.mjs';

export function getMcpRunnerSpec() {
  return {
    runnerType: RUNNER_TYPES.MCP,
    displayName: 'ChatGPT/Figma MCP runner',
    primaryWorkflow: true,
    canAccessFigma: true,
    canWriteFigma: true,
    requiredFontFamily: 'X5 Sans',
    runtimeStatus: 'blocked-by-font',
    notes: [
      'MCP runner remains the primary intended workflow.',
      'Editable generation is blocked until the MCP runtime can load X5 Sans.'
    ]
  };
}
