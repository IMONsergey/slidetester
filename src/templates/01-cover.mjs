export function buildCoverTemplate(slide, reference) {
  return {
    slideNumber: slide.slideNumber,
    frameName: 'PILOT / 01 / Task Manager / Cover',
    patternId: slide.patternId,
    title: 'Таск-менеджер\nсотрудника магазина',
    eyebrow: slide.eyebrow,
    subtitle: 'Новая операционная система управления задачами, цифровым следом и личной эффективностью.',
    footer: 'Максим Вареник',
    reference
  };
}
