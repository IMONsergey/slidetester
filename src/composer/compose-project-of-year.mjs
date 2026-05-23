import { assetElement, buildBaseSlide, metricCardElement, tableElement, textElement } from './composer-helpers.mjs';

export function composeProjectOfYear(planSlide, rawSlide) {
  const slide = buildBaseSlide(planSlide, rawSlide, 'Project Of Year');
  const table = Array.isArray(rawSlide.tables[0]) ? rawSlide.tables[0] : [];
  const headers = table.length > 0 ? table[0] : ['Месяц', 'Рабочих дней', 'Номер недели', 'План продаж', 'План розлива', 'Итого', 'Прогноз'];
  const rows = table.length > 1 ? table.slice(1, 6) : [
    ['Апрель', '1 680', '38 500', '44 197', '6 601', '13 664', '15 752'],
    ['Май', '32 000', '154 500', '32 000', '154 500', '43 000', '49 500'],
    ['Июнь', '80 640', '250 880', '55 500', '250 880', '60 320', '84 500'],
    ['Июль', '58 400', '340 320', '44 500', '456 500', '76 800', '77 500'],
    ['Август', '66 720', '196 640', '53 500', '211 000', '39 200', '52 500']
  ];

  slide.content = {
    title: rawSlide.possibleTitle,
    project: 'Запущено производство воды СТМ Красная цена 5л.',
    capacities: [
      'РЦ 5 Кузнецк — 40 515 бут/месяц',
      'РЦ 5 Саратов — 96 824 бут/месяц',
      'РЦ 5 Самара — 203 892 бут/месяц',
      'РЦ ЗИМ — розлив max 1 800 000 бут/месяц'
    ],
    productionTable: rows
  };

  slide.elements.push(
    assetElement('project-shell', 'analytics-left-chart-shell', { x: 60, y: 220, width: 1800, height: 740 }),
    textElement('project-title', rawSlide.possibleTitle, 'typography.slide.title.size', { x: 60, y: 50, width: 1500, height: 80 }),
    textElement('project-subtitle', slide.content.project, 'typography.body.size', { x: 60, y: 120, width: 1400, height: 48 }, { colorTokenId: 'color.text.secondary' }),
    metricCardElement('project-kuznetsk', 'РЦ 5 Кузнецк', '40 515 бут/мес.', 'Локальная мощность', { x: 60, y: 220, width: 400, height: 180 }),
    metricCardElement('project-saratov', 'РЦ 5 Саратов', '96 824 бут/мес.', 'Локальная мощность', { x: 490, y: 220, width: 400, height: 180 }, { accent: 'color.accent.orange' }),
    metricCardElement('project-samara', 'РЦ 5 Самара', '203 892 бут/мес.', 'Локальная мощность', { x: 920, y: 220, width: 400, height: 180 }, { accent: 'color.accent.amber' }),
    metricCardElement('project-zim', 'РЦ ЗИМ', '1 800 000 бут/мес.', 'Максимальная мощность розлива', { x: 1350, y: 220, width: 510, height: 180 }),
    tableElement('project-table', 'План производства April-August', headers, rows, { x: 60, y: 450, width: 1800, height: 430 })
  );

  slide.qaExpectations.push('The production table must remain editable and free of any unrelated inherited notes.');
  return slide;
}
