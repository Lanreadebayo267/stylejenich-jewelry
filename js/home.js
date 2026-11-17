/* ==========================================================================
   home.js: the home page (index.html).

   1. Ticker, category tiles, featured pieces, About
   2. Enquiry form (accessible validation)
   3. Contact details and init
   ========================================================================== */

(() => {
  "use strict";

  const { SETTINGS } = window.SJ_DATA;
  const ART = window.SJ_ART;
  const { $, el, whatsappUrl, products, categories, featured, buildCard, setupChrome } = window.SJ;

  /* 1. Rendering ---------------------------------------------------------- */
  function renderTicker() {
    const phrases = [...categories, "Order via WhatsApp", "Custom orders", "New pieces added often"];
    // Repeat the list so the loop scrolls without a gap (the CSS moves it by half).
    const items = Array.from({ length: 4 }, () => phrases).flat();
    $("ticker-track").replaceChildren(...items.map((text) => el("span", "", text)));
  }

  // Each tile links to the collection page, already filtered to that category.
  function renderTiles() {
    const template = $("tile-template");
    const tiles = categories.map((category) => {
      const node = template.content.firstElementChild.cloneNode(true);
      const count = products.filter((p) => p.category === category).length;
      node.href = `collection.html?category=${encodeURIComponent(category)}`;
      node.setAttribute("aria-label", `View all ${category} (${count})`);
      node.querySelector(".tile__arch").innerHTML = ART.tileSvg(category);
      node.querySelector(".tile__name").textContent = category;
      node.querySelector(".tile__count").textContent = `${count} ${count === 1 ? "piece" : "pieces"}`;
      return node;
    });
    $("tiles").replaceChildren(...tiles);
  }

  function renderFeatured() {
    $("grid").replaceChildren(...featured.map(buildCard));
    $("view-all").textContent = `View all ${products.length} pieces`;
  }

  function renderAbout() {
    $("about-title").textContent = SETTINGS.aboutTitle;
    $("about-text").textContent = SETTINGS.aboutText;
    $("perks").replaceChildren(
      ...SETTINGS.perks.map(([title, text]) => {
        const li = el("li");
        li.append(el("b", "", title), el("span", "", text));
        return li;
      })
    );
  }

  /* 2. Enquiry form -------------------------------------------------------
     Validates in the page, then opens WhatsApp with the message prefilled.
     Errors are tied to their fields with aria-describedby and aria-invalid. */
  const form = $("enquiry-form");
  const fields = {
    name: { input: $("enquiry-name"), error: $("enquiry-name-error") },
    message: { input: $("enquiry-message"), error: $("enquiry-message-error") },
  };

  function populatePieceSelect() {
    const options = [new Option("No specific piece", "")];
    products.forEach((p) => options.push(new Option(p.name, p.name)));
    $("enquiry-piece").replaceChildren(...options);
  }

  function validateField(key) {
    const { input, error } = fields[key];
    const value = input.value.trim();
    let message = "";

    if (key === "name" && value.length < 2) {
      message = "Enter your name so we know who to reply to.";
    }
    if (key === "message" && value.length < 10) {
      message = "Write at least 10 characters so we can help you properly.";
    }

    error.textContent = message;
    error.hidden = !message;
    input.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = $("enquiry-status");
    status.textContent = "";

    const results = Object.keys(fields).map(validateField);
    if (results.includes(false)) {
      // Move focus to the first problem so keyboard and screen reader users land on it.
      Object.values(fields).find(({ input }) => input.getAttribute("aria-invalid") === "true").input.focus();
      return;
    }

    const name = fields.name.input.value.trim();
    const piece = $("enquiry-piece").value;
    const body = fields.message.input.value.trim();
    const text =
      `Hello StyleJenich Jewelry, my name is ${name}.` +
      (piece ? `\nI'm asking about: ${piece}.` : "") +
      `\n\n${body}`;

    window.open(whatsappUrl(text), "_blank", "noopener");
    status.textContent = "Opening WhatsApp. Press send there to deliver your message.";
    form.reset();
  });

  // Re-check a field as soon as the user leaves it, and clear the error once it is fixed.
  Object.entries(fields).forEach(([key, { input }]) => {
    input.addEventListener("blur", () => validateField(key));
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validateField(key);
    });
  });

  /* 3. Contact details and init ------------------------------------------- */
  function renderContact() {
    $("phone-text").textContent = SETTINGS.phoneDisplay;
    $("email-text").textContent = SETTINGS.email;
    $("instagram-text").textContent = `@${SETTINGS.instagramHandle}`;
    $("instagram-link").href = `https://instagram.com/${SETTINGS.instagramHandle}`;
    $("contact-whatsapp").href = whatsappUrl(SETTINGS.messages.general);
  }

  function init() {
    $("eyebrow").textContent = categories.join(" · ");
    $("hero-art").innerHTML = ART.heroSvg();

    setupChrome();
    renderTicker();
    renderTiles();
    renderFeatured();
    renderAbout();
    populatePieceSelect();
    renderContact();
  }

  init();
})();
