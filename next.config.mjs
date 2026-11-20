/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // static site -> free hosting on Cloudflare Pages
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
