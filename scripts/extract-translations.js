const fs = require('fs');
const path = require('path');
const { TextDecoder } = require('util');

const sourcePath = path.join(__dirname, '..', '601~750.csv');

function readCsvBuffer(filePath) {
  const buffer = fs.readFileSync(filePath);
  const decoder = new TextDecoder('shift_jis');
  return decoder.decode(buffer);
}

function parseCsv(text) {
  if (!text) {
    return [];
  }

  const rows = [];
  let row = [];
  let value = '';
  let insideQuotes = false;
  let i = 0;

  if (text.charCodeAt(0) === 0xfeff) {
    text = text.slice(1);
  }

  while (i < text.length) {
    const char = text[i];

    if (char === '"') {
      const peek = text[i + 1];
      if (insideQuotes && peek === '"') {
        value += '"';
        i += 2;
        continue;
      }
      insideQuotes = !insideQuotes;
      i += 1;
      continue;
    }

    if (char === ',' && !insideQuotes) {
      row.push(value);
      value = '';
      i += 1;
      continue;
    }

    if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && text[i + 1] === '\n') {
        i += 1;
      }
      row.push(value);
      rows.push(row);
      row = [];
      value = '';
      i += 1;
      continue;
    }

    value += char;
    i += 1;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

function splitCell(cell) {
  const normalized = cell.replace(/\r/g, '');
  const [en, ...rest] = normalized.split('\n');
  const ja = rest.join('\n').trim();
  return {
    en: (en || '').trim(),
    ja: ja.length > 0 ? ja : null,
  };
}

function main() {
  const csv = readCsvBuffer(sourcePath);
  const rows = parseCsv(csv);
  const [header, ...dataRows] = rows;
  const results = [];
  const missing = [];

  dataRows.forEach((cols, index) => {
    if (!cols || cols.length < 6) {
      return;
    }
    const question = splitCell(cols[0]);
    const options = cols.slice(1, 5).map(splitCell);
    const answerIndex = Number.parseInt(cols[5], 10) - 1;

    options.forEach((opt) => {
      if (!opt.ja || opt.ja === '？' || opt.ja === '?') {
        missing.push({
          type: 'option',
          questionNumber: index + 1,
          en: opt.en,
        });
      }
    });

    if (!question.ja || question.ja === '？' || question.ja === '?') {
      missing.push({
        type: 'question',
        questionNumber: index + 1,
        en: question.en,
      });
    }

    results.push({ question, options, answerIndex });
  });

  console.log(`Total rows parsed: ${results.length}`);
  console.log(`Missing translations: ${missing.length}`);
  missing.slice(0, 20).forEach((item) => {
    console.log(`[${item.type}] Q${item.questionNumber}: ${item.en}`);
  });
}

main();
