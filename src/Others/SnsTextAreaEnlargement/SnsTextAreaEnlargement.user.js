// ==UserScript==
// @name        SnsTextAreaEnlargement
// @description Enlarge the text area.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @match       https://pawoo.net/*
// @match       https://mstdn.sublimer.me/*
// @match       https://social.vivaldi.net/*
// @match       https://misskey.dev/*
// @match       https://misskey.io/*
// @match       https://misskey.noellabo.jp/*
// @match       https://tweetdeck.twitter.com/*
// @author      hidao80
// @version     1.1.1
// @namespace   https://github.com/hidao80/UserScript
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f5d2.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/SnsTextAreaEnlargement/SnsTextAreaEnlargement.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/SnsTextAreaEnlargement/SnsTextAreaEnlargement.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

const styles = [
    // for Mastodon
    `.compose-form .autosuggest-textarea__textarea {
        resize: vertical;
    }`,

    // for tweetdeck
    `.compose-text {
        resize: vertical;
    }`,
];

const iosStyles = [
    // for Misskey
    `.textarea > textarea {
        height: 30vh;
    }`,
];

const andriodStyles = [
];

// Style is a later winner, so send and add
setTimeout(() => {
    const usableSheet = [...document.styleSheets].slice(-1)[0];

    for (let style of styles) {
        usableSheet.insertRule(style, usableSheet.cssRules.length);
    }

    const ua = window.navigator.userAgent.toLowerCase();
    console.log(ua);

    if (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1) {
        for (let style of iosStyles) {
            usableSheet.insertRule(style, usableSheet.cssRules.length);
        }
    }

    if (ua.indexOf("android") !== -1) {
        for (let style of andriodStyles) {
            usableSheet.insertRule(style, usableSheet.cssRules.length);
        }
    }
}, 500);
