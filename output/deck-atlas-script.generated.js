const page = figma.root.children.find((p) => p.id === '0:1' || p.name === 'Page 1');
if (!page) {
  throw new Error('Target page 0:1 / Page 1 not found.');
}

await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = true;

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function maxFont(frame) {
  const values = frame
    .findAllWithCriteria({ types: ['TEXT'] })
    .map((node) => (typeof node.fontSize === 'number' ? node.fontSize : 0))
    .filter((size) => size > 0);
  return values.length ? Math.max(...values) : 0;
}

function meta(frame, texts) {
  const joined = texts.join(' | ').toLowerCase();
  const nodes = frame.findAll((node) => node.visible !== false);
  const rects = nodes.filter((node) => node.type === 'RECTANGLE' || node.type === 'FRAME').length;
  const images = nodes.filter((node) => {
    if (!('fills' in node) || !Array.isArray(node.fills)) return false;
    return node.fills.some((fill) => fill && fill.type === 'IMAGE');
  }).length;

  return {
    joined,
    hasCharts: /динам|lf[l]?|доля|рынк|ebitda|nps|arpu|рто|шт\.|факт|бюджет|202[1-9]|q[1-4]|мат /.test(joined),
    hasCards: rects >= 8 || /приоритет|фокус|цели|результаты/.test(joined),
    hasLargeNumbers: /\+\d|\-\d|\d+[%.,]|тыс\.|млн|трлн/.test(joined),
    hasImages: images > 0,
    hasTimeline: /202[1-9]|эволюц|путь|цикл/.test(joined) && /202[1-9]/.test(joined),
    hasProcessFlow: /алгоритм|путь|цикл|шаг|процесс/.test(joined),
    hasPillars: /01|02|03|04|05/.test(joined) && /направ|фокус|приоритет|эффективными/.test(joined),
    hasComparison: /vs|против|факт|бюджет|2024|2025|2026|рынок/.test(joined),
    hasHeroTitle: maxFont(frame) >= 100 || texts.length <= 4
  };
}

function density(textCount, childCount) {
  if (textCount >= 40 || childCount >= 60) return 'high';
  if (textCount >= 15 || childCount >= 20) return 'medium';
  return 'low';
}

function classify(frame, texts, metrics) {
  const joined = metrics.joined;
  const name = frame.name;

  if (/^1$|4586|4606|24|4607/.test(name)) {
    return {
      slideType: 'cover',
      semanticRole: 'hero-cover',
      contentArchitecture: 'hero title over full-bleed image',
      visualStructure: 'full-bleed photo cover with centered or left title',
      reusableAsBase: true,
      reusableAssets: ['background', 'image masks', 'glows', 'title block', 'typography'],
      dangerousToKeep: ['old speaker names', 'old cover title'],
      suitableForDraftRoles: ['cover', 'section-divider'],
      notes: 'Strong cover family; safest for direct-clone cover work.'
    };
  }

  if (/амбиции 2028/.test(joined) || frame.id === '25:7044') {
    return {
      slideType: 'metrics-summary',
      semanticRole: 'kpi-summary',
      contentArchitecture: 'three large independent KPI cards',
      visualStructure: 'three floating metric cards on open dark stage',
      reusableAsBase: true,
      reusableAssets: ['background', 'cards', 'glows', 'title block', 'metric style'],
      dangerousToKeep: ['old metric values', 'old card labels', 'old source note', 'decorative arrow if semantically irrelevant'],
      suitableForDraftRoles: ['business-effect', 'metrics-summary'],
      notes: 'Best native family for clean-clone metric summary rebuilds.'
    };
  }

  if (/цели 2026/.test(joined) || frame.id === '25:8018') {
    return {
      slideType: 'goals-matrix',
      semanticRole: 'goals-and-targets',
      contentArchitecture: 'hero image plus two-column target matrix',
      visualStructure: 'photo-led frame with stacked KPI cells on right',
      reusableAsBase: true,
      reusableAssets: ['background', 'cards', 'image masks', 'glows', 'metric style'],
      dangerousToKeep: ['old goal table', 'old budget figures', 'old product photo'],
      suitableForDraftRoles: ['business-effect', 'metrics-summary'],
      notes: 'Useful secondary reference for KPI styling, but photo semantics are strong.'
    };
  }

  if (/не достигли части поставленных целей/.test(joined) || frame.id === '25:7544') {
    return {
      slideType: 'performance-review',
      semanticRole: 'results-vs-plan',
      contentArchitecture: 'table summary plus thematic issue cards',
      visualStructure: 'left matrix with right stacked insight cards',
      reusableAsBase: true,
      reusableAssets: ['background', 'cards', 'title block', 'glows'],
      dangerousToKeep: ['old budget table', 'old issue labels', 'old source note'],
      suitableForDraftRoles: ['business-effect', 'problem'],
      notes: 'Good structural backup when multi-card narrative is needed.'
    };
  }

  if (/сохранили лидерство на рынке и приросли по доле больше других/.test(joined) || frame.id === '25:7247') {
    return {
      slideType: 'market-share-analytics',
      semanticRole: 'market-comparison',
      contentArchitecture: 'dual chart comparison with legends and time series',
      visualStructure: 'left multi-line chart plus right spotlight chart',
      reusableAsBase: false,
      reusableAssets: ['background', 'title block', 'glows', 'chart style'],
      dangerousToKeep: ['old chart data', 'old legend', 'old market labels', 'old years', 'old source notes'],
      suitableForDraftRoles: [],
      notes: 'Reject as direct clone for business effect: wrong semantic architecture.'
    };
  }

  if (/факторы влияния|дополнительный потенциал/.test(joined) || frame.id === '25:9782') {
    return {
      slideType: 'improvement-potential',
      semanticRole: 'factor-waterfall',
      contentArchitecture: 'factor list plus cumulative impact bars',
      visualStructure: 'left factor stack with right waterfall/progression',
      reusableAsBase: false,
      reusableAssets: ['background', 'title block', 'glows', 'chart style'],
      dangerousToKeep: ['old factor labels', 'old impact bars', 'old cumulative numbers'],
      suitableForDraftRoles: ['problem'],
      notes: 'Too causal/process-oriented for simple KPI summary.'
    };
  }

  if (/5 ключевых направлен|фокусируемся/.test(joined) || frame.id === '25:9043' || frame.id === '25:8560') {
    return {
      slideType: 'focus-pillars',
      semanticRole: 'priorities',
      contentArchitecture: '3-5 focus cards over hero visual',
      visualStructure: 'photo-led slide with bottom card rail',
      reusableAsBase: true,
      reusableAssets: ['background', 'cards', 'image masks', 'glows', 'title block'],
      dangerousToKeep: ['old focus labels', 'old people photo if semantically conflicting'],
      suitableForDraftRoles: ['problem', 'target-state', 'three-pillars'],
      notes: 'Strong card family, but not a pure metrics summary.'
    };
  }

  if (/делает нас эффективными|кодекс лидера|сфера/.test(joined) || frame.id === '25:10717') {
    return {
      slideType: 'three-pillars',
      semanticRole: 'three-pillars',
      contentArchitecture: 'three strategic pillars with short descriptors',
      visualStructure: 'three-column pillar statement with supporting imagery',
      reusableAsBase: true,
      reusableAssets: ['background', 'cards', 'icons', 'glows', 'title block'],
      dangerousToKeep: ['old pillar names', 'old imagery'],
      suitableForDraftRoles: ['target-state', 'three-pillars'],
      notes: 'Good semantic match for target-state style slides.'
    };
  }

  if (/в сфере мы сопровождаем весь путь сотрудника|полный цикл/.test(joined) || frame.id === '25:10876') {
    return {
      slideType: 'operating-model',
      semanticRole: 'end-to-end-process',
      contentArchitecture: 'process map across employee lifecycle',
      visualStructure: 'dense horizontal operating-system map',
      reusableAsBase: true,
      reusableAssets: ['background', 'cards', 'icons', 'title block'],
      dangerousToKeep: ['old lifecycle nodes', 'old process labels'],
      suitableForDraftRoles: ['solution-engine', 'operating-model'],
      notes: 'Use for operating-model or journey-based slides.'
    };
  }

  if (/архитектура партнерства|изменение роли hr|ии-агенты/.test(joined) || frame.id === '25:10434' || frame.id === '25:10479') {
    return {
      slideType: 'architecture-breakdown',
      semanticRole: 'system-breakdown',
      contentArchitecture: 'numbered concept blocks with explanations',
      visualStructure: 'multi-zone architecture board',
      reusableAsBase: true,
      reusableAssets: ['background', 'cards', 'title block', 'glows'],
      dangerousToKeep: ['old concept labels', 'old explanatory paragraphs'],
      suitableForDraftRoles: ['solution-engine', 'operating-model'],
      notes: 'Solid family for solution architecture slides.'
    };
  }

  if (/новый виток эволюции|2026/.test(joined) || frame.id === '25:10664' || frame.id === '25:11061') {
    return {
      slideType: 'roadmap-evolution',
      semanticRole: 'roadmap',
      contentArchitecture: 'evolution path across maturity stages',
      visualStructure: 'left-to-right stage comparison',
      reusableAsBase: true,
      reusableAssets: ['background', 'cards', 'title block', 'glows'],
      dangerousToKeep: ['old stage labels', 'old maturity copy'],
      suitableForDraftRoles: ['roadmap', 'operating-model'],
      notes: 'Best current family for roadmap or staged transformation.'
    };
  }

  if (/итоги|планы/.test(joined)) {
    return {
      slideType: 'section-divider',
      semanticRole: 'section-divider',
      contentArchitecture: 'oversized chapter marker',
      visualStructure: 'minimal dark divider with huge numerals',
      reusableAsBase: true,
      reusableAssets: ['background', 'glows', 'title block'],
      dangerousToKeep: ['old section labels'],
      suitableForDraftRoles: ['section-divider'],
      notes: 'Divider-only use.'
    };
  }

  if (metrics.hasHeroTitle && texts.length <= 2 && metrics.hasImages) {
    return {
      slideType: 'statement-slide',
      semanticRole: 'section-divider',
      contentArchitecture: 'big statement over abstract image',
      visualStructure: 'single-message composition',
      reusableAsBase: true,
      reusableAssets: ['background', 'image masks', 'glows', 'title block'],
      dangerousToKeep: ['old statement text'],
      suitableForDraftRoles: ['section-divider'],
      notes: 'Statement slide family.'
    };
  }

  if (metrics.hasPillars) {
    return {
      slideType: 'pillar-slide',
      semanticRole: 'priorities',
      contentArchitecture: 'multi-pillar card layout',
      visualStructure: 'cards or lanes with numbered priorities',
      reusableAsBase: true,
      reusableAssets: ['background', 'cards', 'title block'],
      dangerousToKeep: ['old priority labels'],
      suitableForDraftRoles: ['problem', 'target-state', 'three-pillars'],
      notes: 'General pillar family.'
    };
  }

  if (metrics.hasCharts && metrics.hasLargeNumbers) {
    return {
      slideType: 'analytics-slide',
      semanticRole: 'analytics',
      contentArchitecture: 'chart-led analytical summary',
      visualStructure: 'dark executive chart composition',
      reusableAsBase: false,
      reusableAssets: ['background', 'chart style', 'title block'],
      dangerousToKeep: ['old chart data', 'old labels', 'old footnotes'],
      suitableForDraftRoles: ['metrics-summary'],
      notes: 'Needs heavy cleanup before reuse.'
    };
  }

  return {
    slideType: 'narrative-slide',
    semanticRole: 'narrative',
    contentArchitecture: 'mixed narrative board',
    visualStructure: 'dark deck narrative composition',
    reusableAsBase: false,
    reusableAssets: ['background', 'glows', 'title block'],
    dangerousToKeep: ['old narrative copy'],
    suitableForDraftRoles: [],
    notes: 'Requires slide-specific screenshot review.'
  };
}

const atlas = figma.currentPage.children
  .filter((node) => node.type === 'FRAME' && node.name !== 'Icons' && !/^PILOT/i.test(node.name))
  .map((frame) => {
    const texts = frame
      .findAllWithCriteria({ types: ['TEXT'] })
      .map((node) => cleanText(node.characters))
      .filter(Boolean)
      .slice(0, 8);
    const allTextCount = frame.findAllWithCriteria({ types: ['TEXT'] }).length;
    const metrics = meta(frame, texts);
    const cls = classify(frame, texts, metrics);

    return {
      frameId: frame.id,
      frameName: frame.name,
      screenshotNeeded: true,
      slideType: cls.slideType,
      semanticRole: cls.semanticRole,
      contentArchitecture: cls.contentArchitecture,
      visualStructure: cls.visualStructure,
      densityLevel: density(allTextCount, frame.children.length),
      hasCharts: metrics.hasCharts,
      hasCards: metrics.hasCards,
      hasLargeNumbers: metrics.hasLargeNumbers,
      hasImages: metrics.hasImages,
      hasTimeline: metrics.hasTimeline,
      hasProcessFlow: metrics.hasProcessFlow,
      hasPillars: metrics.hasPillars,
      hasComparison: metrics.hasComparison,
      hasHeroTitle: metrics.hasHeroTitle,
      reusableAsBase: cls.reusableAsBase,
      reusableAssets: cls.reusableAssets,
      dangerousToKeep: cls.dangerousToKeep,
      suitableForDraftRoles: cls.suitableForDraftRoles,
      notes: cls.notes
    };
  });

return {
  generatedAt: new Date().toISOString(),
  fileKey: '735drrzVTmf4AhQJwQe6vX',
  page: { id: figma.currentPage.id, name: figma.currentPage.name },
  frameCount: atlas.length,
  frames: atlas
};
