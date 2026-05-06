/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // picsum.photos — 假資料封面圖用，之後換成真實圖片後可移除
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
}

export default nextConfig
