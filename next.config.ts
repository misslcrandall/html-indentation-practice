import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `
          @use "@/app/styles/variables" as *;
          @use "@/app/styles/mixins" as *;
        `,
      },
};

export default nextConfig;
