# Misskey v11 Post Search

[README 日本語版](./README_ja.md)

[![UserScript](https://img.shields.io/badge/Framework-UserScript-blue.svg)](https://en.wikipedia.org/wiki/Userscript)
[![License](https://img.shields.io/github/license/hidao80/UserScript)](/LICENSE)

## Description

UserScript to search through Misskey v11 posts via API with a convenient interface.

## Install

After installing the UserScript Manager extension ([Chromium-based][chrome-extension], [Firefox-based][firefox-extension], [Safari][safari-extension]), go to [the source code][source] and click the Install button.

[chrome-extension]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo "Tampermonkey"
[firefox-extension]: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/ "Tampermonkey"
[safari-extension]: https://apps.apple.com/us/app/userscripts/id1463298887 "UserScripts"
[source]: https://github.com/hidao80/UserScript/raw/main/src/Misskey/PostSearch/PostSearch.user.js "Source code"

## How to use

1. Triple-click anywhere on the page to open the search interface
2. Enter the URL of your JSON file containing posts in the top input field (URLs are saved for future use)
3. Type your search query in the search box
4. Results will be displayed automatically, sorted by date in descending order
5. Use the Hide/Show button to toggle JSON URL input visibility
6. Click the help icon (?) for detailed instructions

## JSON File Format

The JSON file should be an array of post objects with the following structure:

```json
[
    {
        "text": "Post content",
        "createdAt": "2023-01-01T00:00:00.000Z"
    },
    ...
]
```

## License

[MIT](/LICENSE)

### License of twemoji

Copyright 2019 Twitter, Inc and other contributors\
Code licensed under the MIT License: <http://opensource.org/licenses/MIT>\
Graphics licensed under CC-BY 4.0: <https://creativecommons.org/licenses/by/4.0/>
