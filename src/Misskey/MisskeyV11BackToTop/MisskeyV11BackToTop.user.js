// ==UserScript==
// @name        Back to top for Misskey v11
// @name:ja     Misskey v11向け先頭に戻るボタン追加
// @description Summary of this script
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.3.1
// @namespace   https://github.com/hidao80/UserScript/MisskeyV11BackToTop
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2b06.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/MisskeyV11BackToTop/MisskeyV11BackToTop.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/MisskeyV11BackToTop/MisskeyV11BackToTop.min.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS


(async() => {
/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_CLASS = 'us-hidao80-MisskeyV11BackToTop';
const SCRIPT_NAME = 'MisskeyV11BackToTop';
DEBUG && console.debug(`[${SCRIPT_NAME}]: script started.`);

// The deck mode originally has a function to go back to the top of the list, so it does nothing.
if (JSON.parse(localStorage.getItem('vuex')).device.deckMode) {
    return;
}

const TOP_ANCHOR_ID = 'home_timeline_top';

// Create a element a with a link to the top
const button = document.createElement("a");
button.classList.add(SCRIPT_CLASS, 'pagetop');
button.href = "#" + TOP_ANCHOR_ID;

// Create a div element to display the link
const div = document.createElement("div");
div.classList.add(SCRIPT_CLASS, 'pagetop__arrow');

const theme = JSON.parse(localStorage.getItem('theme'));
const styles = [
    `.content.top {
        scroll-behavior: smooth;
        padding-top: 4em;
        margin-top: -4em;
    }`,
    `div.tl {
        scroll-behavior: smooth;
        padding-top: 4em;
        margin-top: -4em;
    }`,
    `.${SCRIPT_CLASS}.pagetop {
        height: 50px;
        width: 50px;
        position: fixed;
        right: 30px;
        bottom: 30px;
        background: ${theme.primary};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1030;
    }`,
    `.${SCRIPT_CLASS}.pagetop__arrow {
        height: 10px;
        width: 10px;
        border-top: 3px solid ${theme.primaryForeground};
        border-right: 3px solid ${theme.primaryForeground};
        transform: translateY(20%) rotate(-45deg);
    }`
];

// Processing starts after the timeline has been drawn.
setTimeout(() => {
    // There is no element with an ID representing the beginning, so add an ID.
    const tareget = document.querySelector('div.tl') ?? document.querySelector('.content.top');
    tareget.id = TOP_ANCHOR_ID;

    // Add the created element to the screen
    button.appendChild(div);
    document.body.appendChild(button);

    // Style is a later winner, so send and add
    const usableSheet = [...document.styleSheets].slice(-1)[0];

    for (let style of styles) {
        usableSheet.insertRule(style, usableSheet.cssRules.length);
    }
}, 1_500);
})();
