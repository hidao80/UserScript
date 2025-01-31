// ==UserScript==
// @name           Mei v11 reload button
// @name:ja        めいv11リロードボタン
// @description    Displays a button to force reload the Mei v11 screen.
// @description:ja めいv11の画面内で強制的にリロードさせるボタンを表示します。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.0.1
// @namespace      https://github.com/hidao80/UserScript/MeiV11ReloadButton
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f504.png
// @license        MIT
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11ReloadButton/MeiV11ReloadButton.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11ReloadButton/MeiV11ReloadButton.user.js
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
    const SCRIPT_NAME = 'Mei v11 reload button';
    /** Suppress debug printing unless in debug mode */
    const console = {};
    ["log","debug","warn","info","error"].forEach((o=>{console[o]=DEBUG?window.console[o]:function(){}}));
    /** The script name is converted to a hexadecimal hash */
    const HASH = Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0).toString(16);
    /** Alias for querySelectorAll */
    const $ = (e)=>{const n=document.querySelectorAll(e);return 1==n.length?n[0]:n}
    console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);

    /** Main */
    // Create an element to be a new post button.
    const button = document.createElement("button");
    button.classList.add("us-hidao80-" + HASH);
    Object.assign(button.style, {
        height: "50px",
        width: "50px",
        position: "fixed",
        right: "30px",
        bottom: "100px",
        color: JSON.parse(localStorage.getItem('theme')).primaryForeground,
        background: JSON.parse(localStorage.getItem('theme')).primary,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1030,
    });

    // Draw the button design
    button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw">
        <path d="M21 2v6h-6"></path>
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
        <path d="M3 22v-6h6"></path>
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
    </svg>`;

    // Process when the button is clicked
    button.addEventListener("click", () => {
        location.reload();
    });

    // Processing starts after the timeline has been drawn.
    setTimeout(() => {
        // Add the created element to the screen.
        // Wait a moment, as calling it immediately will overwrite the drawing on the screen.
        document.body.appendChild(button);
    }, 1_500);
})();
