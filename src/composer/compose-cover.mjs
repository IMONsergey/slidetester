import { assetElement, buildBaseSlide, textElement } from './composer-helpers.mjs';

export function composeCover(planSlide, rawSlide) {
  const slide = buildBaseSlide(planSlide, rawSlide, 'Cover');
  const [title, subtitle, department, speaker] = rawSlide.rawText;

  slide.content = {
    title,
    subtitle,
    department,
    speaker
  };

  slide.elements.push(
    assetElement('cover-bg', 'cover-background-photo', { x: 0, y: 0, width: 1920, height: 1080 }, { mode: 'direct-safe' }),
    assetElement('cover-logo', 'cover-brand-mark', { x: 656, y: 896, width: 607, height: 63 }, { mode: 'direct-safe' }),
    textElement('cover-subtitle', subtitle, 'typography.cover.eyebrow.size', { x: 650, y: 130, width: 621, height: 104 }, { align: 'CENTER', colorTokenId: 'color.text.secondary' }),
    textElement('cover-title', title, 'typography.hero.title.size', { x: 212, y: 485, width: 1497, height: 110 }, { align: 'CENTER' }),
    textElement('cover-department', department, 'typography.card.title.size', { x: 420, y: 640, width: 1080, height: 48 }, { align: 'CENTER' }),
    textElement('cover-speaker', speaker, 'typography.cover.speaker.size', { x: 799, y: 727, width: 323, height: 37 }, { align: 'CENTER', colorTokenId: 'color.text.secondary' })
  );

  slide.qaExpectations.push('Cover must feel native to source frame 25:6981.');
  return slide;
}
