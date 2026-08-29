/* =========================================================================
   Quantum4Colorado — "digital rain" hero background
   A canvas animation behind the Story page hero: columns of falling 0/1
   (classical bits, on-theme for a quantum computing site — the classical
   binary the rest of the app is contrasting against). Purely decorative,
   so it's aria-hidden and paused for prefers-reduced-motion.
   ========================================================================= */

import React, { useEffect, useRef } from "react";

const CHARS = "01";

export default function MatrixRain({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const FONT_SIZE = 16;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops = [];
    let speeds = [];
    let rafId = null;
    let resizeObserver = null;

    // A fixed leading color per column (re-picked only when a column
    // recycles to the top) rather than re-rolled every frame — otherwise
    // the trail behind a glyph fades through colors its leading edge
    // never was.
    let leadColors = [];
    const LEAD_COLORS = ["#EAFBFF", "#00D4FF", "#6E8CFF"];

    function setup() {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.ceil(width / FONT_SIZE);
      drops = new Array(columns).fill(0).map(() => Math.random() * -height);
      speeds = new Array(columns).fill(0).map(() => 0.5 + Math.random() * 0.9);
      leadColors = new Array(columns)
        .fill(0)
        .map(() => LEAD_COLORS[Math.floor(Math.random() * LEAD_COLORS.length)]);

      // Base fill so the first frame isn't transparent while trails build up.
      ctx.fillStyle = "#04070F";
      ctx.fillRect(0, 0, width, height);
    }

    // One frame's worth of drawing. Deliberately does not schedule its own
    // continuation — the animated and reduced-motion paths below drive that
    // differently (a rAF loop vs. a fixed number of synchronous passes).
    //
    // Only the current leading glyph is ever drawn. The trail isn't drawn
    // explicitly — it's what's left over from previous frames, dimming on
    // its own because each frame washes the whole canvas with a low-alpha
    // dark fill before drawing. That's what makes it a smooth comet tail
    // instead of a few hard-edged copies.
    function drawFrame() {
      ctx.fillStyle = "rgba(4, 7, 15, 0.045)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `700 ${FONT_SIZE}px "Martian Mono", ui-monospace, monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < columns; i++) {
        const y = drops[i];
        if (y > -FONT_SIZE && y < height + FONT_SIZE) {
          const char = CHARS[Math.random() > 0.5 ? 1 : 0];
          const x = i * FONT_SIZE + FONT_SIZE / 2;
          ctx.fillStyle = leadColors[i];
          ctx.fillText(char, x, y);
        }

        drops[i] += FONT_SIZE * speeds[i] * 0.35;
        if (drops[i] > height + FONT_SIZE * 6 && Math.random() > 0.985) {
          drops[i] = Math.random() * -300;
          leadColors[i] = LEAD_COLORS[Math.floor(Math.random() * LEAD_COLORS.length)];
        }
      }
    }

    function loop() {
      drawFrame();
      rafId = requestAnimationFrame(loop);
    }

    setup();

    if (reduceMotion) {
      // Render a settled-looking frame synchronously, once, and stop —
      // no rAF loop at all, so nothing keeps animating.
      for (let pass = 0; pass < 40; pass++) drawFrame();
    } else {
      rafId = requestAnimationFrame(loop);
    }

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        setup();
      });
      resizeObserver.observe(parent);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
