/** @type {import('next').NextConfig} */

// GitHub Pages project sites are served from https://USERNAME.github.io/REPOSITORY/.
// User/org sites (USERNAME.github.io) and custom domains are served from the root.
// GitHub Actions always exposes GITHUB_REPOSITORY, so the base path is derived
// automatically. Set NEXT_PUBLIC_BASE_PATH to override it (use "" for a custom domain).
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgSite = repositoryName.toLowerCase().endsWith(".github.io");
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (repositoryName && !isUserOrOrgSite ? `/${repositoryName}` : "");

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
