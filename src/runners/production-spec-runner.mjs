import {
  FIGMA_SCRIPT_OUTPUT,
  PRODUCTION_SPEC_OUTPUT,
  RUNTIME_READINESS_OUTPUT,
  isDirectExecution,
  readJson
} from '../pipeline/current-pipeline-shared.mjs';
import { writeFile } from 'node:fs/promises';

function buildScript(productionSpec, readiness) {
  const specLiteral = JSON.stringify(productionSpec, null, 2);
  const readinessLiteral = JSON.stringify(readiness, null, 2);

  return `// Generated from output/production-spec.json
var productionSpec = ${specLiteral};
var runtimeReadiness = ${readinessLiteral};
var REQUIRED_FONT_FAMILY = 'X5 Sans';
var REQUIRED_FONT_ERROR = 'X5 Sans is required but not available in this Figma environment.';

function collectFrames(page) {
  var frames = [];
  for (var i = 0; i < page.children.length; i += 1) {
    if (page.children[i].type === 'FRAME') {
      frames.push(page.children[i]);
    }
  }
  return frames;
}

async function ensureRequiredFonts() {
  var availableFonts = await figma.listAvailableFontsAsync();
  var wantedStyles = ['Light', 'Regular', 'Medium', 'Bold'];
  var availableStyles = {};
  for (var i = 0; i < availableFonts.length; i += 1) {
    var entry = availableFonts[i];
    if (entry.fontName && entry.fontName.family === REQUIRED_FONT_FAMILY) {
      availableStyles[entry.fontName.style] = true;
    }
  }

  for (var styleIndex = 0; styleIndex < wantedStyles.length; styleIndex += 1) {
    var style = wantedStyles[styleIndex];
    if (!availableStyles[style]) {
      throw new Error(REQUIRED_FONT_ERROR);
    }
    await figma.loadFontAsync({ family: REQUIRED_FONT_FAMILY, style: style });
  }
}

function nextColumnX(page) {
  var frames = collectFrames(page);
  var maxRight = 0;
  for (var i = 0; i < frames.length; i += 1) {
    var frame = frames[i];
    var right = frame.x + frame.width;
    if (right > maxRight) {
      maxRight = right;
    }
  }
  return maxRight + 240;
}

function applyTextStyle(node, element) {
  node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Regular' };
  if (element.tokenId === 'typography.hero.title.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Medium' };
    node.fontSize = 120;
    node.lineHeight = { unit: 'PIXELS', value: 100 };
    node.letterSpacing = { unit: 'PERCENT', value: -4 };
  } else if (element.tokenId === 'typography.slide.title.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Medium' };
    node.fontSize = 46;
    node.lineHeight = { unit: 'PIXELS', value: 55 };
    node.letterSpacing = { unit: 'PERCENT', value: -3 };
  } else if (element.tokenId === 'typography.card.title.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Bold' };
    node.fontSize = 32;
    node.lineHeight = { unit: 'PIXELS', value: 40 };
  } else if (element.tokenId === 'typography.cover.speaker.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Regular' };
    node.fontSize = 31;
  } else if (element.tokenId === 'typography.cover.eyebrow.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Light' };
    node.fontSize = 43;
    node.letterSpacing = { unit: 'PERCENT', value: 10 };
  } else if (element.tokenId === 'typography.footnote.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Regular' };
    node.fontSize = 26;
    node.opacity = 0.74;
  } else {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Regular' };
    node.fontSize = 26;
  }

  node.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  if (element.colorTokenId === 'color.text.secondary') {
    node.fills = [{ type: 'SOLID', color: { r: 0.74, g: 0.74, b: 0.74 } }];
  }
  node.textAlignHorizontal = element.align === 'CENTER' ? 'CENTER' : 'LEFT';
}

function createTextElement(frame, element) {
  var node = figma.createText();
  applyTextStyle(node, element);
  node.characters = element.text;
  node.x = element.x;
  node.y = element.y;
  node.resize(element.width, element.height);
  frame.appendChild(node);
}

function createAssetRef(frame, element) {
  var node;
  if (element.assetId.indexOf('glow') !== -1) {
    node = figma.createEllipse();
    node.fills = [{ type: 'SOLID', color: { r: 0.84, g: 0.05, b: 0.05 }, opacity: 0.37 }];
    node.effects = [{ type: 'LAYER_BLUR', radius: 233, visible: true, blendMode: 'NORMAL' }];
  } else {
    node = figma.createRectangle();
    node.fills = [{ type: 'SOLID', color: { r: 0.06, g: 0.06, b: 0.07 } }];
    node.strokes = [{ type: 'SOLID', color: { r: 0.92, g: 0.14, b: 0.09 }, opacity: 0.22 }];
    node.strokeWeight = 1;
    node.cornerRadius = 28;
  }
  node.name = 'ASSET / ' + element.assetId;
  node.x = element.x;
  node.y = element.y;
  node.resize(element.width, element.height);
  node.opacity = typeof element.opacity === 'number' ? element.opacity : 1;
  frame.appendChild(node);
}

function createMetricCard(frame, element) {
  var rect = figma.createRectangle();
  rect.name = 'CARD / ' + element.id;
  rect.x = element.x;
  rect.y = element.y;
  rect.resize(element.width, element.height);
  rect.cornerRadius = 32;
  rect.fills = [{ type: 'SOLID', color: { r: 0.08, g: 0.08, b: 0.09 }, opacity: 0.96 }];
  rect.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.12 }];
  rect.strokeWeight = 1;
  frame.appendChild(rect);

  createTextElement(frame, {
    id: element.id + '-title',
    type: 'text',
    text: element.title,
    tokenId: 'typography.card.title.size',
    x: element.x + 32,
    y: element.y + 28,
    width: element.width - 64,
    height: 44,
    align: 'LEFT',
    colorTokenId: 'color.text.secondary'
  });

  createTextElement(frame, {
    id: element.id + '-value',
    type: 'text',
    text: element.value,
    tokenId: 'typography.slide.title.size',
    x: element.x + 32,
    y: element.y + 88,
    width: element.width - 64,
    height: 80,
    align: 'LEFT',
    colorTokenId: 'color.text.primary'
  });

  if (element.support) {
    createTextElement(frame, {
      id: element.id + '-support',
      type: 'text',
      text: element.support,
      tokenId: 'typography.body.size',
      x: element.x + 32,
      y: element.y + element.height - 72,
      width: element.width - 64,
      height: 44,
      align: 'LEFT',
      colorTokenId: 'color.text.secondary'
    });
  }
}

function createBulletList(frame, element) {
  var rect = figma.createRectangle();
  rect.name = 'LIST / ' + element.id;
  rect.x = element.x;
  rect.y = element.y;
  rect.resize(element.width, element.height);
  rect.cornerRadius = 24;
  rect.fills = [{ type: 'SOLID', color: { r: 0.08, g: 0.08, b: 0.09 }, opacity: 0.75 }];
  rect.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.08 }];
  frame.appendChild(rect);

  createTextElement(frame, {
    id: element.id + '-title',
    type: 'text',
    text: element.title,
    tokenId: 'typography.card.title.size',
    x: element.x + 28,
    y: element.y + 24,
    width: element.width - 56,
    height: 40,
    align: 'LEFT',
    colorTokenId: 'color.text.primary'
  });

  var columns = element.columns || 1;
  var columnWidth = Math.floor((element.width - 56 - (columns - 1) * 24) / columns);
  var itemsPerColumn = Math.ceil(element.items.length / columns);
  for (var i = 0; i < element.items.length; i += 1) {
    var column = Math.floor(i / itemsPerColumn);
    var row = i % itemsPerColumn;
    var prefix = column > 0 ? '• ' : '• ';
    createTextElement(frame, {
      id: element.id + '-item-' + i,
      type: 'text',
      text: prefix + element.items[i],
      tokenId: 'typography.body.size',
      x: element.x + 28 + column * (columnWidth + 24),
      y: element.y + 84 + row * 46,
      width: columnWidth,
      height: 38,
      align: 'LEFT',
      colorTokenId: 'color.text.secondary'
    });
  }
}

function createTable(frame, element) {
  var rect = figma.createRectangle();
  rect.name = 'TABLE / ' + element.id;
  rect.x = element.x;
  rect.y = element.y;
  rect.resize(element.width, element.height);
  rect.cornerRadius = 24;
  rect.fills = [{ type: 'SOLID', color: { r: 0.08, g: 0.08, b: 0.09 }, opacity: 0.88 }];
  rect.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.08 }];
  frame.appendChild(rect);

  createTextElement(frame, {
    id: element.id + '-title',
    type: 'text',
    text: element.title,
    tokenId: 'typography.card.title.size',
    x: element.x + 24,
    y: element.y + 20,
    width: element.width - 48,
    height: 36,
    align: 'LEFT',
    colorTokenId: 'color.text.primary'
  });

  var headers = element.headers || [];
  var rows = element.rows || [];
  var columnCount = headers.length > 0 ? headers.length : (rows[0] ? rows[0].length : 0);
  if (columnCount < 1) {
    return;
  }

  var tableTop = element.y + 74;
  var rowHeight = 54;
  var columnWidth = Math.floor((element.width - 48) / columnCount);
  for (var h = 0; h < headers.length; h += 1) {
    createTextElement(frame, {
      id: element.id + '-header-' + h,
      type: 'text',
      text: headers[h],
      tokenId: 'typography.body.size',
      x: element.x + 24 + h * columnWidth,
      y: tableTop,
      width: columnWidth - 12,
      height: 36,
      align: 'LEFT',
      colorTokenId: 'color.text.primary'
    });
  }

  for (var r = 0; r < rows.length; r += 1) {
    for (var c = 0; c < columnCount; c += 1) {
      createTextElement(frame, {
        id: element.id + '-cell-' + r + '-' + c,
        type: 'text',
        text: rows[r][c] || '',
        tokenId: 'typography.footnote.size',
        x: element.x + 24 + c * columnWidth,
        y: tableTop + rowHeight * (r + 1),
        width: columnWidth - 12,
        height: 34,
        align: 'LEFT',
        colorTokenId: c === 0 ? 'color.text.primary' : 'color.text.secondary'
      });
    }
  }
}

function createPillarGrid(frame, element) {
  var columns = element.columns || 3;
  var gap = 24;
  var cardWidth = Math.floor((element.width - gap * (columns - 1)) / columns);
  var rows = Math.ceil(element.items.length / columns);
  var cardHeight = Math.floor((element.height - gap * (rows - 1)) / rows);

  if (element.title) {
    createTextElement(frame, {
      id: element.id + '-title',
      type: 'text',
      text: element.title,
      tokenId: 'typography.card.title.size',
      x: element.x,
      y: element.y - 48,
      width: element.width,
      height: 40,
      align: 'LEFT',
      colorTokenId: 'color.text.primary'
    });
  }

  for (var i = 0; i < element.items.length; i += 1) {
    var col = i % columns;
    var row = Math.floor(i / columns);
    createMetricCard(frame, {
      id: element.id + '-pillar-' + i,
      title: 'Принцип ' + (i + 1),
      value: element.items[i],
      support: '',
      x: element.x + col * (cardWidth + gap),
      y: element.y + row * (cardHeight + gap),
      width: cardWidth,
      height: cardHeight
    });
  }
}

function renderElement(frame, element) {
  if (element.type === 'text') {
    createTextElement(frame, element);
    return;
  }
  if (element.type === 'asset-ref') {
    createAssetRef(frame, element);
    return;
  }
  if (element.type === 'metric-card') {
    createMetricCard(frame, element);
    return;
  }
  if (element.type === 'bullet-list') {
    createBulletList(frame, element);
    return;
  }
  if (element.type === 'table') {
    createTable(frame, element);
    return;
  }
  if (element.type === 'pillar-grid') {
    createPillarGrid(frame, element);
  }
}

async function main() {
  if (!runtimeReadiness.mcpRunner.x5SansAvailable) {
    throw new Error(REQUIRED_FONT_ERROR);
  }

  await ensureRequiredFonts();
  var page = figma.currentPage;
  var frameX = nextColumnX(page);
  var report = [];

  for (var i = 0; i < productionSpec.slides.length; i += 1) {
    var slideSpec = productionSpec.slides[i];
    var frame = figma.createFrame();
    frame.name = slideSpec.name;
    frame.resize(productionSpec.deck.slideSize.width, productionSpec.deck.slideSize.height);
    frame.x = frameX;
    frame.y = i * (productionSpec.deck.slideSize.height + 140);
    frame.fills = [{ type: 'SOLID', color: { r: 0.05, g: 0.05, b: 0.06 } }];
    page.appendChild(frame);

    for (var elementIndex = 0; elementIndex < slideSpec.elements.length; elementIndex += 1) {
      renderElement(frame, slideSpec.elements[elementIndex]);
    }

    report.push({
      slideName: slideSpec.name,
      elementCount: slideSpec.elements.length,
      productionMode: slideSpec.productionMode
    });
  }

  figma.notify('Current draft frames generated from production-spec.');
  return {
    deckName: productionSpec.deck.name,
    generatedSlides: report,
    runner: 'mcp',
    fontFamily: REQUIRED_FONT_FAMILY
  };
}

main();
`;
}

export async function buildProductionSpecRunner(options = {}) {
  const productionSpec = options.productionSpec || await readJson(PRODUCTION_SPEC_OUTPUT);
  const readiness = options.readiness || await readJson(RUNTIME_READINESS_OUTPUT);
  const script = buildScript(productionSpec, readiness);
  await writeFile(options.outputPath || FIGMA_SCRIPT_OUTPUT, script, 'utf8');
  return {
    outputPath: options.outputPath || FIGMA_SCRIPT_OUTPUT,
    scriptLength: script.length
  };
}

if (isDirectExecution(import.meta)) {
  buildProductionSpecRunner().then((result) => {
    console.log(`Wrote ${result.outputPath}.`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
