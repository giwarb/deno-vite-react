# Deno React Viteの設定

- Deno: TypeScriptランタイム + リンター + フォーマッター + テスト環境
- React: フロントエンドビューライブラリ、esm.shから取得（型定義が欲しいので）
- Vite:
  SPA開発の最も有力な環境（HMRを使った開発のため）、ビルドは内部的にはesbuildが使われている。npmから取得。

## プロジェクト作成まで

### 1. `deno.json`を作成

- tasksはviteの開発サーバとbuild定義
- importsで依存ライブラリを書く。
- compilerOptionsはjsxをreactで使うための定義とlib, typesを定義

```json
{
  "tasks": {
    "dev": "deno run -A --node-modules-dir npm:vite@5.2.2",
    "build": "deno run -A --node-modules-dir npm:vite@5.2.2 build"
  },
  "imports": {
    "@vitejs/plugin-react": "npm:@vitejs/plugin-react@4.2.1",
    "vite": "npm:vite@5.2.2",
    "react": "https://esm.sh/react@18.2.0",
    "react/": "https://esm.sh/react@18.2.0/",
    "react-dom": "https://esm.sh/react-dom@18.2.0",
    "react-dom/": "https://esm.sh/react-dom@18.2.0/"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "lib": ["dom", "deno.ns"],
    "types": ["vite/client"]
  }
}
```

### 2. `vite.config.mts`を作成

- vite / reactの基本設定
- serverは別サーバのHTMLからからローカルホスト参照できるように設定
- deno.jsonでimport定義したものをimportしておく（deno
  cacheで依存関係を取得するため）

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import "react";
import "react-dom";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 8080,
    strictPort: true,
    origin: "http://localhost:8080",
  },
});
```

### 3. `deno cache .\vite.cofig.mts` を実行

`deno.lock`が生成される。キャッシュされることで型解決がローカルファイルからされるようになる。

### 4. `index.html`, `src/main.tsx` を作成し、`public/vite.svg`を配置

最低限の実装は以下のような感じ。public配下のファイルはindex.htmlと同じ場所に配置されることになる。

```html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="./vite.svg" />
  <title>TITLE</title>
</head>

<body>
  <div id="main"></div>
  <script type="module" src="./src/main.tsx"></script>
</body>

</html>
```

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello World</h1>;
}

ReactDOM.createRoot(document.getElementById("main")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 5. 開発サーバ起動

`deno task dev`で開発サーバを起動し、localhost:8080を開く
このタイミングでnode_modulesにviteが配置される
