/* ==========================================================================
   common.js: code shared by every page (index.html and collection.html).

   Loads after data.js and art.js. Exposes window.SJ with:
     $, whatsappUrl, products, categories, featured, buildCard, setupChrome
   ========================================================================== */

(() => {
  "use strict";

  const { SETTINGS, PRODUCTS } = window.SJ_DATA;
  const ART = window.SJ_ART;

  const $ = (id) => document.getElementById(id);

  const whatsappUrl = (text) =>
    `https://wa.me/${SETTINGS.whatsapp}?text=${encodeURIComponent(text)}`;

  // Small helper for building elements.
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  /* Data validation -------------------------------------------------------
     Catches typos in data.js early. Bad entries are skipped and reported in
     the browser console instead of breaking the page. */
  function validateProducts(list) {
    const valid = [];
    const seen = new Set();

    list.forEach((item, index) => {
      const problems = [];
      if (typeof item.name !== "string" || !item.name.trim()) problems.push("name is missing");
      if (typeof item.category !== "string" || !item.category.trim()) problems.push("category is missing");
      if (typeof item.image !== "string") problems.push('image must be text (use "" for none)');
      if ("featured" in item && typeof item.featured !== "boolean") problems.push("featured must be true or false");

      if (problems.length) {
        console.warn(`data.js: product #${index + 1} skipped (${problems.join(", ")})`, item);
        return;
      }
      if (seen.has(item.name)) {
        console.warn(`data.js: product #${index + 1} has the same name as an earlier piece: "${item.name}"`);
      }
      seen.add(item.name);
      valid.push(item);
    });
    return valid;
  }

  const products = validateProducts(PRODUCTS);
  const categories = [...new Set(products.map((p) => p.category))];

  // Home page pieces: the ones marked featured. If none are marked, the first 8.
  const HOME_FALLBACK_COUNT = 8;
  const marked = products.filter((p) => p.featured === true);
  const featured = marked.length ? marked : products.slice(0, HOME_FALLBACK_COUNT);

  /* Product card ----------------------------------------------------------- */
  function buildCard(product) {
    const card = el("article", "card");

    const photo = el("div", "card__photo");
    const showPlaceholder = () => { photo.innerHTML = ART.frameSvg(product.category, true); };

    if (product.image) {
      const img = new Image();
      img.src = product.image;
      img.alt = product.name;
      img.loading = "lazy";
      img.addEventListener("error", showPlaceholder); // missing file falls back to the drawing
      photo.append(img);
    } else {
      showPlaceholder();
    }

    const meta = el("div", "card__meta");
    meta.append(el("span", "card__cat", product.category), el("h3", "card__name", product.name));

    const order = el("a", "btn btn--small card__order", "Order via WhatsApp");
    order.href = whatsappUrl(SETTINGS.messages.product.replace("{name}", product.name));
    order.target = "_blank";
    order.rel = "noopener";
    order.setAttribute("aria-label", `Order ${product.name} via WhatsApp (opens in a new tab)`);

    card.append(photo, meta, order);
    return card;
  }

  /* Header, floating button and footer, the same on every page ------------- */
  function setupChrome() {
    const general = whatsappUrl(SETTINGS.messages.general);

    [["header-whatsapp", "Order on WhatsApp"], ["fab-whatsapp", null], ["cta-whatsapp", null]].forEach(([id, label]) => {
      const link = $(id);
      if (!link) return;
      link.href = general;
      link.target = "_blank";
      link.rel = "noopener";
      if (label) link.textContent = label;
    });

    const year = $("year");
    if (year) year.textContent = `© ${new Date().getFullYear()}`;
  }

  window.SJ = { $, el, whatsappUrl, products, categories, featured, buildCard, setupChrome };
})();