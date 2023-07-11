// ==UserScript==
// @name        Misskey Different Color Local Only
// @name:ja     Misskeyだけ「ローカルのみ」の投稿範囲アイコンに違う色を付ける
// @description When the posting range is "local only" in Misskey, it should be a different color.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.0.3
// @namespace   https://github.com/hidao80/UserScript/MisskeyDifferentColorLocalOnly
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3a8.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyDifferentColorLocalOnly/MisskeyDifferentColorLocalOnly.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyDifferentColorLocalOnly/MisskeyDifferentColorLocalOnly.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

const styles = [
    // Misskey to make "local only" a different color.
    `.popover > div:nth-child(n+5) {
        color: var(--noteActionsReactionHover) !important;
    }`,
    `.visibility > span, .visibility > span {
        padding: 3px;
        border: solid 3px var(--noteActionsReactionHover);
        border-radius: 4px;
    }`,
];

// Style is a later winner, so send and add
setTimeout(() => {
    const usableSheet = [...document.styleSheets].slice(-1)[0];

    for (let style of styles) {
        usableSheet.insertRule(style, usableSheet.cssRules.length);
    }
}, 500);
