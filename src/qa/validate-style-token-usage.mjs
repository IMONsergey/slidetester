export function validateStyleTokenUsage(specSlide, styleTokens) {
  const knownTokenIds = new Set();
  const categories = ['typography', 'grid', 'colors', 'shapes', 'opacityLevels', 'alignmentPatterns'];
  for (const category of categories) {
    for (const item of styleTokens[category] || []) {
      knownTokenIds.add(item.tokenId);
    }
  }

  let used = 0;
  let valid = 0;
  for (const element of specSlide.elements) {
    if (element.tokenId) {
      used += 1;
      if (knownTokenIds.has(element.tokenId)) {
        valid += 1;
      }
    }
  }

  const score = used === 0 ? 0 : Math.round((valid / used) * 100);
  return {
    score,
    risks: score < 100 ? ['One or more elements reference missing or unmapped style tokens.'] : []
  };
}
