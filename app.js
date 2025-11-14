const QUESTION_DATASETS = [
  {
    id: 'set-601-750',
    title: '単語テスト 601〜750',
    questionFile: '601~750.csv',
    translationFile: '601~750_ja.csv',
  },
  {
    id: 'set-751-900',
    title: '単語テスト 751〜900',
    questionFile: '751~900.csv',
    translationFile: '751~900_ja.csv',
  },
  {
    title: '単語テスト 601〜750',
    questionFile: '601~750.csv',
    translationFile: '601~750_ja.csv',
    translationFile: '751~900_ja.csv',
  },
];

const FALLBACKS_FILE = 'translation-fallbacks-ja.json';
let optionTranslationFallbacks = new Map();
let questionTranslationFallbacks = new Map();

const statusEl = document.querySelector('[data-status]');
const translationChoiceSection = document.querySelector('[data-translation-choice]');
const quizSection = document.querySelector('[data-quiz]');
const datasetTitleEl = document.querySelector('[data-dataset-title]');
const datasetBackLink = document.querySelector('[data-dataset-back]');
const questionEl = document.querySelector('[data-question]');
const optionsEl = document.querySelector('[data-options]');
const feedbackEl = document.querySelector('[data-feedback]');
const resultEl = document.querySelector('[data-result]');
const nextButton = document.querySelector('[data-next]');
const toggleTranslationButton = document.querySelector('[data-toggle-translation]');
const toggleModeButton = document.querySelector('[data-toggle-mode]');
const settingsButton = document.querySelector('[data-open-settings]');
const settingsPanel = document.querySelector('[data-settings-panel]');
const settingsCloseButton = document.querySelector('[data-close-settings]');
const autoAdvanceCheckbox = document.querySelector('[data-settings-auto-advance]');
const autoAdvanceStatus = document.querySelector('[data-auto-advance-status]');
const translationControlVisibilityCheckbox = document.querySelector('[data-settings-translation-control]');
const settingsShuffleButton = document.querySelector('[data-settings-shuffle]');
const startTranslationToggle = document.querySelector('[data-start-translation-toggle]');
const startTranslationState = document.querySelector('[data-start-translation-state]');
const startButton = document.querySelector('[data-start-quiz]');
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
let servedQuestionKeys = new Set();
let settingsPanelOpen = false;
let correctCount = 0;
let activeDataset = null;
let questionTransitionInProgress = false;
let queuedQuestionTransition = false;
let readyToRestart = false;
let translationControlVisible = true;

startButton?.addEventListener('click', handleStartButtonClick);
translationChoiceSection?.addEventListener('click', (event) => {
  if (quizStarted) {
    return;
  }
  const startControl = event.target.closest('[data-start-quiz]');
  if (startControl) {
    handleStartButtonClick();
  }
});
startTranslationToggle?.addEventListener('change', updateStartTranslationState);
nextButton.addEventListener('click', handleNextClick);
toggleTranslationButton?.addEventListener('click', handleToggleTranslation);
toggleModeButton?.addEventListener('click', handleToggleMode);
settingsButton?.addEventListener('click', handleSettingsButtonClick);
settingsCloseButton?.addEventListener('click', closeSettingsPanel);
autoAdvanceCheckbox?.addEventListener('change', handleAutoAdvanceChange);
translationControlVisibilityCheckbox?.addEventListener('change', handleTranslationControlVisibilityChange);
settingsShuffleButton?.addEventListener('click', handleShuffleOrder);
settingsPanel?.addEventListener('click', (event) => event.stopPropagation());
questionCountSlider?.addEventListener('input', handleQuestionCountInput);

updateNextButtonLabel();

init().catch((error) => {
  console.error(error);
  statusEl.textContent = `読み込み中に問題が発生しました: ${error.message}`;
  statusEl.classList.add('app__status--error');
});

async function init() {
  await loadFallbackData();

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('set');
  const dataset = requestedId
    ? QUESTION_DATASETS.find((item) => item.id === requestedId)
    : QUESTION_DATASETS[0];

  if (!dataset) {
    statusEl.textContent = '問題セットが見つかりません。index.html からセットを選択してください。';
    statusEl.classList.add('app__status--error');
    translationChoiceSection.hidden = true;
    quizSection.hidden = true;
    settingsButton?.setAttribute('disabled', 'true');
    return;
  }

  activeDataset = dataset;
  const pageTitle = `${dataset.title} | 英語4択ドリル`;
  document.title = pageTitle;
  if (datasetTitleEl) {
    datasetTitleEl.textContent = dataset.title;
  }
  if (datasetBackLink) {
    datasetBackLink.href = 'index.html';
    datasetBackLink.hidden = false;
  }

  const datasetQuestions = await loadDataset(dataset);
  if (!datasetQuestions.length) {
    throw new Error('問題が読み込めませんでした。');
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
  updateAutoAdvanceControl();
  updateTranslationToggleLabel();
  updateModeToggleLabel();
  updateShuffleButtonState();
  updateStartTranslationState();
  if (translationControlVisibilityCheckbox) {
    translationControlVisible = Boolean(translationControlVisibilityCheckbox.checked);
  }
  updateTranslationControlVisibility();

  statusEl.textContent = `設定を行ってスタートしてください。`;
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
  if (translationRows.length && translationRows.length !== questionRows.length) {
    console.warn(
      `翻訳データの件数 (${translationRows.length}) が問題数 (${questionRows.length}) と一致しません。`
    );
  }
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
  const rawText = await response.text();
  if (!rawText.trim()) {
    return [];
  }
  const rows = parseCsv(rawText);
  if (!rows.length) {
    return [];
  }
  const header = rows[0] || [];
  const hasHeader = header.some((cell) => {
    const normalized = cell.trim().toLowerCase();
    return normalized === 'q_ja'
      || normalized === 'question'
      || normalized === 'q'
      || normalized === 'question_ja';
  });
  const dataRows = hasHeader ? rows.slice(1) : rows;
  return dataRows
    .map((cols) => normalizeTranslationRow(cols))
    .filter((item) => item !== null);
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

function handleStartButtonClick() {
  if (quizStarted) {
    return;
  }
  const enableTranslations = Boolean(startTranslationToggle?.checked);
  startQuiz(enableTranslations);
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
  servedQuestionKeys = new Set();

  showTranslations = enableTranslations;
  quizStarted = true;
  closeSettingsPanel();
  translationChoiceSection.hidden = true;
  quizSection.hidden = false;
  setReadyToRestart(false);
  nextButton.disabled = true;
  correctCount = 0;
  totalCount = 0;
  resetResultPanel();
  hideWrongOnlyControl();
  updateScoreboard();
  updateTranslationToggleLabel();
  updateAutoAdvanceControl();
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
      : '出題が終了しました。';
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

function resetResultPanel() {
  if (!resultEl) {
    return;
  }
  resultEl.hidden = true;
  resultEl.textContent = '';
}

function renderResultPanel() {
  if (!resultEl) {
    return;
  }
  const totalAnswered = totalCount;
  const correct = correctCount;
  const wrong = Math.max(0, totalAnswered - correct);
  const percent = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0;
  const summary = `結果: ${totalAnswered}問中${correct}問正解（${percent}%）`;
  const detail = wrong > 0 ? `誤答: ${wrong}問（「誤答のみ」で復習できます）` : '全問正解です！お疲れさまでした。';
  resultEl.innerHTML = `<strong>${summary}</strong><br>${detail}`;
  resultEl.hidden = false;
}

function hideWrongOnlyControl() {
  if (!toggleModeButton) {
    return;
  }
  toggleModeButton.hidden = true;
  toggleModeButton.disabled = true;
  updateModeToggleLabel();
}

function showWrongOnlyControl() {
  if (!toggleModeButton) {
    return;
  }
  toggleModeButton.hidden = false;
  updateModeToggleLabel();
}
function showNextQuestion() {
  if (questionTransitionInProgress) {
    queuedQuestionTransition = true;
    return;
  }
  questionTransitionInProgress = true;
  try {
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
        statusEl.textContent = '誤答した問題はありません。通常モードに戻ります。';
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
      finishSession();
      return;
    }
    const questionIndex = order[orderPointer];
    orderPointer += 1;
    currentQuestionIndex = questionIndex;
    currentQuestion = allQuestions[questionIndex];
    setReadyToRestart(false);
    if (quizMode === 'all') {
      if (!allowDuplicates) {
        servedQuestionIds.add(currentQuestion.id);
        servedQuestionKeys.add(getQuestionKey(currentQuestion));
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
  } finally {
    questionTransitionInProgress = false;
    if (queuedQuestionTransition) {
      queuedQuestionTransition = false;
      const schedule = (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function')
        ? window.requestAnimationFrame.bind(window)
        : (callback) => window.setTimeout(callback, 0);
      schedule(() => showNextQuestion());
    }
  }
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
      statusEl.textContent = '誤答した問題を解き終わりました。通常モードに戻ります。';
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
  if (readyToRestart) {
    returnToStartScreen();
    return;
  }
  if (autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  showNextQuestion();
}

function handleAutoAdvanceChange() {
  autoAdvanceEnabled = Boolean(autoAdvanceCheckbox?.checked);
  if (!autoAdvanceEnabled && autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  updateAutoAdvanceControl();
  if (quizStarted) {
    statusEl.textContent = `自動で進むを${autoAdvanceEnabled ? 'ON' : 'OFF'}にしました。`;
  }
}

function handleTranslationControlVisibilityChange() {
  translationControlVisible = Boolean(translationControlVisibilityCheckbox?.checked);
  updateTranslationControlVisibility();
  if (quizStarted) {
    statusEl.textContent = translationControlVisible
      ? '「日本語」ボタンを表示しました。'
      : '「日本語」ボタンを非表示にしました。';
  }
}

function handleToggleTranslation() {
  showTranslations = !showTranslations;
  updateTranslationToggleLabel();
}

function handleToggleMode() {
  if (!toggleModeButton || toggleModeButton.hidden) {
    return;
  }
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

function handleSettingsButtonClick(event) {
  event.stopPropagation();
  if (settingsPanelOpen) {
    closeSettingsPanel();
  } else {
    openSettingsPanel();
  }
}

function openSettingsPanel() {
  if (!settingsPanel || settingsPanelOpen) {
    return;
  }
  settingsPanel.hidden = false;
  settingsPanelOpen = true;
  settingsButton?.setAttribute('aria-expanded', 'true');
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleSettingsKeydown);
}

function closeSettingsPanel() {
  if (!settingsPanel || !settingsPanelOpen) {
    return;
  }
  settingsPanel.hidden = true;
  settingsPanelOpen = false;
  settingsButton?.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', handleDocumentClick);
  document.removeEventListener('keydown', handleSettingsKeydown);
}

function handleDocumentClick(event) {
  if (!settingsPanelOpen) {
    return;
  }
  if (settingsPanel?.contains(event.target)) {
    return;
  }
  if (settingsButton?.contains(event.target)) {
    return;
  }
  closeSettingsPanel();
}

function handleSettingsKeydown(event) {
  if (event.key === 'Escape') {
    closeSettingsPanel();
  }
}

function updateAutoAdvanceControl() {
  if (!autoAdvanceCheckbox) {
    return;
  }
  autoAdvanceCheckbox.checked = autoAdvanceEnabled;
  if (autoAdvanceStatus) {
    autoAdvanceStatus.textContent = autoAdvanceEnabled ? 'ON' : 'OFF';
  }
}

function updateTranslationControlVisibility() {
  if (!toggleTranslationButton) {
    return;
  }
  const isVisible = translationControlVisible;
  toggleTranslationButton.hidden = !isVisible;
  toggleTranslationButton.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
}

function updateStartTranslationState() {
  if (!startTranslationState) {
    return;
  }
  const isOn = Boolean(startTranslationToggle?.checked);
  startTranslationState.textContent = isOn ? 'ON' : 'OFF';
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
  if (toggleModeButton.hidden) {
    toggleModeButton.textContent = '誤答のみ';
    toggleModeButton.classList.remove('quiz__control-button--active');
    toggleModeButton.setAttribute('aria-pressed', 'false');
    toggleModeButton.disabled = true;
    return;
  }
  const isWrongOnly = quizMode === 'wrong-only';
  const hasWrongQuestions = wrongQuestionIds.size > 0;
  toggleModeButton.textContent = '誤答のみ';
  toggleModeButton.classList.toggle('quiz__control-button--active', isWrongOnly);
  toggleModeButton.setAttribute('aria-pressed', isWrongOnly ? 'true' : 'false');
  toggleModeButton.disabled = !isWrongOnly && !hasWrongQuestions;
}

function updateScoreboard() {
  correctEl.textContent = String(correctCount);
  totalEl.textContent = String(totalCount);
}

function updateShuffleButtonState() {
  if (!settingsShuffleButton) {
    return;
  }
  const poolIndexes = getActivePoolIndexes();
  let hasCapacity = true;
  if (quizMode === 'all') {
    hasCapacity = remainingQuestionSlots() > 1;
  }
  const canShuffle = quizStarted && poolIndexes.length > 1 && hasCapacity;
  settingsShuffleButton.disabled = !canShuffle;
}

function getAllQuestionIndexes() {
  if (allowDuplicates) {
    return allQuestions.map((_, index) => index);
  }
  const seenKeys = new Set();
  const uniqueIndexes = [];
  allQuestions.forEach((question, index) => {
    const key = getQuestionKey(question);
    if (key && seenKeys.has(key)) {
      return;
    }
    seenKeys.add(key);
    uniqueIndexes.push(index);
  });
  return uniqueIndexes;
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
  if (!allowDuplicates) {
    candidateIndexes = candidateIndexes.filter((index) => !servedQuestionKeys.has(getQuestionKey(allQuestions[index])));
  }
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
    if (!allowDuplicates) {
      const seenKeys = new Set();
      return shuffled.filter((index) => {
        const key = getQuestionKey(allQuestions[index]);
        if (seenKeys.has(key)) {
          return false;
        }
        seenKeys.add(key);
        return true;
      }).slice(0, targetLength);
    }
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
  nextButton.disabled = false;
  order = [];
  orderPointer = 0;
  updateShuffleButtonState();
  renderResultPanel();
  showWrongOnlyControl();
  updateModeToggleLabel();
  setReadyToRestart(true);
}

function setReadyToRestart(isReady) {
  readyToRestart = isReady;
  updateNextButtonLabel();
}

function updateNextButtonLabel() {
  if (!nextButton) {
    return;
  }
  nextButton.textContent = readyToRestart ? '最初に戻る' : '次の問題';
}

function returnToStartScreen() {
  if (autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  setReadyToRestart(false);
  quizStarted = false;
  order = [];
  orderPointer = 0;
  currentQuestion = null;
  currentQuestionIndex = null;
  answered = false;
  questionLimit = 0;
  questionsAsked = 0;
  servedQuestionIds = new Set();
  servedQuestionKeys = new Set();
  wrongQuestionIds.clear();
  correctCount = 0;
  totalCount = 0;
  updateScoreboard();
  resetResultPanel();
  hideWrongOnlyControl();
  updateModeToggleLabel();
  updateShuffleButtonState();
  translationChoiceSection.hidden = false;
  quizSection.hidden = true;
  nextButton.disabled = true;
    if (questionEl) {
      questionEl.innerHTML = '<span class="quiz__question-text">設定後にスタートしてください。</span>';
    }
  if (optionsEl) {
    optionsEl.innerHTML = '';
  }
  if (feedbackEl) {
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz__feedback';
  }
  closeSettingsPanel();
  statusEl.textContent = `設定を行ってスタートしてください。`;
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

function getQuestionKey(question) {
  return (question?.question ?? '').trim().toLowerCase();
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

function normalizeTranslationRow(cols) {
  if (!cols || !cols.length) {
    return null;
  }
  const questionCell = cols[0] ?? '';
  const optionStartIndex = 1;
  const options = [];
  for (let i = 0; i < 4; i += 1) {
    const cell = cols[optionStartIndex + i] ?? '';
    options.push(hasMeaningfulText(cell) ? cell.trim() : null);
  }
  const questionText = hasMeaningfulText(questionCell) ? questionCell.trim() : null;
  const hasAny = questionText !== null || options.some((value) => value !== null);
  if (!hasAny) {
    return null;
  }
  return {
    question: questionText,
    options,
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

