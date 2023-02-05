# Misskey keywords filter

[README 日本語版](./README_ja.md)

[![UserScript](https://img.shields.io/badge/Framework-UserScript-blue.svg)](https://en.wikipedia.org/wiki/Userscript)
[![License](https://img.shields.io/github/license/hidao80/UserScript)](/LICENSE)

Filter out offensive words in Misskey.

## Install

After installing the UserScript Manager extension, go to https://github.com/hidao80/UserScript/blob/main/MisskeyKeywordsFilter/MisskeyKeywordsFilter.user.js and click the "Raw" button on the outer frame of the source code.

or [Click to install](https://github.com/hidao80/UserScript/raw/main/MisskeyKeywordsFilter/MisskeyKeywordsFilter.user.js)

## How to customize

- To change the filtered words, in the source, replace `■■■` in the source to replace it.
  You can also set an empty string.
- If you do not want the phrase to be displayed, add it as `"keywords",` on the line following `keywords = [` in the source.
  Keywords can be any string you do not want to display. 100 or so phrases should not affect the operation.

### Usage Notes

The upgrade will overwrite locally customized keyword lists for filtering.
Please save your keyword list externally.

## license

[MIT](/LICENSE)
