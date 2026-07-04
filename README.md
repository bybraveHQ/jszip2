# @bybrave/jszip2

[![CI](https://github.com/bybraveHQ/jszip2/actions/workflows/ci.yml/badge.svg)](https://github.com/bybraveHQ/jszip2/actions)
[![npm](https://img.shields.io/npm/v/%40bybrave%2Fjszip2)](https://www.npmjs.com/package/@bybrave/jszip2)

Maintained fork of [JSZip](https://github.com/Stuk/jszip) — create, read and edit `.zip` files with JavaScript, in Node.js and the browser.

The original has ~187M downloads/month and no release since 2022 (400+ open issues and PRs). This fork keeps the exact same API and modernizes everything underneath it.

```bash
npm install @bybrave/jszip2
```

```js
// CommonJS — drop-in
const JSZip = require("@bybrave/jszip2");

// ESM — finally (top ask of the original backlog)
import JSZip from "@bybrave/jszip2";

const zip = new JSZip();
zip.file("hello.txt", "Hello World\n");
zip.folder("images").file("smile.gif", imgData, { base64: true });
const blob = await zip.generateAsync({ type: "blob" });

const archive = await JSZip.loadAsync(data);
const text = await archive.file("hello.txt").async("string");
```

## What's different from jszip 3.10.1

| Change | Original issue |
|---|---|
| ESM entry (`import JSZip from "@bybrave/jszip2"`) + `exports` map with types | [#867](https://github.com/Stuk/jszip/issues/867), [#717](https://github.com/Stuk/jszip/issues/717) |
| `setimmediate` polyfill removed (native `setImmediate` / `MessageChannel`) — fixes crashes in sandboxed environments, Tampermonkey, Edge | [#909](https://github.com/Stuk/jszip/issues/909), [#934](https://github.com/Stuk/jszip/issues/934), [#596](https://github.com/Stuk/jszip/issues/596) |
| `pako` upgraded 1.x → 2.x (faster, actively maintained compression) | [#720](https://github.com/Stuk/jszip/issues/720) |
| `lie` Promise polyfill removed — native Promises everywhere | — |
| `readable-stream` dependency removed — Node's own `stream` in Node, clean stub in browser bundles (no more `Cannot find module 'stream'` with webpack 5 / modern bundlers) | [#704](https://github.com/Stuk/jszip/issues/704) |
| `Blob`/`File` input now works in Node.js (read via `blob.arrayBuffer()` instead of the browser-only `FileReader`) | — |
| Bundlers consume the real source, not a pre-built UMD blob (the original silently substituted `dist/jszip.min.js` via the `browser` field) | — |
| Build: esbuild instead of grunt + browserify; CI on Node 18/20/22 | — |

Dependency count: 4 → 1 (`pako`).

## Compatibility

- **API is unchanged** — this is a drop-in replacement for `jszip`. The full API documentation of the original applies: [stuk.github.io/jszip](https://stuk.github.io/jszip/) (a copy lives in [`documentation/`](./documentation)).
- Node.js ≥ 18; modern browsers (no IE — it needed the removed polyfills).
- `JSZip.external.Promise` is still overridable if you need a custom Promise implementation.
- Browser `<script>` builds: `dist/jszip.js` and `dist/jszip.min.js` (global `JSZip`), shipped in the npm package.

## Roadmap

Planned for upcoming minor releases (tracked in [issues](https://github.com/bybraveHQ/jszip2/issues)):

- **4.1** — synchronous API (`generateSync` / `loadSync`) — [upstream #281](https://github.com/Stuk/jszip/issues/281)
- **4.2** — Web Streams support (`ReadableStream` in, `ReadableStream` out) — [upstream #345](https://github.com/Stuk/jszip/issues/345), [#830](https://github.com/Stuk/jszip/issues/830)
- **4.3** — ZIP64: archives and files over 4GB — [upstream #580](https://github.com/Stuk/jszip/issues/580), [#739](https://github.com/Stuk/jszip/issues/739)

## Support

If this package saves you time, you can support maintenance:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-buy%20me%20a%20coffee-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/bybrave)
[![Bitcoin](https://img.shields.io/badge/Bitcoin-BTC-F7931A?logo=bitcoin&logoColor=white)](#support)

Bitcoin (BTC): `bc1q37557q5jpeaxqydzwvf3jgj7zhnfpn2td3q40q`

## Credits & license

Dual-licensed MIT or GPLv3, same as the original — see [LICENSE.markdown](./LICENSE.markdown).
Based on [JSZip](https://github.com/Stuk/jszip) by Stuart Knightley, David Duponchel, Franz Buchinger and António Afonso.
