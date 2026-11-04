# Narayan C Paul - Research Website

A premium, interactive academic research website built with Next.js 14,
TypeScript, Tailwind CSS, and Framer Motion. All content is grounded strictly
in a supplied Google Scholar export.

> **Data integrity**: this site does not display h-index, i10-index, total
> Google Scholar citation counts, DOIs, ORCID, career history, education,
> awards, grants, or contact details that are not present in the supplied
> dataset. Citation values shown are the values recorded in the export -
> they are not live Google Scholar metrics.

---

## 1. Install Node.js

1. Go to https://nodejs.org/en/download
2. Download the LTS installer for Windows (.msi, x64).
3. Run the installer with default options.
4. Open a new PowerShell window and verify:

   node -v
   npm -v

---

## 2. Install dependencies

    npm install

---

## 3. Run locally

    npm run dev

Then open http://localhost:3000.

---

## 4. Build for production

    npm run build
    npm run start

---

## 5. Change the researcher data

Everything displayed is derived from `data/researcher.ts` and `lib/derive.ts`.

- Profile fields live at the top of `data/researcher.ts` in the `profile` object.
- Publications are the `publications` array.
- Theme rules live in `lib/derive.ts` (THEMES).
- Research domains live in `lib/derive.ts` (DOMAINS).

---

## 6. Deploy

Push to a Git repository and import at https://vercel.com/new.
Or run `npm run build` and `npm run start` on any Node host.

---

## 7. Folder structure

    app/          Root layout and page
    components/   All UI, motion, and visualisation components
    data/         Profile and all 47 publication records
    lib/         Derived aggregations (themes, stats, authors)
    styles/       Tailwind directives, tokens, grain, reduced motion
    public/       Favicon and robots.txt

---

## 8. Accessibility and motion

All animations respect `prefers-reduced-motion: reduce`. Semantic HTML,
visible focus rings, ARIA labels on icon-only controls. Custom cursor is
only enabled on fine-pointer devices.

---

## 9. Data provenance

The dataset is a static snapshot of a supplied Google Scholar export. Two
records carry a `review_needed` status. Four records carry incomplete or
anomalous metadata and are excluded from aggregate charts; they remain
visible in the explorer when the "Include flagged records" toggle is on.
No external API is called at runtime.