# Misskey keywords filter

[README 日本語版](./README_ja.md)

[![UserScript](https://img.shields.io/badge/Framework-UserScript-blue.svg)](https://en.wikipedia.org/wiki/Userscript)
[![License](https://img.shields.io/github/license/hidao80/UserScript)](/LICENSE)

## Description

Filter out offensive words in Misskey.

## Install

After installing the UserScript Manager extension ([Chromium-based][chrome-extension], [Firefox-based][firefox-extension], [Safari][safari-extension]), go to [the source code][source] and click the Install button.

[chrome-extension]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo "Tampermonkey"
[firefox-extension]: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/ "Tampermonkey"
[safari-extension]: https://apps.apple.com/us/app/userscripts/id1463298887 "UserScripts"
[source]: https://github.com/hidao80/UserScript/raw/main/MisskeyKeywordsFilter/MisskeyKeywordsFilter.user.js "Source code"

## How to customize

- To change the filtered words, in the source, replace `■■■` in the source to replace it.\
  You can also set an empty string.
- If you do not want the phrase to be displayed, add it as `"keywords",` on the line following `keywords = [` in the source.\
  Keywords can be any string you do not want to display. 100 or so phrases should not affect the operation.

### Usage Notes

The upgrade will overwrite locally customized keyword lists for filtering.\
Please save your keyword list externally.

## License

[MIT](/LICENSE)

### License of twemoji

Copyright 2019 Twitter, Inc and other contributors\
Code licensed under the MIT License: <http://opensource.org/licenses/MIT>\
Graphics licensed under CC-BY 4.0: <https://creativecommons.org/licenses/by/4.0/>
