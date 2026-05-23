// Generated from output/production-spec.json
var productionSpec = {
  "generatedAt": "2026-05-23T10:36:31.890Z",
  "deck": {
    "name": "Эксплуатация и ИТ — Годовой отчёт 2025",
    "targetFigmaFileKey": "735drrzVTmf4AhQJwQe6vX",
    "slideSize": {
      "width": 1920,
      "height": 1080
    },
    "sourcePptx": "input/current-draft.pptx"
  },
  "slides": [
    {
      "name": "CURRENT / 01 / Cover",
      "role": "cover",
      "productionMode": "clean-clone-remove-content-rebuild",
      "sourcePptxTitle": "Код успеха: Годовой отчёт 2025",
      "content": {
        "title": "Код успеха: Годовой отчёт 2025",
        "subtitle": "12 месяцев надежности и сервиса",
        "department": "Департамент Эксплуатации и информационной поддержки",
        "speaker": "Евгений Козлов"
      },
      "styleRefs": [
        {
          "frameId": "25:6981",
          "frameName": "1",
          "priority": 1,
          "borrowed": [
            "title system",
            "grid logic",
            "background family"
          ],
          "rationale": "Reference 25:6981 best matches the cover role without requiring blind inheritance."
        },
        {
          "frameId": "25:8357",
          "frameName": "5",
          "priority": 2,
          "borrowed": [
            "card shell family",
            "metric hierarchy"
          ],
          "rationale": "Reference 25:8357 best matches the cover role without requiring blind inheritance."
        },
        {
          "frameId": "25:8501",
          "frameName": "4584",
          "priority": 3,
          "borrowed": [
            "supporting asset language",
            "microcopy density"
          ],
          "rationale": "Reference 25:8501 best matches the cover role without requiring blind inheritance."
        }
      ],
      "assetRefs": [
        {
          "assetId": "cover-background-photo",
          "assetType": "background",
          "sourceFrameId": "25:6981",
          "reason": "Executive photo cover backdrop"
        },
        {
          "assetId": "cover-brand-mark",
          "assetType": "logo",
          "sourceFrameId": "25:6981",
          "reason": "Bottom brand mark / footer lockup"
        },
        {
          "assetId": "analytics-red-glow",
          "assetType": "glow",
          "sourceFrameId": "25:7247",
          "reason": "Ambient red/orange stage glow"
        }
      ],
      "elements": [
        {
          "id": "cover-bg",
          "type": "asset-ref",
          "assetId": "cover-background-photo",
          "x": 0,
          "y": 0,
          "width": 1920,
          "height": 1080,
          "mode": "direct-safe",
          "opacity": 1
        },
        {
          "id": "cover-logo",
          "type": "asset-ref",
          "assetId": "cover-brand-mark",
          "x": 656,
          "y": 896,
          "width": 607,
          "height": 63,
          "mode": "direct-safe",
          "opacity": 1
        },
        {
          "id": "cover-subtitle",
          "type": "text",
          "text": "12 месяцев надежности и сервиса",
          "tokenId": "typography.cover.eyebrow.size",
          "x": 650,
          "y": 130,
          "width": 621,
          "height": 104,
          "align": "CENTER",
          "colorTokenId": "color.text.secondary"
        },
        {
          "id": "cover-title",
          "type": "text",
          "text": "Код успеха: Годовой отчёт 2025",
          "tokenId": "typography.hero.title.size",
          "x": 212,
          "y": 485,
          "width": 1497,
          "height": 110,
          "align": "CENTER",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "cover-department",
          "type": "text",
          "text": "Департамент Эксплуатации и информационной поддержки",
          "tokenId": "typography.card.title.size",
          "x": 420,
          "y": 640,
          "width": 1080,
          "height": 48,
          "align": "CENTER",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "cover-speaker",
          "type": "text",
          "text": "Евгений Козлов",
          "tokenId": "typography.cover.speaker.size",
          "x": 799,
          "y": 727,
          "width": 323,
          "height": 37,
          "align": "CENTER",
          "colorTokenId": "color.text.secondary"
        }
      ],
      "forbiddenContent": [
        "old chart data",
        "old legend",
        "old years",
        "old source note",
        "old competitor names",
        "old department/topic labels",
        "any inherited text not present in current PPTX content",
        "old speaker names",
        "old cover title"
      ],
      "qaExpectations": [
        "Use X5 Sans only.",
        "Do not inherit irrelevant source text.",
        "Preserve source-deck hierarchy and spacing logic.",
        "Cover must feel native to source frame 25:6981."
      ]
    },
    {
      "name": "CURRENT / 02 / Year In Numbers",
      "role": "numeric-overview",
      "productionMode": "hybrid-source-composition",
      "sourcePptxTitle": "2025 год .Взгляд в цифрах .",
      "content": {
        "title": "2025 год .Взгляд в цифрах .",
        "macroZones": [
          "Объемы",
          "Сервис",
          "Затраты"
        ],
        "metrics": {
          "volumes": [
            "+2.308 магазинов",
            "14.187.724 м2"
          ],
          "service": [
            "Сервис >98% при нормативе 95%",
            "60.000 РЦ заявок",
            "2.279.660 заявок магазинов"
          ],
          "costs": [
            "283.800 руб. на магазин в месяц (+11%)",
            "20.600 руб. материалы (-2%)",
            "Электроэнергия РЦ / ТТ"
          ]
        },
        "utility": [
          "РЦ: 279.903.495 кВт / 1.705 млн руб.",
          "ТТ: 3.830.662.623 кВт / 34.403 млн руб."
        ]
      },
      "styleRefs": [
        {
          "frameId": "25:7044",
          "frameName": "18",
          "priority": 1,
          "borrowed": [
            "title system",
            "grid logic",
            "background family"
          ],
          "rationale": "Reference 25:7044 best matches the numeric-overview role without requiring blind inheritance."
        },
        {
          "frameId": "25:7544",
          "frameName": "12",
          "priority": 2,
          "borrowed": [
            "card shell family",
            "metric hierarchy"
          ],
          "rationale": "Reference 25:7544 best matches the numeric-overview role without requiring blind inheritance."
        },
        {
          "frameId": "25:10750",
          "frameName": "4616",
          "priority": 3,
          "borrowed": [
            "supporting asset language",
            "microcopy density"
          ],
          "rationale": "Reference 25:10750 best matches the numeric-overview role without requiring blind inheritance."
        }
      ],
      "assetRefs": [
        {
          "assetId": "analytics-red-glow",
          "assetType": "glow",
          "sourceFrameId": "25:7247",
          "reason": "Ambient red/orange stage glow"
        },
        {
          "assetId": "analytics-right-chart-shell",
          "assetType": "chart-shell",
          "sourceFrameId": "25:7247",
          "reason": "Secondary chart or callout panel shell"
        },
        {
          "assetId": "analytics-left-chart-shell",
          "assetType": "chart-shell",
          "sourceFrameId": "25:7247",
          "reason": "Primary left content panel shell"
        },
        {
          "assetId": "analytics-line-system",
          "assetType": "line-system",
          "sourceFrameId": "25:7247",
          "reason": "Accent analytic polyline family"
        },
        {
          "assetId": "metric-card-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7044",
          "reason": "Large KPI card shell family"
        }
      ],
      "elements": [
        {
          "id": "numbers-glow",
          "type": "asset-ref",
          "assetId": "analytics-red-glow",
          "x": 90,
          "y": 920,
          "width": 1740,
          "height": 620,
          "mode": "style-reference",
          "opacity": 0.85
        },
        {
          "id": "numbers-title",
          "type": "text",
          "text": "2025 год .Взгляд в цифрах .",
          "tokenId": "typography.slide.title.size",
          "x": 60,
          "y": 50,
          "width": 1600,
          "height": 80,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "numbers-volumes",
          "type": "metric-card",
          "title": "Объемы",
          "value": "+2.308 / 14.187.724 м2",
          "support": "Магазины и общая площадь",
          "x": 60,
          "y": 210,
          "width": 560,
          "height": 300,
          "accent": "color.accent.red",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "numbers-service",
          "type": "metric-card",
          "title": "Сервис",
          "value": "98%",
          "support": "Норматив 95% + 60.000 / 2.279.660 заявок",
          "x": 680,
          "y": 210,
          "width": 560,
          "height": 300,
          "accent": "color.accent.orange",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "numbers-costs",
          "type": "metric-card",
          "title": "Затраты",
          "value": "283.800 руб.",
          "support": "20.600 руб. материалы, энергия РЦ/ТТ",
          "x": 1300,
          "y": 210,
          "width": 560,
          "height": 300,
          "accent": "color.accent.amber",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "numbers-utility-1",
          "type": "text",
          "text": "РЦ: 279.903.495 кВт / 1.705 млн руб.",
          "tokenId": "typography.body.size",
          "x": 60,
          "y": 580,
          "width": 860,
          "height": 40,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "numbers-utility-2",
          "type": "text",
          "text": "ТТ: 3.830.662.623 кВт / 34.403 млн руб.",
          "tokenId": "typography.body.size",
          "x": 60,
          "y": 630,
          "width": 860,
          "height": 40,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "numbers-foot",
          "type": "text",
          "text": "Годовой обзор должен остаться трёхзонным и самостоятельным без наследования старых легенд.",
          "tokenId": "typography.footnote.size",
          "x": 60,
          "y": 972,
          "width": 1080,
          "height": 40,
          "align": "LEFT",
          "colorTokenId": "color.text.secondary"
        }
      ],
      "forbiddenContent": [
        "old chart data",
        "old legend",
        "old years",
        "old source note",
        "old competitor names",
        "old department/topic labels",
        "any inherited text not present in current PPTX content"
      ],
      "qaExpectations": [
        "Use X5 Sans only.",
        "Do not inherit irrelevant source text.",
        "Preserve source-deck hierarchy and spacing logic.",
        "Three macro-zones must remain visually distinct."
      ]
    },
    {
      "name": "CURRENT / 03 / Achievements",
      "role": "achievements",
      "productionMode": "hybrid-source-composition",
      "sourcePptxTitle": "Ключевые достижения 2025",
      "content": {
        "title": "Ключевые достижения 2025",
        "subtitle": "Надёжность и Эффективность: стабильный сервис, оптимальные затраты",
        "proofLine": "Бесперебойная работа систем/сервисов с учетом выполненной экономической эффективности",
        "comparison": [
          {
            "focus": "2,39% затрат / 87.007 млрд руб.",
            "result": "Рост тарифов 6% / эффективность 3,2 млрд руб."
          },
          {
            "focus": "2,38% затрат / 84.655 млрд руб.",
            "result": "Рост тарифов 14% / эффективность 3.906 млрд руб."
          }
        ],
        "conclusions": [
          "Оптимизировали затраты бюджета на 2.400 млн руб.",
          "Лучше в % от выручки на 0,01 п.п.",
          "Перевыполнили цель по эффективности на 706 млн руб."
        ]
      },
      "styleRefs": [
        {
          "frameId": "25:7544",
          "frameName": "12",
          "priority": 1,
          "borrowed": [
            "title system",
            "grid logic",
            "background family"
          ],
          "rationale": "Reference 25:7544 best matches the achievements role without requiring blind inheritance."
        },
        {
          "frameId": "25:10750",
          "frameName": "4616",
          "priority": 2,
          "borrowed": [
            "card shell family",
            "metric hierarchy"
          ],
          "rationale": "Reference 25:10750 best matches the achievements role without requiring blind inheritance."
        },
        {
          "frameId": "25:10966",
          "frameName": "4620",
          "priority": 3,
          "borrowed": [
            "supporting asset language",
            "microcopy density"
          ],
          "rationale": "Reference 25:10966 best matches the achievements role without requiring blind inheritance."
        }
      ],
      "assetRefs": [
        {
          "assetId": "analytics-red-glow",
          "assetType": "glow",
          "sourceFrameId": "25:7247",
          "reason": "Ambient red/orange stage glow"
        },
        {
          "assetId": "analytics-line-system",
          "assetType": "line-system",
          "sourceFrameId": "25:7247",
          "reason": "Accent analytic polyline family"
        },
        {
          "assetId": "metric-card-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7044",
          "reason": "Large KPI card shell family"
        },
        {
          "assetId": "result-grid-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7544",
          "reason": "Matrix + stacked result card family"
        },
        {
          "assetId": "architecture-board-shell",
          "assetType": "card-shell",
          "sourceFrameId": "25:10434",
          "reason": "Multi-zone architecture board shell"
        }
      ],
      "elements": [
        {
          "id": "achievements-shell",
          "type": "asset-ref",
          "assetId": "metric-card-shell-family",
          "x": 60,
          "y": 220,
          "width": 1800,
          "height": 740,
          "mode": "style-reference",
          "opacity": 1
        },
        {
          "id": "achievements-title",
          "type": "text",
          "text": "Ключевые достижения 2025",
          "tokenId": "typography.slide.title.size",
          "x": 60,
          "y": 50,
          "width": 1500,
          "height": 80,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "achievements-subtitle",
          "type": "text",
          "text": "Надёжность и Эффективность: стабильный сервис, оптимальные затраты",
          "tokenId": "typography.body.size",
          "x": 60,
          "y": 118,
          "width": 1680,
          "height": 50,
          "align": "LEFT",
          "colorTokenId": "color.text.secondary"
        },
        {
          "id": "achievements-left",
          "type": "metric-card",
          "title": "Фокус",
          "value": "2,39% / 87.007 млрд",
          "support": "Рост тарифов 6% / эффективность 3,2 млрд",
          "x": 60,
          "y": 230,
          "width": 860,
          "height": 300,
          "accent": "color.accent.red",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "achievements-right",
          "type": "metric-card",
          "title": "Итог",
          "value": "2,38% / 84.655 млрд",
          "support": "Рост тарифов 14% / эффективность 3.906 млрд",
          "x": 980,
          "y": 230,
          "width": 880,
          "height": 300,
          "accent": "color.accent.orange",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "achievements-conclusions",
          "type": "pillar-grid",
          "title": "Выводы",
          "items": [
            "Оптимизировали затраты бюджета на 2.400 млн руб.",
            "Лучше в % от выручки на 0,01 п.п.",
            "Перевыполнили цель по эффективности на 706 млн руб."
          ],
          "x": 60,
          "y": 590,
          "width": 1800,
          "height": 260,
          "columns": 3
        }
      ],
      "forbiddenContent": [
        "old chart data",
        "old legend",
        "old years",
        "old source note",
        "old competitor names",
        "old department/topic labels",
        "any inherited text not present in current PPTX content"
      ],
      "qaExpectations": [
        "Use X5 Sans only.",
        "Do not inherit irrelevant source text.",
        "Preserve source-deck hierarchy and spacing logic.",
        "No old market chart data or legacy legends may survive on this slide."
      ]
    },
    {
      "name": "CURRENT / 04 / Execution Result",
      "role": "efficiency-result",
      "productionMode": "hybrid-source-composition",
      "sourcePptxTitle": "Эффективность: Результат исполнения целей",
      "content": {
        "title": "Эффективность: Результат исполнения целей",
        "summary": [
          "Оптимизация и автоматизация процессов +3.867 млрд руб.",
          "Проекты +0,39 млрд руб."
        ],
        "initiatives": [
          "Переход на платформу WRS-2 в клининге",
          "Чек-лист для КА на WRS",
          "Dashboard Эксплуатации",
          "Тестирование пяти роботов-уборщиков",
          "Подключили 7.266 КМ и 5.081 ХП"
        ],
        "drivers": [
          "Оптимизировали тарифы и стоимость обслуживания: 2.828 млн руб.",
          "Заключили 1.409 прямых договоров (+17% к плану)",
          "Пересобрали процесс заказа расходных материалов: -1.039 млн руб.",
          "Оптимизировали потребление кВт/ч 2025 к 2024 на 4%"
        ]
      },
      "styleRefs": [
        {
          "frameId": "25:10479",
          "frameName": "4610",
          "priority": 1,
          "borrowed": [
            "title system",
            "grid logic",
            "background family"
          ],
          "rationale": "Reference 25:10479 best matches the efficiency-result role without requiring blind inheritance."
        },
        {
          "frameId": "25:10664",
          "frameName": "4614",
          "priority": 2,
          "borrowed": [
            "card shell family",
            "metric hierarchy"
          ],
          "rationale": "Reference 25:10664 best matches the efficiency-result role without requiring blind inheritance."
        },
        {
          "frameId": "25:10876",
          "frameName": "4618",
          "priority": 3,
          "borrowed": [
            "supporting asset language",
            "microcopy density"
          ],
          "rationale": "Reference 25:10876 best matches the efficiency-result role without requiring blind inheritance."
        }
      ],
      "assetRefs": [
        {
          "assetId": "analytics-line-system",
          "assetType": "line-system",
          "sourceFrameId": "25:7247",
          "reason": "Accent analytic polyline family"
        },
        {
          "assetId": "metric-card-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7044",
          "reason": "Large KPI card shell family"
        },
        {
          "assetId": "result-grid-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7544",
          "reason": "Matrix + stacked result card family"
        },
        {
          "assetId": "architecture-board-shell",
          "assetType": "card-shell",
          "sourceFrameId": "25:10434",
          "reason": "Multi-zone architecture board shell"
        },
        {
          "assetId": "process-rail-system",
          "assetType": "line-system",
          "sourceFrameId": "25:10876",
          "reason": "Horizontal process / roadmap rail"
        }
      ],
      "elements": [
        {
          "id": "efficiency-shell",
          "type": "asset-ref",
          "assetId": "architecture-board-shell",
          "x": 60,
          "y": 210,
          "width": 1800,
          "height": 760,
          "mode": "style-reference",
          "opacity": 1
        },
        {
          "id": "efficiency-title",
          "type": "text",
          "text": "Эффективность: Результат исполнения целей",
          "tokenId": "typography.slide.title.size",
          "x": 60,
          "y": 50,
          "width": 1500,
          "height": 80,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "efficiency-summary-1",
          "type": "metric-card",
          "title": "Оптимизация и автоматизация",
          "value": "+3.867 млрд",
          "support": "Основной контур экономического эффекта",
          "x": 60,
          "y": 220,
          "width": 560,
          "height": 220,
          "accent": "color.accent.red",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "efficiency-summary-2",
          "type": "metric-card",
          "title": "Проекты",
          "value": "+0,39 млрд",
          "support": "Проектный вклад в результат",
          "x": 650,
          "y": 220,
          "width": 420,
          "height": 220,
          "accent": "color.accent.orange",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "efficiency-initiatives",
          "type": "bullet-list",
          "title": "Инициативы",
          "items": [
            "Переход на платформу WRS-2 в клининге",
            "Чек-лист для КА на WRS",
            "Dashboard Эксплуатации",
            "Тестирование пяти роботов-уборщиков",
            "Подключили 7.266 КМ и 5.081 ХП"
          ],
          "x": 60,
          "y": 490,
          "width": 860,
          "height": 360,
          "columns": 1
        },
        {
          "id": "efficiency-drivers",
          "type": "bullet-list",
          "title": "Операционные драйверы",
          "items": [
            "Оптимизировали тарифы и стоимость обслуживания: 2.828 млн руб.",
            "Заключили 1.409 прямых договоров (+17% к плану)",
            "Пересобрали процесс заказа расходных материалов: -1.039 млн руб.",
            "Оптимизировали потребление кВт/ч 2025 к 2024 на 4%"
          ],
          "x": 980,
          "y": 220,
          "width": 880,
          "height": 630,
          "columns": 1
        }
      ],
      "forbiddenContent": [
        "old chart data",
        "old legend",
        "old years",
        "old source note",
        "old competitor names",
        "old department/topic labels",
        "any inherited text not present in current PPTX content"
      ],
      "qaExpectations": [
        "Use X5 Sans only.",
        "Do not inherit irrelevant source text.",
        "Preserve source-deck hierarchy and spacing logic.",
        "The slide must read as one integrated execution board, not two unrelated cloned frames."
      ]
    },
    {
      "name": "CURRENT / 05 / Transformation",
      "role": "transformation",
      "productionMode": "creative-composition-from-primitives",
      "sourcePptxTitle": "2026 год .Трансформация ______",
      "content": {
        "title": "2026 год .Трансформация ______",
        "budget": "97.9 млрд руб.",
        "challenge": "Выполнить 5 млрд эффективности и сократить затраты на 4 млрд для достижения цели компании.",
        "methods": [
          "Осознанный подход к операционным расходам",
          "Экономим электроэнергию",
          "Настраиваем графики уборки под себя",
          "Разумно расходуем материалы для торговли и склада",
          "Контролируем качество работы КА для минимизации будущих затрат"
        ]
      },
      "styleRefs": [
        {
          "frameId": "25:8364",
          "frameName": "13",
          "priority": 1,
          "borrowed": [
            "title system",
            "grid logic",
            "background family"
          ],
          "rationale": "Reference 25:8364 best matches the transformation role without requiring blind inheritance."
        },
        {
          "frameId": "25:8501",
          "frameName": "4584",
          "priority": 2,
          "borrowed": [
            "card shell family",
            "metric hierarchy"
          ],
          "rationale": "Reference 25:8501 best matches the transformation role without requiring blind inheritance."
        },
        {
          "frameId": "25:8560",
          "frameName": "4585",
          "priority": 3,
          "borrowed": [
            "supporting asset language",
            "microcopy density"
          ],
          "rationale": "Reference 25:8560 best matches the transformation role without requiring blind inheritance."
        }
      ],
      "assetRefs": [
        {
          "assetId": "cover-background-photo",
          "assetType": "background",
          "sourceFrameId": "25:6981",
          "reason": "Executive photo cover backdrop"
        },
        {
          "assetId": "analytics-red-glow",
          "assetType": "glow",
          "sourceFrameId": "25:7247",
          "reason": "Ambient red/orange stage glow"
        },
        {
          "assetId": "metric-card-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7044",
          "reason": "Large KPI card shell family"
        },
        {
          "assetId": "result-grid-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7544",
          "reason": "Matrix + stacked result card family"
        },
        {
          "assetId": "architecture-board-shell",
          "assetType": "card-shell",
          "sourceFrameId": "25:10434",
          "reason": "Multi-zone architecture board shell"
        }
      ],
      "elements": [
        {
          "id": "transformation-bg",
          "type": "asset-ref",
          "assetId": "analytics-red-glow",
          "x": 100,
          "y": 920,
          "width": 1680,
          "height": 600,
          "mode": "style-reference",
          "opacity": 0.7
        },
        {
          "id": "transformation-title",
          "type": "text",
          "text": "2026 год .Трансформация ______",
          "tokenId": "typography.slide.title.size",
          "x": 60,
          "y": 50,
          "width": 1600,
          "height": 80,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "transformation-budget",
          "type": "metric-card",
          "title": "Бюджет 2026",
          "value": "97.9 млрд руб.",
          "support": "Точка входа в год трансформации",
          "x": 60,
          "y": 210,
          "width": 560,
          "height": 260,
          "accent": "color.accent.red",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "transformation-challenge",
          "type": "text",
          "text": "Выполнить 5 млрд эффективности и сократить затраты на 4 млрд для достижения цели компании.",
          "tokenId": "typography.body.size",
          "x": 700,
          "y": 235,
          "width": 1100,
          "height": 120,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "transformation-methods",
          "type": "bullet-list",
          "title": "Как удерживаем баланс доходов и расходов",
          "items": [
            "Осознанный подход к операционным расходам",
            "Экономим электроэнергию",
            "Настраиваем графики уборки под себя",
            "Разумно расходуем материалы для торговли и склада",
            "Контролируем качество работы КА для минимизации будущих затрат"
          ],
          "x": 60,
          "y": 540,
          "width": 1500,
          "height": 360,
          "columns": 1
        }
      ],
      "forbiddenContent": [
        "old chart data",
        "old legend",
        "old years",
        "old source note",
        "old competitor names",
        "old department/topic labels",
        "any inherited text not present in current PPTX content"
      ],
      "qaExpectations": [
        "Use X5 Sans only.",
        "Do not inherit irrelevant source text.",
        "Preserve source-deck hierarchy and spacing logic.",
        "Challenge framing must feel like an executive transition slide, not a generic bullet list."
      ]
    },
    {
      "name": "CURRENT / 06 / Roadmap",
      "role": "roadmap",
      "productionMode": "hybrid-source-composition",
      "sourcePptxTitle": "2026 год Эффективность",
      "content": {
        "title": "2026 год Эффективность",
        "actions": [
          "Наращиваем долю прямых договоров до 64%",
          "Внедряем систему энергоменеджмента",
          "Раскатываем телеметрию КМ и ХП",
          "Открываем новые возможности в работе с WRS",
          "Дифференцируем сервис по локальным драйверам",
          "Освобождаем пространство, перемещая неиспользуемое оборудование",
          "Меняем устаревшие NCR на целевые кассы (8 тыс. шт.)",
          "Пилот автоматизации приемки ИТ-работ",
          "Проект по УМ: экономия 5% до конца года / 11.000 ТТ",
          "Пилотирование нового оборудования для уборки магазинов"
        ],
        "q1Results": [
          "План 452 млн руб.",
          "Факт 1.017 млн руб.",
          "Прогноз эффективности 3.727 млн руб."
        ]
      },
      "styleRefs": [
        {
          "frameId": "25:10479",
          "frameName": "4610",
          "priority": 1,
          "borrowed": [
            "title system",
            "grid logic",
            "background family"
          ],
          "rationale": "Reference 25:10479 best matches the roadmap role without requiring blind inheritance."
        },
        {
          "frameId": "25:10664",
          "frameName": "4614",
          "priority": 2,
          "borrowed": [
            "card shell family",
            "metric hierarchy"
          ],
          "rationale": "Reference 25:10664 best matches the roadmap role without requiring blind inheritance."
        },
        {
          "frameId": "25:10876",
          "frameName": "4618",
          "priority": 3,
          "borrowed": [
            "supporting asset language",
            "microcopy density"
          ],
          "rationale": "Reference 25:10876 best matches the roadmap role without requiring blind inheritance."
        }
      ],
      "assetRefs": [
        {
          "assetId": "analytics-line-system",
          "assetType": "line-system",
          "sourceFrameId": "25:7247",
          "reason": "Accent analytic polyline family"
        },
        {
          "assetId": "metric-card-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7044",
          "reason": "Large KPI card shell family"
        },
        {
          "assetId": "result-grid-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7544",
          "reason": "Matrix + stacked result card family"
        },
        {
          "assetId": "architecture-board-shell",
          "assetType": "card-shell",
          "sourceFrameId": "25:10434",
          "reason": "Multi-zone architecture board shell"
        },
        {
          "assetId": "process-rail-system",
          "assetType": "line-system",
          "sourceFrameId": "25:10876",
          "reason": "Horizontal process / roadmap rail"
        }
      ],
      "elements": [
        {
          "id": "roadmap-rail",
          "type": "asset-ref",
          "assetId": "process-rail-system",
          "x": 60,
          "y": 250,
          "width": 1220,
          "height": 620,
          "mode": "style-reference",
          "opacity": 1
        },
        {
          "id": "roadmap-panel",
          "type": "asset-ref",
          "assetId": "analytics-right-chart-shell",
          "x": 1310,
          "y": 220,
          "width": 550,
          "height": 650,
          "mode": "style-reference",
          "opacity": 1
        },
        {
          "id": "roadmap-title",
          "type": "text",
          "text": "2026 год Эффективность",
          "tokenId": "typography.slide.title.size",
          "x": 60,
          "y": 50,
          "width": 1500,
          "height": 80,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "roadmap-actions",
          "type": "bullet-list",
          "title": "Портфель действий 2026",
          "items": [
            "Наращиваем долю прямых договоров до 64%",
            "Внедряем систему энергоменеджмента",
            "Раскатываем телеметрию КМ и ХП",
            "Открываем новые возможности в работе с WRS",
            "Дифференцируем сервис по локальным драйверам",
            "Освобождаем пространство, перемещая неиспользуемое оборудование",
            "Меняем устаревшие NCR на целевые кассы (8 тыс. шт.)",
            "Пилот автоматизации приемки ИТ-работ",
            "Проект по УМ: экономия 5% до конца года / 11.000 ТТ",
            "Пилотирование нового оборудования для уборки магазинов"
          ],
          "x": 60,
          "y": 220,
          "width": 1180,
          "height": 700,
          "columns": 2
        },
        {
          "id": "roadmap-q1",
          "type": "metric-card",
          "title": "Результаты 1Q 2026",
          "value": "1.017 млн руб.",
          "support": "План 452 млн руб. / прогноз 3.727 млн руб.",
          "x": 1310,
          "y": 280,
          "width": 500,
          "height": 300,
          "accent": "color.accent.orange",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        }
      ],
      "forbiddenContent": [
        "old chart data",
        "old legend",
        "old years",
        "old source note",
        "old competitor names",
        "old department/topic labels",
        "any inherited text not present in current PPTX content"
      ],
      "qaExpectations": [
        "Use X5 Sans only.",
        "Do not inherit irrelevant source text.",
        "Preserve source-deck hierarchy and spacing logic.",
        "The Q1 tracker must read as proof of execution, not as inherited old analytics."
      ]
    },
    {
      "name": "CURRENT / 07 / Project Of Year",
      "role": "project-of-year",
      "productionMode": "hybrid-source-composition",
      "sourcePptxTitle": "Проект года",
      "content": {
        "title": "Проект года",
        "project": "Запущено производство воды СТМ Красная цена 5л.",
        "capacities": [
          "РЦ 5 Кузнецк — 40 515 бут/месяц",
          "РЦ 5 Саратов — 96 824 бут/месяц",
          "РЦ 5 Самара — 203 892 бут/месяц",
          "РЦ ЗИМ — розлив max 1 800 000 бут/месяц"
        ],
        "productionTable": [
          [
            "Начало работ Цеха Апрель",
            "22",
            "14",
            "1 680",
            "38 500",
            "1 680",
            "44 197"
          ],
          [
            "15",
            "6 601",
            "6 601"
          ],
          [
            "16",
            "6 300",
            "6 500"
          ],
          [
            "17",
            "10 464",
            "13 664"
          ],
          [
            "18",
            "13 455",
            "15 752"
          ]
        ]
      },
      "styleRefs": [
        {
          "frameId": "25:7544",
          "frameName": "12",
          "priority": 1,
          "borrowed": [
            "title system",
            "grid logic",
            "background family"
          ],
          "rationale": "Reference 25:7544 best matches the project-of-year role without requiring blind inheritance."
        },
        {
          "frameId": "25:7009",
          "frameName": "2",
          "priority": 2,
          "borrowed": [
            "card shell family",
            "metric hierarchy"
          ],
          "rationale": "Reference 25:7009 best matches the project-of-year role without requiring blind inheritance."
        },
        {
          "frameId": "25:7634",
          "frameName": "14",
          "priority": 3,
          "borrowed": [
            "supporting asset language",
            "microcopy density"
          ],
          "rationale": "Reference 25:7634 best matches the project-of-year role without requiring blind inheritance."
        }
      ],
      "assetRefs": [
        {
          "assetId": "analytics-right-chart-shell",
          "assetType": "chart-shell",
          "sourceFrameId": "25:7247",
          "reason": "Secondary chart or callout panel shell"
        },
        {
          "assetId": "analytics-left-chart-shell",
          "assetType": "chart-shell",
          "sourceFrameId": "25:7247",
          "reason": "Primary left content panel shell"
        },
        {
          "assetId": "icons-library-index",
          "assetType": "icon",
          "sourceFrameId": "25:11279",
          "reason": "Neutral icon source frame"
        }
      ],
      "elements": [
        {
          "id": "project-shell",
          "type": "asset-ref",
          "assetId": "analytics-left-chart-shell",
          "x": 60,
          "y": 220,
          "width": 1800,
          "height": 740,
          "mode": "style-reference",
          "opacity": 1
        },
        {
          "id": "project-title",
          "type": "text",
          "text": "Проект года",
          "tokenId": "typography.slide.title.size",
          "x": 60,
          "y": 50,
          "width": 1500,
          "height": 80,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "project-subtitle",
          "type": "text",
          "text": "Запущено производство воды СТМ Красная цена 5л.",
          "tokenId": "typography.body.size",
          "x": 60,
          "y": 120,
          "width": 1400,
          "height": 48,
          "align": "LEFT",
          "colorTokenId": "color.text.secondary"
        },
        {
          "id": "project-kuznetsk",
          "type": "metric-card",
          "title": "РЦ 5 Кузнецк",
          "value": "40 515 бут/мес.",
          "support": "Локальная мощность",
          "x": 60,
          "y": 220,
          "width": 400,
          "height": 180,
          "accent": "color.accent.red",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "project-saratov",
          "type": "metric-card",
          "title": "РЦ 5 Саратов",
          "value": "96 824 бут/мес.",
          "support": "Локальная мощность",
          "x": 490,
          "y": 220,
          "width": 400,
          "height": 180,
          "accent": "color.accent.orange",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "project-samara",
          "type": "metric-card",
          "title": "РЦ 5 Самара",
          "value": "203 892 бут/мес.",
          "support": "Локальная мощность",
          "x": 920,
          "y": 220,
          "width": 400,
          "height": 180,
          "accent": "color.accent.amber",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "project-zim",
          "type": "metric-card",
          "title": "РЦ ЗИМ",
          "value": "1 800 000 бут/мес.",
          "support": "Максимальная мощность розлива",
          "x": 1350,
          "y": 220,
          "width": 510,
          "height": 180,
          "accent": "color.accent.red",
          "titleTokenId": "typography.card.title.size",
          "valueTokenId": "typography.metric.number.size"
        },
        {
          "id": "project-table",
          "type": "table",
          "title": "План производства April-August",
          "headers": [
            "Месяц",
            "Рабочих дней",
            "Номер недели",
            "План продаж кол-во (шт.)",
            "Итого План",
            "План розлива кол-во (шт.)",
            "Итого Прогноз"
          ],
          "rows": [
            [
              "Начало работ Цеха Апрель",
              "22",
              "14",
              "1 680",
              "38 500",
              "1 680",
              "44 197"
            ],
            [
              "15",
              "6 601",
              "6 601"
            ],
            [
              "16",
              "6 300",
              "6 500"
            ],
            [
              "17",
              "10 464",
              "13 664"
            ],
            [
              "18",
              "13 455",
              "15 752"
            ]
          ],
          "x": 60,
          "y": 450,
          "width": 1800,
          "height": 430
        }
      ],
      "forbiddenContent": [
        "old chart data",
        "old legend",
        "old years",
        "old source note",
        "old competitor names",
        "old department/topic labels",
        "any inherited text not present in current PPTX content",
        "old market labels",
        "irrelevant process copy"
      ],
      "qaExpectations": [
        "Use X5 Sans only.",
        "Do not inherit irrelevant source text.",
        "Preserve source-deck hierarchy and spacing logic.",
        "The production table must remain editable and free of any unrelated inherited notes."
      ]
    },
    {
      "name": "CURRENT / 08 / Strategy",
      "role": "strategy",
      "productionMode": "hybrid-source-composition",
      "sourcePptxTitle": "Стратегия",
      "content": {
        "title": "Стратегия ДЭиИП",
        "promise": "2026",
        "principles": [
          "Новые идеи и внедрение лучших практик",
          "Партнерство",
          "Техническое",
          "превосходство",
          "Лучшие",
          "кадры",
          "Лидерство",
          "Оптимизация затрат",
          "Устойчивый и качественный сервис",
          "Фокус на результат",
          "Органический рост"
        ]
      },
      "styleRefs": [
        {
          "frameId": "25:8560",
          "frameName": "4585",
          "priority": 1,
          "borrowed": [
            "title system",
            "grid logic",
            "background family"
          ],
          "rationale": "Reference 25:8560 best matches the strategy role without requiring blind inheritance."
        },
        {
          "frameId": "25:9043",
          "frameName": "4592",
          "priority": 2,
          "borrowed": [
            "card shell family",
            "metric hierarchy"
          ],
          "rationale": "Reference 25:9043 best matches the strategy role without requiring blind inheritance."
        },
        {
          "frameId": "25:9634",
          "frameName": "23",
          "priority": 3,
          "borrowed": [
            "supporting asset language",
            "microcopy density"
          ],
          "rationale": "Reference 25:9634 best matches the strategy role without requiring blind inheritance."
        }
      ],
      "assetRefs": [
        {
          "assetId": "analytics-red-glow",
          "assetType": "glow",
          "sourceFrameId": "25:7247",
          "reason": "Ambient red/orange stage glow"
        },
        {
          "assetId": "metric-card-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7044",
          "reason": "Large KPI card shell family"
        },
        {
          "assetId": "result-grid-shell-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:7544",
          "reason": "Matrix + stacked result card family"
        },
        {
          "assetId": "architecture-board-shell",
          "assetType": "card-shell",
          "sourceFrameId": "25:10434",
          "reason": "Multi-zone architecture board shell"
        },
        {
          "assetId": "three-pillar-card-family",
          "assetType": "card-shell",
          "sourceFrameId": "25:10717",
          "reason": "Three-pillar statement cards"
        }
      ],
      "elements": [
        {
          "id": "strategy-shell",
          "type": "asset-ref",
          "assetId": "three-pillar-card-family",
          "x": 60,
          "y": 250,
          "width": 1800,
          "height": 640,
          "mode": "style-reference",
          "opacity": 1
        },
        {
          "id": "strategy-title",
          "type": "text",
          "text": "Стратегия ДЭиИП",
          "tokenId": "typography.slide.title.size",
          "x": 60,
          "y": 50,
          "width": 1500,
          "height": 80,
          "align": "LEFT",
          "colorTokenId": "color.text.primary"
        },
        {
          "id": "strategy-promise",
          "type": "text",
          "text": "2026",
          "tokenId": "typography.body.size",
          "x": 60,
          "y": 120,
          "width": 1400,
          "height": 48,
          "align": "LEFT",
          "colorTokenId": "color.text.secondary"
        },
        {
          "id": "strategy-principles",
          "type": "pillar-grid",
          "title": "Фокус 2026",
          "items": [
            "Новые идеи и внедрение лучших практик",
            "Партнерство",
            "Техническое",
            "превосходство",
            "Лучшие",
            "кадры",
            "Лидерство",
            "Оптимизация затрат",
            "Устойчивый и качественный сервис",
            "Фокус на результат",
            "Органический рост"
          ],
          "x": 60,
          "y": 260,
          "width": 1800,
          "height": 560,
          "columns": 4
        }
      ],
      "forbiddenContent": [
        "old chart data",
        "old legend",
        "old years",
        "old source note",
        "old competitor names",
        "old department/topic labels",
        "any inherited text not present in current PPTX content"
      ],
      "qaExpectations": [
        "Use X5 Sans only.",
        "Do not inherit irrelevant source text.",
        "Preserve source-deck hierarchy and spacing logic.",
        "Principles should read as native strategy pillars, not generic cards."
      ]
    }
  ]
};
var runtimeReadiness = {
  "generatedAt": "2026-05-23T10:36:31.891Z",
  "mcpRunner": {
    "canAccessFigma": true,
    "canWriteFigma": true,
    "x5SansAvailable": false,
    "blockingIssues": [
      "MCP runtime currently cannot load X5 Sans, so final editable Figma generation must remain blocked.",
      "Fallback fonts are forbidden."
    ]
  },
  "localPluginRunner": {
    "availableAsFallback": true,
    "primaryWorkflow": false
  },
  "previewRunner": {
    "runnerType": "preview-runner",
    "displayName": "Screenshot QA preview runner",
    "purpose": "Validate generated-frame screenshots against production-spec expectations."
  },
  "recommendedNextAction": "Keep MCP as the primary path, wait for X5 Sans support there, and only use the local plugin as an explicit fallback if editable output is urgently required.",
  "canGenerateFinalEditableFigmaNow": false
};
var REQUIRED_FONT_FAMILY = 'X5 Sans';
var REQUIRED_FONT_ERROR = 'X5 Sans is required but not available in this Figma environment.';

function collectFrames(page) {
  var frames = [];
  for (var i = 0; i < page.children.length; i += 1) {
    if (page.children[i].type === 'FRAME') {
      frames.push(page.children[i]);
    }
  }
  return frames;
}

async function ensureRequiredFonts() {
  var availableFonts = await figma.listAvailableFontsAsync();
  var wantedStyles = ['Light', 'Regular', 'Medium', 'Bold'];
  var availableStyles = {};
  for (var i = 0; i < availableFonts.length; i += 1) {
    var entry = availableFonts[i];
    if (entry.fontName && entry.fontName.family === REQUIRED_FONT_FAMILY) {
      availableStyles[entry.fontName.style] = true;
    }
  }

  for (var styleIndex = 0; styleIndex < wantedStyles.length; styleIndex += 1) {
    var style = wantedStyles[styleIndex];
    if (!availableStyles[style]) {
      throw new Error(REQUIRED_FONT_ERROR);
    }
    await figma.loadFontAsync({ family: REQUIRED_FONT_FAMILY, style: style });
  }
}

function nextColumnX(page) {
  var frames = collectFrames(page);
  var maxRight = 0;
  for (var i = 0; i < frames.length; i += 1) {
    var frame = frames[i];
    var right = frame.x + frame.width;
    if (right > maxRight) {
      maxRight = right;
    }
  }
  return maxRight + 240;
}

function applyTextStyle(node, element) {
  node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Regular' };
  if (element.tokenId === 'typography.hero.title.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Medium' };
    node.fontSize = 120;
    node.lineHeight = { unit: 'PIXELS', value: 100 };
    node.letterSpacing = { unit: 'PERCENT', value: -4 };
  } else if (element.tokenId === 'typography.slide.title.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Medium' };
    node.fontSize = 46;
    node.lineHeight = { unit: 'PIXELS', value: 55 };
    node.letterSpacing = { unit: 'PERCENT', value: -3 };
  } else if (element.tokenId === 'typography.card.title.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Bold' };
    node.fontSize = 32;
    node.lineHeight = { unit: 'PIXELS', value: 40 };
  } else if (element.tokenId === 'typography.cover.speaker.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Regular' };
    node.fontSize = 31;
  } else if (element.tokenId === 'typography.cover.eyebrow.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Light' };
    node.fontSize = 43;
    node.letterSpacing = { unit: 'PERCENT', value: 10 };
  } else if (element.tokenId === 'typography.footnote.size') {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Regular' };
    node.fontSize = 26;
    node.opacity = 0.74;
  } else {
    node.fontName = { family: REQUIRED_FONT_FAMILY, style: 'Regular' };
    node.fontSize = 26;
  }

  node.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  if (element.colorTokenId === 'color.text.secondary') {
    node.fills = [{ type: 'SOLID', color: { r: 0.74, g: 0.74, b: 0.74 } }];
  }
  node.textAlignHorizontal = element.align === 'CENTER' ? 'CENTER' : 'LEFT';
}

function createTextElement(frame, element) {
  var node = figma.createText();
  applyTextStyle(node, element);
  node.characters = element.text;
  node.x = element.x;
  node.y = element.y;
  node.resize(element.width, element.height);
  frame.appendChild(node);
}

function createAssetRef(frame, element) {
  var node;
  if (element.assetId.indexOf('glow') !== -1) {
    node = figma.createEllipse();
    node.fills = [{ type: 'SOLID', color: { r: 0.84, g: 0.05, b: 0.05 }, opacity: 0.37 }];
    node.effects = [{ type: 'LAYER_BLUR', radius: 233, visible: true, blendMode: 'NORMAL' }];
  } else {
    node = figma.createRectangle();
    node.fills = [{ type: 'SOLID', color: { r: 0.06, g: 0.06, b: 0.07 } }];
    node.strokes = [{ type: 'SOLID', color: { r: 0.92, g: 0.14, b: 0.09 }, opacity: 0.22 }];
    node.strokeWeight = 1;
    node.cornerRadius = 28;
  }
  node.name = 'ASSET / ' + element.assetId;
  node.x = element.x;
  node.y = element.y;
  node.resize(element.width, element.height);
  node.opacity = typeof element.opacity === 'number' ? element.opacity : 1;
  frame.appendChild(node);
}

function createMetricCard(frame, element) {
  var rect = figma.createRectangle();
  rect.name = 'CARD / ' + element.id;
  rect.x = element.x;
  rect.y = element.y;
  rect.resize(element.width, element.height);
  rect.cornerRadius = 32;
  rect.fills = [{ type: 'SOLID', color: { r: 0.08, g: 0.08, b: 0.09 }, opacity: 0.96 }];
  rect.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.12 }];
  rect.strokeWeight = 1;
  frame.appendChild(rect);

  createTextElement(frame, {
    id: element.id + '-title',
    type: 'text',
    text: element.title,
    tokenId: 'typography.card.title.size',
    x: element.x + 32,
    y: element.y + 28,
    width: element.width - 64,
    height: 44,
    align: 'LEFT',
    colorTokenId: 'color.text.secondary'
  });

  createTextElement(frame, {
    id: element.id + '-value',
    type: 'text',
    text: element.value,
    tokenId: 'typography.slide.title.size',
    x: element.x + 32,
    y: element.y + 88,
    width: element.width - 64,
    height: 80,
    align: 'LEFT',
    colorTokenId: 'color.text.primary'
  });

  if (element.support) {
    createTextElement(frame, {
      id: element.id + '-support',
      type: 'text',
      text: element.support,
      tokenId: 'typography.body.size',
      x: element.x + 32,
      y: element.y + element.height - 72,
      width: element.width - 64,
      height: 44,
      align: 'LEFT',
      colorTokenId: 'color.text.secondary'
    });
  }
}

function createBulletList(frame, element) {
  var rect = figma.createRectangle();
  rect.name = 'LIST / ' + element.id;
  rect.x = element.x;
  rect.y = element.y;
  rect.resize(element.width, element.height);
  rect.cornerRadius = 24;
  rect.fills = [{ type: 'SOLID', color: { r: 0.08, g: 0.08, b: 0.09 }, opacity: 0.75 }];
  rect.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.08 }];
  frame.appendChild(rect);

  createTextElement(frame, {
    id: element.id + '-title',
    type: 'text',
    text: element.title,
    tokenId: 'typography.card.title.size',
    x: element.x + 28,
    y: element.y + 24,
    width: element.width - 56,
    height: 40,
    align: 'LEFT',
    colorTokenId: 'color.text.primary'
  });

  var columns = element.columns || 1;
  var columnWidth = Math.floor((element.width - 56 - (columns - 1) * 24) / columns);
  var itemsPerColumn = Math.ceil(element.items.length / columns);
  for (var i = 0; i < element.items.length; i += 1) {
    var column = Math.floor(i / itemsPerColumn);
    var row = i % itemsPerColumn;
    var prefix = column > 0 ? '• ' : '• ';
    createTextElement(frame, {
      id: element.id + '-item-' + i,
      type: 'text',
      text: prefix + element.items[i],
      tokenId: 'typography.body.size',
      x: element.x + 28 + column * (columnWidth + 24),
      y: element.y + 84 + row * 46,
      width: columnWidth,
      height: 38,
      align: 'LEFT',
      colorTokenId: 'color.text.secondary'
    });
  }
}

function createTable(frame, element) {
  var rect = figma.createRectangle();
  rect.name = 'TABLE / ' + element.id;
  rect.x = element.x;
  rect.y = element.y;
  rect.resize(element.width, element.height);
  rect.cornerRadius = 24;
  rect.fills = [{ type: 'SOLID', color: { r: 0.08, g: 0.08, b: 0.09 }, opacity: 0.88 }];
  rect.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.08 }];
  frame.appendChild(rect);

  createTextElement(frame, {
    id: element.id + '-title',
    type: 'text',
    text: element.title,
    tokenId: 'typography.card.title.size',
    x: element.x + 24,
    y: element.y + 20,
    width: element.width - 48,
    height: 36,
    align: 'LEFT',
    colorTokenId: 'color.text.primary'
  });

  var headers = element.headers || [];
  var rows = element.rows || [];
  var columnCount = headers.length > 0 ? headers.length : (rows[0] ? rows[0].length : 0);
  if (columnCount < 1) {
    return;
  }

  var tableTop = element.y + 74;
  var rowHeight = 54;
  var columnWidth = Math.floor((element.width - 48) / columnCount);
  for (var h = 0; h < headers.length; h += 1) {
    createTextElement(frame, {
      id: element.id + '-header-' + h,
      type: 'text',
      text: headers[h],
      tokenId: 'typography.body.size',
      x: element.x + 24 + h * columnWidth,
      y: tableTop,
      width: columnWidth - 12,
      height: 36,
      align: 'LEFT',
      colorTokenId: 'color.text.primary'
    });
  }

  for (var r = 0; r < rows.length; r += 1) {
    for (var c = 0; c < columnCount; c += 1) {
      createTextElement(frame, {
        id: element.id + '-cell-' + r + '-' + c,
        type: 'text',
        text: rows[r][c] || '',
        tokenId: 'typography.footnote.size',
        x: element.x + 24 + c * columnWidth,
        y: tableTop + rowHeight * (r + 1),
        width: columnWidth - 12,
        height: 34,
        align: 'LEFT',
        colorTokenId: c === 0 ? 'color.text.primary' : 'color.text.secondary'
      });
    }
  }
}

function createPillarGrid(frame, element) {
  var columns = element.columns || 3;
  var gap = 24;
  var cardWidth = Math.floor((element.width - gap * (columns - 1)) / columns);
  var rows = Math.ceil(element.items.length / columns);
  var cardHeight = Math.floor((element.height - gap * (rows - 1)) / rows);

  if (element.title) {
    createTextElement(frame, {
      id: element.id + '-title',
      type: 'text',
      text: element.title,
      tokenId: 'typography.card.title.size',
      x: element.x,
      y: element.y - 48,
      width: element.width,
      height: 40,
      align: 'LEFT',
      colorTokenId: 'color.text.primary'
    });
  }

  for (var i = 0; i < element.items.length; i += 1) {
    var col = i % columns;
    var row = Math.floor(i / columns);
    createMetricCard(frame, {
      id: element.id + '-pillar-' + i,
      title: 'Принцип ' + (i + 1),
      value: element.items[i],
      support: '',
      x: element.x + col * (cardWidth + gap),
      y: element.y + row * (cardHeight + gap),
      width: cardWidth,
      height: cardHeight
    });
  }
}

function renderElement(frame, element) {
  if (element.type === 'text') {
    createTextElement(frame, element);
    return;
  }
  if (element.type === 'asset-ref') {
    createAssetRef(frame, element);
    return;
  }
  if (element.type === 'metric-card') {
    createMetricCard(frame, element);
    return;
  }
  if (element.type === 'bullet-list') {
    createBulletList(frame, element);
    return;
  }
  if (element.type === 'table') {
    createTable(frame, element);
    return;
  }
  if (element.type === 'pillar-grid') {
    createPillarGrid(frame, element);
  }
}

async function main() {
  if (!runtimeReadiness.mcpRunner.x5SansAvailable) {
    throw new Error(REQUIRED_FONT_ERROR);
  }

  await ensureRequiredFonts();
  var page = figma.currentPage;
  var frameX = nextColumnX(page);
  var report = [];

  for (var i = 0; i < productionSpec.slides.length; i += 1) {
    var slideSpec = productionSpec.slides[i];
    var frame = figma.createFrame();
    frame.name = slideSpec.name;
    frame.resize(productionSpec.deck.slideSize.width, productionSpec.deck.slideSize.height);
    frame.x = frameX;
    frame.y = i * (productionSpec.deck.slideSize.height + 140);
    frame.fills = [{ type: 'SOLID', color: { r: 0.05, g: 0.05, b: 0.06 } }];
    page.appendChild(frame);

    for (var elementIndex = 0; elementIndex < slideSpec.elements.length; elementIndex += 1) {
      renderElement(frame, slideSpec.elements[elementIndex]);
    }

    report.push({
      slideName: slideSpec.name,
      elementCount: slideSpec.elements.length,
      productionMode: slideSpec.productionMode
    });
  }

  figma.notify('Current draft frames generated from production-spec.');
  return {
    deckName: productionSpec.deck.name,
    generatedSlides: report,
    runner: 'mcp',
    fontFamily: REQUIRED_FONT_FAMILY
  };
}

main();
