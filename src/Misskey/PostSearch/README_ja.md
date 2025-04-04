# Misskey v11 投稿検索

[English README](./README.md)

[![UserScript](https://img.shields.io/badge/Framework-UserScript-blue.svg)](https://en.wikipedia.org/wiki/Userscript)
[![License](https://img.shields.io/github/license/hidao80/UserScript)](/LICENSE)

## 説明

Misskey v11の投稿をAPI経由で検索するためのUserScriptです。

## インストール

UserScript管理拡張機能（[Chromium系][chrome-extension], [Firefox系][firefox-extension], [Safari][safari-extension]）をインストール後、[ソースコード][source]に移動して、インストールボタンをクリックしてください。

[chrome-extension]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo "Tampermonkey"
[firefox-extension]: https://addons.mozilla.org/ja/firefox/addon/tampermonkey/ "Tampermonkey"
[safari-extension]: https://apps.apple.com/jp/app/userscripts/id1463298887 "UserScripts"
[source]: https://github.com/hidao80/UserScript/raw/main/src/Misskey/PostSearch/PostSearch.user.js "ソースコード"

## 使い方

1. ページ上の任意の場所をトリプルクリックすると、検索インターフェイスが開きます
2. 上部の入力欄に投稿データが含まれるJSONファイルのURLを入力します（URLは自動的に保存されます）
3. 検索ボックスに検索したいキーワードを入力します
4. 検索結果が自動的に表示され、日付の新しい順に並べられます
5. 非表示/表示ボタンでJSONファイルのURL入力欄の表示を切り替えられます
6. ヘルプアイコン（?）をクリックすると、詳しい使い方が表示されます

## JSONファイルのフォーマット

JSONファイルは以下の構造を持つ投稿オブジェクトの配列である必要があります：

```json
[
    {
        "text": "投稿内容",
        "createdAt": "2023-01-01T00:00:00.000Z"
    },
    ...
]
```

## ライセンス

[MIT](/LICENSE)

### twemojiのライセンス

Copyright 2019 Twitter, Inc and other contributors\
Code licensed under the MIT License: <http://opensource.org/licenses/MIT>\
Graphics licensed under CC-BY 4.0: <https://creativecommons.org/licenses/by/4.0/>
