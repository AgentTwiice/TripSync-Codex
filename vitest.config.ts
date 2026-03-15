import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./apps/web/src", import.meta.url)),
      "@tripsync/config": fileURLToPath(new URL("./packages/config/src/index.ts", import.meta.url)),
      "@tripsync/domain": fileURLToPath(new URL("./packages/domain/src/index.ts", import.meta.url)),
      "@tripsync/db": fileURLToPath(new URL("./packages/db/src/index.ts", import.meta.url)),
      "@tripsync/providers": fileURLToPath(new URL("./packages/providers/src/index.ts", import.meta.url)),
      "@tripsync/ui": fileURLToPath(new URL("./packages/ui/src/index.tsx", import.meta.url))
    }
  },
  test: {
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"]
  }
});
