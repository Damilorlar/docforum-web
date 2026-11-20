// Pre-hydration i18n: set html lang and loading label from detected locale.
// This runs before the main module script loads so the first paint is localized.
// Kept as a same-origin static file so it's covered by script-src 'self' without hash/nonce.
(function () {
  // Try to read the locale from the data-attribute set by the server/client
  var locale = document.documentElement.getAttribute('data-locale') || 'en';
  var loadingSpan = document.getElementById('app-loading');
  if (loadingSpan) {
    // Translate "Loading DocForum…" for supported locales
    var texts = {
      en: 'Loading DocForum…',
      es: 'Cargando DocForum…'
    };
    loadingSpan.setAttribute('aria-label', texts[locale] || texts.en);
  }
  // Set the document language directionality and lang attribute
  var dir = document.documentElement.getAttribute('data-dir') || 'ltr';
  document.documentElement.setAttribute('lang', locale);
  document.documentElement.setAttribute('dir', dir);
})();