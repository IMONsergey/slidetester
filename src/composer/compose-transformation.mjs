import { assetElement, buildBaseSlide, bulletListElement, metricCardElement, textElement } from './composer-helpers.mjs';

export function composeTransformation(planSlide, rawSlide) {
  const slide = buildBaseSlide(planSlide, rawSlide, 'Transformation');

  slide.content = {
    title: rawSlide.possibleTitle,
    budget: '97.9 млрд руб.',
    challenge: 'Выполнить 5 млрд эффективности и сократить затраты на 4 млрд для достижения цели компании.',
    methods: [
      'Осознанный подход к операционным расходам',
      'Экономим электроэнергию',
      'Настраиваем графики уборки под себя',
      'Разумно расходуем материалы для торговли и склада',
      'Контролируем качество работы КА для минимизации будущих затрат'
    ]
  };

  slide.elements.push(
    assetElement('transformation-bg', 'analytics-red-glow', { x: 100, y: 920, width: 1680, height: 600 }, { opacity: 0.7 }),
    textElement('transformation-title', rawSlide.possibleTitle, 'typography.slide.title.size', { x: 60, y: 50, width: 1600, height: 80 }),
    metricCardElement('transformation-budget', 'Бюджет 2026', '97.9 млрд руб.', 'Точка входа в год трансформации', { x: 60, y: 210, width: 560, height: 260 }),
    textElement('transformation-challenge', slide.content.challenge, 'typography.body.size', { x: 700, y: 235, width: 1100, height: 120 }),
    bulletListElement('transformation-methods', 'Как удерживаем баланс доходов и расходов', slide.content.methods, { x: 60, y: 540, width: 1500, height: 360 })
  );

  slide.qaExpectations.push('Challenge framing must feel like an executive transition slide, not a generic bullet list.');
  return slide;
}
