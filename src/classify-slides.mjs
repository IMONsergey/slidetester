import { mkdir, readFile, writeFile } from 'node:fs/promises';

const RAW_INPUT = 'output/slides.raw.json';
const OUTPUT = 'output/slides.json';

const classificationBlueprint = {
  1: {
    patternId: 'hero_product_initiative_cover',
    role: 'cover',
    message: 'Таск-менеджер сотрудника магазина как новая операционная система управления задачами и производительностью.',
    eyebrow: 'ПЯТЁРОЧКА / ОПЕРАЦИОННАЯ ЭФФЕКТИВНОСТЬ',
    subtitle: 'PILOT / reference-matched continuation of the existing Figma strategy deck'
  },
  2: {
    patternId: 'problem_friction_map',
    role: 'problem',
    message: 'Ручное управление задачами теряет эффективность на масштабе.',
    content: [
      'множественные источники операционных задач',
      'приоритезация зависит от компетенции ДМ/АДМ',
      '73% рабочего времени не имеет следов в системах',
      'мотивация не зависит от личной эффективности',
      'принцип работы на время, а не на результат',
      'реактивное управление не всегда учитывает бизнес-приоритеты'
    ]
  },
  3: {
    patternId: 'target_state_outcome_pillars',
    role: 'target-state',
    message: 'Задачи должны формироваться из бизнес-приоритетов, фиксироваться цифровым следом и влиять на мотивацию.',
    content: [
      'приоритеты задач формируются из реальной ситуации в магазине и бизнес-целей',
      'процесс исполнения имеет цифровой след и метрики производительности',
      'каждый сотрудник мотивирован повышать личную эффективность'
    ]
  },
  4: {
    patternId: 'solution_engine_operating_loop',
    role: 'solution',
    message: 'Автоматизированный менеджер заданий назначает самые приоритетные задачи в каждый момент времени.',
    content: [
      'модель приоритезации задач на бизнес-результат',
      'автоматическое управление постановкой задач',
      'цифровой след 90% операций',
      'сдельная мотивация'
    ],
    loop: [
      'business inputs',
      'prioritization engine',
      'task assignment',
      'execution trace',
      'performance metrics',
      'motivation layer'
    ]
  },
  5: {
    patternId: 'business_effect_metric_cards',
    role: 'effect',
    message: 'Решение должно дать измеримый эффект на производительность и ФОТ.',
    metrics: [
      {
        value: '+10–15%',
        label: 'Производительность труда',
        note: 'Рост эффективности рабочего времени команды'
      },
      {
        value: '-10%',
        label: 'ФОТ магазина от расходов',
        note: 'Снижение за счет роста производительности'
      },
      {
        value: '-0.4%',
        label: 'ФОТ магазина от выручки',
        note: 'Снижение за счет роста производительности'
      }
    ]
  },
  6: {
    patternId: 'pilot_to_scale_roadmap',
    role: 'roadmap',
    message: 'Масштабирование идёт от пилота в 200+ магазинах к территории и всей сети.',
    timeline: [
      {
        year: '2026',
        milestone: '200+ магазинов в пилоте'
      },
      {
        year: '2027',
        milestone: '1 территория в пилоте'
      },
      {
        year: '2028',
        milestone: 'вся сеть работает по-новому'
      }
    ]
  }
};

async function main() {
  await mkdir('output', { recursive: true });
  const raw = JSON.parse(await readFile(RAW_INPUT, 'utf8'));

  const slides = raw.slides.map((slide) => {
    const blueprint = classificationBlueprint[slide.slideNumber] ?? {
      patternId: 'needs_manual_classification',
      role: 'unknown',
      message: slide.title
    };

    return {
      slideNumber: slide.slideNumber,
      title: slide.title,
      sourceTexts: slide.texts,
      rawSummary: slide.normalizedText,
      ...blueprint
    };
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    deck: {
      sourcePptx: raw.sourceFile,
      sourceFigmaFileKey: '735drrzVTmf4AhQJwQe6vX',
      sourceFigmaPageId: '0:1',
      sourceFigmaUrl: 'https://www.figma.com/design/735drrzVTmf4AhQJwQe6vX/Untitled?node-id=0-1',
      slideSize: raw.slideSize,
      designRulePriority: [
        'DESIGN_FIDELITY_ADDENDUM.md',
        'MASTER_CODEX_PROMPT.md',
        'docs/*'
      ],
      notes: [
        'New slides must be reference-matched to existing Figma frames.',
        'The PPTX is semantic input, not a styling source.'
      ]
    },
    slides
  };

  await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${OUTPUT} with ${slides.length} classified slide(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
