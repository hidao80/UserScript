// ==UserScript==
// @name        UrlSticky
// @description Displays stickies tied to a url in the screen; anything copied on the web can be pasted.
// @match       https://*/*
// @match       http://*/*
// @author      hidao80
// @version     1.0
// @namespace   https://github.com/hidao80/UserScript/UrlSticky
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4d1.png
// @run-at      document-end
// @grant       GM_registerMenuCommand
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/UrlSticky/UrlSticky.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/UrlSticky/UrlSticky.user.js
// ==/UserScript==
//
// Contoributers magasine

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

GM_registerMenuCommand("Show/Hidden Switch", function() {
    // First 8 characters of md5 hash of "url-sticky" is "10b58878"
    const ELEMENT_ID = "sticky_10b58878";
    const STORAGE_KEY = "url-sticky contents";
    const STYLE = {
        "background-color": "lightyellow",
        "transition": "width 0.5s",
        "border": "2px solid black",
        "border-radius": "15px",
        "box-shadow": "10px 10px 10px gray",
        "color": "black",
        "height": "90vh",
        "width": "20vw",
        "position": "fixed",
        "top": "10px",
        "right": "10px",
        "z-index": "99999",
        "padding": "15px",
        "margin": "0",
        "overflow": "auto",
    };
    let div = document.getElementById(ELEMENT_ID);

    // Show stickies if they are not displayed
    if (!div) {
        // Creating and styling sticky elements
        div = document.createElement("div");
        div.setAttribute("id", ELEMENT_ID);
        for (const prop in STYLE) {
            div.style[prop] = STYLE[prop];
        }
        div.contentEditable = "true";
        div.innerHTML = localStorage.getItem(STORAGE_KEY);
        document.body.appendChild(div);
        div.focus();

        // Saves in real time as it is entered
        div.addEventListener("keydown", function(e) {
            e.cancelBubble = true;
            localStorage.setItem(STORAGE_KEY, div.innerHTML);

            // If the escape key is pressed, save and then hide the sticky
            if (e.key == "Escape") {
                div.remove();
            }
        });

        div.addEventListener("paste", function(e) {
            e.cancelBubble = true;
            localStorage.setItem(STORAGE_KEY, div.innerHTML);
        });
    } else {
        // Hide stickies when called again while displaying stickies
        div.remove();
    }
}, "0");
