import { assetElement, buildBaseSlide, bulletListElement, metricCardElement, textElement } from './composer-helpers.mjs';

export function composeEfficiencyResult(planSlide, rawSlide) {
  const slide = buildBaseSlide(planSlide, rawSlide, 'Execution Result');

  slide.content = {
    title: rawSlide.possibleTitle,
    summary: [
      'Оптимизация и автоматизация процессов +3.867 млрд руб.',
      'Проекты +0,39 млрд руб.'
    ],
    initiatives: [
      'Переход на платформу WRS-2 в клининге',
      'Чек-лист для КА на WRS',
      'Dashboard Эксплуатации',
      'Тестирование пяти роботов-уборщиков',
      'Подключили 7.266 КМ и 5.081 ХП'
    ],
    drivers: [
      'Оптимизировали тарифы и стоимость обслуживания: 2.828 млн руб.',
      'Заключили 1.409 прямых договоров (+17% к плану)',
      'Пересобрали процесс заказа расходных материалов: -1.039 млн руб.',
      'Оптимизировали потребление кВт/ч 2025 к 2024 на 4%'
    ]
  };

  slide.elements.push(
    assetElement('efficiency-shell', 'architecture-board-shell', { x: 60, y: 210, width: 1800, height: 760 }),
    textElement('efficiency-title', rawSlide.possibleTitle, 'typography.slide.title.size', { x: 60, y: 50, width: 1500, height: 80 }),
    metricCardElement('efficiency-summary-1', 'Оптимизация и автоматизация', '+3.867 млрд', 'Основной контур экономического эффекта', { x: 60, y: 220, width: 560, height: 220 }),
    metricCardElement('efficiency-summary-2', 'Проекты', '+0,39 млрд', 'Проектный вклад в результат', { x: 650, y: 220, width: 420, height: 220 }, { accent: 'color.accent.orange' }),
    bulletListElement('efficiency-initiatives', 'Инициативы', slide.content.initiatives, { x: 60, y: 490, width: 860, height: 360 }),
    bulletListElement('efficiency-drivers', 'Операционные драйверы', slide.content.drivers, { x: 980, y: 220, width: 880, height: 630 })
  );

  slide.qaExpectations.push('The slide must read as one integrated execution board, not two unrelated cloned frames.');
  return slide;
}
