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
    
    console.log('i18next is ready!');
    console.log('Current Language:', i18next.language);
    console.log('Testing a key:', i18next.t('ui.title'));
    // Once initialized, update the initial UI
    updateContent();
  });

function updateContent() {
    // document.querySelector('[data-i18n="ui.title"]').innerHTML = i18next.t('ui.title'); testing purposes
  // Find all elements with the 'data-i18n' attribute
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = i18next.t(key);
  });

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