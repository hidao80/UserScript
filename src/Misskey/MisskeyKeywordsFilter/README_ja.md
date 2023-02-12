# Misskey キーワードフィルター

[README English](./README.md)

[![UserScript](https://img.shields.io/badge/Framework-UserScript-blue.svg)](https://en.wikipedia.org/wiki/Userscript)
[![License](https://img.shields.io/github/license/hidao80/UserScript)](/LICENSE)

## 説明

Misskeyでの不快な単語をフィルタリングします。

## インストール

UserScript管理拡張機能（[Chromium系][chrome-extension], [Firefox系][firefox-extension], [Safari][safari-extension]）をインストール後、[ソースコード][source]に移動して、インストールボタンをクリックします。

[chrome-extension]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo "Tampermonkey"
[firefox-extension]: https://addons.mozilla.org/ja/firefox/addon/tampermonkey/ "Tampermonkey"
[safari-extension]: https://apps.apple.com/us/app/userscripts/id1463298887 "UserScripts"
[source]: https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyKeywordsFilter/MisskeyKeywordsFilter.user.js "Source code"

## カスタマイズ方法

- フィルタリングされた単語を変更するにはソース内の`■■■`を置き換えます。また、空の文字列を設定することもできます。
- 表示させたくないフレーズはソース内の`keywords = [`の次の行に`"キーワード",`として追記してください。\
  キーワードには表示させたくない任意の文字列を指定できます。100種類程度なら動作に影響はないと思われます。

### 使用上の注意

バージョンアップにより、ローカルでカスタマイズしたフィルタリング対象キーワードリストが上書きされます。
キーワードリストを外部に保存しておいてください。

## ライセンス

[MIT](/LICENSE)

### twemojiのライセンス

Copyright 2019 Twitter, Inc and other contributors\
Code licensed under the MIT License: <http://opensource.org/licenses/MIT>\
Graphics licensed under CC-BY 4.0: <https://creativecommons.org/licenses/by/4.0/>
