// ==UserScript==
// @name           Mei v11 Reaction Picker Expand Width
// @description    Widen the width of the reaction picker in Mei v11.
// @name:ja        リアクションパレットを画面下部に表示させる（めいv11 モバイル版モード用）
// @description:ja めいv11のリアクションピッカーの幅を画面いっぱいに広くします。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.6.4
// @namespace      https://github.com/hidao80/UserScript/MisskeyV11ReactionPickerExpandWidth
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f44d.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11ReactionPickerExpandWidth/MisskeyV11ReactionPickerExpandWidth.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11ReactionPickerExpandWidth/MisskeyV11ReactionPickerExpandWidth.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

(async () => {
    /** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'Misskey v11 Reaction Picker Expand Width';
/** Suppress debug printing unless in debug mode */
const console = {};
["log","debug","warn","info","error"].forEach(o=>{console[o]=DEBUG?window.console[o]:function(){}});
/** The script name is converted to a hexadecimal hash */
const HASH = Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0).toString(16);
console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);

/** Main */
const styles = [
    `div.popover.isMobile {
        position: fixed !important;
        top: auto !important;
        bottom: 0;
        left: 0 !important;
        transition: 0s;
        animation: none;
        transform: none !important;
        width: 100%;
    }`,
    `div.buttons {
        width: 100% !important;
        padding: 0;
    }`,
    // Widen the text box as much as possible.
    `div.popover.isMobile>.buttons>.text>input {
        flex: 1;
    }`,
    `div.popover.isMobile,
    div.popover.isMobile>.text,
    div.buttons div {
        width: 100% !important;
    }`,
];

// Wait for content to complete loading.
setTimeout(() => {
    const usableSheet = [...document.styleSheets].slice(-1)[0];

    for (let style of styles) {
        usableSheet.insertRule(style, usableSheet.cssRules.length);
    }
}, 500);
})();
