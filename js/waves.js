/**
 * Layered sine waves on canvas — colors from CSS variables on :root.
 * Respects prefers-reduced-motion (static snapshot, no animation loop).
 */
(function () {
  const canvas = document.getElementById("wave-canvas");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readWaveColors() {
    const root = getComputedStyle(document.documentElement);
    return [
      root.getPropertyValue("--wave-1").trim() || "rgba(186, 230, 253, 0.80)",
      root.getPropertyValue("--wave-2").trim() || "rgba(56,  189, 248, 0.75)",
      root.getPropertyValue("--wave-3").trim() || "rgba(14,  165, 233, 0.90)",
    ];
  }

  const colors = readWaveColors();

  // Three layers: back (long & gentle) → mid → front (short & snappy)
  const waves = [
    { amplitude: 38, wavelength: 400, speed: 0.28, color: colors[0], offset: 0 },
    { amplitude: 24, wavelength: 230, speed: 0.22, color: colors[1], offset: Math.PI / 2 },
    { amplitude: 14, wavelength: 130, speed: 0.16, color: colors[2], offset: Math.PI / 3 },
  ];

  const WAVE_HEIGHT = 220; // must match #wave-canvas height in main.css

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(WAVE_HEIGHT * dpr);
    canvas.style.height = `${WAVE_HEIGHT}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resize);
  resize();

  let start = null;

  function drawFrame(time) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    waves.forEach((wave, i) => {
      // Waves occupy the lower ~55 % of the strip; the top blends with bg-surface
      const baseY = h * 0.52 + i * 22;

      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y =
          wave.amplitude *
            Math.sin(
              (x / wave.wavelength) * 2 * Math.PI -
                (wave.speed * time) / 500 +
                wave.offset,
            ) + baseY;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
    });
  }

  if (reducedMotion) {
    drawFrame(0);
    return;
  }

  function loop(ts) {
    if (start === null) start = ts;
    drawFrame(ts - start);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
