/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

// https://vitest.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
  },
});
