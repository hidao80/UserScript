# Misskey キーワードフィルター

[README English](./README.md)

[![UserScript](https://img.shields.io/badge/Framework-UserScript-blue.svg)](https://en.wikipedia.org/wiki/Userscript)
[![License](https://img.shields.io/github/license/hidao80/UserScript)](/LICENSE)

Misskeyでの不快な単語をフィルタリングします。

## インストール

UserScript管理拡張機能をインストール後、https://github.com/hidao80/UserScript/blob/main/MisskeyKeywordsFilter/MisskeyKeywordsFilter.user.js にアクセスし、ソースコードの外枠にある「Raw」ボタンをクリックします。

または[ここをクリックするとインストールします。](https://github.com/hidao80/UserScript/raw/main/MisskeyKeywordsFilter/MisskeyKeywordsFilter.user.js)

## カスタマイズ方法

- フィルタリングされた単語を変更するにはソース内の`ぶれいんだむど！`を置き換えます。また、空の文字列を設定することもできます。
- 表示させたくないフレーズはソース内の`keywords = [`の次の行に`"キーワード",`として追記してください。  
  キーワードには表示させたくない任意の文字列を指定できます。100種類程度なら動作に影響はないと思われます。

### 使用上の注意

バージョンアップにより、ローカルでカスタマイズしたフィルタリング対象キーワードリストが上書きされます。  
キーワードリストを外部に保存しておいてください。

## ライセンス

[MIT](/LICENSE)
