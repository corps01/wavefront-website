(function () {
  var canvas = document.getElementById("hero-wave-canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var COLORS = [
    "rgba(186, 230, 253, 0.55)",
    "rgba(220, 240, 252, 0.70)",
    "rgba(232, 246, 254, 0.90)",
  ];

  var waves = [
    { amplitude: 12, wavelength: 360, speed: 0.20, color: COLORS[0], offset: 0 },
    { amplitude: 8,  wavelength: 200, speed: 0.15, color: COLORS[1], offset: Math.PI / 2 },
    { amplitude: 5,  wavelength: 120, speed: 0.10, color: COLORS[2], offset: Math.PI / 3 },
  ];

  var HEIGHT = 100;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(HEIGHT * dpr);
    canvas.style.height = HEIGHT + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resize);
  resize();

  var start = null;

  function drawFrame(time) {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < waves.length; i++) {
      var wave = waves[i];
      var baseY = h * 0.45 + i * 12;

      ctx.beginPath();
      for (var x = 0; x <= w; x += 2) {
        var y =
          wave.amplitude *
            Math.sin(
              (x / wave.wavelength) * 2 * Math.PI -
                (wave.speed * time) / 500 +
                wave.offset
            ) + baseY;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
    }
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
