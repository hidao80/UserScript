// ==UserScript==
// @name           Misskey v11 Send With Ctrl Enter For Mobile Mode
// @name:ja        Ctrl+Enterで送信する（Misskey v11 モバイル版モード用）
// @description    When in mobile view of Misskey ver.11, Ctrl+Enter can be used to post a NOTE.
// @description:ja Misskey ver.11のモバイルビューで、Ctrl+EnterでNOTEを投稿できるようにしました。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.2.3
// @namespace      https://github.com/hidao80/UserScript/MisskeyV11SendWithCtrlEnterForMobileMode
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e8.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11SendWithCtrlEnterForMobileMode/MisskeyV11SendWithCtrlEnterForMobileMode.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11SendWithCtrlEnterForMobileMode/MisskeyV11SendWithCtrlEnterForMobileMode.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

(() => {
'use strict';
/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'Misskey v11 Send With Ctrl Enter For Mobile Mode';
/** Suppress debug printing unless in debug mode */
const console = {};
["log","debug","warn","info","error"].forEach((o=>{console[o]=DEBUG?window.console[o]:function(){}}));
/** The script name is converted to a hexadecimal hash */
const HASH = Math.abs(Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0)).toString(16);
console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);

/** Main */
document.body.addEventListener("keydown", e => {
    // For macOS, enable sending with Cmd+Enter.
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        document.querySelector('button[class="submit"]')?.click();
    } else if (e.key === "Escape") {
        document.querySelector('button[class="cancel"]')?.click();
    }
});
})();
