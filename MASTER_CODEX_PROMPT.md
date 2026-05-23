# MASTER PROMPT FOR CODEX — SLIDETESTER / FIGMA DESIGN SLIDE FACTORY

Работаем в репозитории:

```txt
https://github.com/IMONsergey/slidetester.git
```

Ты должен полноценно начать проект, а не просто написать план.

## 0. Главная задача

Мы строим production-пайплайн для дизайна презентаций в Figma Design.

Цель: новые слайды из PPTX-прототипов должны продолжать существующую Figma-презентацию так, будто они сделаны той же дизайн-командой, в том же файле и в той же системе.

Это НЕ задача “сделать похожую презентацию”.
Это НЕ Figma Slides.
Это НЕ generic deck generator.
Это НЕ перенос PowerPoint в красивый тёмный шаблон.

Это задача:

```txt
PPTX prototype
→ semantic extraction
→ reference pattern matching from existing Figma frames
→ design-faithful editable Figma frame generation
→ visual review
→ iterative improvement
```

Приоритеты:

```txt
1. Точность повторения существующего дизайна
2. Редактируемость в Figma
3. Масштабируемость производства 100–150 будущих слайдов
4. Контроль качества
5. Скорость
```

Если есть конфликт между скоростью и точностью дизайна, выбирай точность дизайна.

---

## 1. Source Figma file

Figma Design file:

```txt
https://www.figma.com/design/735drrzVTmf4AhQJwQe6vX/Untitled?node-id=0-1
```

fileKey:

```txt
735drrzVTmf4AhQJwQe6vX
```

Page:

```txt
Page 1 / 0:1
```

Факты, уже снятые через ChatGPT + Figma MCP:

```txt
Top-level objects: 77
Slide frames: 75
Icons frame: 25:11279
Icons frame children: 1339
Slide size: 1920×1080
All inspected top-level slide frames: layoutMode NONE
```

Важная поправка:

```txt
76 FRAME = 75 slide frames + Icons frame
```

---

## 2. Known MCP constraints

Не делай полный `get_metadata` по `0:1` одним вызовом. Он падает по timeout.

Не делай полный рекурсивный аудит всех 75 фреймов одним вызовом. Он тоже падает по timeout.

Рабочая стратегия:

```txt
compact index through Figma Plugin API / use_figma
→ selected frame batches
→ screenshots / design_context for representative node IDs
→ local audit cache
→ pattern-library.json
→ pilot-reference-map.json
→ generated Figma Plugin API script
```

Если у тебя нет прямого Figma MCP внутри Codex, всё равно продолжай:

```txt
1. Создай все файлы проекта.
2. Подготовь скрипты для аудита и генерации.
3. Сгенерируй Figma Plugin API script как файл.
4. Объясни, что этот script нужно запустить через ChatGPT/Figma MCP use_figma.
```

---

## 3. Already inspected representative frames

Изученные через ChatGPT/Figma MCP node IDs:

```txt
25:6981 — cover / hero title
25:7247 — dense analytics / chart executive slide
25:11279 — Icons frame
```

### 25:6981 — observed design role

Cover / hero title slide.

Observed properties:

```txt
- black background;
- large central title;
- red/orange horizon glow;
- top small uppercase text;
- secondary author/name line;
- bottom logo/mark logic;
- X5 Sans;
- hero typography around 100–120 px;
- cinematic/executive opening.
```

### 25:7247 — observed design role

Dense analytics / chart slide.

Observed properties:

```txt
- near-black background #0C0C0F;
- large top-left title around 46 px;
- two main content zones;
- left large dark glass chart card;
- right smaller red/dark glass chart card;
- red/orange highlight logic;
- small low-opacity footnote bottom-left;
- chart labels around 17–27 px;
- dense but controlled information hierarchy.
```

---

## 4. Visual language

This is a dark X5 / Пятёрочка executive strategy deck.

Core traits:

```txt
- 1920×1080;
- black / near-black base;
- X5 Sans typography;
- red/orange gradients and glow accents;
- high-tech executive strategy mood;
- manually positioned coordinate-based layouts;
- glass/dark cards;
- dense custom charts;
- large dominant titles;
- controlled microcopy and footnotes;
- presentation design, not website UI;
- non-standard visual compositions.
```

Base working palette:

```txt
bg: #0C0C0F
black: #000000
white: #FFFFFF
secondaryText: rgba(255,255,255,0.55)
mutedText: rgba(255,255,255,0.38)
card: rgba(255,255,255,0.055)
cardBorder: rgba(255,255,255,0.12)
red: #EB2516
redBright: #FF2A1C
orange: #FF6A00
deepRed: #5A0908
```

Typography:

```txt
Primary: X5 Sans if available
Fallback: Inter if X5 Sans is unavailable
```

---

## 5. Absolute design fidelity rule

Перед любой генерацией прочитай и зафиксируй этот принцип:

```txt
Новые слайды должны повторять существующие решения из исходного Figma-файла точно или почти точно.
Креатив допустим только как развитие уже найденных решений, а не как свободное изобретение нового стиля.
```

Новый слайд должен выглядеть так, будто он был сделан той же дизайн-командой.

Если новый слайд выглядит как:

```txt
- красиво оформленный PowerPoint;
- generic AI deck;
- просто тёмный premium deck;
- самостоятельная презентация в другом стиле;
- шаблонный consulting deck;
```

это провал.

---

## 6. Required reference matching

Перед созданием каждого нового слайда ты обязан выбрать reference frame(s) из существующего Figma deck.

Для каждого нового слайда указывай:

```txt
source_pattern_frame_id
source_pattern_frame_name
что заимствовано:
- композиционная схема;
- сетка;
- типографическая иерархия;
- карточная структура;
- графический мотив;
- фон / glow / gradient;
- логика диаграммы;
- стиль подписей;
- стиль footnote;
- плотность;
- масштаб.
```

Если прямого аналога нет, собирай гибрид из 2–3 existing frames:

```txt
primaryReferenceFrame
secondaryReferenceFrame
tertiaryReferenceFrame
что взято откуда
```

---

## 7. Forbidden directions

Запрещено:

```txt
- генерировать слайды только из PPTX-контента без выбора reference frame;
- делать “похожий стиль” на глаз;
- использовать произвольные размеры, если в исходных слайдах есть близкий паттерн;
- заменять сложные диаграммы простыми generic cards, если в deck есть похожий сложный визуальный паттерн;
- превращать нестандартный deck в библиотеку типовых PowerPoint-шаблонов;
- упрощать всё до generic dark cards;
- использовать white/default PPT layouts;
- делать все pilot slides одним визуальным приёмом;
- игнорировать Icons frame;
- создавать новый визуальный язык;
- строить слайды как сайт/UI;
- использовать screenshots as slide backgrounds;
- полагаться на expiring asset URLs;
- коммитить токены, `_authToken`, `figp_`, `.npmrc`, private keys.
```

---

## 8. Input files

Пользователь приложит архивы/файлы:

```txt
figma_slide_factory_audit.zip
figma-slide-factory-design-fidelity-addendum.zip
Таск менеджер_Вареник Максим.pptx
```

Положи локально:

```txt
input/figma_slide_factory_audit.zip
input/figma-slide-factory-design-fidelity-addendum.zip
input/draft.pptx
```

Не коммить сами приватные input-файлы.

`.gitignore` должен их исключать.

---

## 9. Repository structure to create

Создай в репозитории такую структуру:

```txt
slidetester/
  AGENTS.md
  README.md
  package.json
  .gitignore
  DESIGN_FIDELITY_ADDENDUM.md
  docs/
    00-project-context.md
    01-design-system.md
    02-slide-patterns.md
    03-production-rules.md
    04-figma-mcp-audit-plan.md
    05-qa-rubric.md
  schemas/
    slides.schema.json
    pattern-library.schema.json
    pilot-reference-map.schema.json
  src/
    pptx/
      parse-pptx.mjs
    audit/
      build-figma-index-script.mjs
      parse-audit-archive.mjs
      build-pattern-library.mjs
    figma/
      figma-helpers.mjs
      print-create-pilot-script.mjs
    templates/
      01-cover.mjs
      02-problem-map.mjs
      03-target-state.mjs
      04-solution-engine.mjs
      05-metrics-effect.mjs
      06-roadmap.mjs
    classify-slides.mjs
  scripts/
    check-project.mjs
  prompts/
    MASTER_CODEX_PROMPT.md
  input/
    README.md
  output/
    README.md
```

---

## 10. package.json requirements

Use Node.js ESM.

Suggested dependencies:

```txt
jszip
fast-xml-parser
```

Scripts:

```json
{
  "scripts": {
    "check": "node scripts/check-project.mjs",
    "audit:figma-script": "node src/audit/build-figma-index-script.mjs",
    "parse:pptx": "node src/pptx/parse-pptx.mjs",
    "classify": "node src/classify-slides.mjs",
    "patterns": "node src/audit/build-pattern-library.mjs",
    "figma:pilot-script": "node src/figma/print-create-pilot-script.mjs"
  }
}
```

---

## 11. PPTX pilot content

Current PPTX draft: `Таск менеджер_Вареник Максим.pptx`.

It contains 6 prototype slides:

```txt
1. Таск менеджер сотрудника магазина
2. Проблема: рост производительности на основе ручного управления магазином теряет эффективность в условиях масштаба
3. Образ результата: задачи сформированы исходя из бизнес-приоритетов, факт и качество исполнения контролируются, сотрудник замотивирован
4. Возможное решение: автоматизированный менеджер заданий
5. Предполагаемый эффект: +10–15%, -10%, -0.4%
6. Сроки: 2026, 2027, 2028
```

The PPTX is a semantic prototype. Do not reproduce its visual design literally.

---

## 12. PPTX parser

Implement `src/pptx/parse-pptx.mjs`.

If no full PPTX library is available, implement pragmatic parsing:

```txt
- unzip .pptx with jszip;
- read ppt/slides/slide*.xml;
- extract a:t text nodes;
- preserve slide order;
- write output/slides.raw.json.
```

Expected output:

```txt
output/slides.raw.json
```

---

## 13. Slide classification

Implement `src/classify-slides.mjs`.

Create:

```txt
output/slides.json
```

Use `schemas/slides.schema.json`.

Pilot mapping:

### Slide 1

```txt
pattern: hero_product_initiative_cover
message: Таск-менеджер сотрудника магазина как новая операционная система управления задачами и производительностью.
```

### Slide 2

```txt
pattern: problem_friction_map
message: Ручное управление задачами теряет эффективность на масштабе.
content:
- множественные источники операционных задач;
- приоритезация зависит от компетенции ДМ/АДМ;
- 73% рабочего времени не имеет следов в системах;
- мотивация не зависит от личной эффективности;
- принцип работы на время, а не на результат;
- реактивное управление не всегда учитывает бизнес-приоритеты.
```

### Slide 3

```txt
pattern: target_state_outcome_pillars
message: Задачи должны формироваться из бизнес-приоритетов, фиксироваться цифровым следом и влиять на мотивацию.
content:
- приоритеты задач формируются из реальной ситуации в магазине и бизнес-целей;
- процесс исполнения имеет цифровой след и метрики производительности;
- каждый сотрудник мотивирован повышать личную эффективность.
```

### Slide 4

```txt
pattern: solution_engine_operating_loop
message: Автоматизированный менеджер заданий назначает самые приоритетные задачи в каждый момент времени.
content:
- модель приоритезации задач на бизнес-результат;
- автоматическое управление постановкой задач;
- цифровой след 90% операций;
- сдельная мотивация.
```

### Slide 5

```txt
pattern: business_effect_metric_cards
message: Решение должно дать измеримый эффект на производительность и ФОТ.
metrics:
- +10–15% — производительность труда
- -10% — ФОТ магазина от расходов
- -0.4% — ФОТ магазина от выручки
```

### Slide 6

```txt
pattern: pilot_to_scale_roadmap
message: Масштабирование идёт от пилота в 200+ магазинах к территории и всей сети.
timeline:
- 2026 — 200+ магазинов в пилоте
- 2027 — 1 территория в пилоте
- 2028 — вся сеть работает по-новому
```

---

## 14. Pattern library

Create:

```txt
output/pattern-library.json
```

Minimum requirement:

Use already known patterns:

```json
{
  "patterns": [
    {
      "patternId": "hero_cover_glow",
      "sourceFrameIds": ["25:6981"],
      "visualRole": "cover / hero title",
      "composition": "central large title, black background, red/orange horizon glow, top small uppercase label, bottom logo/mark logic",
      "reuseFor": ["cover", "initiative title", "section opening"]
    },
    {
      "patternId": "dense_market_chart",
      "sourceFrameIds": ["25:7247"],
      "visualRole": "dense executive analytics / chart slide",
      "composition": "large chart panel left, smaller chart panel right, top-left title, bottom-left footnote, dark glass cards, red/orange emphasis",
      "reuseFor": ["business metrics", "market dynamics", "multi-series comparison", "effect proof"]
    }
  ]
}
```

Then expand this pattern library as much as possible from the audit archive and any additional Figma MCP data you can access.

If direct MCP is unavailable inside Codex, prepare scripts that ChatGPT can run through Figma MCP later.

---

## 15. Pilot reference map

Create:

```txt
output/pilot-reference-map.json
```

Every pilot slide must have references.

Initial mapping:

```txt
Slide 1 → primary: 25:6981 / hero_cover_glow
Slide 2 → find closest problem/cards/system-breakdown reference; if unavailable, hybrid from dense_dark_card logic
Slide 3 → find closest 3-pillar/card reference
Slide 4 → find closest process/operating-model reference
Slide 5 → primary/secondary: 25:7247 / dense_market_chart adapted to metric effect cards
Slide 6 → find closest timeline/sequence/roadmap reference
```

If no direct reference is available, mark:

```txt
referenceStatus: "needs_more_mcp_reference"
```

and still produce the best editable draft, but do not pretend fidelity is perfect.

---

## 16. Figma script generation

Implement:

```txt
src/figma/figma-helpers.mjs
src/figma/print-create-pilot-script.mjs
src/templates/*.mjs
```

Generate:

```txt
output/figma-create-pilot.generated.js
```

This script must be suitable for Figma MCP `use_figma`.

Requirements:

```txt
- create 6 new 1920×1080 frames;
- place them in a new column to the right of existing deck;
- do not modify existing slides;
- do not touch Icons frame;
- keep all objects editable;
- use deterministic absolute coordinates;
- use internal Auto Layout only for small components;
- use safe font loader with X5 Sans fallback to Inter;
- do not use screenshots as backgrounds;
- do not use expiring asset URLs;
- do not use external libraries;
- use helper functions for repeated visual systems.
```

Frame names:

```txt
PILOT / 01 / Task Manager / Cover
PILOT / 02 / Task Manager / Problem
PILOT / 03 / Task Manager / Target State
PILOT / 04 / Task Manager / Solution Engine
PILOT / 05 / Task Manager / Business Effect
PILOT / 06 / Task Manager / Roadmap
```

---

## 17. Template design expectations

### 01-cover

Must be strongly based on frame `25:6981`.

Repeat:

```txt
- large central title;
- black base;
- red/orange horizon or beam;
- top small uppercase framing;
- secondary small text;
- bottom mark/logo area or controlled replacement.
```

### 02-problem-map

Must not be generic six cards.

Use existing deck logic:

```txt
- dark glass surfaces;
- red/orange semantic accents;
- strong title;
- controlled density;
- system breakdown feel.
```

### 03-target-state

Use pillar architecture:

```txt
- 3 large outcome cards;
- clear hierarchy;
- connective red/orange logic;
- not a plain bullet list.
```

### 04-solution-engine

Use operating loop / engine diagram:

```txt
business inputs → prioritization → assignment → execution trace → metrics → motivation
```

Must feel like executive operating model, not UX flowchart.

### 05-metrics-effect

Use metric-heavy executive treatment.

Avoid generic KPI dashboard.

Metrics:

```txt
+10–15%
-10%
-0.4%
```

### 06-roadmap

Use timeline / sequence logic.

Milestones:

```txt
2026 — 200+ магазинов в пилоте
2027 — 1 территория в пилоте
2028 — вся сеть работает по-новому
```

---

## 18. QA script

Implement `scripts/check-project.mjs`.

It must verify:

```txt
- required files exist;
- package.json exists;
- schemas exist;
- output/slides.json exists after classify;
- output/pattern-library.json exists after patterns;
- output/pilot-reference-map.json exists;
- output/figma-create-pilot.generated.js exists after generation;
- generated script contains all 6 frame names;
- generated script does not contain:
  figp_
  _authToken
  PRIVATE KEY
  .npmrc
```

---

## 19. Commands to run

Run:

```bash
npm install
npm run check
npm run parse:pptx
npm run classify
npm run patterns
npm run figma:pilot-script
npm run check
```

If a command fails, fix it. Do not leave the repo in a broken state.

---

## 20. Git commits

Make staged commits:

### Commit 1

```txt
chore: initialize slide factory scaffold
```

### Commit 2

```txt
feat: parse pilot pptx into slide data
```

### Commit 3

```txt
feat: generate figma pilot script
```

If you cannot make multiple commits, make one commit:

```txt
feat: initialize figma slide factory
```

---

## 21. What to return

At the end, return:

```txt
- commit SHA(s);
- repository file tree;
- changed files;
- exact commands run;
- npm run check result;
- whether PPTX parsing succeeded;
- whether slides.json was created;
- whether pattern-library.json was created;
- whether pilot-reference-map.json was created;
- path to generated Figma script;
- whether the Figma script was executed or only generated;
- what failed / what needs ChatGPT MCP;
- next manual steps.
```

---

## 22. Critical final instruction

Do not stop at a plan.

Build the repository, write the files, run checks, generate the pilot Figma script, and commit the result to:

```txt
https://github.com/IMONsergey/slidetester.git
```

If direct Figma execution is not available inside Codex, generate the script and explicitly say:

```txt
"Run output/figma-create-pilot.generated.js through ChatGPT/Figma MCP use_figma."
```
