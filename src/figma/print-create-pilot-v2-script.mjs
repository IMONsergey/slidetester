import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const GEOMETRY_INPUT = 'output/source-frame-geometry.json';
const OUTPUT_SCRIPT = 'output/figma-create-pilot-v2.generated.js';
const OUTPUT_REFERENCE_MAP = 'output/pilot-v2-reference-map.json';

function loadGeometryMap(payload) {
  return new Map((payload.frames ?? []).filter((frame) => frame?.status !== 'missing').map((frame) => [frame.id, frame]));
}

function getFrameOrThrow(map, id) {
  const frame = map.get(id);
  if (!frame) {
    throw new Error(`Missing source frame geometry for ${id}`);
  }
  return frame;
}

function topBy(array, selector) {
  return [...array].sort((left, right) => selector(right) - selector(left))[0] ?? null;
}

function findCoverRoles(frame) {
  const textNodes = frame.textNodes ?? [];
  const heroTitle = topBy(
    textNodes.filter((node) => node.inferredRole === 'heroTitle' || (node.fontSize ?? 0) >= 80),
    (node) => node.fontSize ?? 0
  );
  const eyebrow = topBy(
    textNodes.filter((node) => node.y <= frame.height * 0.25),
    (node) => -(node.y ?? 0)
  );
  const footer = topBy(
    textNodes.filter((node) => node.y >= frame.height * 0.6),
    (node) => node.y ?? 0
  );

  return {
    heroTitle,
    eyebrow,
    footer
  };
}

function isNumericCandidate(text) {
  return /^[+\-−]?\d[\d\s.,–-]*%?$/.test((text ?? '').trim());
}

function findMetricRoles(frame) {
  const textNodes = frame.textNodes ?? [];
  const slideTitle = topBy(
    textNodes.filter((node) => (node.fontSize ?? 0) >= 34 && (node.y ?? 0) <= 140),
    (node) => node.fontSize ?? 0
  );
  const panelTitles = [...textNodes]
    .filter((node) => (node.fontSize ?? 0) >= 28 && (node.fontSize ?? 0) <= 38 && (node.y ?? 0) <= 220)
    .sort((left, right) => (left.x ?? 0) - (right.x ?? 0));
  const numericValues = [...textNodes]
    .filter((node) => isNumericCandidate(node.characters) && (node.fontSize ?? 0) >= 24)
    .sort((left, right) => {
      if ((right.fontSize ?? 0) !== (left.fontSize ?? 0)) {
        return (right.fontSize ?? 0) - (left.fontSize ?? 0);
      }
      return (left.y ?? 0) - (right.y ?? 0);
    });

  const distinctValues = [];
  for (const candidate of numericValues) {
    const tooClose = distinctValues.some((chosen) =>
      Math.abs((chosen.x ?? 0) - (candidate.x ?? 0)) < 110 &&
      Math.abs((chosen.y ?? 0) - (candidate.y ?? 0)) < 44
    );
    if (!tooClose) {
      distinctValues.push(candidate);
    }
    if (distinctValues.length === 3) break;
  }

  const footnote = [...textNodes]
    .filter((node) => (node.y ?? 0) >= frame.height * 0.82 || (node.opacity ?? 1) < 0.9)
    .sort((left, right) => (right.y ?? 0) - (left.y ?? 0))[0] ?? null;

  return {
    slideTitle,
    panelTitles: panelTitles.slice(0, 2),
    numericValues: distinctValues,
    footnote
  };
}

function buildPilotReferenceMap(coverFrame, metricsFrame, coverRoles, metricRoles) {
  return {
    generatedAt: new Date().toISOString(),
    pilotSlides: [
      {
        targetFrameName: 'PILOT V2 / 01 / Task Manager / Cover',
        sourceFrameId: coverFrame.id,
        sourceFrameName: coverFrame.name,
        productionMode: 'duplicate-source-frame-and-replace-text',
        requiredFont: 'X5 Sans',
        assetsReused: [
          'background',
          'glow',
          'typography',
          'layout',
          'visual motifs'
        ],
        textNodesReplaced: [
          coverRoles.heroTitle && { role: 'heroTitle', sourceNodeId: coverRoles.heroTitle.id },
          coverRoles.eyebrow && { role: 'eyebrow', sourceNodeId: coverRoles.eyebrow.id },
          coverRoles.footer && { role: 'footer', sourceNodeId: coverRoles.footer.id }
        ].filter(Boolean),
        textNodesLeftUntouched: [
          {
            reason: 'No safe native subtitle slot found in the source cover frame without changing source composition.',
            role: 'subtitle'
          }
        ],
        imageNodesReused: (coverFrame.imageNodes ?? []).map((node) => ({ id: node.id, name: node.name, path: node.path })),
        imageNodesReplaced: [],
        geometryPolicy: 'preserve source frame geometry',
        stylePolicy: 'preserve X5 Sans typography exactly',
        originalFrameModified: false,
        status: 'ready_for_generation'
      },
      {
        targetFrameName: 'PILOT V2 / 05 / Task Manager / Business Effect',
        sourceFrameId: metricsFrame.id,
        sourceFrameName: metricsFrame.name,
        productionMode: 'duplicate-source-frame-and-replace-text-and-panel-content',
        requiredFont: 'X5 Sans',
        assetsReused: [
          'background',
          'chart panels',
          'card geometry',
          'typography',
          'glows',
          'footnote structure'
        ],
        textNodesReplaced: [
          metricRoles.slideTitle && { role: 'slideTitle', sourceNodeId: metricRoles.slideTitle.id },
          ...metricRoles.panelTitles.map((node, index) => ({ role: `panelTitle${index + 1}`, sourceNodeId: node.id })),
          ...metricRoles.numericValues.map((node, index) => ({ role: `metricValue${index + 1}`, sourceNodeId: node.id })),
          metricRoles.footnote && { role: 'footnote', sourceNodeId: metricRoles.footnote.id }
        ].filter(Boolean),
        textNodesLeftUntouched: [
          {
            reason: 'Dense chart labels remain untouched unless they can be mapped safely during screenshot review.',
            role: 'chartLabel'
          }
        ],
        imageNodesReused: (metricsFrame.imageNodes ?? []).map((node) => ({ id: node.id, name: node.name, path: node.path })),
        imageNodesReplaced: [],
        geometryPolicy: 'preserve source frame geometry; adapt only inside existing content zones',
        stylePolicy: 'preserve X5 Sans typography exactly',
        originalFrameModified: false,
        status: 'ready_for_generation'
      }
    ]
  };
}

function buildGeneratedScript(referenceMap) {
  return `// Generated by src/figma/print-create-pilot-v2-script.mjs
// Run this file through ChatGPT/Figma MCP use_figma.
const referenceMap = ${JSON.stringify(referenceMap, null, 2)};

const TARGET_PAGE_ID = '0:1';
const SOURCE_FILE_KEY = '735drrzVTmf4AhQJwQe6vX';
const NEW_FRAME_GAP_X = 600;
const NEW_FRAME_GAP_Y = 180;
const X5_REQUIRED_ERROR = 'X5 Sans is required but not available.';
const createdFrameIds = [];
const createdFrameReports = [];

const page = figma.root.children.find((p) => p.id === TARGET_PAGE_ID || p.name === 'Page 1');
if (!page) {
  throw new Error('Target page 0:1 / Page 1 not found.');
}

await figma.setCurrentPageAsync(page);

const availableFonts = await figma.listAvailableFontsAsync();
const x5Fonts = availableFonts.filter((entry) => entry.fontName.family === 'X5 Sans');
if (x5Fonts.length === 0) {
  throw new Error(X5_REQUIRED_ERROR);
}

const loadedFonts = new Set();

async function ensureFont(fontName) {
  if (!fontName || typeof fontName !== 'object' || fontName.family !== 'X5 Sans') {
    throw new Error(X5_REQUIRED_ERROR);
  }
  const key = \`\${fontName.family}__\${fontName.style}\`;
  if (!loadedFonts.has(key)) {
    await figma.loadFontAsync(fontName);
    loadedFonts.add(key);
  }
}

function getRightmostEdge(nodes) {
  return nodes.reduce((max, node) => Math.max(max, node.x + node.width), 0);
}

function preserveTextBox(node, geometry) {
  if (typeof geometry.width === 'number' && typeof geometry.height === 'number') {
    node.resize(geometry.width, geometry.height);
  }
  node.x = geometry.x;
  node.y = geometry.y;
}

function collectTextNodes(root, bucket = []) {
  if (root.type === 'TEXT') {
    bucket.push(root);
  }
  if ('children' in root && Array.isArray(root.children)) {
    root.children.forEach((child) => collectTextNodes(child, bucket));
  }
  return bucket;
}

function findTextNodeBySignature(frame, replacement) {
  const sourceText = replacement.sourceText.replace(/\\s+/g, ' ').trim();
  const textNodes = collectTextNodes(frame);

  const exactTextMatches = textNodes.filter((node) =>
    (node.characters || '').replace(/\\s+/g, ' ').trim() === sourceText
  );

  const candidates = exactTextMatches.length > 0 ? exactTextMatches : textNodes;

  const scored = candidates.map((node) => {
    const distance =
      Math.abs((node.x ?? 0) - replacement.geometry.x) +
      Math.abs((node.y ?? 0) - replacement.geometry.y) +
      Math.abs((node.width ?? 0) - replacement.geometry.width) +
      Math.abs((node.height ?? 0) - replacement.geometry.height);

    const fontPenalty = typeof node.fontSize === 'number'
      ? Math.abs(node.fontSize - (replacement.fontSize ?? node.fontSize))
      : 50;

    return {
      node,
      score: distance + fontPenalty * 10
    };
  }).sort((left, right) => left.score - right.score);

  return scored[0]?.node ?? null;
}

async function replaceTextNode(frame, replacement, report) {
  const node = findTextNodeBySignature(frame, replacement);
  if (!node || node.type !== 'TEXT') {
    report.warnings.push(\`Missing text node for role \${replacement.role} by source signature \${replacement.sourceNodeId}\`);
    return;
  }
  if (node.fontName === figma.mixed || node.fontName.family !== 'X5 Sans') {
    throw new Error(X5_REQUIRED_ERROR);
  }
  await ensureFont(node.fontName);
  const originalText = node.characters;
  preserveTextBox(node, replacement.geometry);
  node.characters = replacement.newText;
  report.textReplacements.push({
    nodeId: node.id,
    role: replacement.role,
    sourceText: originalText,
    newText: replacement.newText,
    fontName: node.fontName,
    fontSize: node.fontSize,
    lineHeight: node.lineHeight,
    letterSpacing: node.letterSpacing,
    preservedTypography: true
  });
}

function duplicateSourceFrame(sourceFrameId, newName, x, y) {
  const source = figma.currentPage.findOne((node) => node.id === sourceFrameId);
  if (!source || source.type !== 'FRAME') {
    throw new Error(\`Source frame not found: \${sourceFrameId}\`);
  }
  const duplicate = source.clone();
  duplicate.name = newName;
  duplicate.x = x;
  duplicate.y = y;
  figma.currentPage.appendChild(duplicate);
  createdFrameIds.push(duplicate.id);
  return { source, duplicate };
}

const topLevelNodes = figma.currentPage.children.filter((node) => node.id !== '25:11279');
const rightmost = getRightmostEdge(topLevelNodes);
const targetColumnX = rightmost + NEW_FRAME_GAP_X;

for (let index = 0; index < referenceMap.pilotSlides.length; index += 1) {
  const slide = referenceMap.pilotSlides[index];
  const y = 119 + index * (1080 + NEW_FRAME_GAP_Y);
  const { source, duplicate } = duplicateSourceFrame(slide.sourceFrameId, slide.targetFrameName, targetColumnX, y);
  const report = {
    createdFrameId: duplicate.id,
    createdFrameName: duplicate.name,
    sourceFrameId: source.id,
    sourceFrameName: source.name,
    productionMode: slide.productionMode,
    x: duplicate.x,
    y: duplicate.y,
    textReplacements: [],
    unmatchedTextNodes: [...slide.textNodesLeftUntouched],
    imageNodesReused: [...slide.imageNodesReused],
    imageNodesReplaced: [],
    warnings: []
  };

  for (const replacement of slide.replacements) {
    await replaceTextNode(duplicate, replacement, report);
  }

  createdFrameReports.push(report);
}

return {
  createdFrames: createdFrameReports,
  x5SansAvailable: true,
  originalFramesModified: false,
  iconsFrameModified: false,
  createdFrameIds,
  sourceFileKey: SOURCE_FILE_KEY
};`;
}

function enrichReferenceMap(referenceMap, coverFrame, metricsFrame) {
  const coverNodeById = new Map((coverFrame.textNodes ?? []).map((node) => [node.id, node]));
  const metricNodeById = new Map((metricsFrame.textNodes ?? []).map((node) => [node.id, node]));

  const coverSlide = referenceMap.pilotSlides[0];
  const metricSlide = referenceMap.pilotSlides[1];

  coverSlide.replacements = coverSlide.textNodesReplaced.map((entry) => {
    const node = coverNodeById.get(entry.sourceNodeId);
    const contentByRole = {
      heroTitle: 'Таск-менеджер\\nсотрудника магазина',
      eyebrow: 'ПЯТЁРОЧКА / ОПЕРАЦИОННАЯ ЭФФЕКТИВНОСТЬ',
      footer: 'Максим Вареник'
    };
    return {
      role: entry.role,
      sourceNodeId: entry.sourceNodeId,
      geometry: {
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height
      },
      sourceText: node.characters,
      fontSize: node.fontSize,
      newText: contentByRole[entry.role]
    };
  });

  const metricReplacements = [];
  const metricValues = ['+10–15%', '-10%', '-0.4%'];
  const panelTitles = ['Производительность труда', 'ФОТ магазина от расходов'];
  const footnote = 'Решение должно дать измеримый эффект на производительность и ФОТ.';

  for (const entry of metricSlide.textNodesReplaced) {
    const node = metricNodeById.get(entry.sourceNodeId);
    if (!node) continue;
    let newText = node.characters;
    if (entry.role === 'slideTitle') newText = 'Предполагаемый эффект';
    if (entry.role === 'panelTitle1') newText = panelTitles[0];
    if (entry.role === 'panelTitle2') newText = panelTitles[1];
    if (entry.role.startsWith('metricValue')) {
      const index = Number(entry.role.replace('metricValue', '')) - 1;
      newText = metricValues[index] ?? node.characters;
    }
    if (entry.role === 'footnote') newText = footnote;

    metricReplacements.push({
      role: entry.role,
      sourceNodeId: entry.sourceNodeId,
      geometry: {
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height
      },
      sourceText: node.characters,
      fontSize: node.fontSize,
      newText
    });
  }

  metricSlide.replacements = metricReplacements;
  metricSlide.warnings = [
    'Dense chart labels remain largely untouched until screenshot review confirms safe semantic remapping.',
    'Metric labels and notes may still require manual designer copy adaptation inside preserved source panels.'
  ];

  coverSlide.warnings = [
    'No safe native subtitle slot was identified in the source cover frame; subtitle is intentionally not injected in v2 first pass.'
  ];

  return referenceMap;
}

async function main() {
  await mkdir('output', { recursive: true });

  if (!existsSync(GEOMETRY_INPUT)) {
    throw new Error(`Missing ${GEOMETRY_INPUT}. Run output/source-frame-geometry-script.generated.js through ChatGPT/Figma MCP use_figma first.`);
  }

  const geometryPayload = JSON.parse(await readFile(GEOMETRY_INPUT, 'utf8'));
  const geometryMap = loadGeometryMap(geometryPayload);

  const coverFrame = getFrameOrThrow(geometryMap, '25:6981');
  const metricsFrame = getFrameOrThrow(geometryMap, '25:7247');
  const coverRoles = findCoverRoles(coverFrame);
  const metricRoles = findMetricRoles(metricsFrame);

  const referenceMap = enrichReferenceMap(
    buildPilotReferenceMap(coverFrame, metricsFrame, coverRoles, metricRoles),
    coverFrame,
    metricsFrame
  );

  await writeFile(OUTPUT_REFERENCE_MAP, `${JSON.stringify(referenceMap, null, 2)}\n`, 'utf8');
  await writeFile(OUTPUT_SCRIPT, `${buildGeneratedScript(referenceMap)}\n`, 'utf8');

  console.log(`Wrote ${OUTPUT_REFERENCE_MAP}.`);
  console.log(`Wrote ${OUTPUT_SCRIPT}. Run it through ChatGPT/Figma MCP use_figma.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
