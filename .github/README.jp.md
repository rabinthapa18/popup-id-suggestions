# PopupIdSuggestion

**PopupSuggestion** は、ユーザー入力に基づいてインタラクティブなポップアップ候補ボックスを提供する軽量な JavaScript クラスです。数値入力フィールドで動作し、指定された JSON ファイルからデータを取得します。

## 特徴

- JSON ファイルから動的に候補をロード
- スムーズでカスタマイズ可能な UI
- キーボードナビゲーション対応（矢印キー、Enter、Escape、Backspace）
- ユーザー入力に基づいて自動更新
- 数値を入力する `<input>` フィールドに対応

## インストール

このパッケージは npm では提供されていません。代わりに、GitHub からスクリプトをダウンロードしてプロジェクトに追加してください。

### 使用手順:

1. GitHub から `PopupSuggestion.js` をダウンロード。
2. スクリプトをプロジェクトに追加。

```html
<script type="module">
  import PopupSuggestion from "./PopupSuggestion.js";

  const popup = new PopupSuggestion("path/to/data.json", {
    fontSize: "14px",
    zIndex: "1500",
    width: "320px",
  });
</script>
```

```html
<script type="module">
  import PopupSuggestion from "./PopupSuggestion.js";

  const popup = new PopupSuggestion("https://api.example.com/data.json", {
    fontSize: "14px",
    zIndex: "1500",
    width: "320px",
    headers: {
      Authorization: "Bearer hogefuga1234",
    },
  });
</script>
```

## 使用方法

### 基本設定

```javascript
const popup = new PopupSuggestion("path/to/data.json");
```

- `path/to/data.json` を実際の JSON データの URL またはファイルパスに置き換えてください。

### 処理対象の入力フィールド

```html
<input type="number" class="popup-id-suggestions" placeholder="原稿ID" />
```

- `number` タイプを指定する。
- `popup-id-suggestions` クラスを指定する。

### JSON データの例

```json
[
  { "id": 101, "title": "Item One" },
  { "id": 102, "title": "Item Two" },
  { "id": 103, "title": "Item Three" }
]
```

## オプション

クラスを初期化する際にオプションオブジェクトを渡すことで、ポップアップをカスタマイズできます。

| オプション        | Type    | デフォルト値               | 説明                                                     |
| ----------------- | ------- | -------------------------- | -------------------------------------------------------- |
| `fontSize`        | string  | "12px"                     | ポップアップのテキストのフォントサイズ                   |
| `zIndex`          | string  | "1000"                     | ポップアップのスタック順序                               |
| `itemPadding`     | string  | "5px"                      | 各候補アイテムの内側の余白                               |
| `backgroundColor` | string  | "#0e1116"                  | ポップアップの背景色                                     |
| `color`           | string  | "white"                    | ポップアップ内のテキストカラー                           |
| `borderRadius`    | string  | "7px"                      | ポップアップの角の丸み                                   |
| `hoverColor`      | string  | "#386ee3"                  | ホバー時の背景色                                         |
| `borderColor`     | string  | `color` の明るいバージョン | ポップアップの枠線の色                                   |
| `width`           | string  | "300px"                    | ポップアップの最大幅                                     |
| `height`          | string  | "200px"                    | ポップアップの最大高さ                                   |
| `textOverflow`    | string  | "wrap"                     | テキストのオーバーフロー処理（"wrap" または "ellipsis"） |
| `showBorders`     | boolean | `true`                     | アイテム間の境界線を表示するか                           |
| `headers`         | object  | {}                         | HTTP リクエストヘッダ                                    |

## キーボードショートカット

- `ArrowDown` → 選択を下に移動
- `ArrowUp` → 選択を上に移動
- `Enter` → ハイライトされたアイテムを選択
- `Escape` → ポップアップを閉じる
- `Backspace` → 最後の数字を削除して候補を更新

## 動作

1. ユーザーが数値を入力すると、ポップアップが表示され、該当する候補が表示されます。
2. 矢印キーで移動し、`Enter` を押すと選択できます。
3. ポップアップ外をクリックすると閉じます。
4. `Backspace` を押すと検索クエリが動的に更新されます。

## 対応環境

- モダンブラウザ (Chrome, Firefox, Edge, Safari)
- JavaScript ES6+ 必須

## ライセンス

このスクリプトはオープンソースであり、個人および商用利用が可能です。
このパッケージは MIT ライセンスの下で提供されています。

---

問題や機能リクエストがある場合は、[GitHub リポジトリ](#) をご確認ください。
