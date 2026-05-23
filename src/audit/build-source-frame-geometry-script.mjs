import { mkdir, writeFile } from 'node:fs/promises';

const OUTPUT = 'output/source-frame-geometry-script.generated.js';

function buildScript() {
  return String.raw`const REQUIRED_FRAME_IDS = ['25:6981', '25:7247'];
const OPTIONAL_FRAME_IDS = [];
const FRAME_IDS = [...REQUIRED_FRAME_IDS, ...OPTIONAL_FRAME_IDS];

const page = figma.root.children.find((p) => p.id === '0:1' || p.name === 'Page 1');
if (!page) {
  throw new Error('Target page 0:1 / Page 1 not found.');
}

await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = true;

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function round(value) {
  return isFiniteNumber(value) ? Math.round(value * 100) / 100 : null;
}

function serializePaints(paints) {
  if (!Array.isArray(paints)) return [];
  return paints.slice(0, 6).map((paint) => {
    const base = {
      type: paint.type,
      visible: paint.visible !== false,
      opacity: round(paint.opacity ?? 1)
    };

    if (paint.type === 'SOLID') {
      base.color = paint.color
        ? {
            r: round(paint.color.r),
            g: round(paint.color.g),
            b: round(paint.color.b)
          }
        : null;
    }

    if (paint.type === 'IMAGE') {
      base.scaleMode = paint.scaleMode ?? null;
      base.imageHash = paint.imageHash ?? null;
    }

    if (paint.type === 'GRADIENT_LINEAR' || paint.type === 'GRADIENT_RADIAL' || paint.type === 'GRADIENT_ANGULAR' || paint.type === 'GRADIENT_DIAMOND') {
      base.gradientStops = (paint.gradientStops ?? []).slice(0, 4).map((stop) => ({
        position: round(stop.position),
        color: stop.color
          ? {
              r: round(stop.color.r),
              g: round(stop.color.g),
              b: round(stop.color.b),
              a: round(stop.color.a)
            }
          : null
      }));
    }

    return base;
  });
}

function serializeEffects(effects) {
  if (!Array.isArray(effects)) return [];
  return effects.slice(0, 6).map((effect) => ({
    type: effect.type,
    visible: effect.visible !== false,
    radius: round(effect.radius ?? null),
    spread: round(effect.spread ?? null),
    blendMode: effect.blendMode ?? null,
    offset: effect.offset
      ? {
          x: round(effect.offset.x),
          y: round(effect.offset.y)
        }
      : null,
    color: effect.color
      ? {
          r: round(effect.color.r),
          g: round(effect.color.g),
          b: round(effect.color.b),
          a: round(effect.color.a)
        }
      : null
  }));
}

function serializeLineHeight(lineHeight) {
  if (!lineHeight || typeof lineHeight !== 'object') return null;
  return {
    unit: lineHeight.unit ?? null,
    value: round(lineHeight.value ?? null)
  };
}

function serializeLetterSpacing(letterSpacing) {
  if (!letterSpacing || typeof letterSpacing !== 'object') return null;
  return {
    unit: letterSpacing.unit ?? null,
    value: round(letterSpacing.value ?? null)
  };
}

function getAbsoluteXY(node) {
  return {
    x: round(node.absoluteTransform?.[0]?.[2] ?? node.x ?? 0),
    y: round(node.absoluteTransform?.[1]?.[2] ?? node.y ?? 0)
  };
}

function getRelativeXY(node, frameAbsolute) {
  const absolute = getAbsoluteXY(node);
  return {
    x: round(absolute.x - frameAbsolute.x),
    y: round(absolute.y - frameAbsolute.y)
  };
}

function getCornerRadius(node) {
  if ('cornerRadius' in node && isFiniteNumber(node.cornerRadius)) {
    return round(node.cornerRadius);
  }
  if ('topLeftRadius' in node) {
    return {
      topLeftRadius: round(node.topLeftRadius),
      topRightRadius: round(node.topRightRadius),
      bottomLeftRadius: round(node.bottomLeftRadius),
      bottomRightRadius: round(node.bottomRightRadius)
    };
  }
  return null;
}

function inferTextRole(node, frameHeight, relative) {
  const text = (node.characters || '').trim();
  const fontSize = typeof node.fontSize === 'number' ? node.fontSize : 0;
  const normalized = text.replace(/\s+/g, ' ');
  const isNumericish = /^[+\-−]?\d[\d\s.,–-]*%?$/.test(normalized);
  const isUpper = normalized && normalized === normalized.toUpperCase() && normalized.length < 80;
  const isBottom = relative.y > frameHeight * 0.78;
  const isTop = relative.y < frameHeight * 0.2;

  if (fontSize >= 90) return 'heroTitle';
  if (isTop && isUpper) return 'eyebrow';
  if (isBottom && fontSize <= 34) return 'footer';
  if (isTop && fontSize >= 38) return 'slideTitle';
  if (fontSize >= 30 && !isNumericish) return 'sectionTitle';
  if (fontSize >= 24 && !isNumericish) return 'cardTitle';
  if (isNumericish && fontSize >= 24) return 'metricValue';
  if (node.opacity < 0.8 || (relative.y > frameHeight * 0.85 && fontSize <= 22)) return 'footnote';
  if (!isNumericish && fontSize <= 24 && fontSize >= 16) return 'cardBody';
  if (isNumericish) return 'chartLabel';
  return 'unknown';
}

function inferShapeRole(node, frameWidth, frameHeight, relative, paints, effects) {
  const width = node.width ?? 0;
  const height = node.height ?? 0;
  const hasImage = paints.some((paint) => paint.type === 'IMAGE');
  const hasGradient = paints.some((paint) => String(paint.type || '').startsWith('GRADIENT'));
  const hasBlur = effects.some((effect) => effect.type === 'LAYER_BLUR' || effect.type === 'BACKGROUND_BLUR');

  if (hasImage) return 'imageContainer';
  if (width >= frameWidth * 0.9 && height >= frameHeight * 0.9) return 'background';
  if (hasGradient || hasBlur) return 'glow';
  if ((width <= 6 && height >= 80) || (height <= 6 && width >= 80)) return 'accentLine';
  if (width >= frameWidth * 0.18 && height >= frameHeight * 0.14) return node.type === 'FRAME' ? 'chartPanel' : 'card';
  if (width <= 120 && height <= 120) return 'icon';
  if ((width <= 8 && height >= 30) || (height <= 8 && width >= 30)) return 'divider';
  return 'unknown';
}

function hasImageFill(node) {
  if (!('fills' in node) || !Array.isArray(node.fills)) return false;
  return node.fills.some((paint) => paint.type === 'IMAGE');
}

function buildNodePath(path) {
  return path.join('/');
}

function shouldCollectVisibleNode(serialized, depth) {
  if (depth <= 1) return true;
  if (serialized.inferredRole !== 'unknown') return true;
  if (serialized.type === 'FRAME' && serialized.childCount > 0) return true;
  return false;
}

function walk(node, context, path, collectors, parentInfo, depth) {
  if (node.visible === false) return;

  const relative = getRelativeXY(node, context.frameAbsolute);
  const paints = 'fills' in node ? serializePaints(node.fills) : [];
  const strokes = 'strokes' in node ? serializePaints(node.strokes) : [];
  const effects = 'effects' in node ? serializeEffects(node.effects) : [];
  const childCount = 'children' in node && Array.isArray(node.children) ? node.children.length : 0;
  const pathString = buildNodePath(path);

  if (node.type === 'TEXT') {
    collectors.textNodes.push({
      id: node.id,
      path: pathString,
      name: node.name,
      characters: node.characters,
      x: relative.x,
      y: relative.y,
      width: round(node.width),
      height: round(node.height),
      fontName: node.fontName === figma.mixed ? 'mixed' : node.fontName,
      fontSize: typeof node.fontSize === 'number' ? round(node.fontSize) : null,
      lineHeight: serializeLineHeight(node.lineHeight),
      letterSpacing: serializeLetterSpacing(node.letterSpacing),
      paragraphSpacing: round(node.paragraphSpacing ?? 0),
      textAlignHorizontal: node.textAlignHorizontal ?? null,
      textAlignVertical: node.textAlignVertical ?? null,
      textAutoResize: node.textAutoResize ?? null,
      fills: paints,
      opacity: round(node.opacity ?? 1),
      effects,
      visible: node.visible !== false,
      parentId: parentInfo?.id ?? null,
      parentName: parentInfo?.name ?? null,
      inferredRole: inferTextRole(node, context.frame.height, relative)
    });
  } else {
    const inferredRole = inferShapeRole(node, context.frame.width, context.frame.height, relative, paints, effects);
    const serialized = {
      id: node.id,
      path: pathString,
      name: node.name,
      type: node.type,
      x: relative.x,
      y: relative.y,
      width: round(node.width ?? 0),
      height: round(node.height ?? 0),
      cornerRadius: getCornerRadius(node),
      fills: paints,
      strokes,
      strokeWeight: 'strokeWeight' in node ? round(node.strokeWeight ?? 0) : null,
      opacity: round(node.opacity ?? 1),
      blendMode: node.blendMode ?? null,
      effects,
      visible: node.visible !== false,
      childCount,
      inferredRole
    };

    if (shouldCollectVisibleNode(serialized, depth)) {
      collectors.visibleNodes.push(serialized);
    }

    if (hasImageFill(node)) {
      collectors.imageNodes.push({
        id: node.id,
        path: pathString,
        name: node.name,
        x: relative.x,
        y: relative.y,
        width: round(node.width ?? 0),
        height: round(node.height ?? 0),
        fills: paints,
        opacity: round(node.opacity ?? 1),
        blendMode: node.blendMode ?? null,
        effects,
        maskInfo: {
          isMask: 'isMask' in node ? Boolean(node.isMask) : false,
          parentIsMask: parentInfo?.isMask ?? false
        },
        visible: node.visible !== false,
        inferredRole: 'imageContainer'
      });
    }
  }

  if ('children' in node && Array.isArray(node.children)) {
    node.children.forEach((child, index) => {
      walk(
        child,
        context,
        [...path, index],
        collectors,
        {
          id: node.id,
          name: node.name,
          isMask: 'isMask' in node ? Boolean(node.isMask) : false
        },
        depth + 1
      );
    });
  }
}

async function inspectFrame(frameId) {
  const frame = await figma.getNodeByIdAsync(frameId);
  if (!frame || frame.type !== 'FRAME') {
    return {
      id: frameId,
      status: 'missing'
    };
  }

  const frameAbsolute = getAbsoluteXY(frame);
  const collectors = {
    textNodes: [],
    visibleNodes: [],
    imageNodes: []
  };

  frame.children.forEach((child, index) => {
      walk(
        child,
        { frame, frameAbsolute },
        [index],
        collectors,
        {
          id: frame.id,
          name: frame.name,
          isMask: false
        },
        0
      );
    });

  const roughVisualSignature = {
    textNodeCount: collectors.textNodes.length,
    visibleNodeCount: collectors.visibleNodes.length,
    imageNodeCount: collectors.imageNodes.length,
    dominantTextSizes: [...new Set(collectors.textNodes.map((node) => node.fontSize).filter(Boolean))].sort((a, b) => b - a).slice(0, 8),
    cardLikeNodeCount: collectors.visibleNodes.filter((node) => node.inferredRole === 'card' || node.inferredRole === 'chartPanel').length,
    glowNodeCount: collectors.visibleNodes.filter((node) => node.inferredRole === 'glow').length
  };

  return {
    id: frame.id,
    name: frame.name,
    x: round(frame.x),
    y: round(frame.y),
    width: round(frame.width),
    height: round(frame.height),
    fills: serializePaints(frame.fills),
    strokes: serializePaints(frame.strokes),
    strokeWeight: round(frame.strokeWeight ?? 0),
    effects: serializeEffects(frame.effects),
    opacity: round(frame.opacity ?? 1),
    blendMode: frame.blendMode ?? null,
    clipsContent: Boolean(frame.clipsContent),
    layoutMode: frame.layoutMode ?? null,
    childrenCount: frame.children.length,
    roughVisualSignature,
    textNodes: collectors.textNodes,
    visibleNodes: collectors.visibleNodes,
    imageNodes: collectors.imageNodes
  };
}

const frames = [];
for (const frameId of FRAME_IDS) {
  frames.push(await inspectFrame(frameId));
}

return {
  generatedAt: new Date().toISOString(),
  fileKey: '735drrzVTmf4AhQJwQe6vX',
  page: { id: figma.currentPage.id, name: figma.currentPage.name },
  inspectedFrameIds: FRAME_IDS,
  frames
};`;
}

async function main() {
  await mkdir('output', { recursive: true });
  await writeFile(OUTPUT, `${buildScript()}\n`, 'utf8');
  console.log(`Wrote ${OUTPUT}. Run it through ChatGPT/Figma MCP use_figma.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
