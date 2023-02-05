// ==UserScript==
// @name        MisskeyV11ReactionPickerExpandWidth
// @description Widen the width of the reaction picker in Misskey v11.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.1
// @namespace   https://github.com/hidao80/UserScript
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f44d.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MisskeyV11ReactionPickerExpandWidth/MisskeyV11ReactionPickerExpandWidth.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MisskeyV11ReactionPickerExpandWidth/MisskeyV11ReactionPickerExpandWidth.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS
function expandWidth() {
    const popover = document.querySelector('div[class*="popover isMobile"][data-v-0f5c3934=""]');
    if (popover) {
        popover.style.position = "fixed";
        popover.style.top = "auto";
        popover.style.bottom = "0";
        popover.style.left = "0";
        popover.style.transition = "0s";
        popover.querySelector('div[class="buttons"]').style.width = "100%";
        popover.querySelector('div[class="text"]').style.width = "100%";
        popover.querySelector('div[class="text"]').querySelector('input').style.width = "100%";
    }
}

// Watch for the submit text area to be drawn.
new MutationObserver(expandWidth).observe(document.body, {
    childList: true,
});
