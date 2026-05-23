export function buildRoadmapTemplate(slide, reference) {
  const milestones = [
    {
      year: '2026',
      title: 'Пилот 200+ магазинов',
      body: 'Отработка алгоритма приоритезации, цифрового следа и контуров мотивации.'
    },
    {
      year: '2027',
      title: 'Территория в пилоте',
      body: 'Тиражирование решения на территориальный контур с обновлением роли руководителей и контроля исполнения.'
    },
    {
      year: '2028',
      title: 'Вся сеть работает по-новому',
      body: 'Переход в сетевой operating model с единым управлением задачами и метриками.'
    }
  ];

  return {
    slideNumber: slide.slideNumber,
    frameName: 'PILOT / 06 / Task Manager / Roadmap',
    patternId: slide.patternId,
    title: 'Сроки и масштабирование',
    message: slide.message,
    milestones,
    reference
  };
}
