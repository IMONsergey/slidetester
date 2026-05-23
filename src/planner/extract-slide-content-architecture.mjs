const ROLE_BLUEPRINTS = {
  cover: {
    communicationGoal: 'Open the annual report with a native X5 executive hero slide.',
    contentArchitecture: 'Hero title, thematic subtitle, department line, speaker line.',
    requiredBlocks: ['hero-title', 'subtitle', 'department-line', 'speaker-line'],
    optionalBlocks: ['brand-mark'],
    preferredLayoutFamilies: ['cover', 'image-led'],
    recommendedProductionMode: 'clean-clone-remove-content-rebuild'
  },
  'numeric-overview': {
    communicationGoal: 'Summarize the operating year with three macro-zones and supporting KPIs.',
    contentArchitecture: 'Three-zone KPI board: volumes, service, costs, plus utility and request footers.',
    requiredBlocks: ['section-title', 'three-zone-kpis', 'utility-metrics', 'request-metrics'],
    optionalBlocks: ['footnote'],
    preferredLayoutFamilies: ['numeric-overview', 'metric-summary', 'dense-analytics'],
    recommendedProductionMode: 'hybrid-source-composition'
  },
  achievements: {
    communicationGoal: 'Show 2025 achievements as a proof of reliable service plus overdelivered efficiency.',
    contentArchitecture: 'Comparison focus/result rail with three conclusion callouts.',
    requiredBlocks: ['section-title', 'comparison-cards', 'conclusion-strip'],
    optionalBlocks: ['context-subtitle'],
    preferredLayoutFamilies: ['achievements', 'metric-summary', 'comparison'],
    recommendedProductionMode: 'hybrid-source-composition'
  },
  'efficiency-result': {
    communicationGoal: 'Explain what generated efficiency through initiatives, automation, and operational drivers.',
    contentArchitecture: 'Two top summary cards plus structured initiative and driver columns.',
    requiredBlocks: ['section-title', 'summary-cards', 'initiative-column', 'driver-column'],
    optionalBlocks: ['project-chip-row'],
    preferredLayoutFamilies: ['process', 'achievements', 'metric-summary'],
    recommendedProductionMode: 'hybrid-source-composition'
  },
  transformation: {
    communicationGoal: 'Frame 2026 as a budget challenge with clear operational methods.',
    contentArchitecture: 'Budget hero callout with challenge statement and a five-point method list.',
    requiredBlocks: ['section-title', 'budget-callout', 'challenge-statement', 'method-list'],
    optionalBlocks: ['speaker-tag'],
    preferredLayoutFamilies: ['section-divider', 'strategy', 'image-led'],
    recommendedProductionMode: 'creative-composition-from-primitives'
  },
  roadmap: {
    communicationGoal: 'Show the 2026 action portfolio and anchor it with Q1 execution results.',
    contentArchitecture: 'Action roadmap grid with right-side performance tracker.',
    requiredBlocks: ['section-title', 'action-portfolio', 'q1-result-card'],
    optionalBlocks: ['capacity-callout'],
    preferredLayoutFamilies: ['roadmap', 'process', 'comparison'],
    recommendedProductionMode: 'hybrid-source-composition'
  },
  'project-of-year': {
    communicationGoal: 'Present the water production project as the flagship operating initiative with a live plan table.',
    contentArchitecture: 'Project summary rail, site capacities, and dense monthly production table.',
    requiredBlocks: ['section-title', 'project-summary', 'capacity-grid', 'production-table'],
    optionalBlocks: ['site-highlight'],
    preferredLayoutFamilies: ['table', 'dense-analytics', 'image-led'],
    recommendedProductionMode: 'hybrid-source-composition'
  },
  strategy: {
    communicationGoal: 'Close on the 2026 strategy principles as a branded pillar statement.',
    contentArchitecture: 'Strategy title, promise line, and seven principle cards or pillars.',
    requiredBlocks: ['section-title', 'promise-line', 'principle-grid'],
    optionalBlocks: ['brand-footer'],
    preferredLayoutFamilies: ['strategy', 'achievements'],
    recommendedProductionMode: 'hybrid-source-composition'
  },
  unknown: {
    communicationGoal: 'Preserve the slide meaning without importing irrelevant source content.',
    contentArchitecture: 'Fallback structured narrative board.',
    requiredBlocks: ['section-title', 'body-content'],
    optionalBlocks: [],
    preferredLayoutFamilies: ['unknown'],
    recommendedProductionMode: 'creative-composition-from-primitives'
  }
};

export function extractSlideContentArchitecture(role) {
  return ROLE_BLUEPRINTS[role] || ROLE_BLUEPRINTS.unknown;
}
