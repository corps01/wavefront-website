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

  panel.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 767px)").matches) setOpen(false);
    });
  });
})();
