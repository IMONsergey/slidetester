export function classifySlideRole(slide) {
  const title = String(slide.possibleTitle || '').toLowerCase();
  const body = `${title} ${slide.rawText.join(' ').toLowerCase()}`;

  if (slide.slideIndex === 1 || body.includes('годовой отч')) {
    return 'cover';
  }

  if (body.includes('взгляд в цифрах')) {
    return 'numeric-overview';
  }

  if (body.includes('ключевые достижения')) {
    return 'achievements';
  }

  if (body.includes('результат исполнения целей')) {
    return 'efficiency-result';
  }

  if (body.includes('трансформация')) {
    return 'transformation';
  }

  if (body.includes('2026 год эффективность') || body.includes('результаты 1 q 2026')) {
    return 'roadmap';
  }

  if (body.includes('проект года') || body.includes('красная цена 5л')) {
    return 'project-of-year';
  }

  if (body.includes('стратегия')) {
    return 'strategy';
  }

  return 'unknown';
}
