import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    // public/ 下的图片用原生 img，不需要 Astro 的 Image 组件处理
    responsiveStyles: false,
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      PUBLIC_GOOGLE_ANALYTICS_ID: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  // 旧 URL 兼容：/articles/[slug] → /posts/[slug] (301永久重定向)
  redirects: {
    "/articles/10x-identity-guiding-principles": "/posts/10x-identity-guiding-principles",
    "/articles/building-a-personal-blog": "/posts/building-a-personal-blog",
    "/articles/built-a-gpts-to-help-everyone-learn-efficiently": "/posts/built-a-gpts-to-help-everyone-learn-efficiently",
    "/articles/effective-note-taking": "/posts/effective-note-taking",
    "/articles/grateful-for-my-curiosity": "/posts/grateful-for-my-curiosity",
    "/articles/how-to-distinguish-signal-from-noise-in-life": "/posts/how-to-distinguish-signal-from-noise-in-life",
    "/articles/silicon-vs-carbon-consumption": "/posts/silicon-vs-carbon-consumption",
    "/articles/some-thoughts-on-enhancing-human-intelligence": "/posts/some-thoughts-on-enhancing-human-intelligence",
    "/articles/the-natural-selection-of-the-romani": "/posts/the-natural-selection-of-the-romani",
    "/articles/why-is-multi-modality-a-new-medium": "/posts/why-is-multi-modality-a-new-medium",
  },
  fonts: [
    {
      // Google Sans Code — code blocks only
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
    },
  ],

});
