import {
  ASSET_BANK_OUTPUT,
  PRODUCTION_SPEC_OUTPUT,
  STYLE_TOKENS_OUTPUT,
  isDirectExecution,
  readJson
} from '../pipeline/current-pipeline-shared.mjs';

const OUTPUT_SLIDE_NAMES = ['CURRENT / 01 / Cover', 'CURRENT / 02 / Year In Numbers'];

function byToken(payload, tokenId) {
  const groups = ['typography', 'grid', 'colors', 'shapes', 'opacityLevels', 'alignmentPatterns'];
  for (const group of groups) {
    const hit = (payload[group] || []).find((item) => item.tokenId === tokenId);
    if (hit) {
      return hit;
    }
  }
  throw new Error(`Missing token ${tokenId}.`);
}

function byAsset(assetBank, assetId) {
  const hit = (assetBank.assets || []).find((item) => item.assetId === assetId);
  if (!hit) {
    throw new Error(`Missing asset ${assetId}.`);
  }
  return hit;
}

function bySlide(spec, slideName) {
  const hit = (spec.slides || []).find((item) => item.name === slideName);
  if (!hit) {
    throw new Error(`Missing production-spec slide ${slideName}.`);
  }
  return hit;
}

function buildCoverVisualModel(slide, styleTokens, assetBank) {
  const coverTitleBox = byToken(styleTokens, 'grid.cover.title.box').value;
  const coverEyebrowBox = byToken(styleTokens, 'grid.cover.eyebrow.box').value;
  const coverSpeakerBox = byToken(styleTokens, 'grid.cover.speaker.box').value;
  const coverBackground = byAsset(assetBank, 'cover-background-photo');
  const coverLogo = byAsset(assetBank, 'cover-brand-mark');

  return {
    ...slide,
    outputFrameName: 'CURRENT / VISUAL / 01 / Cover',
    visualComposerMode: 'source-asset-composition',
    content: {
      ...slide.content,
      titleLines: ['Код успеха:', 'Годовой отчёт 2025'],
      departmentShort: 'Департамент Эксплуатации и информационной поддержки',
      heroBalanceNote: 'Department and speaker stay below the hero title and do not create a second focal point.'
    },
    sourceFramesUsed: [
      {
        frameId: '25:6981',
        role: 'Primary cover family',
        borrowed: ['photo background', 'hero title geometry', 'eyebrow placement', 'speaker line placement', 'bottom brand mark']
      },
      {
        frameId: '25:7247',
        role: 'Glow accent family',
        borrowed: ['optional lower ambient glow restraint']
      }
    ],
    sourceAssetsUsed: [
      {
        assetId: coverBackground.assetId,
        usage: 'Clone only the neutral background image node from the cover source frame.'
      },
      {
        assetId: coverLogo.assetId,
        usage: 'Clone the bottom brand lockup.'
      }
    ],
    sourceTokensUsed: [
      'typography.family.primary',
      'typography.hero.title.size',
      'typography.hero.title.lineHeight',
      'typography.hero.title.letterSpacing',
      'typography.cover.eyebrow.size',
      'typography.cover.speaker.size',
      'grid.cover.title.box',
      'grid.cover.eyebrow.box',
      'grid.cover.speaker.box',
      'color.text.primary',
      'color.text.secondary'
    ],
    renderPlan: {
      backgroundNodeRef: { frameId: '25:6981', nodeId: '25:6982' },
      logoNodeRef: { frameId: '25:6981', nodeId: '25:6983' },
      text: {
        eyebrow: {
          text: slide.content.subtitle,
          box: coverEyebrowBox,
          tokenId: 'typography.cover.eyebrow.size',
          align: 'CENTER',
          colorTokenId: 'color.text.secondary'
        },
        title: {
          lines: ['Код успеха:', 'Годовой отчёт 2025'],
          box: { x: coverTitleBox.x, y: 448, width: coverTitleBox.width, height: 180 },
          tokenId: 'typography.hero.title.size',
          align: 'CENTER',
          colorTokenId: 'color.text.primary'
        },
        department: {
          text: slide.content.department,
          box: { x: 360, y: 650, width: 1200, height: 40 },
          tokenId: 'typography.body.size',
          align: 'CENTER',
          colorTokenId: 'color.text.secondary'
        },
        speaker: {
          text: slide.content.speaker,
          box: { ...coverSpeakerBox, y: 710, width: 320 },
          tokenId: 'typography.cover.speaker.size',
          align: 'CENTER',
          colorTokenId: 'color.text.secondary'
        }
      }
    }
  };
}

function buildYearNumbersVisualModel(slide, styleTokens, assetBank) {
  const titleBox = byToken(styleTokens, 'grid.analytics.title.box').value;
  const leftPanel = byToken(styleTokens, 'grid.analytics.left.panel').value;
  const threeCard = byToken(styleTokens, 'grid.layout.three-card').value;
  const glowAsset = byAsset(assetBank, 'analytics-red-glow');
  const lineAsset = byAsset(assetBank, 'analytics-line-system');

  return {
    ...slide,
    outputFrameName: 'CURRENT / VISUAL / 02 / Year In Numbers',
    visualComposerMode: 'hybrid-kpi-composition',
    content: {
      ...slide.content,
      titleClean: '2025 год. Взгляд в цифрах',
      macroZonesDetailed: [
        {
          label: 'Объемы',
          primary: '+2.308 магазинов',
          secondary: '14.187.724 м2',
          note: 'Масштаб покрытия и площадь сети'
        },
        {
          label: 'Сервис',
          primary: '>98%',
          secondary: 'при нормативе 95%',
          note: '60.000 РЦ заявок / 2.279.660 заявок магазинов'
        },
        {
          label: 'Затраты',
          primary: '283.800 руб.',
          secondary: 'на магазин / месяц, +11%',
          note: '20.600 руб. материалы, -2%'
        }
      ],
      lowerRail: [
        {
          label: 'Электроэнергия РЦ',
          value: '279.903.495 кВт / 1.705 млн руб.'
        },
        {
          label: 'Электроэнергия ТТ',
          value: '3.830.662.623 кВт / 34.403 млн руб.'
        },
        {
          label: 'Заявки РЦ / магазины',
          value: '60.000 / 2.279.660'
        }
      ]
    },
    sourceFramesUsed: [
      {
        frameId: '25:7044',
        role: 'Primary KPI-card family',
        borrowed: ['three-card spacing logic', 'large metric card shell proportions']
      },
      {
        frameId: '25:7247',
        role: 'Analytics title and glow family',
        borrowed: ['top-left title treatment', 'lower red glow', 'thin analytic divider language']
      },
      {
        frameId: '25:7544',
        role: 'Dense information support family',
        borrowed: ['controlled density', 'bottom supporting information rail']
      }
    ],
    sourceAssetsUsed: [
      {
        assetId: glowAsset.assetId,
        usage: 'Reuse as ambient lower-stage glow only.'
      },
      {
        assetId: lineAsset.assetId,
        usage: 'Reuse as style logic for restrained divider accents, not as inherited chart data.'
      },
      {
        assetId: 'metric-card-shell-family',
        usage: 'Match source card proportions and shell treatment without cloning old content.'
      }
    ],
    sourceTokensUsed: [
      'typography.family.primary',
      'typography.slide.title.size',
      'typography.card.title.size',
      'typography.metric.number.size',
      'typography.body.size',
      'typography.footnote.size',
      'grid.analytics.title.box',
      'grid.layout.three-card',
      'color.background.analytics',
      'color.accent.red',
      'color.accent.orange',
      'color.accent.amber',
      'shape.card.radius.lg',
      'shape.glow.red.ellipse'
    ],
    renderPlan: {
      title: {
        text: '2025 год. Взгляд в цифрах',
        box: { x: titleBox.x, y: titleBox.y, width: 1080, height: 70 },
        tokenId: 'typography.slide.title.size',
        align: 'LEFT',
        colorTokenId: 'color.text.primary'
      },
      intro: {
        text: 'Три макрозоны годового обзора: объемы, сервис, затраты',
        box: { x: 60, y: 120, width: 980, height: 34 },
        tokenId: 'typography.body.size',
        align: 'LEFT',
        colorTokenId: 'color.text.secondary'
      },
      glow: {
        assetId: glowAsset.assetId,
        box: { x: glowAsset.x, y: glowAsset.y, width: glowAsset.width, height: glowAsset.height },
        opacity: 0.3
      },
      zones: [
        {
          id: 'zone-volumes',
          label: 'Объемы',
          accent: 'color.accent.red',
          box: { x: threeCard.x, y: 230, width: threeCard.cardWidth, height: 430 },
          primary: '+2.308',
          primarySuffix: 'магазинов',
          secondary: '14.187.724 м2',
          note: 'Масштаб покрытия и площадь сети'
        },
        {
          id: 'zone-service',
          label: 'Сервис',
          accent: 'color.accent.orange',
          box: { x: threeCard.x + threeCard.cardWidth + threeCard.gap, y: 230, width: threeCard.cardWidth, height: 430 },
          primary: '>98%',
          primarySuffix: 'уровень сервиса',
          secondary: 'при нормативе 95%',
          note: '60.000 РЦ заявок / 2.279.660 заявок магазинов'
        },
        {
          id: 'zone-costs',
          label: 'Затраты',
          accent: 'color.accent.amber',
          box: { x: threeCard.x + (threeCard.cardWidth + threeCard.gap) * 2, y: 230, width: threeCard.cardWidth, height: 430 },
          primary: '283.800 руб.',
          primarySuffix: 'на магазин / месяц, +11%',
          secondary: '20.600 руб. материалы, -2%',
          note: 'Электроэнергия РЦ / ТТ'
        }
      ],
      lowerRail: {
        box: { x: leftPanel.x, y: 700, width: 1800, height: 220 },
        items: [
          {
            label: 'РЦ',
            value: '279.903.495 кВт / 1.705 млн руб.'
          },
          {
            label: 'ТТ',
            value: '3.830.662.623 кВт / 34.403 млн руб.'
          },
          {
            label: 'Заявки',
            value: '60.000 РЦ / 2.279.660 магазины'
          }
        ]
      }
    }
  };
}

export async function buildCurrent2SlidesVisualModel() {
  const productionSpec = await readJson(PRODUCTION_SPEC_OUTPUT);
  const styleTokens = await readJson(STYLE_TOKENS_OUTPUT);
  const assetBank = await readJson(ASSET_BANK_OUTPUT);

  const cover = buildCoverVisualModel(bySlide(productionSpec, OUTPUT_SLIDE_NAMES[0]), styleTokens, assetBank);
  const yearInNumbers = buildYearNumbersVisualModel(bySlide(productionSpec, OUTPUT_SLIDE_NAMES[1]), styleTokens, assetBank);

  return {
    generatedAt: new Date().toISOString(),
    deck: productionSpec.deck,
    slides: [cover, yearInNumbers]
  };
}

if (isDirectExecution(import.meta)) {
  buildCurrent2SlidesVisualModel().then((payload) => {
    console.log(JSON.stringify(payload, null, 2));
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
