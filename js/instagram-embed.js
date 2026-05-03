(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var permalink = window.WAVEFRONT_INSTAGRAM_POST_PERMALINK;
    var slot = document.getElementById("instagram-post-slot");
    if (!slot || !permalink || typeof permalink !== "string" || !permalink.trim()) {
      return;
    }
    var url = permalink.trim();
    if (url.indexOf("instagram.com") === -1) return;

    slot.classList.remove("hidden");

    var bq = document.createElement("blockquote");
    bq.className = "instagram-media";
    bq.setAttribute("data-instagram-permalink", url);
    bq.setAttribute("data-instagram-version", "14");
    bq.style.cssText =
      "background:#FFF;border:0;border-radius:12px;margin:0 auto;max-width:540px;min-width:280px;padding:0;width:calc(100% - 2px);box-shadow:0 8px 32px rgba(39,98,124,0.12);";
    slot.appendChild(bq);

    function processEmbeds() {
      if (window.instgrm && instgrm.Embeds) instgrm.Embeds.process();
    }

    var src = "https://www.instagram.com/embed.js";
    var existing = document.querySelector('script[src="' + src + '"]');
    if (!existing) {
      var s = document.createElement("script");
      s.async = true;
      s.src = src;
      s.onload = processEmbeds;
      document.body.appendChild(s);
    } else {
      processEmbeds();
    }
  });
})();
