export function validateContentPurity(specSlide) {
  const serialized = JSON.stringify({
    content: specSlide.content,
    elements: specSlide.elements
  }).toLowerCase();
  const forbiddenTokens = ['конкурент', 'source note', 'old source', 'market share'];
  const hits = forbiddenTokens.filter((token) => serialized.includes(token));
  const score = Math.max(0, 100 - hits.length * 12);

  return {
    score,
    risks: hits.map((token) => `Potential forbidden inherited content token detected: ${token}`)
  };
}
