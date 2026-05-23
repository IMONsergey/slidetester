import { RUNNER_TYPES } from './runner-types.mjs';

export function getPreviewRunnerSpec() {
  return {
    runnerType: RUNNER_TYPES.PREVIEW,
    displayName: 'Screenshot QA preview runner',
    purpose: 'Validate generated-frame screenshots against production-spec expectations.'
  };
}
