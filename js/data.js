/* ==========================================================================
   data.js: the only file you need to edit to update the site.

   1. SETTINGS: contact details and About text
   2. PRODUCTS: one line per piece of jewelry

   Loaded first on every page; common.js reads window.SJ_DATA.
   ========================================================================== */

const SETTINGS = {
  // WhatsApp number in international format: digits only, no + or spaces.
  // Nigeria example: 0801 234 5678 becomes 2348012345678
  whatsapp: "2348033285046",
  phoneDisplay: "+234 803 328 5046", // shown on the page, can include spaces and +, but no links
  email: "jennifer.adebayo@gmail.com",
  instagramHandle: "stylejenich1", // without the @

  // Messages that appear ready-typed in WhatsApp when someone taps a button.
  // {name} becomes the piece's name.
  messages: {
    general: "Hello StyleJenich Jewelry Team, I have a question.",
    product: 'Hello StyleJenich Jewelry Team, I\'m interested in the "{name}". Is it available?',
  },

  // About section. Rewrite these in her own words.
  aboutTitle: "Jewelry with personality",
  aboutText:
    "StyleJenich Jewelry brings you necklaces and earrings for everyday wear and special occasions. Have a look around, and message us on WhatsApp for anything you would like to know.",
  perks: [
    ["Necklaces", "Beaded, layered and statement styles."],
    ["Earrings", "Studs, hoops and drops for every outfit."],
    ["Custom orders", "Ask us about a piece made your way."],
  ],
};

/*
  Add a piece by copying one line.
    name      shown on the card and in the WhatsApp message
    category  groups pieces; filters and tiles are built from this
    image     path such as "images/gold-hoops.jpg", or "" for a placeholder
    featured  optional. true puts the piece on the home page. Every piece
              always appears on the All pieces page (collection.html).
              If no piece is marked featured, the first 8 are shown on home.

  The pieces below are EXAMPLES. Replace them with the real jewelry.
*/
const PRODUCTS = [
  // Featured: these 8 show on the home page.
  { name: "Beaded Layered Necklace", category: "Necklaces", image: "images/necklace-1.jpeg", featured: true },
  { name: "Black Tone Earrings", category: "Earrings", image: "images/black-bow-earrings.jpeg", featured: true },
  { name: "Statement Pendant", category: "Necklaces", image: "images/necklace-set-2.jpeg", featured: true },
  { name: "Multi-Color Earrings", category: "Earrings", image: "images/bow-earrings.jpeg", featured: true },
  { name: "Chunky Chain Necklace", category: "Necklaces", image: "images/necklace-set-3.jpeg", featured: true },
  { name: "Crystal Stud Earrings", category: "Earrings", image: "images/gold-bow-earrings.jpeg", featured: true },
  { name: "Necklace Set", category: "Necklaces", image: "images/necklace-set-4.jpeg", featured: true },
  { name: "Beaded Dangle Earrings", category: "Earrings", image: "images/silver-bow-earrings.jpeg", featured: true },

  // Not featured: these only show on the All pieces page.
  {name: "Gold Tone Earrings", category: "Earrings", image: "images/gold-bow-earrings.jpeg", featured: false},
  {name: "Layered Necklace", category: "Necklaces", image: "images/necklace-set-5.jpeg", featured: false},
  {name: "Silver Tone Earrings", category: "Earrings", image: "images/silver-bow-earrings.jpeg", featured: false},
  {name: "Pendant Necklace", category: "Necklaces", image: "images/necklace-set-6.jpeg", featured: false},
  {name: "Louis Vuitton Earrings", category: "Earrings", image: "images/louis-vuitton-earrings.jpeg", featured: false},
  {name: "Statement Necklace", category: "Necklaces", image: "images/necklace-set-7.jpeg", featured: false},
  {name: "Dangle Earrings", category: "Earrings", image: "images/dangle-earrings.jpeg", featured: false},
  {name: "Layered Pendant Necklace", category: "Necklaces", image: "images/necklace-set-8.jpeg", featured: false},
];

window.SJ_DATA = { SETTINGS, PRODUCTS };
