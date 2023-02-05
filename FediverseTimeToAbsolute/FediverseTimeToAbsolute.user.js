// ==UserScript==
// @name        FediverseTimeToAbsolute
// @description Change time to absolute notation UserScript for Fediverse.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @match       https://pawoo.net/*
// @match       https://mstdn.sublimer.me/*
// @match       https://social.vivaldi.net/*
// @match       https://misskey.dev/*
// @match       https://misskey.io/*
// @match       https://misskey.noellabo.jp/*
// @author      hidao80
// @version     1.11
// @namespace   https://github.com/hidao80/UserScript
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f552.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/FediverseTimeToAbsolute/FediverseTimeToAbsolute.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/FediverseTimeToAbsolute/FediverseTimeToAbsolute.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

const styles = [
    // not post-column
    `article time::before {
        content: attr(title) " (";
    }`,
    `article time::after {
        content: ")";
    }`,

    // for Mastodon
    `article .status__info {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row-reverse;
    }`,
    `article .status__info .status__display-name {
        margin-right: auto;
        padding-right: 0;
    }`,

    // posted-column in Misskey
    `.transition time::before {
        content: attr(title) " (";
    }`,
    `.transition time::after {
        content: ")";
    }`,
    `.transition header.header {
        flex-wrap: wrap
    }`,
    `.transition header.header>.name {
        display: block;
    }`,
    `.transition header.header>.username {
        display: block;
    }`,
    `.transition .info {
        display: block;
        text-align: right;
        margin-left: auto;
    }`,
    `.transition .info>a, .transition .info>span {
        display: inline-block;
    }`,

    // notification column for home layout in Misskey
    `.mk-notifications>.notifications>div>.notification>.text>header[data-v-b78fea54] {
        flex-wrap: wrap
    }`,
    `.notification header time {
        display: block;
        text-align: right;
        margin-left: auto;
    }`,

    // notification column for deck layout in Misskey
    `.dsfykdcjpuwfvpefwufddclpjhzktmpw>.notification>div>header[data-v-bb2367fa] {
        flex-wrap: wrap
    }`,
    `.notification .header .info {
        display: block;
        text-align: right;
        margin-left: auto;
    }`,
];

// Style is a later winner, so send and add
setTimeout(() => {
    const usableSheet = [...document.styleSheets].slice(-1)[0];

    for (let style of styles) {
        usableSheet.insertRule(style, usableSheet.cssRules.length);
    }
}, 500);
