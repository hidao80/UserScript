// ==UserScript==
// @name        Url Sticky
// @name:ja     URLふせん
// @description Displays stickies tied to a url in the screen; anything copied on the web can be pasted.
// @match       *://*/*
// @author      hidao80
// @version     1.1.1
// @namespace   https://github.com/hidao80/UserScript/UrlSticky
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4d1.png
// @run-at      context-menu
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Others/UrlSticky/UrlSticky.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Others/UrlSticky/UrlSticky.user.js
// ==/UserScript==
//
// Contoributers magasine

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';

/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'Url Sticky';
DEBUG && console.debug(`[${SCRIPT_NAME}]: script started.`);

(() => {
    // First 8 characters of md5 hash of "url-sticky" is "10b58878"
    const ELEMENT_ID = "sticky_10b58878";
    const STORAGE_KEY = "url-sticky contents";
    let div = document.getElementById(ELEMENT_ID);

    // Show stickies if they are not displayed
    if (!div) {
        // Creating and styling sticky elements
        div = document.createElement("div");
        div.setAttribute("id", ELEMENT_ID);
        Object.assign(div.style, {
            backgroundColor: "lightyellow",
            transition: "width 0.5s",
            border: "2px solid black",
            borderRadius: "15px",
            boxShadow: "10px 10px 10px gray",
            color: "black",
            height: "90vh",
            width: "20vw",
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 99999,
            padding: "15px",
            margin: 0,
            overflow: "auto",
        });
        div.contentEditable = "true";
        div.innerHTML = localStorage.getItem(STORAGE_KEY);
        document.body.appendChild(div);
        div.focus();

        const update = e => {
            e.stopImmediatePropagation();
            e.stopPropagation();
            localStorage.setItem(STORAGE_KEY, div.innerHTML);

            // If the escape key is pressed, save and then hide the sticky
            if (e.key == "Escape") {
                div.remove();
            }
        };

        // Saves in real time as it is entered
        div.addEventListener("keydown", update);
        div.addEventListener("paste", update);
    } else {
        // Hide stickies when called again while displaying stickies
        div.remove();
    }
})();
