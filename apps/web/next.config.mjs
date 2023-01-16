/** @type {import('next').NextConfig} */

console.log("NEXT_PUBLIC_GRAPHQL_URL", process.env.NEXT_PUBLIC_GRAPHQL_URL);

const config = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  env: {
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "",
  },
};

export default config;
