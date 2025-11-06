# MeiV11RenoteRemover

[README English](./README.md)

[![UserScript](https://img.shields.io/badge/Framework-UserScript-blue.svg)](https://en.wikipedia.org/wiki/Userscript)
[![License](https://img.shields.io/github/license/hidao80/UserScript)](/LICENSE)

## 説明

Misskey V11向けのユーザースクリプトで、タイムライン上のリノート（Renote）を削除するボタンを追加します。\
インストール後、Misskeyのタイムラインを開くだけでリノートに削除ボタンが表示されます。

## インストール

UserScript管理拡張機能（[Chromium系][chrome-extension], [Firefox系][firefox-extension], [Safari][safari-extension]）をインストール後、[ソースコード][source]に移動して、インストールボタンをクリックします。

[chrome-extension]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo "Tampermonkey"
[firefox-extension]: https://addons.mozilla.org/ja/firefox/addon/tampermonkey/ "Tampermonkey"
[safari-extension]: https://apps.apple.com/us/app/userscripts/id1463298887 "UserScripts"
[source]: https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11RenoteRemover/MeiV11RenoteRemover.min.user.js "Source code"

## 使い方

リノートの右端にゴミ箱アイコンが表示されます。\
そのゴミ箱アイコンをタップするとそのリノートが削除されます。\
削除の確認はされず、キャンセルもできません。

### スクリーンショット

<img width="461" height="253" alt="image" src="https://github.com/user-attachments/assets/187b674c-7d89-44f6-a299-32a55ab11979" />

## 注意事項

- 本スクリプトはMisskey V11専用です。他バージョンでは動作しない場合があります。
- 不具合や要望はIssue等でご連絡ください。

## ライセンス

[MIT](/LICENSE)

### twemojiのライセンス

Copyright 2019 Twitter, Inc and other contributors\
Code licensed under the MIT License: <http://opensource.org/licenses/MIT>\
Graphics licensed under CC-BY 4.0: <https://creativecommons.org/licenses/by/4.0/>
