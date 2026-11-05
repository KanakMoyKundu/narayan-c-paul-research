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

The site is configured for **GitHub Pages** as a fully static export
(`output: "export"` in `next.config.mjs`). `npm run build` writes the static
website to `out/`.

### Automatic deployment

`.github/workflows/deploy.yml` deploys on every push to the default branch
(`master`), and can also be started manually from the **Actions** tab
(**Deploy to GitHub Pages** -> **Run workflow**).

The workflow:

1. Installs Node.js 20 and runs `npm ci` using `package-lock.json`.
2. Runs `npm run build`, exporting the site to `out/`.
3. Adds `.nojekyll` so GitHub Pages serves the `_next/` folder.
4. Uploads `out/` with `actions/upload-pages-artifact`.
5. Deploys with `actions/deploy-pages` to the `github-pages` environment.

The base path is detected automatically from the repository name. Project
repositories are served under `/<repository-name>/`; `USERNAME.github.io`
repositories use an empty base path. To use a custom domain, set the repository
variable `NEXT_PUBLIC_BASE_PATH` to an empty value (or set it explicitly to any
other required path). Local `npm run dev` and `npm run build` use an empty base
path unless `NEXT_PUBLIC_BASE_PATH` is set.

### One-time repository setup

In **Settings -> Pages**, set **Source** to **GitHub Actions**. The first push
to the default branch then publishes the site.

### Published website

- Project repository: `https://USERNAME.github.io/REPOSITORY/`
- User/organization repository: `https://USERNAME.github.io/`
- Deployment status and history: **Actions** tab -> **Deploy to GitHub Pages**

### Updating the website

Edit the site, then commit and push to the default branch:

    git add .
    git commit -m "Describe the change"
    git push

The workflow rebuilds and redeploys automatically. No manual build or upload
is required.

### Local production preview

    npm run build
    npm run start

Vercel remains supported as an alternative host (`output: "export"` works
there too), but GitHub Pages is the configured deployment target.

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