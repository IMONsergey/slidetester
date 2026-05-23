export function buildMetricsEffectTemplate(slide, reference) {
  return {
    slideNumber: slide.slideNumber,
    frameName: 'PILOT / 05 / Task Manager / Business Effect',
    patternId: slide.patternId,
    title: 'Предполагаемый эффект',
    message: slide.message,
    metrics: slide.metrics,
    footnote: 'Пилотный эффект должен подтверждаться измеримыми метриками труда и ФОТ, а не только описанием процесса.',
    reference
  };
}
