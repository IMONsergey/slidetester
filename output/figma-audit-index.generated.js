const page = figma.root.children.find((p) => p.id === '0:1' || p.name === 'Page 1');
if (!page) {
  return { error: 'Target page not found', pages: figma.root.children.map((p) => ({ id: p.id, name: p.name })) };
}

await figma.setCurrentPageAsync(page);
figma.skipInvisibleInstanceChildren = true;

const topLevel = figma.currentPage.children.map((node) => ({
  id: node.id,
  name: node.name,
  type: node.type,
  x: Math.round(node.x),
  y: Math.round(node.y),
  width: Math.round(node.width),
  height: Math.round(node.height)
}));

const slideFrames = figma.currentPage.children
  .filter((node) => node.type === 'FRAME' && node.name !== 'Icons')
  .map((frame) => {
    const texts = frame
      .findAllWithCriteria({ types: ['TEXT'] })
      .map((node) => (node.characters || '').replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .slice(0, 8);

    return {
      id: frame.id,
      name: frame.name,
      textCount: frame.findAllWithCriteria({ types: ['TEXT'] }).length,
      childCount: frame.children.length,
      previewTexts: texts
    };
  });

return {
  page: { id: figma.currentPage.id, name: figma.currentPage.name },
  topLevelCount: topLevel.length,
  topLevel,
  slideFrames
};
