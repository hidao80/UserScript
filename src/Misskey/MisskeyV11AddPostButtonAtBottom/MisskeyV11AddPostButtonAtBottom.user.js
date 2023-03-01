// ==UserScript==
// @name        Add a new post button for Misskey v11
// @description In Misskey v11, add a new post button to the lower left corner of the screen only when in the home layout.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.0
// @namespace   https://github.com/hidao80/UserScript/MisskeyV11AddPostButtonAtBottom
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/270f.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11AddPostButtonAtBottom/MisskeyV11AddPostButtonAtBottom.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11AddPostButtonAtBottom/MisskeyV11AddPostButtonAtBottom.user.js
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
const SCRIPT_CLASS = 'us-hidao80-MisskeyV11AddPostButtonAtBottom';
const SCRIPT_NAME = 'MisskeyV11AddPostButtonAtBottom';
DEBUG && console.debug(`[${SCRIPT_NAME}]: script started.`);

// Deck mode does nothing, as it originally has a new submission function.
if (JSON.parse(localStorage.getItem('vuex')).device.deckMode) {
    return;
}

// Create an element to be a new post button.
const button = document.createElement("button");
button.classList.add(SCRIPT_CLASS);
Object.assign(button.style, {
    height: "50px",
    width: "50px",
    position: "fixed",
    left: "30px",
    bottom: "30px",
    color: JSON.parse(localStorage.getItem('theme')).primaryForeground,
    background: JSON.parse(localStorage.getItem('theme')).primary,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1030,
});

// Same svg as the submit button
button.innerHTML = `<svg data-v-7ba7654b="" data-v-0d3234f7="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-pencil-alt fa-w-16"><path data-v-7ba7654b="" data-v-0d3234f7="" fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z" class=""></path></svg>`;

// Call submit button click when clicked.
button.onclick = () => {
    document.querySelector('.content > button:not(.nav)').click();
};

// Processing starts after the timeline has been drawn.
setTimeout(() => {
    // Add the created element to the screen.
    // Wait a moment, as calling it immediately will overwrite the drawing on the screen.
    document.body.appendChild(button);
}, 1_000);
