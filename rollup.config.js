const ts = require("@rollup/plugin-typescript");
const banner = require("rollup-plugin-banner2");
const terser = require("@rollup/plugin-terser");
const pkg = require("./package.json");

const RE_FILE_EXT = /\.([mc]?[tj]sx?$)/i;

const bannerText = () => `/**
 * ${pkg.name} v${pkg.version} by ${pkg.author} (License: ${pkg.license})
 */
`;

const configCJS = (file) => ({
  input: "lib/index.ts",
  output: {
    file,
    format: "cjs",
    sourcemap: file.indexOf(".min.") > -1,
    exports: "named",
  },
});

const configESM = (file) => ({
  input: "lib/index.ts",
  output: {
    file,
    format: "es",
    sourcemap: file.indexOf(".min.") > -1,
    exports: "named",
  },
});

module.exports = [
  // Node/CommonJS
  {
    ...configCJS(pkg.main),
    plugins: [
      ts({
        compilerOptions: {
          declaration: false,
          sourceMap: false,
          target: "es5",
          module: "ESNext",
        },
      }),
      banner(bannerText),
    ],
  },
  {
    ...configCJS(pkg.main.replace(RE_FILE_EXT, ".min.$1")),
    plugins: [
      ts({
        compilerOptions: {
          declaration: false,
          sourceMap: true,
          target: "es5",
          module: "ESNext",
        },
      }),
      terser(),
      banner(bannerText),
    ],
  },
  // ESM
  {
    ...configESM(pkg.module),
    plugins: [
      ts({
        compilerOptions: {
          sourceMap: false,
          target: "ESNext",
          module: "ESNext",
        },
        include: "lib/index.ts",
      }),
      banner(bannerText),
    ],
  },
  {
    ...configESM(pkg.module.replace(RE_FILE_EXT, ".min.$1")),
    plugins: [
      ts({
        compilerOptions: {
          declaration: false,
          sourceMap: true,
          target: "ESNext",
          module: "ESNext",
        },
        include: "lib/index.ts",
      }),
      terser(),
      banner(bannerText),
    ],
  },
];
