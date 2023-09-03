// ==UserScript==
// @name           Mei v11 attached image smaller
// @description    Make the preview of the attached image smaller.
// @name:ja        めいv11 添付画像縮小
// @description:ja 添付画像のプレビューを小さくします。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.0.0
// @namespace      https://github.com/hidao80/UserScript/MeiV11AttachedImageSmaller
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4cf.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11AttachedImageSmaller/MeiV11AttachedImageSmaller.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11AttachedImageSmaller/MeiV11AttachedImageSmaller.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';

/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'Attached image smaller';
/** Suppress debug printing unless in debug mode */
const console = {};
["log","debug","warn","info","error"].forEach((o=>{console[o]=DEBUG?window.console[o]:function(){}}));
/** The script name is converted to a hexadecimal hash */
const HASH = await (async (t=SCRIPT_NAME) => {const e=(new TextEncoder).encode(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map((t=>t.toString(16).padStart(2,"0"))).join("").slice(0,10)})();
/** Alias for querySelectorAll */
const $ = (e)=>{const n=document.querySelectorAll(e);return 1==n.length?n[0]:n};
console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);


/** main */
const timer = setInterval(v => {
    const targetLane = document.querySelector(".transition.notes") ?? document.querySelector(".transition");

    if (targetLane) {
        clearInterval(timer);

        // Processing to be performed when a change is detected
        function update(mutationList, observer) {
            for (const elem of document.querySelectorAll("div.mk-media-list, div.mk-media-list img, div.mk-media-list canvas, div[data-count]")) {
                elem.style.height = "50px";
                elem.onload = () => elem.style.height = "50px";
                console.debug(elem);
            }
        }

        // Call the read function when a post is added.
        console.debug(`[${SCRIPT_NAME}]: get ready.`);
        (new MutationObserver(update)).observe(targetLane, { childList: true });

        update()
    }
}, 1_500);
