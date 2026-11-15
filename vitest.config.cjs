const { defineConfig } = require("vitest/config");
const path = require("path");

const root = path.resolve(__dirname);

module.exports = defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./packages/testing/src/setup.ts"],
    include: [
      "packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "registry/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  esbuild: { jsxFactory: "React.createElement", jsxFragment: "React.Fragment" },
  resolve: {
    alias: {
      react: path.join(root, "node_modules/react/cjs/react.development.js"),
      "react-dom": path.join(root, "node_modules/react-dom/index.js"),
      "@/lib/utils": path.join(root, "registry/default/components/utils/cn.ts"),
      "@/components/ui/button": path.join(root, "registry/default/components/button/button.tsx"),
      "@/components/ui/input": path.join(root, "registry/default/components/input/input.tsx"),
      "@/components/ui/textarea": path.join(root, "registry/default/components/textarea/textarea.tsx"),
      "@/components/ui/label": path.join(root, "registry/default/components/label/label.tsx"),
      "@/components/ui/checkbox": path.join(root, "registry/default/components/checkbox/checkbox.tsx"),
      "@/components/ui/radio-group": path.join(root, "registry/default/components/radio-group/radio-group.tsx"),
      "@/components/ui/switch": path.join(root, "registry/default/components/switch/switch.tsx"),
      "@/components/ui/select": path.join(root, "registry/default/components/select/select.tsx"),
      "@/components/ui/slider": path.join(root, "registry/default/components/slider/slider.tsx"),
      "@/components/ui/badge": path.join(root, "registry/default/components/badge/badge.tsx"),
      "@/components/ui/avatar": path.join(root, "registry/default/components/avatar/avatar.tsx"),
      "@/components/ui/skeleton": path.join(root, "registry/default/components/skeleton/skeleton.tsx"),
      "@/components/ui/table": path.join(root, "registry/default/components/table/table.tsx"),
      "@/components/ui/calendar": path.join(root, "registry/default/components/calendar/calendar.tsx"),
      "@/components/ui/date-picker": path.join(root, "registry/default/components/date-picker/date-picker.tsx"),
      "@/components/ui/navigation-menu": path.join(root, "registry/default/components/navigation-menu/navigation-menu.tsx"),
      "@/components/ui/breadcrumb": path.join(root, "registry/default/components/breadcrumb/breadcrumb.tsx"),
      "@/components/ui/pagination": path.join(root, "registry/default/components/pagination/pagination.tsx"),
    },
  },
});
