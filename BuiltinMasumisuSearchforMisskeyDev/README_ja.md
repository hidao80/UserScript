# ますみすサーチ内蔵 for Misskey.dev

[README English](./README.md)

[![UserScript](https://img.shields.io/badge/Framework-UserScript-blue.svg)](https://en.wikipedia.org/wiki/Userscript)
[![License](https://img.shields.io/github/license/hidao80/UserScript)](/LICENSE)

Misskey.devで投稿検索をするとき、Misskeyの検索機能ではなく[ますみすサーチ](https://masmis-search.ja-jp.org/ui)を利用します。

## インストール

### Chromium系ブラウザの場合

1. [BuiltinMasumisuSearchforMisskeyDev](https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js)をダウンロードします
2. アドレスバーに`chrome://extensions/`を貼り付け「拡張機能」ページを開き、「デベロッパーモード」または「開発者モード」のスイッチをオンにします
3. ダウンロードした`BuiltinMasumisuSearchforMisskeyDev.user.js`を「拡張機能」ページにドラッグ&ドロップします

### SafariやFirefoxの場合

UserScript管理拡張機能をインストール後、<https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js> にアクセスし、ソースコードの外枠にある「Raw」ボタンをクリックします。

または[ここをクリックするとインストールします。](https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js)

### Android系OSの場合

1. [Kiwi Browser[Play Storeへ]](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser&hl=ja)をインストールします（Chrome拡張機能が使えるため）
2. Chromeで[BuiltinMasumisuSearchforMisskeyDev](https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js)をダウンロードします\
  なぜかKiwi Browserではダウンロードしてもアクセスできないようです
3. Kiwi Browserのアドレスバーに`chrome://extensions/`を貼り付け「拡張機能」ページを開き、「デベロッパーモード」のスイッチをオンにします
4. 「`+(from .zip/.crx/.user.js)`」ボタンをタッチし、ファイルアプリからダウンロードした`BuiltinMasumisuSearchforMisskeyDev.user.js`を選択してください。Kiwi Browserにインストールされます
5. インストールが終わったら「拡張機能」ページに追加された`BuiltinMasumisuSearchforMisskeyDev`の右下のスイッチをオンにします
6. Misskey.devを再読込すると有効になります

## ライセンス

[MIT](/LICENSE)
