export function buildTargetStateTemplate(slide, reference) {
  const pillars = [
    {
      title: 'Задачи формируются из бизнес-приоритетов',
      body: 'Приоритеты назначаются по реальной ситуации в магазине, а не по ручной интуиции руководителя.'
    },
    {
      title: 'Исполнение оставляет цифровой след',
      body: 'Каждый этап выполнения фиксируется в системе и превращается в наблюдаемые метрики производительности.'
    },
    {
      title: 'Мотивация связана с результатом',
      body: 'Сотрудник получает понятную связь между качеством выполнения задач и личной эффективностью.'
    }
  ];

  return {
    slideNumber: slide.slideNumber,
    frameName: 'PILOT / 03 / Task Manager / Target State',
    patternId: slide.patternId,
    title: 'Образ результата',
    message: slide.message,
    pillars,
    reference
  };
}
