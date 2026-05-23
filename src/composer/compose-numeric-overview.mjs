import { assetElement, buildBaseSlide, metricCardElement, textElement } from './composer-helpers.mjs';

export function composeNumericOverview(planSlide, rawSlide) {
  const slide = buildBaseSlide(planSlide, rawSlide, 'Year In Numbers');

  slide.content = {
    title: rawSlide.possibleTitle,
    macroZones: ['Объемы', 'Сервис', 'Затраты'],
    metrics: {
      volumes: ['+2.308 магазинов', '14.187.724 м2'],
      service: ['Сервис >98% при нормативе 95%', '60.000 РЦ заявок', '2.279.660 заявок магазинов'],
      costs: ['283.800 руб. на магазин в месяц (+11%)', '20.600 руб. материалы (-2%)', 'Электроэнергия РЦ / ТТ']
    },
    utility: ['РЦ: 279.903.495 кВт / 1.705 млн руб.', 'ТТ: 3.830.662.623 кВт / 34.403 млн руб.']
  };

  slide.elements.push(
    assetElement('numbers-glow', 'analytics-red-glow', { x: 90, y: 920, width: 1740, height: 620 }, { opacity: 0.85 }),
    textElement('numbers-title', rawSlide.possibleTitle, 'typography.slide.title.size', { x: 60, y: 50, width: 1600, height: 80 }),
    metricCardElement('numbers-volumes', 'Объемы', '+2.308 / 14.187.724 м2', 'Магазины и общая площадь', { x: 60, y: 210, width: 560, height: 300 }),
    metricCardElement('numbers-service', 'Сервис', '98%', 'Норматив 95% + 60.000 / 2.279.660 заявок', { x: 680, y: 210, width: 560, height: 300 }, { accent: 'color.accent.orange' }),
    metricCardElement('numbers-costs', 'Затраты', '283.800 руб.', '20.600 руб. материалы, энергия РЦ/ТТ', { x: 1300, y: 210, width: 560, height: 300 }, { accent: 'color.accent.amber' }),
    textElement('numbers-utility-1', 'РЦ: 279.903.495 кВт / 1.705 млн руб.', 'typography.body.size', { x: 60, y: 580, width: 860, height: 40 }),
    textElement('numbers-utility-2', 'ТТ: 3.830.662.623 кВт / 34.403 млн руб.', 'typography.body.size', { x: 60, y: 630, width: 860, height: 40 }),
    textElement('numbers-foot', 'Годовой обзор должен остаться трёхзонным и самостоятельным без наследования старых легенд.', 'typography.footnote.size', { x: 60, y: 972, width: 1080, height: 40 }, { colorTokenId: 'color.text.secondary' })
  );

  slide.qaExpectations.push('Three macro-zones must remain visually distinct.');
  return slide;
}
