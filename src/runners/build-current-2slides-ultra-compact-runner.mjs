import { writeFile } from 'node:fs/promises';
import { isDirectExecution } from '../pipeline/current-pipeline-shared.mjs';

const OUTPUT_SCRIPT = 'output/figma-current-2slides-ultra-compact.generated.js';

function buildScript() {
  return `async function main() {
  function page() {
    for (var i = 0; i < figma.root.children.length; i += 1) {
      if (figma.root.children[i].name === 'Page 1' || figma.root.children[i].id === '0:1') return figma.root.children[i];
    }
    return figma.currentPage;
  }
  function rgb(hex) {
    var s = hex.replace('#', '');
    return { r: parseInt(s.slice(0, 2), 16) / 255, g: parseInt(s.slice(2, 4), 16) / 255, b: parseInt(s.slice(4, 6), 16) / 255 };
  }
  function frames(p) {
    var out = [];
    for (var i = 0; i < p.children.length; i += 1) if (p.children[i].type === 'FRAME') out.push(p.children[i]);
    return out;
  }
  function nextX(p) {
    var max = 0;
    var list = frames(p);
    for (var i = 0; i < list.length; i += 1) {
      var right = list[i].x + list[i].width;
      if (right > max) max = right;
    }
    return max + 240;
  }
  async function pickFont() {
    var all = await figma.listAvailableFontsAsync();
    if (!all.length) throw new Error('No runtime fonts available.');
    var chosen = all[0].fontName;
    for (var i = 0; i < all.length; i += 1) {
      if (all[i].fontName && all[i].fontName.family === 'Inter') {
        chosen = all[i].fontName;
        break;
      }
    }
    await figma.loadFontAsync(chosen);
    return chosen;
  }
  function txt(f, name, text, x, y, w, h, font, size, color, align) {
    var t = figma.createText();
    t.name = 'TEXT_TO_X5 / ' + name;
    t.fontName = font;
    t.fontSize = size;
    t.characters = text;
    t.fills = [{ type: 'SOLID', color: rgb(color) }];
    t.textAlignHorizontal = align || 'LEFT';
    t.textAlignVertical = 'TOP';
    t.resize(w, h);
    t.x = x;
    t.y = y;
    f.appendChild(t);
    return t;
  }
  function rect(f, x, y, w, h, fill, opacity, radius, stroke) {
    var r = figma.createRectangle();
    r.x = x; r.y = y; r.resize(w, h); r.cornerRadius = radius || 0;
    r.fills = [{ type: 'SOLID', color: rgb(fill), opacity: typeof opacity === 'number' ? opacity : 1 }];
    if (stroke) {
      r.strokes = [{ type: 'SOLID', color: rgb(stroke), opacity: 0.18 }];
      r.strokeWeight = 1;
    }
    f.appendChild(r);
    return r;
  }
  function ell(f, x, y, w, h, fill, opacity) {
    var e = figma.createEllipse();
    e.x = x; e.y = y; e.resize(w, h);
    e.fills = [{ type: 'SOLID', color: rgb(fill), opacity: typeof opacity === 'number' ? opacity : 1 }];
    f.appendChild(e);
    return e;
  }
  var p = page();
  await figma.setCurrentPageAsync(p);
  var font = await pickFont();
  var x = nextX(p);
  var slideY = 0;

  var cover = figma.createFrame();
  cover.name = 'CURRENT / VISUAL / 01 / Cover / FONT-FALLBACK';
  cover.resize(1920, 1080);
  cover.x = x; cover.y = slideY; cover.clipsContent = true;
  cover.fills = [{ type: 'SOLID', color: rgb('#050507') }];
  p.appendChild(cover);
  ell(cover, 520, 110, 900, 420, '#8d130d', 0.18);
  rect(cover, 0, 0, 1920, 1080, '#0a0a0d', 0.72, 0);
  txt(cover, 'COVER EYEBROW', '12 месяцев надежности и сервиса', 520, 124, 880, 48, font, 28, '#c2c2c6', 'CENTER');
  txt(cover, 'COVER TITLE', 'Код успеха:\\nГодовой отчёт 2025', 220, 420, 1480, 180, font, 92, '#ffffff', 'CENTER');
  txt(cover, 'COVER DEPARTMENT', 'Департамент Эксплуатации и информационной поддержки', 340, 654, 1240, 36, font, 24, '#d0d0d4', 'CENTER');
  txt(cover, 'COVER SPEAKER', 'Евгений Козлов', 760, 716, 400, 32, font, 24, '#b7b7bc', 'CENTER');
  txt(cover, 'PREVIEW NOTE 1', 'TEMP FONT USED — replace TEXT_TO_X5 layers with X5 Sans', 1030, 1018, 760, 24, font, 18, '#ffb36b', 'RIGHT');

  slideY = 1220;
  var metrics = figma.createFrame();
  metrics.name = 'CURRENT / VISUAL / 02 / Year In Numbers / FONT-FALLBACK';
  metrics.resize(1920, 1080);
  metrics.x = x; metrics.y = slideY; metrics.clipsContent = true;
  metrics.fills = [{ type: 'SOLID', color: rgb('#0c0c0f') }];
  p.appendChild(metrics);
  ell(metrics, 180, 900, 1540, 320, '#c41910', 0.2);
  txt(metrics, 'YIN TITLE', '2025 год. Взгляд в цифрах', 60, 50, 980, 60, font, 42, '#ffffff', 'LEFT');
  txt(metrics, 'YIN INTRO', 'Объемы, сервис и затраты без наследования старых графиков и легенд', 60, 114, 1220, 30, font, 22, '#c0c0c4', 'LEFT');
  var cards = [
    { x: 60, title: 'Объемы', value: '+2.308', suffix: 'магазинов', line2: '14.187.724 м2', note: 'Масштаб сети и площадь', accent: '#eb2417' },
    { x: 680, title: 'Сервис', value: '>98%', suffix: 'при норме 95%', line2: '60.000 РЦ / 2.279.660 магазины', note: 'Уровень сервиса и заявки', accent: '#eb5c17' },
    { x: 1300, title: 'Затраты', value: '283.800 руб.', suffix: 'на магазин / месяц, +11%', line2: '20.600 руб. материалы, -2%', note: 'РЦ / ТТ электроэнергия', accent: '#f7a610' }
  ];
  for (var i = 0; i < cards.length; i += 1) {
    var c = cards[i];
    rect(metrics, c.x, 230, 560, 430, '#17181b', 0.95, 28, '#ffffff');
    rect(metrics, c.x + 28, 258, 504, 5, c.accent, 0.96, 999);
    txt(metrics, 'CARD TITLE ' + (i + 1), c.title, c.x + 32, 288, 490, 34, font, 28, '#ffffff', 'LEFT');
    txt(metrics, 'CARD VALUE ' + (i + 1), c.value, c.x + 32, 354, 490, 58, font, 50, '#ffffff', 'LEFT');
    txt(metrics, 'CARD SUFFIX ' + (i + 1), c.suffix, c.x + 32, 418, 490, 28, font, 22, '#c3c3c8', 'LEFT');
    rect(metrics, c.x + 32, 472, 494, 2, c.accent, 0.72, 999);
    txt(metrics, 'CARD LINE2 ' + (i + 1), c.line2, c.x + 32, 500, 490, 34, font, 24, '#ffffff', 'LEFT');
    txt(metrics, 'CARD NOTE ' + (i + 1), c.note, c.x + 32, 548, 490, 44, font, 22, '#b7b7bc', 'LEFT');
  }
  rect(metrics, 60, 720, 1800, 180, '#121317', 0.8, 24, '#ffffff');
  txt(metrics, 'LOWER 1', 'РЦ\\n279.903.495 кВт / 1.705 млн руб.', 92, 752, 500, 80, font, 22, '#ffffff', 'LEFT');
  txt(metrics, 'LOWER 2', 'ТТ\\n3.830.662.623 кВт / 34.403 млн руб.', 690, 752, 540, 80, font, 22, '#ffffff', 'LEFT');
  txt(metrics, 'LOWER 3', 'Заявки\\n60.000 РЦ / 2.279.660 магазины', 1300, 752, 470, 80, font, 22, '#ffffff', 'LEFT');
  txt(metrics, 'PREVIEW NOTE 2', 'TEMP FONT USED — replace TEXT_TO_X5 layers with X5 Sans', 1030, 1018, 760, 24, font, 18, '#ffb36b', 'RIGHT');
  figma.notify('Ultra-compact preview generated with temporary runtime font.');
  return { previewOnly: true, finalProductionReady: false, slides: 2, fontFamily: font.family };
}
main();`;
}

export async function buildCurrent2SlidesUltraCompactRunner() {
  const script = buildScript();
  await writeFile(OUTPUT_SCRIPT, script, 'utf8');
  return { outputPath: OUTPUT_SCRIPT };
}

if (isDirectExecution(import.meta)) {
  buildCurrent2SlidesUltraCompactRunner().then((result) => {
    console.log(JSON.stringify(result, null, 2));
  }).catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  });
}
