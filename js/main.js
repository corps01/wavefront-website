/**
 * Mobile navigation toggle
 */
(function () {
  const btn = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  if (!btn || !panel) return;

  function setOpen(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
  }

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      setOpen(false);
      btn.focus();
    }
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 767px)").matches) setOpen(false);
    });
  });
})();

/**
 * FAQ accordion — question cards expand to reveal answers
 */
(function () {
  document.querySelectorAll("[data-faq-item]").forEach((item) => {
    const trigger = item.querySelector("[data-faq-trigger]");
    const panel = item.querySelector("[data-faq-panel]");
    if (!trigger || !panel) return;

    function setOpen(open) {
      item.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", String(open));
      panel.inert = !open;
      panel.setAttribute("aria-hidden", String(!open));
    }

    setOpen(item.classList.contains("is-open"));

    trigger.addEventListener("click", () => {
      const open = !item.classList.contains("is-open");
      setOpen(open);
    });
  });
})();
