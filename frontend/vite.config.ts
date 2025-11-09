import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    build: {
      outDir: "dist",
      sourcemap: false, // Disable sourcemaps for smaller build size
    },
    // Environment variable configuration
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    // Optional: Development server proxy for API calls
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:3001",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
