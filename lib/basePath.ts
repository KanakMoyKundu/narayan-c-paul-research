// Mirrors the basePath logic in next.config.mjs so public assets referenced in
// metadata (which are not automatically prefixed by Next.js) resolve correctly
// on GitHub Pages project sites.
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgSite = repositoryName.toLowerCase().endsWith(".github.io");

export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (repositoryName && !isUserOrOrgSite ? `/${repositoryName}` : "");
