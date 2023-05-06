// ==UserScript==
// @name        Fediverse text blur
// @name:ja     Misskey & Mastodon テキストぼかし
// @description Blur text in Misskey v11 and Mastodon. Not available in Misskey v13.
// @match       https://misskey.dev/*
// @match       https://fedibird.com/*
// @match       https://vivaldi.social.net/*
// @author      hidao80
// @version     1.1.1
// @namespace   https://github.com/hidao80/UserScript/FediverseTextBlur
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a7.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/FediverseTextBlur/FediverseTextBlur.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/FediverseTextBlur/FediverseTextBlur.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';

/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = !false;
const SCRIPT_NAME = 'Fediverse Text Blur';
/** Suppress debug printing unless in debug mode */
const console = {};
["log","debug","warn","info","error"].forEach(method => {
    console[method] = DEBUG ? window.console[method] : function(){};
});
/** The script name is converted to a hexadecimal hash */
const HASH = await (async (t=SCRIPT_NAME) => {const e=(new TextEncoder).encode(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map((t=>t.toString(16).padStart(2,"0"))).join("").slice(0,10)})();

console.debug(`[${SCRIPT_NAME}]: HASH = ${HASH}`);
console.debug(`[${SCRIPT_NAME}]: Script Loading...`);


const styles = [
    `article .havbbuyv,
    article .status__content,
    .reply-to .havbbuyv,
    .reply-to .content,
    article .display-name {
        filter: blur(5px);
    }`,
];

let indexes = JSON.parse(localStorage.getItem(HASH + '_cssRules_indexes') || '[]');
console.debug(`[${SCRIPT_NAME}]: init indexes:`);
console.debug(indexes);

// Style is a later winner, so send and add
const usableSheet = [...document.styleSheets].slice(-1)[0];

function blur() {
    if (indexes.length > 0) {
        for (const index of indexes) {
            usableSheet.deleteRule(index);
        }
        localStorage.setItem(HASH + '_cssRules_indexes', '[]');
        console.debug(`[${SCRIPT_NAME}]: styles deleted.`);
    } else {
        const index = usableSheet.cssRules.length;
        for (let style of styles) {
            indexes.push(index);
            usableSheet.insertRule(style, index);
        }
        localStorage.setItem(HASH + '_cssRules_indexes', JSON.stringify(indexes));
        console.debug(`[${SCRIPT_NAME}]: styles added.`);
        console.debug(indexes);
    }
}

blur();
