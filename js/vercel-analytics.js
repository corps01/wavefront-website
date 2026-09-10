/**
 * Vercel Web Analytics for static HTML.
 * Enable Web Analytics in the Vercel project dashboard, then redeploy.
 * @see https://vercel.com/docs/analytics/quickstart?framework=html
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
