import { assetElement, buildBaseSlide, pillarGridElement, textElement } from './composer-helpers.mjs';

export function composeStrategy(planSlide, rawSlide) {
  const slide = buildBaseSlide(planSlide, rawSlide, 'Strategy');
  const principles = rawSlide.rawText.slice(3);

  slide.content = {
    title: `${rawSlide.rawText[0]} ${rawSlide.rawText[1]}`.trim(),
    promise: rawSlide.rawText[2],
    principles
  };

  slide.elements.push(
    assetElement('strategy-shell', 'three-pillar-card-family', { x: 60, y: 250, width: 1800, height: 640 }),
    textElement('strategy-title', `Стратегия ${rawSlide.rawText[1]}`, 'typography.slide.title.size', { x: 60, y: 50, width: 1500, height: 80 }),
    textElement('strategy-promise', rawSlide.rawText[2], 'typography.body.size', { x: 60, y: 120, width: 1400, height: 48 }, { colorTokenId: 'color.text.secondary' }),
    pillarGridElement('strategy-principles', 'Фокус 2026', principles, { x: 60, y: 260, width: 1800, height: 560 }, { columns: 4 })
  );

  slide.qaExpectations.push('Principles should read as native strategy pillars, not generic cards.');
  return slide;
}
