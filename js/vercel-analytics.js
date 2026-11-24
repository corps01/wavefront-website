/**
 * Vercel Web Analytics - Alternative implementation for static HTML.
 * 
 * NOTE: This file is no longer used in the project. The recommended approach
 * (inline script in <head>) is already implemented in all HTML files.
 * 
 * This file is kept for reference as an alternative programmatic approach.
 * To use this method instead, remove the inline scripts from HTML <head> sections
 * and add <script src="js/vercel-analytics.js" defer></script> before </body>.
 * 
 * @see https://vercel.com/docs/analytics/quickstart
 */
(function () {
  window.va =
    window.va ||
    function () {
      (window.vaq = window.vaq || []).push(arguments);
    };

  if (document.querySelector('script[src="/_vercel/insights/script.js"]')) return;

  var host = location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || location.protocol === "file:") {
    return;
  }

  var script = document.createElement("script");
  script.defer = true;
  script.src = "/_vercel/insights/script.js";
  document.head.appendChild(script);
})();
