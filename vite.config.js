import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { defineConfig } from "vite";

const PAGE_MODULES = ["src/render/page.js", "src/content/pages.js"];
const importFresh = new Function("specifier", "return import(specifier)");

async function loadModule(server, relativePath) {
  if (server) return server.ssrLoadModule(`/${relativePath}`);
  const href = pathToFileURL(resolve(process.cwd(), relativePath)).href;
  return importFresh(href);
}

function fill(html, token, value) {
  return html.split(token).join(value);
}

function sidebiteHtml() {
  let server;

  return {
    name: "sidebite-html",
    configureServer(devServer) {
      server = devServer;
    },
    transformIndexHtml: {
      order: "pre",
      async handler(html, ctx) {
        const [page, pages] = await Promise.all(
          PAGE_MODULES.map((specifier) => loadModule(server, specifier)),
        );
        const content = pages.contentFor(ctx?.path ?? "/index.html");
        const rendered = page.renderPage(content);
        return fill(
          fill(
            fill(fill(html, "__PALETTE__", rendered.palette), "__TITLE__", rendered.title),
            "__DESCRIPTION__",
            rendered.description,
          ),
          "<!--app-->",
          rendered.body,
        );
      },
    },
  };
}

export default defineConfig({
  // GitHub Pages project site: https://<user>.github.io/sidebite2026/
  base: "/sidebite2026/",
  plugins: [sidebiteHtml()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
});
