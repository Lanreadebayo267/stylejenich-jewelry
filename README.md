# StyleJenich Jewelry

A single-page landing site for StyleJenich Jewelry. Visitors browse photos of the pieces and tap **Order via WhatsApp** on anything they like. The button opens a WhatsApp chat with a message already written for that piece.

It is one self-contained `index.html` file. There is nothing to install and no build step.

## What's on the page

- Hero section with a gold jewelry illustration
- Scrolling ticker strip
- "Shop by type" tiles (one per category, built automatically)
- Gallery with category filter buttons and an **Order via WhatsApp** button on every piece
- About section
- How to order (3 steps)
- Contact section (WhatsApp, email, Instagram)
- Floating **Order on WhatsApp** button
- Light and dark themes (follows the visitor's device) and phone-friendly layout

## Project structure

```
stylejenich-jewelry/
├── index.html      the whole site
├── images/         product photos (create this folder)
└── README.md

## Editing the site

Everything you need to change is in one block near the bottom of `index.html`, between the comments `EDIT THIS SECTION ONLY` and the closing line of dashes. You never need to touch the HTML or CSS above it.

### 1. Contact details

```js
const SETTINGS = {
  whatsapp: "2340000000000",        // digits only, with country code, no + or spaces
  phoneDisplay: "+234 000 000 0000", // how the number is shown on the page
  email: "hello@example.com",
  instagramHandle: "stylejenich",    // without the @
  currency: "₦",
  ...
};
```

For a Nigerian number like `0801 234 5678`, the `whatsapp` value is `2348012345678` (drop the leading 0, add 234).

### 2. About section

Edit `aboutTitle`, `aboutText` and the three `perks` lines in `SETTINGS`. The text that ships with the site is generic, so rewrite it in her own words.

### 3. Adding jewelry

Each piece is one line in the `PRODUCTS` list:

```js
{ name: "Pearl Drop Earrings", category: "Earrings", price: 11000, image: "images/pearl-drops.jpg" },
```

| Field      | What it does                                                         |
| ---------- | -------------------------------------------------------------------- |
| `name`     | Shown on the card and included in the WhatsApp message               |
| `category` | Groups the piece. Used for the filter buttons and the type tiles     |
| `price`    | A number like `11000`. Use `""` to hide the price                    |
| `image`    | Path to the photo. Use `""` to show a placeholder drawing            |

To add a piece, copy one line, paste it in the list, and change the values. To remove a piece, delete its line. Keep the comma at the end of each line except the last.

The filter buttons and type tiles come from the `category` values, so a new category (for example `"Bracelets"`) appears automatically. Keep the spelling and capitalization the same for every piece in a category.

The pieces that ship in the file are examples. Replace them with the real ones before the site goes live.

## Photos

1. Create an `images` folder next to `index.html`.
2. Put the photos in it and reference them in the list, for example `image: "images/gold-hoops.jpg"`.

Tips for the best result:

- Use portrait photos (4:5 ratio). The gallery crops every photo to a 4:5 arch shape.
- Use a plain background and natural light, and keep the framing the same across pieces.
- Keep each file under about 300 KB so the page loads quickly on mobile data. Export as JPG or WebP at roughly 1000 px wide.
- Use simple file names with no spaces, like `gold-hoops.jpg`.

If an image path is wrong or the file is missing, the card falls back to the placeholder drawing instead of showing a broken image.

## Previewing locally

Double-click `index.html` to open it in a browser. For testing the photos, that is enough.

## Deploying

Any host that serves static files will work. The simplest options:
- **Vercel:** import the repository, or run `vercel` in the folder.

Use the same host to update the site later: change `index.html` or add photos, then upload the folder again or push to GitHub.

When she is ready for a real address like `stylejenich.com`, buy the domain from a registrar and connect it in the host's domain settings.

## Notes

- The page loads two Google Fonts (Marcellus and Jost). If a visitor is offline, it falls back to standard system fonts and still works.
- Orders and enquiries happen entirely in WhatsApp. The site does not collect payments or store any customer data.
- When she later wants online payment, a checkout such as Paystack or Flutterwave can be added on top without redoing the design.