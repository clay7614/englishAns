const QUESTION_DATASETS = [
  {
    id: 'set-601-750',
    title: '単語 601〜750',
    questionFile: '601~750.csv',
    translationFile: '601~750_ja.csv',
  },
  {
    id: 'set-751-900',
    title: '単語 751〜900',
    questionFile: '751~900.csv',
    translationFile: '751~900_ja.csv',
  },
  {
    id: 'set-901-1050',
    title: '単語 901〜1050',
    questionFile: '901~1050.csv',
    translationFile: '901~1050_ja.csv',
  },
  {
    id: 'set-1051-1200',
    title: '単語 1051〜1200',
    questionFile: '1051~1200.csv',
    translationFile: '1051~1200_ja.csv',
  },
  {
    id: 'set-glammer-2a',
    title: '文法 2A',
    questionFile: 'glammer-2A.csv',
    translationFile: 'glammer-2A_ja.csv',
  },
  {
    id: 'set-glammer-2b',
    title: '文法 2B',
    questionFile: 'glammer-2B.csv',
    translationFile: 'glammer-2B_ja.csv',
  },
];

const FALLBACKS_FILE = 'translation-fallbacks-ja.json';
let optionTranslationFallbacks = new Map();
let questionTranslationFallbacks = new Map();

const statusEl = document.querySelector('[data-status]');
const datasetSelectionSection = document.querySelector('[data-dataset-selection]');
const translationChoiceSection = document.querySelector('[data-translation-choice]');
const quizSection = document.querySelector('[data-quiz]');
const datasetTitleEl = document.querySelector('[data-dataset-title]');
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
const optionShuffleCheckbox = document.querySelector('[data-settings-option-shuffle]');
const darkModeCheckbox = document.querySelector('[data-settings-dark-mode]');
const startTranslationToggle = document.querySelector('[data-start-translation-toggle]');
const startTranslationState = document.querySelector('[data-start-translation-state]');
const startButton = document.querySelector('[data-start-quiz]');
const correctEl = document.querySelector('[data-correct]');
const totalEl = document.querySelector('[data-total]');
const optionTemplate = document.getElementById('option-button-template');
const duplicatesToggle = document.querySelector('[data-settings-duplicates-toggle]');
const questionCountSlider = document.querySelector('[data-question-count-slider]');
const questionCountDisplay = document.querySelector('[data-question-count-display]');

const historyButton = document.querySelector('[data-open-history]');
const historyPanel = document.querySelector('[data-history-panel]');
const historyCloseButton = document.querySelector('[data-close-history]');
const historyContent = document.querySelector('[data-history-content]');
const historyDeleteAllButton = document.querySelector('[data-delete-all-history]');
const historyDatasetSelect = document.querySelector('[data-history-dataset-select]');
const historyIntervalSelect = document.querySelector('[data-history-interval-select]');
const historyChartCanvas = document.getElementById('historyChart');
const overlay = document.querySelector('[data-overlay]');
// Grammar study shortcut in header; shown only on the dataset selection view
const grammarLink = document.querySelector('.app__grammar-link');

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
let userTranslationPreference = false;
let quizStarted = false;
let autoAdvanceTimer = null;
let autoAdvanceEnabled = true;
let quizMode = 'all';
let wasWrongOnlySession = false;
let allowDuplicates = false;
let questionLimit = 0;
let questionsAsked = 0;
let servedQuestionIds = new Set();
let servedQuestionKeys = new Set();
let settingsPanelOpen = false;
let historyPanelOpen = false;
let correctCount = 0;
let activeDataset = null;
let questionTransitionInProgress = false;
let queuedQuestionTransition = false;
let readyToRestart = false;
let translationControlVisible = true;
let shuffleOptionsEnabled = true;
let darkModeEnabled = false;
let effectsEnabled = true;

// コンボシステム用変数
let comboCount = 0;
let maxCombo = 0;
let sessionMaxCombo = 0;

// スコアシステム用変数
let currentScore = 0;
let sessionHighScore = 0;
const BASE_SCORE = 100; // 基本スコア

// 間違い統計用ストレージキー
const MISTAKE_STATS_KEY = 'english_ans_mistake_stats';

const SETTINGS_KEY = 'english_ans_settings';

function saveSettings() {
  const settings = {
    autoAdvanceEnabled,
    translationControlVisible,
    shuffleOptionsEnabled,
    darkModeEnabled,
    allowDuplicates,
    effectsEnabled
  };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function loadSettings() {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (saved) {
    try {
      const settings = JSON.parse(saved);
      if (settings.autoAdvanceEnabled !== undefined) autoAdvanceEnabled = settings.autoAdvanceEnabled;
      if (settings.translationControlVisible !== undefined) translationControlVisible = settings.translationControlVisible;
      if (settings.shuffleOptionsEnabled !== undefined) shuffleOptionsEnabled = settings.shuffleOptionsEnabled;
      if (settings.darkModeEnabled !== undefined) darkModeEnabled = settings.darkModeEnabled;
      if (settings.allowDuplicates !== undefined) allowDuplicates = settings.allowDuplicates;
      if (settings.effectsEnabled !== undefined) effectsEnabled = settings.effectsEnabled;
      
      // Update UI
      if (autoAdvanceCheckbox) autoAdvanceCheckbox.checked = autoAdvanceEnabled;
      if (translationControlVisibilityCheckbox) translationControlVisibilityCheckbox.checked = translationControlVisible;
      if (optionShuffleCheckbox) optionShuffleCheckbox.checked = shuffleOptionsEnabled;
      if (darkModeCheckbox) darkModeCheckbox.checked = darkModeEnabled;
      if (duplicatesToggle) duplicatesToggle.checked = allowDuplicates;
      
      // コンボ・エフェクト設定
      const effectsToggle = document.querySelector('[data-settings-effects-toggle]');
      if (effectsToggle) effectsToggle.checked = effectsEnabled;
      
      updateAutoAdvanceControl();
      updateTranslationControlVisibility();
      updateDarkMode();
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  }
}

loadSettings();

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
optionShuffleCheckbox?.addEventListener('change', handleOptionShuffleChange);
darkModeCheckbox?.addEventListener('change', handleDarkModeChange);
duplicatesToggle?.addEventListener('change', handleDuplicatesToggleChange);
settingsPanel?.addEventListener('click', (event) => event.stopPropagation());
questionCountSlider?.addEventListener('input', handleQuestionCountInput);

historyButton?.addEventListener('click', handleHistoryButtonClick);
overlay?.addEventListener('click', () => {
  closeSettingsPanel();
  closeHistoryPanel();
  closeMistakeRankingPanel();
});
historyCloseButton?.addEventListener('click', closeHistoryPanel);
historyDeleteAllButton?.addEventListener('click', handleDeleteAllHistory);
historyDatasetSelect?.addEventListener('change', () => renderHistory());
historyIntervalSelect?.addEventListener('change', () => renderHistory());
historyPanel?.addEventListener('click', (event) => event.stopPropagation());

// コンボ・エフェクト設定のイベントリスナー
const effectsToggle = document.querySelector('[data-settings-effects-toggle]');
effectsToggle?.addEventListener('change', handleEffectsToggleChange);

// 間違いランキング関連のイベントリスナー
const mistakeRankingButton = document.querySelector('[data-open-mistake-ranking]');
const mistakeRankingPanel = document.querySelector('[data-mistake-ranking-panel]');
const mistakeRankingCloseButton = document.querySelector('[data-close-mistake-ranking]');
const mistakeRankingDatasetSelect = document.querySelector('[data-mistake-ranking-dataset-select]');
const practiceMistakesButton = document.querySelector('[data-practice-mistakes]');

mistakeRankingButton?.addEventListener('click', handleMistakeRankingButtonClick);
mistakeRankingCloseButton?.addEventListener('click', closeMistakeRankingPanel);
mistakeRankingDatasetSelect?.addEventListener('change', () => renderMistakeRanking());
practiceMistakesButton?.addEventListener('click', handlePracticeMistakes);
mistakeRankingPanel?.addEventListener('click', (event) => event.stopPropagation());

document.addEventListener('click', (event) => {
  if (settingsPanelOpen && !settingsPanel.contains(event.target) && !settingsButton.contains(event.target)) {
    closeSettingsPanel();
  }
  if (historyPanelOpen && !historyPanel.contains(event.target) && !historyButton.contains(event.target)) {
    closeHistoryPanel();
  }
});

window.addEventListener('popstate', handlePopState);

updateNextButtonLabel();

init().catch((error) => {
  console.error(error);
  statusEl.textContent = `読み込み中に問題が発生しました: ${error.message}`;
  statusEl.classList.add('app__status--error');
});

async function init() {
  await loadFallbackData();
  setupAudioOnFirstInteraction(); // 効果音の初期化
  handlePopState();
}

function handlePopState() {
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('set');
  
  if (!requestedId) {
    // No set selected, show selection screen
    if (activeDataset || quizStarted) {
      returnToDatasetSelection(true); // true = from popstate
    } else {
      renderDatasetSelection();
    }
    return;
  }

  // Set is selected
  const dataset = QUESTION_DATASETS.find((item) => item.id === requestedId);
  if (!dataset) {
    // Invalid ID, go back to selection
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete('set');
    window.history.replaceState({}, '', newUrl);
    renderDatasetSelection();
    return;
  }

  // If we are already on this dataset's settings or quiz, do nothing (or maybe handle view change?)
  // For now, if we are in quiz and URL is just ?set=..., we might want to go back to settings?
  // But we don't have a separate URL for quiz yet.
  
  if (activeDataset?.id !== dataset.id) {
    selectDataset(dataset, true); // true = from popstate
  } else if (quizStarted) {
    // If we are in quiz but URL implies settings (no view param), we should probably go back to settings
    // But since we don't use view param yet, let's just stay.
    // If we want to support Back from Quiz -> Settings, we need to push state on startQuiz.
  }
}

function renderDatasetSelection() {
  activeDataset = null;
  if (!datasetSelectionSection) return;
  
  datasetSelectionSection.innerHTML = '';
  QUESTION_DATASETS.forEach(dataset => {
    const card = document.createElement('article');
    card.className = 'start-card';
    card.innerHTML = `
      <h2 class="start-card__title">${escapeHtml(dataset.title)}</h2>
      <button type="button" class="start-card__button">
        <span class="material-symbols-outlined">play_arrow</span>
        スタート
      </button>
    `;
    card.querySelector('button').addEventListener('click', () => selectDataset(dataset));
    datasetSelectionSection.appendChild(card);
  });

  statusEl.textContent = '問題集を選んでください。';
  datasetSelectionSection.hidden = false;
  translationChoiceSection.hidden = true;
  quizSection.hidden = true;
  if (datasetTitleEl) datasetTitleEl.textContent = '';
  setGrammarLinkVisibility(true);
}

async function selectDataset(dataset, fromPopState = false) {
  activeDataset = dataset;
  const pageTitle = `${dataset.title} | 英語テスト`;
  document.title = pageTitle;
  if (datasetTitleEl) {
    datasetTitleEl.textContent = dataset.title;
  }

  // Transition
  if (!datasetSelectionSection.hidden) {
    datasetSelectionSection.classList.add('animate-fade-out');
    setTimeout(async () => {
      datasetSelectionSection.hidden = true;
      datasetSelectionSection.classList.remove('animate-fade-out');
      await loadAndShowStartOptions(dataset, fromPopState);
    }, 250);
  } else {
    await loadAndShowStartOptions(dataset, fromPopState);
  }
}

async function loadAndShowStartOptions(dataset, fromPopState = false) {
  statusEl.textContent = '問題を読み込み中...';
  
  try {
    // If we already have the questions loaded, don't reload
    if (allQuestions.length > 0 && activeDataset?.id === dataset.id && !fromPopState) {
       // Just show
    } else {
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
    }

    configureQuestionCountControls(allQuestions.length);
    updateAutoAdvanceControl();
    updateTranslationToggleLabel();
    updateModeToggleLabel();
    updateStartTranslationState();
    if (translationControlVisibilityCheckbox) {
      translationControlVisible = Boolean(translationControlVisibilityCheckbox.checked);
    }
    if (optionShuffleCheckbox) {
      shuffleOptionsEnabled = Boolean(optionShuffleCheckbox.checked);
    }
    updateTranslationControlVisibility();

    statusEl.textContent = `設定を行ってスタートしてください。`;
    
    translationChoiceSection.hidden = false;
    translationChoiceSection.classList.add('animate-fade-in');
    setTimeout(() => {
      translationChoiceSection.classList.remove('animate-fade-in');
    }, 300);
    setGrammarLinkVisibility(false);
    
    if (!fromPopState) {
        // Update URL without reloading
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('set', dataset.id);
        window.history.pushState({ set: dataset.id }, '', newUrl);
    }

  } catch (error) {
    console.error(error);
    statusEl.textContent = `エラー: ${error.message}`;
    statusEl.classList.add('app__status--error');
  }
}

function returnToDatasetSelection(fromPopState = false) {
  if (quizStarted) {
    // If returning from quiz, first go back to start screen logic (resetting state)
    // But here we want to go all the way back to selection
    // Let's just reset everything and show selection
    returnToStartScreen(true); // Pass true to indicate we want to go further back
    // Note: returnToStartScreen handles the UI transition
    // If fromPopState is true, we shouldn't push state in returnToStartScreen either?
    // Actually returnToStartScreen doesn't push state for selection return currently?
    // Let's check returnToStartScreen implementation
    return;
  }

  // Transition from start options to selection
    translationChoiceSection.classList.add('animate-fade-out');
    setTimeout(() => {
      translationChoiceSection.hidden = true;
      translationChoiceSection.classList.remove('animate-fade-out');
      renderDatasetSelection();
      datasetSelectionSection.classList.add('animate-fade-in');
      setTimeout(() => {
        datasetSelectionSection.classList.remove('animate-fade-in');
      }, 300);
    }, 250);
  
  if (!fromPopState) {
      // Clear URL param
      const newUrl = new URL(window.location);
      newUrl.searchParams.delete('set');
      window.history.pushState({}, '', newUrl);
  }
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
      correctAnswer: english.correctAnswer, // Pass through correct answer text
      type: english.type || 'choice', // Pass through type
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
  userTranslationPreference = enableTranslations;
  quizStarted = true;
  wasWrongOnlySession = false;
  closeSettingsPanel();
  document.body.classList.add('app--quiz-active');
  
  // Transition from start screen to quiz
  translationChoiceSection.classList.add('animate-fade-out');
  setTimeout(() => {
    translationChoiceSection.hidden = true;
    translationChoiceSection.classList.remove('animate-fade-out');
    
    quizSection.hidden = false;
    quizSection.classList.add('animate-fade-in');
    setTimeout(() => {
      quizSection.classList.remove('animate-fade-in');
    }, 300);
  }, 250);

  setReadyToRestart(false);
  nextButton.disabled = true;
  correctCount = 0;
  totalCount = 0;
  comboCount = 0;
  sessionMaxCombo = 0;
  currentScore = 0; // スコアをリセット
  resetScore();
  resetResultPanel();
  hideWrongOnlyControl();
  updateScoreboard();
  updateTranslationToggleLabel();
  updateAutoAdvanceControl();
  updateComboDisplay();
  const canContinue = setQuizMode('all', { silent: true });
  statusEl.textContent = `${questionLimit} 問を出題します。`;
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
      return false;
    }
    quizMode = 'wrong-only';
    wasWrongOnlySession = true;
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
      return;
    }
    const sourceIndexes = poolIndexes.length ? poolIndexes : getAllQuestionIndexes();
    const nextOrder = buildOrderForAllMode(sourceIndexes, remaining);
    order = nextOrder;
    orderPointer = 0;
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
  resultEl.innerHTML = `<div><strong>${summary}</strong></div><div style="font-size: 1.1rem; font-weight: 500; margin-top: 4px; opacity: 0.9;">${detail}</div>`;
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
        statusEl.textContent = '誤答した問題はありません。';
        finishSession();
        return;
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

    // Animate question transition
    const container = questionEl.parentElement;
    container.classList.add('animate-fade-out');
    
    setTimeout(() => {
      // Auto-toggle translation for descriptive questions
      if (currentQuestion.type === 'descriptive') {
        showTranslations = true;
      } else {
        showTranslations = userTranslationPreference;
      }
      updateTranslationToggleLabel();

      renderQuestion(currentQuestion);
      
      if (currentQuestion.type === 'descriptive') {
        renderDescriptiveInput(currentQuestion);
      } else {
        renderOptions(currentQuestion);
      }
      
      // syncTranslationVisibility is called by updateTranslationToggleLabel
      
      container.classList.remove('animate-fade-out');
      container.classList.add('animate-fade-in');
      
      if (currentQuestion.type !== 'descriptive') {
        // Animate options sequentially
        const options = optionsEl.querySelectorAll('.quiz__option');
        options.forEach((opt, i) => {
          opt.style.opacity = '0';
          opt.style.animation = `popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${i * 0.05 + 0.1}s`;
        });
      }

      setTimeout(() => {
        container.classList.remove('animate-fade-in');
      }, 300);
    }, 200);

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
  let markup = `
    <div class="quiz__question-header">
      <span class="quiz__question-text">${formatText(question.question)}</span>
    </div>
  `;
  const translationText = question.translation.question;
  if (hasMeaningfulText(translationText)) {
    markup += `<span class="quiz__question-translation">${formatText(translationText)}</span>`;
  }
  questionEl.innerHTML = markup;
}

function renderOptions(question) {
  optionsEl.innerHTML = '';
  const renderOrder = getOptionRenderOrder(question);
  renderOrder.forEach((optionIndex) => {
    const optionText = question.options[optionIndex];
    const button = optionTemplate.content.firstElementChild.cloneNode(true);
    const translationText = question.translation.options[optionIndex];
    let optionMarkup = `<span class="quiz__option-text">${formatText(optionText)}</span>`;
    if (hasMeaningfulText(translationText)) {
      optionMarkup += `<span class="quiz__option-translation">${formatText(translationText)}</span>`;
    }
    button.innerHTML = optionMarkup;
    button.dataset.optionIndex = String(optionIndex);
    button.addEventListener('click', () => handleOptionClick(button, optionIndex));
    optionsEl.appendChild(button);
  });
}

function renderDescriptiveInput(question) {
  optionsEl.innerHTML = '';
  
  const container = document.createElement('div');
  container.className = 'quiz__descriptive-container';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'quiz__descriptive-input';
  input.placeholder = '答えを入力してください';
  input.autocomplete = 'off';
  
  const actions = document.createElement('div');
  actions.className = 'quiz__descriptive-actions';

  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.className = 'quiz__descriptive-submit';
  submitButton.innerHTML = '<span class="material-symbols-outlined">send</span>';
  submitButton.title = '回答する';

  const hintButton = document.createElement('button');
  hintButton.type = 'button';
  hintButton.className = 'quiz__descriptive-hint';
  hintButton.innerHTML = '<span class="material-symbols-outlined">lightbulb</span>';
  hintButton.title = 'ヒント';
  
  const hintText = document.createElement('span');
  hintText.className = 'quiz__descriptive-hint-text';
  hintText.style.display = 'none';

  let hintLevel = 0;
  hintButton.addEventListener('click', () => {
    hintLevel++;
    const answer = currentQuestion.correctAnswer || '';
    
    const hint = answer.replace(/[a-zA-Z0-9]+/g, (match) => {
      if (hintLevel >= match.length) {
        return match;
      }
      return match.slice(0, hintLevel) + '...';
    });
    
    hintText.textContent = hint;
    hintText.style.display = 'block';
    input.focus();
  });
  
  const handleSubmit = () => {
    if (answered) return;
    handleDescriptiveSubmit(input.value);
  };
  
  submitButton.addEventListener('click', handleSubmit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  });
  
  actions.appendChild(hintButton);
  actions.appendChild(submitButton);
  container.appendChild(input);
  container.appendChild(actions);
  container.appendChild(hintText);
  optionsEl.appendChild(container);
  
  setTimeout(() => input.focus(), 100);
  
  const translationEl = questionEl.querySelector('.quiz__question-translation');
  if (translationEl) {
    translationEl.style.display = 'block';
    translationEl.style.opacity = '1';
    translationEl.style.height = 'auto';
  }
}

function handleDescriptiveSubmit(userAnswer) {
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

  // Normalize answers for comparison (trim, case-insensitive, replace commas with spaces, collapse spaces)
  const normalizedUser = userAnswer.trim().toLowerCase().replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
  const normalizedCorrect = currentQuestion.correctAnswer.trim().toLowerCase().replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
  
  const isCorrect = normalizedUser === normalizedCorrect;
  
  const input = optionsEl.querySelector('.quiz__descriptive-input');
  const submitBtn = optionsEl.querySelector('.quiz__descriptive-submit');
  
  if (input) input.disabled = true;
  if (submitBtn) submitBtn.disabled = true;

  if (isCorrect) {
    if (isScoredQuestion) {
      correctCount += 1;
    }
    stats.correct += 1;
    wrongQuestionIds.delete(questionId);
    feedbackEl.innerHTML = '<span class="material-symbols-outlined">check_circle</span> 正解！';
    feedbackEl.classList.add('quiz__feedback--correct');
    if (input) input.classList.add('quiz__descriptive-input--correct');
    
    // コンボシステム - 正解時
    incrementCombo();
    playCorrectEffects();
  } else {
    wrongQuestionIds.add(questionId);
    feedbackEl.innerHTML = `
      <div class="quiz__feedback-wrong-header">
        <span class="material-symbols-outlined">cancel</span> 残念！
      </div>
      <div class="quiz__feedback-correct-answer">正解: <strong>${escapeHtml(currentQuestion.correctAnswer)}</strong></div>
    `;
    feedbackEl.classList.add('quiz__feedback--wrong');
    if (input) input.classList.add('quiz__descriptive-input--wrong');
    
    // コンボシステム - 不正解時
    resetCombo();
    playWrongEffects();
    
    // 間違い統計を保存
    saveMistakeStats(questionId);
  }
  questionStats.set(questionId, stats);

  nextButton.disabled = false;
  updateScoreboard();
  updateModeToggleLabel();

  if (quizMode === 'wrong-only') {
    if (wrongQuestionIds.size === 0) {
      statusEl.textContent = '誤答した問題を解き終わりました。';
      finishSession();
    } else {
      prepareOrder(getActivePoolIndexes());
    }
  } else if (orderPointer >= order.length) {
    prepareOrder(getActivePoolIndexes());
  }

  // Auto advance if correct? Or always?
  // For descriptive, maybe give more time to read feedback if wrong?
  // Existing logic:
  if (autoAdvanceEnabled) {
    // If wrong, maybe wait longer?
    const delay = isCorrect ? 800 : 2000; 
    autoAdvanceTimer = window.setTimeout(() => {
      autoAdvanceTimer = null;
      showNextQuestion();
    }, delay);
  }
}


function getOptionRenderOrder(question) {
  if (!question || !question.options) {
    return [];
  }
  const baseOrder = question.options.map((_, index) => index);
  if (!shuffleOptionsEnabled) {
    return baseOrder;
  }
  return shuffle(baseOrder);
}

function handleOptionClick(button, selectedOptionIndex) {
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

  const isCorrect = selectedOptionIndex === currentQuestion.answerIndex;
  if (isCorrect) {
    if (isScoredQuestion) {
      correctCount += 1;
    }
    stats.correct += 1;
    wrongQuestionIds.delete(questionId);
    feedbackEl.innerHTML = '<span class="material-symbols-outlined">check_circle</span> 正解！';
    feedbackEl.classList.add('quiz__feedback--correct');
    
    // コンボシステム - 正解時
    incrementCombo();
    playCorrectEffects();
  } else {
    wrongQuestionIds.add(questionId);
    feedbackEl.innerHTML = `
      <div class="quiz__feedback-wrong-header">
        <span class="material-symbols-outlined">cancel</span> 残念！
      </div>
      <div class="quiz__feedback-correct-answer">正解: <strong>${escapeHtml(currentQuestion.options[currentQuestion.answerIndex])}</strong></div>
    `;
    feedbackEl.classList.add('quiz__feedback--wrong');
    
    // コンボシステム - 不正解時
    resetCombo();
    playWrongEffects();
    
    // 間違い統計を保存
    saveMistakeStats(questionId);
  }
  questionStats.set(questionId, stats);

  [...optionsEl.children].forEach((optionButton) => {
    optionButton.disabled = true;
    const buttonOptionIndex = Number.parseInt(optionButton.dataset.optionIndex ?? '-1', 10);
    if (buttonOptionIndex === currentQuestion.answerIndex) {
      optionButton.classList.add('quiz__option--correct');
    }
    if (buttonOptionIndex === selectedOptionIndex && !isCorrect) {
      optionButton.classList.add('quiz__option--wrong');
    }
  });

  nextButton.disabled = false;
  updateScoreboard();
  updateModeToggleLabel();

  if (quizMode === 'wrong-only') {
    if (wrongQuestionIds.size === 0) {
      statusEl.textContent = '誤答した問題を解き終わりました。';
      finishSession();
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
  saveSettings();
  if (quizStarted) {
    statusEl.textContent = `自動で進むを${autoAdvanceEnabled ? 'ON' : 'OFF'}にしました。`;
  }
}

function handleTranslationControlVisibilityChange() {
  translationControlVisible = Boolean(translationControlVisibilityCheckbox?.checked);
  updateTranslationControlVisibility();
  saveSettings();
  if (quizStarted) {
    statusEl.textContent = translationControlVisible
      ? '「日本語」ボタンを表示しました。'
      : '「日本語」ボタンを非表示にしました。';
  }
}

function handleOptionShuffleChange() {
  shuffleOptionsEnabled = Boolean(optionShuffleCheckbox?.checked);
  saveSettings();
  if (quizStarted) {
    statusEl.textContent = shuffleOptionsEnabled
      ? '選択肢の順番をシャッフルします。'
      : '選択肢の順番を固定します。';
  }
}

function handleDarkModeChange() {
  darkModeEnabled = Boolean(darkModeCheckbox?.checked);
  updateDarkMode();
  saveSettings();
}

function handleDuplicatesToggleChange() {
  allowDuplicates = Boolean(duplicatesToggle?.checked);
  saveSettings();
}

function updateDarkMode() {
  if (darkModeEnabled) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
    document.documentElement.classList.add('light-mode');
  }
  if (darkModeCheckbox) {
    darkModeCheckbox.checked = darkModeEnabled;
  }
}

function handleToggleTranslation() {
  showTranslations = !showTranslations;
  userTranslationPreference = showTranslations;
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

function handleSettingsButtonClick(event) {
  event.stopPropagation();
  if (settingsPanelOpen) {
    closeSettingsPanel();
  } else {
    openSettingsPanel();
  }
}

function openSettingsPanel() {
  if (historyPanelOpen) {
    closeHistoryPanel();
  }
  if (!settingsPanel || settingsPanelOpen) {
    return;
  }
  settingsPanel.hidden = false;
  if (overlay) overlay.hidden = false;
  settingsPanel.classList.remove('animate-close');
  settingsPanel.classList.add('animate-open');
  settingsPanelOpen = true;
  settingsButton?.setAttribute('aria-expanded', 'true');
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleSettingsKeydown);
}

function closeSettingsPanel() {
  if (!settingsPanel || !settingsPanelOpen) {
    return;
  }
  settingsPanel.classList.remove('animate-open');
  settingsPanel.classList.add('animate-close');
  settingsPanelOpen = false;
  if (!historyPanelOpen && overlay) {
    overlay.hidden = true;
  }
  settingsButton?.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', handleDocumentClick);
  document.removeEventListener('keydown', handleSettingsKeydown);
  setTimeout(() => {
    if (!settingsPanelOpen) {
      settingsPanel.hidden = true;
      settingsPanel.classList.remove('animate-close');
    }
  }, 400);
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
  updateNextButtonVisibility();
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
  quizStarted = false;
  document.body.classList.remove('app--quiz-active');
  if (autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }

  // Save result only for normal mode sessions (not wrong-only mode)
  if (activeDataset && quizMode !== 'wrong-only' && !wasWrongOnlySession) {
    saveResult(activeDataset, correctCount, totalCount);
  }

  // セッションの最大コンボを含めた完了メッセージ
  let finishMessage = `指定した ${questionLimit} 問の出題が完了しました。`;
  if (sessionMaxCombo >= 3) {
    finishMessage += ` 最大コンボ: ${sessionMaxCombo}`;
  }
  statusEl.textContent = finishMessage;
  
  // コンボ表示を隠す
  hideComboDisplay();
  
  nextButton.disabled = false;
  order = [];
  orderPointer = 0;
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
  updateNextButtonVisibility();
}

function updateNextButtonVisibility() {
  if (!nextButton) {
    return;
  }
  const shouldHide = autoAdvanceEnabled && !readyToRestart;
  nextButton.hidden = shouldHide;
}

/**
 * Toggle visibility of the grammar study link.
 * @param {boolean} isVisible - Whether the link should be shown.
 * Only the dataset selection view should show this link; other screens hide it.
 * Safely no-ops when the link element is missing.
 */
function setGrammarLinkVisibility(isVisible) {
  if (!grammarLink) {
    return;
  }
  grammarLink.hidden = !isVisible;
}

function returnToStartScreen(goBackToSelection = false) {
  if (autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  setReadyToRestart(false);
  quizStarted = false;
  document.body.classList.remove('app--quiz-active');
  // Reset wrong-only session flag for new quiz sessions
  wasWrongOnlySession = false;
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
  comboCount = 0;
  sessionMaxCombo = 0;
  hideComboDisplay();
  updateScoreboard();
  resetResultPanel();
  hideWrongOnlyControl();
  updateModeToggleLabel();
  setGrammarLinkVisibility(goBackToSelection);
  
  // Transition from quiz
  quizSection.classList.add('animate-fade-out');
  setTimeout(() => {
    quizSection.hidden = true;
    quizSection.classList.remove('animate-fade-out');
    
    if (goBackToSelection) {
      renderDatasetSelection();
      datasetSelectionSection.classList.add('animate-fade-in');
      setTimeout(() => {
        datasetSelectionSection.classList.remove('animate-fade-in');
      }, 300);
      
      // Clear URL param
      const newUrl = new URL(window.location);
      newUrl.searchParams.delete('set');
      window.history.pushState({}, '', newUrl);
    } else {
      translationChoiceSection.hidden = false;
      translationChoiceSection.classList.add('animate-fade-in');
      setTimeout(() => {
        translationChoiceSection.classList.remove('animate-fade-in');
      }, 300);
      statusEl.textContent = `設定を行ってスタートしてください。`;
    }
  }, 250);

  nextButton.disabled = true;
    if (questionEl) {
      questionEl.innerHTML = '<span class="quiz__question-text"></span>';
    }
  if (optionsEl) {
    optionsEl.innerHTML = '';
  }
  if (feedbackEl) {
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz__feedback';
  }
  closeSettingsPanel();
}

function getSelectedDuplicateMode() {
  return duplicatesToggle?.checked ? 'allow' : 'disallow';
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
  
  // Check for descriptive question (Anum = 0)
  if (answerRaw.trim() === '0') {
    return {
      question: rawQuestion.trim(),
      options: [], // No options for descriptive
      answerIndex: -1, // Indicator for descriptive
      correctAnswer: options[0].trim(), // A1 contains the answer
      type: 'descriptive'
    };
  }

  const answerIndex = Number.parseInt(answerRaw, 10) - 1;
  if (Number.isNaN(answerIndex) || answerIndex < 0 || answerIndex > 3) {
    return null;
  }
  return {
    question: rawQuestion.trim(),
    options: options.map((option) => option.trim()),
    answerIndex,
    type: 'choice'
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
  const defaultCount = Math.min(20, cappedMax);
  questionCountSlider.value = String(defaultCount);
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


/* History Functions */
function handleHistoryButtonClick(event) {
  event.stopPropagation();
  if (historyPanelOpen) {
    closeHistoryPanel();
  } else {
    openHistoryPanel();
  }
}

function openHistoryPanel() {
  if (settingsPanelOpen) {
    closeSettingsPanel();
  }
  if (!historyPanel || historyPanelOpen) {
    return;
  }
  historyPanel.hidden = false;
  if (overlay) overlay.hidden = false;
  historyPanel.classList.remove('animate-close');
  historyPanel.classList.add('animate-open');
  historyPanelOpen = true;
  historyButton?.setAttribute('aria-expanded', 'true');
  renderHistory(activeDataset?.id);
}

function closeHistoryPanel() {
  if (!historyPanel || !historyPanelOpen) {
    return;
  }
  historyPanel.classList.remove('animate-open');
  historyPanel.classList.add('animate-close');
  historyPanelOpen = false;
  if (!settingsPanelOpen && overlay) {
    overlay.hidden = true;
  }
  historyButton?.setAttribute('aria-expanded', 'false');
  setTimeout(() => {
    if (!historyPanelOpen) {
      historyPanel.hidden = true;
      historyPanel.classList.remove('animate-close');
    }
  }, 400);
}

const HISTORY_KEY = 'english-quiz-history';
let historyChartInstance = null;

function getHistoryData() {
  try {
    const json = localStorage.getItem(HISTORY_KEY);
    if (!json) return {};
    
    const data = JSON.parse(json);
    if (Array.isArray(data)) {
      // Migrate old array format to new object format
      const newData = {};
      data.forEach(item => {
        const id = item.datasetId || 'unknown';
        if (!newData[id]) newData[id] = [];
        newData[id].push(item);
      });
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newData));
      return newData;
    }
    return data;
  } catch (e) {
    console.error('Failed to load history', e);
    return {};
  }
}

function saveResult(dataset, score, total) {
  if (!dataset) return;
  
  const result = {
    date: Date.now(),
    datasetId: dataset.id,
    datasetTitle: dataset.title,
    score: score,
    total: total,
    mode: quizMode
  };
  
  try {
    const historyData = getHistoryData();
    if (!historyData[dataset.id]) {
      historyData[dataset.id] = [];
    }
    
    historyData[dataset.id].unshift(result);
    
    // Limit per dataset
    if (historyData[dataset.id].length > 100) {
      historyData[dataset.id].length = 100;
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
  } catch (e) {
    console.error('Failed to save history', e);
  }
}

function renderHistory(preferredId) {
  if (!historyContent) return;
  
  try {
    const historyData = getHistoryData();
    const datasetIds = Object.keys(historyData);
    
    // Rebuild options
    const currentSelection = historyDatasetSelect.value;
    historyDatasetSelect.innerHTML = '<option value="all">すべての問題集</option>';
    
    datasetIds.forEach(id => {
      const items = historyData[id];
      if (items && items.length > 0) {
        const title = items[0].datasetTitle || id;
        const option = document.createElement('option');
        option.value = id;
        option.textContent = title;
        historyDatasetSelect.appendChild(option);
      }
    });
    
    // Restore selection or set default
    if (preferredId && historyData[preferredId]) {
      historyDatasetSelect.value = preferredId;
    } else if (datasetIds.includes(currentSelection)) {
      historyDatasetSelect.value = currentSelection;
    }
    
    const selectedId = historyDatasetSelect.value;
    let displayHistory = [];
    
    if (selectedId === 'all') {
      Object.values(historyData).forEach(items => {
        displayHistory = displayHistory.concat(items);
      });
      displayHistory.sort((a, b) => b.date - a.date);
    } else {
      displayHistory = historyData[selectedId] || [];
    }
    
    renderHistoryGraph(displayHistory);

    if (displayHistory.length === 0) {
      historyContent.innerHTML = '<p class="history-panel__empty">履歴はありません。</p>';
      return;
    }
    
    historyContent.innerHTML = displayHistory.map(item => {
      const date = new Date(item.date);
      const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
      const percent = item.total > 0 ? Math.round((item.score / item.total) * 100) : 0;
      const isPerfect = item.score === item.total && item.total > 0;
      
      return `
        <div class="history-item ${isPerfect ? 'history-item--perfect' : ''}">
          <div class="history-item__header">
            <span class="history-item__date">${dateStr}</span>
            <span class="history-item__mode">${item.mode === 'wrong-only' ? '誤答のみ' : '通常'}</span>
          </div>
          <div class="history-item__title">${escapeHtml(item.datasetTitle)}</div>
          <div class="history-item__score">${item.score} / ${item.total} (${percent}%)</div>
        </div>
      `;
    }).join('');
    
  } catch (e) {
    console.error('Failed to render history', e);
    historyContent.innerHTML = '<p class="history-panel__empty">履歴の読み込みに失敗しました。</p>';
  }
}

function renderHistoryGraph(history) {
  if (!historyChartCanvas || typeof Chart === 'undefined') return;

  if (historyChartInstance) {
    historyChartInstance.destroy();
    historyChartInstance = null;
  }

  if (!history || history.length === 0) {
    return;
  }

  const interval = historyIntervalSelect ? historyIntervalSelect.value : 'test';
  let graphData = [];
  let labels = [];
  let scores = [];
  let tooltips = [];

  if (interval === 'test') {
    // Prepare data for the graph (reverse to show oldest to newest)
    graphData = [...history].reverse().slice(-20); // Show last 20 attempts
    
    labels = graphData.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    scores = graphData.map(item => {
      return item.total > 0 ? Math.round((item.score / item.total) * 100) : 0;
    });

    tooltips = graphData.map(item => {
      const date = new Date(item.date);
      return {
        title: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
        label: `${item.datasetTitle}: ${item.score}/${item.total}`
      };
    });

  } else {
    // Aggregate data
    const groups = new Map();
    
    // Sort history by date ascending first
    const sortedHistory = [...history].sort((a, b) => a.date - b.date);

    sortedHistory.forEach(item => {
      const date = new Date(item.date);
      let key;
      let label;
      
      if (interval === 'hour') {
        key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
        label = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`;
      } else { // day
        key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        label = `${date.getMonth() + 1}/${date.getDate()}`;
      }

      if (!groups.has(key)) {
        groups.set(key, {
          label: label,
          totalScore: 0,
          totalCount: 0,
          items: 0,
          date: date
        });
      }
      
      const group = groups.get(key);
      group.totalScore += item.score;
      group.totalCount += item.total;
      group.items += 1;
    });

    // Convert map to array and take last 20 points
    graphData = Array.from(groups.values()).slice(-20);

    labels = graphData.map(g => g.label);
    scores = graphData.map(g => g.totalCount > 0 ? Math.round((g.totalScore / g.totalCount) * 100) : 0);
    tooltips = graphData.map(g => ({
      title: g.label,
      label: `平均: ${Math.round((g.totalScore / g.totalCount) * 100)}% (${g.items}回)`
    }));
  }

  const ctx = historyChartCanvas.getContext('2d');
  
  // Check for dark mode
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const textColor = isDarkMode ? '#e0e0e0' : '#666';

  historyChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '正答率 (%)',
        data: scores,
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: isDarkMode ? '#4a90e2' : '#fff',
        pointBorderColor: '#4a90e2',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              const index = context[0].dataIndex;
              return tooltips[index].title;
            },
            label: (context) => {
              const index = context.dataIndex;
              const tip = tooltips[index];
              return `${tip.label} (${context.raw}%)`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: textColor,
            maxTicksLimit: 10
          }
        }
      }
    }
  });
}

function handleDeleteAllHistory() {
  if (!confirm('すべての学習履歴を削除しますか？この操作は取り消せません。')) {
    return;
  }
  
  const selectedId = historyDatasetSelect.value;
  
  try {
    if (selectedId === 'all') {
      localStorage.removeItem(HISTORY_KEY);
    } else {
      const historyData = getHistoryData();
      delete historyData[selectedId];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
    }
    renderHistory();
  } catch (e) {
    console.error('Failed to delete history', e);
    alert('履歴の削除に失敗しました。');
  }
}
// ===========================================
// コンボシステム
// ===========================================

function incrementCombo() {
  comboCount += 1;
  if (comboCount > maxCombo) {
    maxCombo = comboCount;
  }
  if (comboCount > sessionMaxCombo) {
    sessionMaxCombo = comboCount;
  }
  updateComboDisplay();
  
  // スコアを加算
  addScore();
  
  // マイルストーンでボーナスポップアップ
  if (effectsEnabled && [5, 10, 20, 30, 40, 50].includes(comboCount)) {
    showComboMilestone(comboCount);
  }
}

function resetCombo() {
  if (comboCount > 0 && effectsEnabled) {
    // コンボが途切れた演出
    hideComboDisplay();
    // 常時演出も停止
    stopAmbientParticles();
    const ambientOverlay = document.querySelector('[data-rainbow-overlay]');
    if (ambientOverlay && !feverMode) {
      ambientOverlay.classList.remove('rainbow-overlay--active');
    }
  }
  comboCount = 0;
}

// ===========================================
// スコアシステム
// ===========================================

// マイルストーンボーナススコア
const MILESTONE_BONUS = {
  5: 500,      // NICE!
  10: 1500,    // GREAT!
  20: 5000,    // AMAZING!
  30: 15000,   // FEVER!
  40: 50000,   // INCREDIBLE!
  50: 100000   // JACKPOT!
};

function calculateScore() {
  // コンボに応じてスコアが加速度的に増加
  // 基本スコア × (1 + コンボ数 × 0.2) × コンボボーナス
  const comboMultiplier = 1 + (comboCount * 0.2);
  
  // コンボ数に応じたボーナス倍率
  let bonusMultiplier = 1;
  if (comboCount >= 50) {
    bonusMultiplier = 5.0;
  } else if (comboCount >= 40) {
    bonusMultiplier = 4.0;
  } else if (comboCount >= 30) {
    bonusMultiplier = 3.0;
  } else if (comboCount >= 20) {
    bonusMultiplier = 2.5;
  } else if (comboCount >= 10) {
    bonusMultiplier = 2.0;
  } else if (comboCount >= 5) {
    bonusMultiplier = 1.5;
  }
  
  let score = Math.floor(BASE_SCORE * comboMultiplier * bonusMultiplier);
  
  // マイルストーンボーナスを追加
  if (MILESTONE_BONUS[comboCount]) {
    score += MILESTONE_BONUS[comboCount];
  }
  
  return score;
}

function addScore() {
  const scoreToAdd = calculateScore();
  currentScore += scoreToAdd;
  
  if (currentScore > sessionHighScore) {
    sessionHighScore = currentScore;
  }
  
  updateScoreDisplay(scoreToAdd);
}

function updateScoreDisplay(addedScore = 0) {
  const scoreDisplay = document.querySelector('[data-score-display]');
  const scoreValue = document.querySelector('[data-score-value]');
  const scoreAdd = document.querySelector('[data-score-add]');
  
  if (!scoreDisplay || !scoreValue) return;
  
  // スコア表示を表示
  if (effectsEnabled && currentScore > 0) {
    scoreDisplay.hidden = false;
    scoreDisplay.classList.add('score-display--visible');
    
    // スコア値をアニメーション付きで更新
    animateScoreValue(scoreValue, currentScore);
    
    // 加算スコアを表示
    if (addedScore > 0 && scoreAdd) {
      scoreAdd.textContent = `+${addedScore.toLocaleString()}`;
      scoreAdd.hidden = false;
      scoreAdd.classList.remove('score-display__add--animate');
      void scoreAdd.offsetWidth;
      scoreAdd.classList.add('score-display__add--animate');
      
      setTimeout(() => {
        scoreAdd.hidden = true;
        scoreAdd.classList.remove('score-display__add--animate');
      }, 1000);
    }
  }
}

function animateScoreValue(element, targetValue) {
  const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
  const diff = targetValue - currentValue;
  const duration = 2000; // 2秒かけてアニメーション
  const steps = 60;
  const increment = diff / steps;
  let step = 0;
  
  // 既存のアニメーションをキャンセル
  if (element._scoreAnimationInterval) {
    clearInterval(element._scoreAnimationInterval);
  }
  
  element._scoreAnimationInterval = setInterval(() => {
    step++;
    // イージング（最初は速く、後半はゆっくり）
    const progress = step / steps;
    const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const newValue = Math.floor(currentValue + diff * easedProgress);
    element.textContent = newValue.toLocaleString();
    
    if (step >= steps) {
      clearInterval(element._scoreAnimationInterval);
      element._scoreAnimationInterval = null;
      element.textContent = targetValue.toLocaleString();
    }
  }, duration / steps);
}

function resetScore() {
  currentScore = 0;
  const scoreDisplay = document.querySelector('[data-score-display]');
  const scoreValue = document.querySelector('[data-score-value]');
  
  if (scoreDisplay) {
    scoreDisplay.classList.remove('score-display--visible');
    scoreDisplay.hidden = true;
  }
  if (scoreValue) {
    scoreValue.textContent = '0';
  }
}

function hideScoreDisplay() {
  const scoreDisplay = document.querySelector('[data-score-display]');
  if (!scoreDisplay) return;
  
  scoreDisplay.classList.remove('score-display--visible');
  setTimeout(() => {
    scoreDisplay.hidden = true;
  }, 300);
}

function hideComboDisplay() {
  const comboDisplay = document.querySelector('[data-combo-display]');
  if (!comboDisplay) return;
  
  comboDisplay.classList.remove('combo-display--visible');
  setTimeout(() => {
    comboDisplay.hidden = true;
  }, 300);
}



function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  // サスペンド状態の場合は再開
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

// 最初のユーザー操作でAudioContextを初期化
function setupAudioOnFirstInteraction() {
  const initAudio = () => {
    initAudioContext();
    document.removeEventListener('click', initAudio);
    document.removeEventListener('touchstart', initAudio);
    document.removeEventListener('keydown', initAudio);
  };
  document.addEventListener('click', initAudio, { once: true });
  document.addEventListener('touchstart', initAudio, { once: true });
  document.addEventListener('keydown', initAudio, { once: true });
}

function playSound(type) {
  if (!effectsEnabled) return;
  
  try {
    const ctx = initAudioContext();
    
    // feverとjackpotは別関数で処理
    if (type === 'fever') {
      playFeverFanfare(ctx);
      return;
    }
    if (type === 'jackpot') {
      playJackpotSound(ctx);
      return;
    }
    if (type === 'milestone') {
      playMilestoneSound(ctx);
      return;
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    switch (type) {
      case 'correct':
        // 正解音: 上昇するピッチ
        oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.1); // G5
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
        break;
        
      case 'combo':
        // コンボ音: より高いピッチ
        oscillator.frequency.setValueAtTime(659, ctx.currentTime); // E5
        oscillator.frequency.exponentialRampToValueAtTime(1047, ctx.currentTime + 0.15); // C6
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.25);
        break;
        
      case 'wrong':
        // 不正解音: 下降するピッチ
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
    }
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

function playFeverFanfare(ctx) {
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + i * 0.1 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.4);
    osc.start(ctx.currentTime + i * 0.1);
    osc.stop(ctx.currentTime + i * 0.1 + 0.4);
  });
}

function playJackpotSound(ctx) {
  const notes = [523, 659, 784, 880, 1047, 1319, 1568]; // 上昇音階
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + i * 0.1 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
    osc.start(ctx.currentTime + i * 0.1);
    osc.stop(ctx.currentTime + i * 0.1 + 0.3);
  });
}

// マイルストーン到達時のコイン音
function playMilestoneSound(ctx) {
  // チャリンチャリン音（コインが増える感じ）
  for (let i = 0; i < 5; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 2000 + Math.random() * 1000;
    osc.type = 'sine';
    const startTime = ctx.currentTime + i * 0.08;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
    osc.start(startTime);
    osc.stop(startTime + 0.15);
  }
}

// 大テキスト演出
function showBigText(text, style = 'excellent') {
  if (!effectsEnabled) return;
  
  const container = document.querySelector('[data-big-text-container]');
  if (!container) return;
  
  const textEl = document.createElement('div');
  textEl.className = `big-text big-text--${style}`;
  textEl.textContent = text;
  container.appendChild(textEl);
  
  // アニメーション終了後に削除
  const duration = style === 'jackpot' ? 2000 : style === 'fever' ? 1500 : 1200;
  setTimeout(() => textEl.remove(), duration);
}

// フラッシュエフェクト
function triggerFlash(type = 'normal') {
  if (!effectsEnabled) return;
  
  const flashEl = document.querySelector('[data-flash-overlay]');
  if (!flashEl) return;
  
  flashEl.classList.remove('flash-overlay--flash', 'flash-overlay--golden', 'flash-overlay--rainbow');
  void flashEl.offsetWidth; // リフロー強制
  
  switch (type) {
    case 'golden':
      flashEl.classList.add('flash-overlay--golden');
      break;
    case 'rainbow':
      flashEl.classList.add('flash-overlay--rainbow');
      break;
    default:
      flashEl.classList.add('flash-overlay--flash');
  }
}

// フィーバーモード
let feverMode = false;

function activateFeverMode() {
  if (!effectsEnabled || feverMode) return;
  
  feverMode = true;
  const feverBg = document.querySelector('[data-fever-background]');
  const rainbowOverlay = document.querySelector('[data-rainbow-overlay]');
  
  if (feverBg) feverBg.classList.add('fever-background--active');
  if (rainbowOverlay) {
    rainbowOverlay.style.background = `linear-gradient(
      45deg,
      rgba(255, 0, 0, 0.1) 0%,
      rgba(255, 154, 0, 0.1) 10%,
      rgba(208, 222, 33, 0.1) 20%,
      rgba(79, 220, 74, 0.1) 30%,
      rgba(63, 218, 216, 0.1) 40%,
      rgba(47, 201, 226, 0.1) 50%,
      rgba(28, 127, 238, 0.1) 60%,
      rgba(95, 21, 242, 0.1) 70%,
      rgba(186, 12, 248, 0.1) 80%,
      rgba(251, 7, 217, 0.1) 90%,
      rgba(255, 0, 0, 0.1) 100%
    )`;
    rainbowOverlay.classList.add('rainbow-overlay--active');
  }
  
  // フィーバー演出（フラッシュなし）
  showBigText('FEVER!', 'fever');
  playSound('fever');
  createFireworks(3);
}

// 常時背景演出システム
let ambientParticleInterval = null;

function updateAmbientEffects() {
  if (!effectsEnabled) return;
  
  const level = getComboLevel(comboCount);
  const ambientOverlay = document.querySelector('[data-rainbow-overlay]');
  
  // コンボレベルに応じて常時背景を表示
  if (level >= 2 && !feverMode) {
    if (ambientOverlay) {
      const opacity = level === 'max' ? 0.12 : level >= 3 ? 0.08 : 0.05;
      ambientOverlay.style.background = getAmbientGradient(level, opacity);
      ambientOverlay.classList.add('rainbow-overlay--active');
    }
    
    // 常時パーティクル発生
    startAmbientParticles(level);
  } else if (!feverMode) {
    if (ambientOverlay) {
      ambientOverlay.classList.remove('rainbow-overlay--active');
    }
    stopAmbientParticles();
  }
}

function getAmbientGradient(level, opacity) {
  if (level === 'max' || level >= 3) {
    return `linear-gradient(
      45deg,
      rgba(255, 0, 0, ${opacity}) 0%,
      rgba(255, 154, 0, ${opacity}) 15%,
      rgba(208, 222, 33, ${opacity}) 30%,
      rgba(79, 220, 74, ${opacity}) 45%,
      rgba(63, 218, 216, ${opacity}) 60%,
      rgba(28, 127, 238, ${opacity}) 75%,
      rgba(186, 12, 248, ${opacity}) 90%,
      rgba(255, 0, 0, ${opacity}) 100%
    )`;
  } else {
    return `linear-gradient(
      135deg,
      rgba(255, 215, 0, ${opacity}) 0%,
      rgba(255, 165, 0, ${opacity}) 50%,
      rgba(255, 215, 0, ${opacity}) 100%
    )`;
  }
}

function startAmbientParticles(level) {
  if (ambientParticleInterval) return;
  
  const interval = level === 'max' ? 300 : level >= 3 ? 500 : 800;
  
  ambientParticleInterval = setInterval(() => {
    if (!effectsEnabled) {
      stopAmbientParticles();
      return;
    }
    
    // 画面端からパーティクルを発生
    const side = Math.floor(Math.random() * 4);
    let x, y;
    
    switch (side) {
      case 0: // 上
        x = Math.random() * window.innerWidth;
        y = -10;
        break;
      case 1: // 右
        x = window.innerWidth + 10;
        y = Math.random() * window.innerHeight;
        break;
      case 2: // 下
        x = Math.random() * window.innerWidth;
        y = window.innerHeight + 10;
        break;
      case 3: // 左
        x = -10;
        y = Math.random() * window.innerHeight;
        break;
    }
    
    createFloatingParticle(x, y, level);
  }, interval);
}

function stopAmbientParticles() {
  if (ambientParticleInterval) {
    clearInterval(ambientParticleInterval);
    ambientParticleInterval = null;
  }
}

function createFloatingParticle(x, y, level) {
  const container = document.querySelector('[data-particle-container]');
  if (!container) return;
  
  const particle = document.createElement('div');
  particle.className = 'particle particle--floating';
  
  const colors = level === 'max' || level >= 3 
    ? ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF']
    : ['#FFD700', '#FFA500', '#FF8C00'];
  
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.width = `${6 + Math.random() * 8}px`;
  particle.style.height = particle.style.width;
  
  // 画面中央方向に移動
  const targetX = window.innerWidth / 2 + (Math.random() - 0.5) * 400;
  const targetY = window.innerHeight / 2 + (Math.random() - 0.5) * 300;
  particle.style.setProperty('--target-x', `${targetX - x}px`);
  particle.style.setProperty('--target-y', `${targetY - y}px`);
  
  container.appendChild(particle);
  setTimeout(() => particle.remove(), 3000);
}

function deactivateFeverMode() {
  feverMode = false;
  const feverBg = document.querySelector('[data-fever-background]');
  const rainbowOverlay = document.querySelector('[data-rainbow-overlay]');
  
  if (feverBg) feverBg.classList.remove('fever-background--active');
  if (rainbowOverlay) rainbowOverlay.classList.remove('rainbow-overlay--active');
}

// コンボレベルに応じた演出
function getComboLevel(combo) {
  if (combo >= 30) return 'max';
  if (combo >= 20) return 3;
  if (combo >= 10) return 2;
  if (combo >= 5) return 1;
  return 0;
}

function updateComboDisplay() {
  const comboDisplay = document.querySelector('[data-combo-display]');
  const comboCountEl = document.querySelector('[data-combo-count]');
  const comboBar = document.querySelector('[data-combo-bar]');
  const comboMultiplier = document.querySelector('[data-combo-multiplier]');
  
  if (!comboDisplay || !comboCountEl) return;
  
  if (comboCount >= 2 && effectsEnabled) {
    comboCountEl.textContent = comboCount;
    comboDisplay.hidden = false;
    comboDisplay.classList.add('combo-display--visible');
    comboDisplay.classList.add('combo-display--pulse');
    
    // コンボバーの更新
    if (comboBar) {
      const nextMilestone = [5, 10, 20, 30, 50, 100].find(m => m > comboCount) || 100;
      const prevMilestone = [0, 5, 10, 20, 30, 50].reverse().find(m => m < comboCount) || 0;
      const progress = ((comboCount - prevMilestone) / (nextMilestone - prevMilestone)) * 100;
      comboBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    // マルチプライヤー表示
    if (comboMultiplier && comboCount >= 5) {
      const multiplier = Math.floor(comboCount / 5);
      comboMultiplier.textContent = `x${1 + multiplier * 0.5}`;
      comboMultiplier.classList.add('combo-display__multiplier--visible');
    } else if (comboMultiplier) {
      comboMultiplier.classList.remove('combo-display__multiplier--visible');
    }
    
    // レベルクラスの適用
    const level = getComboLevel(comboCount);
    comboDisplay.classList.remove('combo-display--level-1', 'combo-display--level-2', 'combo-display--level-3', 'combo-display--level-max');
    
    if (level === 'max') {
      comboDisplay.classList.add('combo-display--level-max');
      if (!feverMode) activateFeverMode();
    } else if (level >= 1) {
      comboDisplay.classList.add(`combo-display--level-${level}`);
    }
    
    setTimeout(() => {
      comboDisplay.classList.remove('combo-display--pulse');
    }, 400);
  } else {
    hideComboDisplay();
    if (feverMode) deactivateFeverMode();
  }
}

// 正解時のエフェクト（強化版）
function playCorrectEffects() {
  if (!effectsEnabled) return;
  
  const level = getComboLevel(comboCount);
  const quizCard = document.querySelector('.quiz__card');
  
  // 基本の正解音
  playSound(comboCount >= 3 ? 'combo' : 'correct');
  
  // カードの控えめなハイライト（フラッシュではなく縁のみ）
  if (quizCard) {
    quizCard.classList.remove('correct-glow', 'correct-glow-enhanced');
    void quizCard.offsetWidth;
    quizCard.classList.add(level >= 1 ? 'correct-glow-enhanced' : 'correct-glow');
    setTimeout(() => {
      quizCard.classList.remove('correct-glow', 'correct-glow-enhanced');
    }, 600);
  }
  
  // パーティクル（コンボに応じて増加）
  const rect = feedbackEl.getBoundingClientRect();
  const particleCount = 8 + Math.min(comboCount * 2, 30);
  createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, particleCount);
  
  // コンボレベルに応じた追加演出（フラッシュは削除）
  if (level >= 1) {
    createStarBurst(window.innerWidth / 2, window.innerHeight / 2, 10 + comboCount);
  }
  
  if (level >= 2) {
    createConfetti(15);
  }
  
  if (level >= 3) {
    createFireworks(1);
  }
  
  // 常時背景演出の更新
  updateAmbientEffects();
}

// 不正解時のエフェクト（強化版）
function playWrongEffects() {
  if (!effectsEnabled) return;
  
  playSound('wrong');
  
  const quizCard = document.querySelector('.quiz__card');
  if (quizCard) {
    quizCard.classList.remove('incorrect-flash', 'incorrect-flash-enhanced');
    void quizCard.offsetWidth;
    quizCard.classList.add('incorrect-flash-enhanced');
    setTimeout(() => quizCard.classList.remove('incorrect-flash-enhanced'), 600);
  }
  
  // コンボが高かった場合は激しいシェイク
  const shakeClass = comboCount >= 10 ? 'screen-shake--extreme' : 
                     comboCount >= 5 ? 'screen-shake--heavy' : 'screen-shake';
  
  document.body.classList.add(shakeClass);
  setTimeout(() => {
    document.body.classList.remove('screen-shake', 'screen-shake--heavy', 'screen-shake--extreme');
  }, 600);
  
  // フィーバーモード解除
  if (feverMode) {
    deactivateFeverMode();
  }
}

// パーティクルバースト（強化版）
function createParticleBurst(x, y, count) {
  const container = document.querySelector('[data-particle-container]');
  if (!container) return;
  
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFB7B2', '#FF1493', '#00FFFF', '#FF8C00'];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle particle--firework';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.color = color;
    
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 80 + Math.random() * 150;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    particle.style.animation = `particle-explode 1s ease-out forwards`;
    
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }
}

// スターバースト
function createStarBurst(x, y, count) {
  const container = document.querySelector('[data-particle-container]');
  if (!container) return;
  
  const stars = ['★', '☆', '✦', '✧', '⭐'];
  const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FFFF00', '#FFE4B5'];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle particle--star';
    particle.textContent = stars[Math.floor(Math.random() * stars.length)];
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = `${x + (Math.random() - 0.5) * 300}px`;
    particle.style.top = `${y + (Math.random() - 0.5) * 200}px`;
    particle.style.fontSize = `${1.5 + Math.random() * 2}rem`;
    particle.style.textShadow = `0 0 10px currentColor, 0 0 20px currentColor`;
    
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
  }
}

// 紙吹雪
function createConfetti(count) {
  const container = document.querySelector('[data-particle-container]');
  if (!container) return;
  
  const colors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6B9D'];
  
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'particle particle--confetti';
    confetti.style.left = `${Math.random() * window.innerWidth}px`;
    confetti.style.top = `-20px`;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.animationDuration = `${1.5 + Math.random() * 1}s`;
    confetti.style.animationDelay = `${Math.random() * 0.5}s`;
    
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// 花火エフェクト
function createFireworks(count) {
  const container = document.querySelector('[data-particle-container]');
  if (!container) return;
  
  for (let fw = 0; fw < count; fw++) {
    setTimeout(() => {
      const x = 100 + Math.random() * (window.innerWidth - 200);
      const y = 100 + Math.random() * (window.innerHeight / 2);
      
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFD700'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // 花火の爆発
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle particle--firework';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = color;
        particle.style.color = color;
        particle.style.width = '4px';
        particle.style.height = '4px';
        
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 50 + Math.random() * 100;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);
        particle.style.animation = `particle-explode 1.2s ease-out forwards`;
        
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
      }
    }, fw * 200);
  }
}

// 雷エフェクト
function createLightning() {
  const container = document.querySelector('[data-particle-container]');
  if (!container) return;
  
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const lightning = document.createElement('div');
      lightning.className = 'particle particle--lightning';
      lightning.style.left = `${100 + Math.random() * (window.innerWidth - 200)}px`;
      lightning.style.top = '0px';
      lightning.style.height = `${window.innerHeight}px`;
      
      container.appendChild(lightning);
      triggerFlash('normal');
      
      setTimeout(() => lightning.remove(), 200);
    }, i * 100);
  }
}

// コンボマイルストーン演出（強化版）
function showComboMilestone(count) {
  const messages = {
    5: { text: 'NICE!', style: 'combo-bonus' },
    10: { text: 'GREAT!', style: 'excellent' },
    20: { text: 'AMAZING!', style: 'excellent' },
    30: { text: 'FEVER!', style: 'fever' },
    40: { text: 'INCREDIBLE!', style: 'perfect' },
    50: { text: 'JACKPOT!', style: 'jackpot' }
  };
  
  const milestone = messages[count];
  if (!milestone) return;
  
  showBigText(milestone.text, milestone.style);
  
  // マイルストーン音（コインが増える音）
  playSound('milestone');
  
  // マイルストーンに応じた追加演出
  if (count >= 5 && count < 30) {
    createFireworks(Math.floor(count / 5));
  }
  
  if (count >= 30 && count < 50) {
    playSound('fever');
    createFireworks(count / 10);
    createConfetti(count);
  }
  
  if (count === 50) {
    playSound('jackpot');
    createLightning();
    createConfetti(100);
    setTimeout(() => createFireworks(10), 300);
    setTimeout(() => createFireworks(10), 600);
  }
}

function handleEffectsToggleChange() {
  const effectsToggle = document.querySelector('[data-settings-effects-toggle]');
  effectsEnabled = Boolean(effectsToggle?.checked);
  saveSettings();
  
  if (!effectsEnabled) {
    hideComboDisplay();
  } else if (comboCount >= 2) {
    updateComboDisplay();
  }
}

// ===========================================
// 間違いランキング
// ===========================================

let mistakeRankingPanelOpen = false;

function getMistakeStats() {
  try {
    const data = localStorage.getItem(MISTAKE_STATS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Failed to load mistake stats', e);
    return {};
  }
}

function saveMistakeStats(questionId) {
  if (!activeDataset || !currentQuestion) return;
  
  try {
    const stats = getMistakeStats();
    const key = `${activeDataset.id}:${questionId}`;
    
    if (!stats[key]) {
      stats[key] = {
        datasetId: activeDataset.id,
        questionId: questionId,
        questionText: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer || 
          (currentQuestion.options ? currentQuestion.options[currentQuestion.answerIndex] : ''),
        mistakeCount: 0,
        lastMistake: null
      };
    }
    
    stats[key].mistakeCount += 1;
    stats[key].lastMistake = Date.now();
    
    localStorage.setItem(MISTAKE_STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save mistake stats', e);
  }
}

function handleMistakeRankingButtonClick() {
  closeSettingsPanel();
  openMistakeRankingPanel();
}

function openMistakeRankingPanel() {
  const panel = document.querySelector('[data-mistake-ranking-panel]');
  const overlay = document.querySelector('[data-overlay]');
  
  if (!panel) return;
  
  mistakeRankingPanelOpen = true;
  panel.hidden = false;
  overlay.hidden = false;
  
  // データセット選択肢を更新
  updateMistakeRankingDatasetSelect();
  renderMistakeRanking();
}

function closeMistakeRankingPanel() {
  const panel = document.querySelector('[data-mistake-ranking-panel]');
  const overlay = document.querySelector('[data-overlay]');
  
  if (!panel) return;
  
  mistakeRankingPanelOpen = false;
  panel.hidden = true;
  
  if (!settingsPanelOpen && !historyPanelOpen) {
    overlay.hidden = true;
  }
}

function updateMistakeRankingDatasetSelect() {
  const select = document.querySelector('[data-mistake-ranking-dataset-select]');
  if (!select) return;
  
  select.innerHTML = '<option value="all">すべての問題集</option>';
  
  QUESTION_DATASETS.forEach(dataset => {
    const option = document.createElement('option');
    option.value = dataset.id;
    option.textContent = dataset.title;
    select.appendChild(option);
  });
}

function renderMistakeRanking() {
  const content = document.querySelector('[data-mistake-ranking-content]');
  const select = document.querySelector('[data-mistake-ranking-dataset-select]');
  const practiceBtn = document.querySelector('[data-practice-mistakes]');
  
  if (!content) return;
  
  const selectedDataset = select?.value || 'all';
  const stats = getMistakeStats();
  
  // フィルタリングとソート
  let items = Object.values(stats);
  
  if (selectedDataset !== 'all') {
    items = items.filter(item => item.datasetId === selectedDataset);
  }
  
  // 間違い回数で降順ソート
  items.sort((a, b) => b.mistakeCount - a.mistakeCount);
  
  // 上位50件に制限
  items = items.slice(0, 50);
  
  if (items.length === 0) {
    content.innerHTML = '<p class="mistake-ranking-panel__empty">間違えた問題はありません。</p>';
    if (practiceBtn) practiceBtn.disabled = true;
    return;
  }
  
  if (practiceBtn) practiceBtn.disabled = false;
  
  content.innerHTML = items.map((item, index) => {
    const dataset = QUESTION_DATASETS.find(d => d.id === item.datasetId);
    const datasetTitle = dataset ? dataset.title : item.datasetId;
    const rankClass = index < 3 ? `mistake-ranking-item__rank--${index + 1}` : '';
    
    return `
      <div class="mistake-ranking-item">
        <div class="mistake-ranking-item__rank ${rankClass}">${index + 1}</div>
        <div class="mistake-ranking-item__content">
          <div class="mistake-ranking-item__question">${escapeHtml(item.questionText)}</div>
          <div class="mistake-ranking-item__meta">
            <span class="mistake-ranking-item__count">
              <span class="material-symbols-outlined" style="font-size: 14px;">close</span>
              ${item.mistakeCount}回
            </span>
            <span class="mistake-ranking-item__dataset">${escapeHtml(datasetTitle)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handlePracticeMistakes() {
  const select = document.querySelector('[data-mistake-ranking-dataset-select]');
  const selectedDataset = select?.value || 'all';
  const stats = getMistakeStats();
  
  // 練習する問題を取得
  let items = Object.values(stats);
  
  if (selectedDataset !== 'all') {
    items = items.filter(item => item.datasetId === selectedDataset);
  }
  
  if (items.length === 0) {
    alert('練習する問題がありません。');
    return;
  }
  
  // 間違い回数が多い順にソート
  items.sort((a, b) => b.mistakeCount - a.mistakeCount);
  
  // 上位20問に制限
  items = items.slice(0, 20);
  
  closeMistakeRankingPanel();
  
  // 選択されたデータセットがある場合、そのデータセットで練習開始
  if (selectedDataset !== 'all') {
    const dataset = QUESTION_DATASETS.find(d => d.id === selectedDataset);
    if (dataset) {
      // 間違えた問題IDのセットを作成
      const mistakeIds = new Set(items.map(item => item.questionId));
      startMistakePractice(dataset, mistakeIds);
    }
  } else {
    // 全体の場合は最初のデータセットで開始（改善の余地あり）
    alert('特定の問題集を選択してから「間違えた問題を練習」を押してください。');
  }
}

async function startMistakePractice(dataset, mistakeQuestionIds) {
  // データセットを選択して読み込み
  activeDataset = dataset;
  
  try {
    statusEl.textContent = '読み込み中...';
    const questions = await loadQuestions(dataset.questionFile);
    const translations = await loadTranslations(dataset.translationFile);
    
    if (questions.length === 0) {
      statusEl.textContent = '問題データがありません。';
      return;
    }
    
    // 全問題を設定
    allQuestions = questions.map((q, index) => {
      q.id = index;
      q.translation = translations[index] || null;
      return q;
    });
    
    questionIndexById.clear();
    allQuestions.forEach((q, idx) => questionIndexById.set(q.id, idx));
    questionStats.clear();
    
    // 間違えた問題のIDをwrongQuestionIdsにセット
    wrongQuestionIds.clear();
    mistakeQuestionIds.forEach(id => {
      if (questionIndexById.has(id)) {
        wrongQuestionIds.add(id);
      }
    });
    
    if (wrongQuestionIds.size === 0) {
      statusEl.textContent = '該当する問題が見つかりませんでした。';
      return;
    }
    
    // wrong-onlyモードで開始
    quizMode = 'wrong-only';
    wasWrongOnlySession = true;
    quizStarted = true;
    correctCount = 0;
    totalCount = 0;
    comboCount = 0;
    sessionMaxCombo = 0;
    
    datasetSelectionSection.hidden = true;
    translationChoiceSection.hidden = true;
    quizSection.hidden = false;
    
    if (datasetTitleEl) {
      datasetTitleEl.textContent = `${dataset.title} - 間違い練習`;
    }
    
    showTranslations = userTranslationPreference;
    updateTranslationState();
    
    prepareOrder(getActivePoolIndexes());
    showNextQuestion();
    
    statusEl.textContent = `間違えた問題 ${wrongQuestionIds.size}問を練習します。`;
    
  } catch (error) {
    console.error('Failed to start mistake practice', error);
    statusEl.textContent = '読み込みに失敗しました。';
  }
}