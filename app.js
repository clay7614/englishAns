const QUESTION_DATASETS = [
  {
    id: 'set-601-750',
    title: '英語4択 601-750',
  questionFile: '601-750_en.csv',
    translationFile: 'translations-ja.json',
  },
];

const FALLBACKS_FILE = 'translation-fallbacks-ja.json';
let optionTranslationFallbacks = new Map();
let questionTranslationFallbacks = new Map();

const statusEl = document.querySelector('[data-status]');
const translationChoiceSection = document.querySelector('[data-translation-choice]');
const quizSection = document.querySelector('[data-quiz]');
const questionEl = document.querySelector('[data-question]');
const optionsEl = document.querySelector('[data-options]');
const feedbackEl = document.querySelector('[data-feedback]');
const nextButton = document.querySelector('[data-next]');
const toggleTimerButton = document.querySelector('[data-toggle-timer]');
const toggleTranslationButton = document.querySelector('[data-toggle-translation]');
const toggleModeButton = document.querySelector('[data-toggle-mode]');
const shuffleButton = document.querySelector('[data-shuffle-order]');
const correctEl = document.querySelector('[data-correct]');
const totalEl = document.querySelector('[data-total]');
const optionTemplate = document.getElementById('option-button-template');
const duplicateChoiceInputs = document.querySelectorAll('input[name="question-duplicates"]');
const questionCountSlider = document.querySelector('[data-question-count-slider]');
const questionCountDisplay = document.querySelector('[data-question-count-display]');

document.body.classList.add('translations-hidden');

let allQuestions = [];
let questionIndexById = new Map();
let questionStats = new Map();
const wrongQuestionIds = new Set();

let order = [];
let orderPointer = 0;
let currentQuestion = null;
let currentQuestionIndex = null;
let answered = false;
let correctCount = 0;
let totalCount = 0;
let showTranslations = false;
let quizStarted = false;
let autoAdvanceTimer = null;
let autoAdvanceEnabled = true;
let quizMode = 'all';
let allowDuplicates = false;
let questionLimit = 0;
let questionsAsked = 0;
let servedQuestionIds = new Set();

translationChoiceSection?.addEventListener('click', handleTranslationChoice);
nextButton.addEventListener('click', handleNextClick);
toggleTimerButton?.addEventListener('click', handleToggleTimer);
toggleTranslationButton?.addEventListener('click', handleToggleTranslation);
toggleModeButton?.addEventListener('click', handleToggleMode);
shuffleButton?.addEventListener('click', handleShuffleOrder);
questionCountSlider?.addEventListener('input', handleQuestionCountInput);

init().catch((error) => {
  console.error(error);
  statusEl.textContent = `読み込み中に問題が発生しました: ${error.message}`;
  statusEl.classList.add('app__status--error');
});

async function init() {
  await loadFallbackData();

  const dataset = QUESTION_DATASETS[0];
  const datasetQuestions = await loadDataset(dataset);
  if (!datasetQuestions.length) {
    throw new Error('問題が1問も読み込めませんでした。');
  }

  allQuestions = datasetQuestions;
  questionIndexById = new Map();
  questionStats = new Map();
  wrongQuestionIds.clear();
  allQuestions.forEach((question, index) => {
    questionIndexById.set(question.id, index);
    questionStats.set(question.id, { attempts: 0, correct: 0 });
  });

  configureQuestionCountControls(allQuestions.length);
  updateTimerToggleLabel();
  updateTranslationToggleLabel();
  updateModeToggleLabel();
  updateShuffleButtonState();

  statusEl.textContent = '日本語訳を表示するか選んでください。';
  translationChoiceSection.hidden = false;
}

async function loadDataset(dataset) {
  const translationPromise = dataset.translationFile
    ? loadTranslationRows(dataset.translationFile)
    : Promise.resolve([]);
  const [questionRows, translationRows] = await Promise.all([
    loadQuestionRows(dataset.questionFile),
    translationPromise,
  ]);
  return mergeQuestionData(questionRows, translationRows, dataset.id);
}

async function loadFallbackData() {
  try {
    const response = await fetch(FALLBACKS_FILE, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`補助翻訳データの取得に失敗しました (HTTP ${response.status})`);
    }
    const data = await response.json();
    const optionEntries = Object.entries(data.optionFallbacks ?? {});
    const questionEntries = Object.entries(data.questionFallbacks ?? {});
    optionTranslationFallbacks = new Map(optionEntries);
    questionTranslationFallbacks = new Map(questionEntries);
  } catch (error) {
    console.warn('補助翻訳データの読み込みに失敗しました。', error);
    optionTranslationFallbacks = new Map();
    questionTranslationFallbacks = new Map();
  }
}

async function loadQuestionRows(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`CSVの取得に失敗しました (HTTP ${response.status})`);
  }
  const rawText = await response.text();
  const rows = parseCsv(rawText);
  const header = rows[0] || [];
  const hasHeader = header.map((cell) => cell.trim().toLowerCase()).includes('anum');
  const questionRows = hasHeader ? rows.slice(1) : rows;
  return questionRows
    .map((cols) => normalizeRow(cols))
    .filter((item) => item !== null);
}

async function loadTranslationRows(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`翻訳データの取得に失敗しました (HTTP ${response.status})`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('翻訳データの形式が正しくありません。');
  }
  return data;
}

function mergeQuestionData(englishRows, translationRows, datasetId) {
  const merged = [];
  for (let index = 0; index < englishRows.length; index += 1) {
    const english = englishRows[index];
    if (!english || !english.question || english.question.includes('#NAME?')) {
      continue;
    }
    const translation = translationRows[index] ?? {};
    const questionTranslation = resolveQuestionTranslation(english.question, translation.question);
    const optionTranslations = english.options.map((optionText, optionIndex) => {
      const rawTranslation = translation.options?.[optionIndex] ?? null;
      return resolveOptionTranslation(optionText, rawTranslation);
    });
    merged.push({
      id: `${datasetId}-${index}`,
      question: english.question,
      options: english.options,
      answerIndex: english.answerIndex,
      translation: {
        question: questionTranslation,
        options: optionTranslations,
      },
    });
  }
  return merged;
}

function handleTranslationChoice(event) {
  const button = event.target.closest('button[data-translation-option]');
  if (!button || quizStarted || !allQuestions.length) {
    return;
  }
  const { translationOption } = button.dataset;
  if (!translationOption) {
    return;
  }
  startQuiz(translationOption === 'show');
}

function startQuiz(enableTranslations) {
  allowDuplicates = getSelectedDuplicateMode() === 'allow';
  const sliderValue = questionCountSlider ? Number.parseInt(questionCountSlider.value, 10) : Number.NaN;
  let desiredQuestionCount = Number.isNaN(sliderValue) ? allQuestions.length : sliderValue;
  desiredQuestionCount = Math.max(1, desiredQuestionCount);
  if (!allowDuplicates) {
    desiredQuestionCount = Math.min(desiredQuestionCount, allQuestions.length);
  }
  questionLimit = desiredQuestionCount;
  questionsAsked = 0;
  servedQuestionIds = new Set();

  showTranslations = enableTranslations;
  quizStarted = true;
  translationChoiceSection.hidden = true;
  quizSection.hidden = false;
  correctCount = 0;
  totalCount = 0;
  updateScoreboard();
  updateTranslationToggleLabel();
  updateTimerToggleLabel();
  const canContinue = setQuizMode('all', { silent: true });
  statusEl.textContent = `指定した ${questionLimit} 問を出題します。`;
  if (canContinue) {
    showNextQuestion();
  } else {
    finishSession();
  }
}

function setQuizMode(mode, options = {}) {
  const silent = Boolean(options.silent);
  if (mode === 'wrong-only') {
    const wrongIndexes = getWrongQuestionIndexes();
    if (!wrongIndexes.length) {
      if (!silent) {
        statusEl.textContent = '誤答した問題はありません。';
      }
      updateModeToggleLabel();
      updateShuffleButtonState();
      return false;
    }
    quizMode = 'wrong-only';
    if (!silent) {
      statusEl.textContent = '誤答した問題のみ出題します。';
    }
    prepareOrder(wrongIndexes);
    updateModeToggleLabel();
    return true;
  }

  quizMode = 'all';
  const remaining = remainingQuestionSlots();
  if (!silent) {
    statusEl.textContent = remaining > 0
      ? `全 ${questionLimit} 問中、残り ${remaining} 問を出題します。`
      : '指定した問題数の出題が完了しました。';
  }
  prepareOrder(getAllQuestionIndexes());
  updateModeToggleLabel();
  return remaining > 0;
}

function prepareOrder(poolIndexes) {
  if (quizMode === 'all') {
    const remaining = remainingQuestionSlots();
    if (remaining <= 0) {
      order = [];
      orderPointer = 0;
      updateShuffleButtonState();
      return;
    }
    const sourceIndexes = poolIndexes.length ? poolIndexes : getAllQuestionIndexes();
    const nextOrder = buildOrderForAllMode(sourceIndexes, remaining);
    order = nextOrder;
    orderPointer = 0;
    updateShuffleButtonState();
    return;
  }

  let candidateIndexes = poolIndexes.slice();
  if (candidateIndexes.length > 1 && currentQuestionIndex !== null) {
    const filtered = candidateIndexes.filter((index) => index !== currentQuestionIndex);
    if (filtered.length) {
      candidateIndexes = filtered;
    }
  }
  order = shuffle(candidateIndexes);
  orderPointer = 0;
  updateShuffleButtonState();
}

function showNextQuestion() {
  if (autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  if (!allQuestions.length) {
    return;
  }
  if (quizMode === 'all' && remainingQuestionSlots() <= 0) {
    finishSession();
    return;
  }
  let poolIndexes = getActivePoolIndexes();
  if (!poolIndexes.length) {
    if (quizMode === 'wrong-only') {
      statusEl.textContent = '誤答した問題はありません。全問題モードに戻ります。';
      setQuizMode('all', { silent: true });
      poolIndexes = getActivePoolIndexes();
    }
    if (!poolIndexes.length) {
      questionEl.innerHTML = '<span class="quiz__question-text">出題できる問題がありません。</span>';
      optionsEl.innerHTML = '';
      return;
    }
  }
  if (orderPointer >= order.length) {
    prepareOrder(poolIndexes);
  }
  if (!order.length) {
    return;
  }
  const questionIndex = order[orderPointer];
  orderPointer += 1;
  currentQuestionIndex = questionIndex;
  currentQuestion = allQuestions[questionIndex];
  if (quizMode === 'all') {
    if (!allowDuplicates) {
      servedQuestionIds.add(currentQuestion.id);
    }
    questionsAsked += 1;
  }
  answered = false;
  nextButton.disabled = true;
  feedbackEl.textContent = '';
  feedbackEl.className = 'quiz__feedback';
  renderQuestion(currentQuestion);
  renderOptions(currentQuestion);
  updateShuffleButtonState();
  syncTranslationVisibility();
}

function renderQuestion(question) {
  let markup = `<span class="quiz__question-text">${formatText(question.question)}</span>`;
  const translationText = question.translation.question;
  if (hasMeaningfulText(translationText)) {
    markup += `<span class="quiz__question-translation">${formatText(translationText)}</span>`;
  }
  questionEl.innerHTML = markup;
}

function renderOptions(question) {
  optionsEl.innerHTML = '';
  question.options.forEach((optionText, index) => {
    const button = optionTemplate.content.firstElementChild.cloneNode(true);
    const translationText = question.translation.options[index];
    let optionMarkup = `<span class="quiz__option-text">${formatText(optionText)}</span>`;
    if (hasMeaningfulText(translationText)) {
      optionMarkup += `<span class="quiz__option-translation">${formatText(translationText)}</span>`;
    }
    button.innerHTML = optionMarkup;
    button.dataset.index = String(index);
    button.addEventListener('click', () => handleOptionClick(button, index));
    optionsEl.appendChild(button);
  });
}

function handleOptionClick(button, selectedIndex) {
  if (answered) {
    return;
  }
  answered = true;
  const isScoredQuestion = quizMode !== 'wrong-only';
  if (isScoredQuestion) {
    totalCount += 1;
  }

  const questionId = currentQuestion.id;
  const stats = questionStats.get(questionId) ?? { attempts: 0, correct: 0 };
  stats.attempts += 1;

  const isCorrect = selectedIndex === currentQuestion.answerIndex;
  if (isCorrect) {
    if (isScoredQuestion) {
      correctCount += 1;
    }
    stats.correct += 1;
    wrongQuestionIds.delete(questionId);
    feedbackEl.textContent = '正解！';
    feedbackEl.classList.add('quiz__feedback--correct');
  } else {
    wrongQuestionIds.add(questionId);
    feedbackEl.textContent = '残念！正答を確認しましょう。';
    feedbackEl.classList.add('quiz__feedback--wrong');
  }
  questionStats.set(questionId, stats);

  [...optionsEl.children].forEach((optionButton, index) => {
    optionButton.disabled = true;
    if (index === currentQuestion.answerIndex) {
      optionButton.classList.add('quiz__option--correct');
    }
    if (index === selectedIndex && !isCorrect) {
      optionButton.classList.add('quiz__option--wrong');
    }
  });

  nextButton.disabled = false;
  updateScoreboard();
  updateModeToggleLabel();
  updateShuffleButtonState();

  if (quizMode === 'wrong-only') {
    if (wrongQuestionIds.size === 0) {
      statusEl.textContent = '誤答した問題はすべて解き終わりました。全問題モードに戻ります。';
      setQuizMode('all', { silent: true });
    } else {
      prepareOrder(getActivePoolIndexes());
    }
  } else if (orderPointer >= order.length) {
    prepareOrder(getActivePoolIndexes());
  }

  if (autoAdvanceEnabled) {
    autoAdvanceTimer = window.setTimeout(() => {
      autoAdvanceTimer = null;
      showNextQuestion();
    }, 600);
  }
}

function handleNextClick() {
  if (autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  showNextQuestion();
}

function handleToggleTimer() {
  autoAdvanceEnabled = !autoAdvanceEnabled;
  if (!autoAdvanceEnabled && autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  updateTimerToggleLabel();
}

function handleToggleTranslation() {
  showTranslations = !showTranslations;
  updateTranslationToggleLabel();
}

function handleToggleMode() {
  const targetMode = quizMode === 'all' ? 'wrong-only' : 'all';
  const changed = setQuizMode(targetMode);
  if (targetMode === 'all' && !changed) {
    finishSession();
    return;
  }
  if (changed && (answered || currentQuestion === null)) {
    showNextQuestion();
  }
}

function handleShuffleOrder() {
  if (!quizStarted) {
    return;
  }
  const poolIndexes = getActivePoolIndexes();
  if (poolIndexes.length <= 1) {
    statusEl.textContent = poolIndexes.length === 0
      ? 'シャッフルできる問題がありません。'
      : 'シャッフルするのに十分な問題がありません。';
    return;
  }
  prepareOrder(poolIndexes);
  statusEl.textContent = '出題順をシャッフルしました。';
}

function updateTimerToggleLabel() {
  if (!toggleTimerButton) {
    return;
  }
  toggleTimerButton.textContent = `自動で進む: ${autoAdvanceEnabled ? 'ON' : 'OFF'}`;
}

function updateTranslationToggleLabel() {
  if (!toggleTranslationButton) {
    return;
  }
  toggleTranslationButton.textContent = `日本語: ${showTranslations ? '表示' : '非表示'}`;
  document.body.classList.toggle('translations-hidden', !showTranslations);
  syncTranslationVisibility();
}

function syncTranslationVisibility() {
  const shouldHide = !showTranslations;
  const container = quizSection ?? document;
  container.querySelectorAll('.quiz__question-translation, .quiz__option-translation').forEach((element) => {
    if (shouldHide) {
      element.setAttribute('hidden', '');
    } else {
      element.removeAttribute('hidden');
    }
  });
}

function updateModeToggleLabel() {
  if (!toggleModeButton) {
    return;
  }
  const isWrongOnly = quizMode === 'wrong-only';
  const hasWrongQuestions = wrongQuestionIds.size > 0;
  toggleModeButton.textContent = `誤答のみ: ${isWrongOnly ? 'ON' : 'OFF'}`;
  toggleModeButton.disabled = !isWrongOnly && !hasWrongQuestions;
}

function updateScoreboard() {
  correctEl.textContent = String(correctCount);
  totalEl.textContent = String(totalCount);
}

function updateShuffleButtonState() {
  if (!shuffleButton) {
    return;
  }
  const poolIndexes = getActivePoolIndexes();
  let hasCapacity = true;
  if (quizMode === 'all') {
    hasCapacity = remainingQuestionSlots() > 1;
  }
  const canShuffle = quizStarted && poolIndexes.length > 1 && hasCapacity;
  shuffleButton.disabled = !canShuffle;
}

function getAllQuestionIndexes() {
  return allQuestions.map((_, index) => index);
}

function getWrongQuestionIndexes() {
  return [...wrongQuestionIds]
    .map((id) => questionIndexById.get(id))
    .filter((index) => index !== undefined);
}

function getActivePoolIndexes() {
  return quizMode === 'wrong-only' ? getWrongQuestionIndexes() : getAllQuestionIndexes();
}

function remainingQuestionSlots() {
  const limit = Math.max(0, questionLimit);
  if (!quizStarted) {
    return limit;
  }
  return Math.max(0, limit - questionsAsked);
}

function buildOrderForAllMode(poolIndexes, targetLength) {
  if (targetLength <= 0) {
    return [];
  }

  if (allowDuplicates) {
    const basePool = poolIndexes.length ? poolIndexes : getAllQuestionIndexes();
    if (!basePool.length) {
      return [];
    }
    const result = [];
    for (let i = 0; i < targetLength; i += 1) {
      let candidates = basePool;
      if (basePool.length > 1) {
        const avoidance = new Set();
        if (i === 0 && currentQuestionIndex !== null) {
          avoidance.add(currentQuestionIndex);
        }
        const previousIndex = result.length > 0 ? result[result.length - 1] : null;
        if (previousIndex !== null) {
          avoidance.add(previousIndex);
        }
        const filtered = basePool.filter((index) => !avoidance.has(index));
        if (filtered.length) {
          candidates = filtered;
        }
      }
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      result.push(pick);
    }
    return result;
  }

  let candidateIndexes = poolIndexes.filter((index) => !servedQuestionIds.has(allQuestions[index].id));
  if (candidateIndexes.length > 1 && currentQuestionIndex !== null) {
    const filtered = candidateIndexes.filter((index) => index !== currentQuestionIndex);
    if (filtered.length) {
      candidateIndexes = filtered;
    }
  }
  if (!candidateIndexes.length) {
    return [];
  }
  const shuffled = shuffle(candidateIndexes);
  if (targetLength >= shuffled.length) {
    return shuffled;
  }
  return shuffled.slice(0, targetLength);
}

function finishSession() {
  if (autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  statusEl.textContent = `指定した ${questionLimit} 問の出題が完了しました。`;
  nextButton.disabled = true;
  order = [];
  orderPointer = 0;
  updateShuffleButtonState();
}

function getSelectedDuplicateMode() {
  const inputs = Array.from(duplicateChoiceInputs ?? []);
  const selected = inputs.find((input) => input.checked);
  return selected?.value ?? 'disallow';
}

function resolveQuestionTranslation(englishText, rawTranslation) {
  if (hasMeaningfulText(rawTranslation)) {
    return rawTranslation.trim();
  }
  const key = (englishText ?? '').trim();
  return questionTranslationFallbacks.get(key) ?? null;
}

function resolveOptionTranslation(englishText, rawTranslation) {
  if (hasMeaningfulText(rawTranslation)) {
    return rawTranslation.trim();
  }
  const key = (englishText ?? '').trim();
  return optionTranslationFallbacks.get(key) ?? null;
}

function hasMeaningfulText(value) {
  if (value === null || value === undefined) {
    return false;
  }
  const trimmed = String(value).trim();
  if (!trimmed) {
    return false;
  }
  return trimmed !== '?' && trimmed !== '？';
}

function normalizeRow(cols) {
  if (!cols || cols.length < 6) {
    return null;
  }
  const [rawQuestion, ...optionAndAnswer] = cols;
  const options = optionAndAnswer.slice(0, 4);
  const answerRaw = optionAndAnswer[4];
  const answerIndex = Number.parseInt(answerRaw, 10) - 1;
  if (Number.isNaN(answerIndex) || answerIndex < 0 || answerIndex > 3) {
    return null;
  }
  return {
    question: rawQuestion.trim(),
    options: options.map((option) => option.trim()),
    answerIndex,
  };
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

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatText(text) {
  return escapeHtml(text).replace(/\r?\n/g, '<br>');
}

function escapeHtml(text) {
  const safeText = String(text ?? '');
  return safeText.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '\'':
        return '&#39;';
      default:
        return char;
    }
  });
}

function configureQuestionCountControls(maxQuestions) {
  if (!questionCountSlider) {
    return;
  }
  const cappedMax = Math.max(1, maxQuestions);
  questionCountSlider.max = String(cappedMax);
  questionCountSlider.value = String(cappedMax);
  updateQuestionCountDisplay();
}

function updateQuestionCountDisplay() {
  if (!questionCountSlider || !questionCountDisplay) {
    return;
  }
  questionCountDisplay.textContent = questionCountSlider.value;
}

function handleQuestionCountInput() {
  updateQuestionCountDisplay();
}

