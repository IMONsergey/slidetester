export function buildProblemMapTemplate(slide, reference) {
  return {
    slideNumber: slide.slideNumber,
    frameName: 'PILOT / 02 / Task Manager / Problem',
    patternId: slide.patternId,
    title: 'Проблема: ручное управление задачами\nтеряет эффективность на масштабе',
    message: slide.message,
    content: slide.content,
    reference
  };
}
