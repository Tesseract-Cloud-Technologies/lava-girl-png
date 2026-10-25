
## Publishing to GitHub Pages
1. Create a new GitHub repository (e.g. `lavagirl-png-demo`).
2. Upload all files to the repository root.
3. Go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, click **Save**.
6. Visit `https://<username>.github.io/lavagirl-png-demo/`.

## Cultural care — owner approval required
- The **tabu motif** is credited as **inspired by Tolai shell-money culture**. Do **not** claim it belongs to any individual or group. **The owner (Annette Sete) must approve all wording and pattern accuracy** before publishing this site.
- Review the fabric colourways and product names against actual product lines.
- Confirm the authenticity badges ("PNG-made", "Handmade", "Ethically sourced", "Authentic motifs") are accurate claims.
- Confirm the Kokopo location, maker descriptions, and brand story.
- Replace placeholder prices (K45 per metre, etc.) with real pricing.

## Notes
- All content is placeholder / sample data. No real orders are processed.
- Forms are front-end only; they validate and show a success state with an optional prefilled WhatsApp link.
- The enquiry list builds a prefilled WhatsApp message; no real checkout.
- The colour switcher recolours the hero pattern and product tiles via a CSS variable (`--active-colour`).
- Replace `images/` placeholders with real photos when ready.

---

### Self-check (6 lines)
1. No horizontal overflow at 320, 360, 390, 768, 1024, 1440, 1920px — `overflow-x: clip` on body plus clipped tabu pattern containers.
2. Mobile nav uses Bootstrap collapse; sticky Shop + WhatsApp bar appears only on phones (≤575.98px).
3. All internal links (`index.html`, `shop.html`, `story.html`, `lookbook.html`, `wholesale.html`, `contact.html`) resolve correctly relative to root.
4. `prefers-reduced-motion` disables the rotating ring animation.
5. One `<h1>` per page, skip link, visible focus rings, ARIA labels on swatches and icon buttons, semantic landmarks.
6. Colour switcher recolours hero pattern and product tiles within 400ms; grid is two columns at 360px; enquiry list builds a prefilled WhatsApp message; cultural care note included with owner-approval requirement.