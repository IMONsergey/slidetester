import { assetElement, buildBaseSlide, bulletListElement, metricCardElement, textElement } from './composer-helpers.mjs';

export function composeRoadmap(planSlide, rawSlide) {
  const slide = buildBaseSlide(planSlide, rawSlide, 'Roadmap');

  slide.content = {
    title: rawSlide.possibleTitle,
    actions: [
      'Наращиваем долю прямых договоров до 64%',
      'Внедряем систему энергоменеджмента',
      'Раскатываем телеметрию КМ и ХП',
      'Открываем новые возможности в работе с WRS',
      'Дифференцируем сервис по локальным драйверам',
      'Освобождаем пространство, перемещая неиспользуемое оборудование',
      'Меняем устаревшие NCR на целевые кассы (8 тыс. шт.)',
      'Пилот автоматизации приемки ИТ-работ',
      'Проект по УМ: экономия 5% до конца года / 11.000 ТТ',
      'Пилотирование нового оборудования для уборки магазинов'
    ],
    q1Results: ['План 452 млн руб.', 'Факт 1.017 млн руб.', 'Прогноз эффективности 3.727 млн руб.']
  };

  slide.elements.push(
    assetElement('roadmap-rail', 'process-rail-system', { x: 60, y: 250, width: 1220, height: 620 }),
    assetElement('roadmap-panel', 'analytics-right-chart-shell', { x: 1310, y: 220, width: 550, height: 650 }),
    textElement('roadmap-title', rawSlide.possibleTitle, 'typography.slide.title.size', { x: 60, y: 50, width: 1500, height: 80 }),
    bulletListElement('roadmap-actions', 'Портфель действий 2026', slide.content.actions, { x: 60, y: 220, width: 1180, height: 700 }, { columns: 2 }),
    metricCardElement('roadmap-q1', 'Результаты 1Q 2026', '1.017 млн руб.', 'План 452 млн руб. / прогноз 3.727 млн руб.', { x: 1310, y: 280, width: 500, height: 300 }, { accent: 'color.accent.orange' })
  );

  slide.qaExpectations.push('The Q1 tracker must read as proof of execution, not as inherited old analytics.');
  return slide;
}
