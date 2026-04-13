i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    lang: 'en',
    fallbackLng: 'en',
    load: 'languageOnly',
    debug: true, // Useful for your class project logs
    backend: {
      loadPath: 'locales/{{lng}}/translation.json',
    }
  }, function(err, t) {
    if (err) return console.error('Something went wrong loading i18n:', err);
    // Once initialized, update the initial UI
    updateContent();
  });

function updateScoreUI(score){
  const lng = i18next.language;

  const formattedNumber = new Intl.NumberFormat(lng).format(score);

  const scoreHeading = document.querySelector('[data-i18n="ui.score_count"]');
  if (scoreHeading) {
    scoreHeading.innerHTML = i18next.t('ui.score_count', { val: formattedNumber });
  }
}

function updateHiScoreUI(hiscore){
  const lng = i18next.language;

  const formattedNumber = new Intl.NumberFormat(lng).format(hiscore);

  const scoreHeading = document.querySelector('[data-i18n="ui.highscore"]');
  if (scoreHeading) {
    scoreHeading.innerHTML = i18next.t('ui.highscore', { val: formattedNumber });
  }
}

function updateFinalScoreUI(score){
  const lng = i18next.language;

  const formattedNumber = new Intl.NumberFormat(lng).format(score);

  const scoreHeading = document.querySelector('[data-i18n="ui.score"]');
  if (scoreHeading) {
    scoreHeading.innerHTML = i18next.t('ui.score', { val: formattedNumber });
  }
}

function updateContent() {
    // document.querySelector('[data-i18n="ui.title"]').innerHTML = i18next.t('ui.title'); testing purposes
  // Find all elements with the 'data-i18n' attribute
  const elements = document.querySelectorAll('[data-i18n]');

  currentScore = parseInt(document.getElementById('score').textContent.replace(/,/g, '')) || 0;
  currentHighScore = parseInt(document.getElementById('hiscore').textContent.replace(/,/g, '')) || 0;
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');

    if(key !== 'ui.score' && key !== 'ui.highscore' && key !== 'ui.score_count') {
      el.innerHTML = i18next.t(key);
    }
  });

  updateScoreUI(currentScore);
  updateHiScoreUI(currentHighScore);
  updateFinalScoreUI(currentScore);

  // Handle RTL layout if language is Arabic
  const currentLang = i18next.language;
  document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
}

document.getElementById('language-select').addEventListener('change', (e) => {
  i18next.changeLanguage(e.target.value, () => {
    updateContent(); // Refresh the text on the page
  });
});