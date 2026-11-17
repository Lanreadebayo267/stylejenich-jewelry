/* ==========================================================================
   collection.js: the "All pieces" page (collection.html).

   Category buttons plus a search box. The chosen category is kept in the
   address (collection.html?category=Earrings), so links to it can be shared
   and the home page tiles can open it already filtered.
   ========================================================================== */

(() => {
  "use strict";

  const { $, el, products, categories, buildCard, setupChrome } = window.SJ;
  const ALL = "All";

  // Start from the address, but only accept a category that really exists.
  const requested = new URLSearchParams(window.location.search).get("category");
  const state = {
    category: categories.includes(requested) ? requested : ALL,
    query: "",
  };

  function renderFilters() {
    const chips = [ALL, ...categories].map((category) => {
      const count = category === ALL ? products.length : products.filter((p) => p.category === category).length;
      const chip = el("button", "chip", `${category} (${count})`);
      chip.type = "button";
      chip.dataset.category = category;
      return chip;
    });
    $("filters").replaceChildren(...chips);
  }

  const matches = (product) => {
    const inCategory = state.category === ALL || product.category === state.category;
    const text = `${product.name} ${product.category}`.toLowerCase();
    return inCategory && text.includes(state.query);
  };

  function render() {
    const visible = products.filter(matches);

    $("grid").replaceChildren(...visible.map(buildCard));
    $("empty").hidden = visible.length > 0;

    document.querySelectorAll("#filters .chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.dataset.category === state.category));
    });

    const total = products.length;
    const summary = visible.length === total ? `Showing all ${total} pieces` : `Showing ${visible.length} of ${total} pieces`;
    $("result-count").textContent = summary;
  }

  // Keep the address in step with the filter. Some browsers refuse this for
  // files opened from a folder, which is harmless, so any error is ignored.
  function updateAddress() {
    try {
      const url = state.category === ALL ? window.location.pathname : `?category=${encodeURIComponent(state.category)}`;
      window.history.replaceState(null, "", url);
    } catch {
      /* ignore */
    }
  }

  // Event delegation: one listener on the container.
  $("filters").addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    state.category = chip.dataset.category;
    updateAddress();
    render();
  });

  $("search").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    render();
  });

  // Pressing Enter in the search box should not reload the page.
  $("search-form").addEventListener("submit", (event) => event.preventDefault());

  setupChrome();
  renderFilters();
  render();
})();
