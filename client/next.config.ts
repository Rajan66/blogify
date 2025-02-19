import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["127.0.0.1", "localhost"], // to hit localhost:8000 i.e backend api for fetching image 
    },
};

export default nextConfig;
