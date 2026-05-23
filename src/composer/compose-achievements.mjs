import { assetElement, buildBaseSlide, metricCardElement, pillarGridElement, textElement } from './composer-helpers.mjs';

export function composeAchievements(planSlide, rawSlide) {
  const slide = buildBaseSlide(planSlide, rawSlide, 'Achievements');

  slide.content = {
    title: rawSlide.possibleTitle,
    subtitle: rawSlide.rawText[1],
    proofLine: rawSlide.rawText[2],
    comparison: [
      { focus: '2,39% затрат / 87.007 млрд руб.', result: 'Рост тарифов 6% / эффективность 3,2 млрд руб.' },
      { focus: '2,38% затрат / 84.655 млрд руб.', result: 'Рост тарифов 14% / эффективность 3.906 млрд руб.' }
    ],
    conclusions: [
      'Оптимизировали затраты бюджета на 2.400 млн руб.',
      'Лучше в % от выручки на 0,01 п.п.',
      'Перевыполнили цель по эффективности на 706 млн руб.'
    ]
  };

  slide.elements.push(
    assetElement('achievements-shell', 'metric-card-shell-family', { x: 60, y: 220, width: 1800, height: 740 }),
    textElement('achievements-title', rawSlide.possibleTitle, 'typography.slide.title.size', { x: 60, y: 50, width: 1500, height: 80 }),
    textElement('achievements-subtitle', rawSlide.rawText[1], 'typography.body.size', { x: 60, y: 118, width: 1680, height: 50 }, { colorTokenId: 'color.text.secondary' }),
    metricCardElement('achievements-left', 'Фокус', '2,39% / 87.007 млрд', 'Рост тарифов 6% / эффективность 3,2 млрд', { x: 60, y: 230, width: 860, height: 300 }),
    metricCardElement('achievements-right', 'Итог', '2,38% / 84.655 млрд', 'Рост тарифов 14% / эффективность 3.906 млрд', { x: 980, y: 230, width: 880, height: 300 }, { accent: 'color.accent.orange' }),
    pillarGridElement('achievements-conclusions', 'Выводы', slide.content.conclusions, { x: 60, y: 590, width: 1800, height: 260 }, { columns: 3 })
  );

  slide.qaExpectations.push('No old market chart data or legacy legends may survive on this slide.');
  return slide;
}
