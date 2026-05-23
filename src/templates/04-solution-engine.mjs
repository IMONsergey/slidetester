export function buildSolutionEngineTemplate(slide, reference) {
  return {
    slideNumber: slide.slideNumber,
    frameName: 'PILOT / 04 / Task Manager / Solution Engine',
    patternId: slide.patternId,
    title: 'Возможное решение: автоматизированный менеджер заданий',
    message: slide.message,
    content: slide.content,
    loopSteps: [
      'signals from store and business priorities',
      'priority scoring model',
      'task assignment to employee',
      'execution trace and completion control',
      'performance metrics',
      'motivation and reward logic'
    ],
    reference
  };
}
