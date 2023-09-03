// ==UserScript==
// @name           Misskey Auto Reloader
// @name:ja        Misskey 自動リロード
// @description    Reload once every 10 minutes if there are no posts being typed.
// @description:ja 入力中の投稿がない場合は、10分に1回リロードします。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.5.1
// @namespace      https://github.com/hidao80/UserScript/MisskeyAutoReloader
// @license        MIT
// @icon           https://twemoji.maxcdn.com/v/latest/72x72/1f552.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyAutoReloader/MisskeyAutoReloader.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyAutoReloader/MisskeyAutoReloader.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';
(async () => {
/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'Misskey Auto Reloader';
/** Suppress debug printing unless in debug mode */
const console = {};
["log","debug","warn","info","error"].forEach((o=>{console[o]=DEBUG?window.console[o]:function(){}}));
/** The script name is converted to a hexadecimal hash */
const HASH = await (async (t=SCRIPT_NAME) => {const e=(new TextEncoder).encode(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map((t=>t.toString(16).padStart(2,"0"))).join("").slice(0,10)})();
/** Alias for querySelectorAll */
const $ = (e)=>{const n=document.querySelectorAll(e);return 1==n.length?n[0]:n}
console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);

/** Main */
// Wait until the monitored object has been drawn.
const timer = setInterval(() => {
    // Designation of lanes to watch for posts
    /** @var {array<Element>} columns  */
    const columns = document.querySelectorAll('.active.round:not(.naked)');
    console.debug(columns);

    if (columns != []) {
        // Stop waiting for the monitored timeline to be drawn
        clearInterval(timer);

        // If the post is not in the process of being typed, reload.
        setInterval(() => {
            if (document.activeElement == document.body) {
                location.reload();
            }
        }, 600_000); // 10 mins.
    }
}, 700);
})();
