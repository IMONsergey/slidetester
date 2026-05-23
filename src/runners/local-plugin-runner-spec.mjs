import { existsSync } from 'node:fs';
import { RUNNER_TYPES } from './runner-types.mjs';

export function getLocalPluginRunnerSpec() {
  return {
    runnerType: RUNNER_TYPES.LOCAL_PLUGIN,
    displayName: 'Local Figma Desktop plugin runner',
    availableAsFallback: existsSync('figma-plugin/manifest.json'),
    primaryWorkflow: false,
    notes: [
      'Local plugin is retained only as a fallback runner.',
      'Fallback is allowed to consume the same production-spec when explicitly requested.'
    ]
  };
}
