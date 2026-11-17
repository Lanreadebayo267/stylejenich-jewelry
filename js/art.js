/* ==========================================================================
   art.js: the drawn jewelry used for placeholders, category tiles and the
   hero. Everything is generated SVG, so no image files are needed.

   Exposes window.SJ_ART = { artFor, frameSvg, heroSvg }
   ========================================================================== */

(() => {
  "use strict";

  // Point on a quadratic curve at t (0 to 1).
  const bezier = (p0, p1, p2, t) => {
    const u = 1 - t;
    return [
      u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
      u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
    ];
  };

  // Evenly spaced beads along a curve.
  const beadsOn = (p0, p1, p2, count, radius, fill) =>
    Array.from({ length: count }, (_, i) => {
      const [x, y] = bezier(p0, p1, p2, (i + 0.5) / count);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius}" fill="${fill}"/>`;
    }).join("");

  // Teardrop shape with its tip at (x, y).
  const drop = (x, y, w, h, fill) =>
    `<path d="M${x} ${y} C${x - w} ${y + h * 0.5} ${x - w} ${y + h} ${x} ${y + h} ` +
    `C${x + w} ${y + h} ${x + w} ${y + h * 0.5} ${x} ${y}Z" fill="${fill}"/>`;

  // One drawing per category. Unknown categories fall back to a ring.
  const DRAWINGS = {
    Necklaces: (c) =>
      `<path d="M50 80 Q150 330 250 80" fill="none" stroke="${c}" stroke-width="1.5" opacity=".5"/>` +
      beadsOn([50, 80], [150, 330], [250, 80], 19, 5.5, c) +
      drop(150, 212, 13, 46, c),

    Earrings: (c) =>
      [105, 195]
        .map(
          (x) =>
            `<circle cx="${x}" cy="110" r="6" fill="${c}"/>` +
            `<path d="M${x} 116 V150" stroke="${c}" stroke-width="2"/>` +
            `<circle cx="${x}" cy="158" r="5" fill="${c}"/>` +
            drop(x, 168, 16, 56, c)
        )
        .join(""),

    Bracelets: (c) =>
      `<ellipse cx="150" cy="170" rx="70" ry="52" fill="none" stroke="${c}" stroke-width="3"/>` +
      beadsOn([80, 170], [150, 240], [220, 170], 9, 5, c),

    Rings: (c) =>
      `<circle cx="150" cy="190" r="42" fill="none" stroke="${c}" stroke-width="4"/>` +
      `<path d="M134 152 L150 128 L166 152 Z" fill="${c}"/>`,
  };

  const artFor = (category, color = "var(--accent)") =>
    (DRAWINGS[category] || DRAWINGS.Rings)(color);

  // Arch frame with the drawing inside; used while a real photo is missing.
  const frameSvg = (category, showLabel) =>
    `<svg viewBox="0 0 300 375" role="img" aria-label="Photo coming soon">` +
    `<path d="M24 375 V150 A126 126 0 0 1 276 150 V375" fill="none" stroke="var(--line)" stroke-width="1.5"/>` +
    `<g transform="translate(0,12)">${artFor(category)}</g>` +
    (showLabel
      ? `<text x="150" y="352" text-anchor="middle" fill="var(--muted)" font-size="12" letter-spacing="2" font-family="Jost, sans-serif">PHOTO COMING SOON</text>`
      : "") +
    `</svg>`;

  // Small version for the category tiles (decorative, so no label or role).
  const tileSvg = (category) =>
    `<svg viewBox="0 0 300 375" aria-hidden="true"><g transform="translate(0,12)">${artFor(category)}</g></svg>`;

  // Large gold necklace and earrings inside an arch, for the hero.
  const heroSvg = () => {
    const gold = "url(#gold-gradient)";
    const sparkle = ([x, y, s]) =>
      `<path class="spark" d="M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} ` +
      `Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z" fill="#f3dc9a"/>`;
    const sparkles = [[60, 70, 9], [335, 120, 7], [330, 360, 10], [48, 330, 6], [200, 40, 6]]
      .map(sparkle)
      .join("");
    const earring = ([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="7" fill="${gold}"/>` +
      `<path d="M${x} ${y + 7} V${y + 30}" stroke="#f3dc9a" stroke-width="2"/>` +
      `<circle cx="${x}" cy="${y + 37}" r="5" fill="${gold}"/>` +
      drop(x, y + 46, 14, 40, gold);

    return (
      `<svg viewBox="0 0 400 500">` +
      `<defs>` +
      `<linearGradient id="gold-gradient" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" style="stop-color:var(--gold-a)"/><stop offset="1" style="stop-color:var(--gold-b)"/></linearGradient>` +
      `<linearGradient id="arch-bg" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="#ffffff" stop-opacity=".10"/><stop offset="1" stop-color="#ffffff" stop-opacity=".02"/></linearGradient>` +
      `</defs>` +
      `<path d="M30 490 V190 A170 170 0 0 1 370 190 V490 Z" fill="url(#arch-bg)" stroke="#f3dc9a" stroke-opacity=".45" stroke-width="1.5"/>` +
      `<path d="M52 490 V192 A148 148 0 0 1 348 192 V490" fill="none" stroke="#f3dc9a" stroke-opacity=".2"/>` +
      `<g transform="translate(50,40)">` +
      beadsOn([40, 140], [150, 400], [260, 140], 23, 7, gold) +
      `<path d="M40 140 Q150 400 260 140" fill="none" stroke="#f3dc9a" stroke-opacity=".35" stroke-width="1.5"/>` +
      drop(150, 262, 17, 62, gold) +
      `</g>` +
      [[125, 392], [275, 392]].map(earring).join("") +
      sparkles +
      `</svg>`
    );
  };

  window.SJ_ART = { artFor, frameSvg, tileSvg, heroSvg };
})();
