// ==UserScript==
// @name        MisskeyV11SendWithCtrlEnterForMobileMode
// @description When in mobile view of Misskey ver.11, Ctrl+Enter can be used to post a NOTE.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.0
// @namespace   https://github.com/hidao80/UserScript
// @licence     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e8.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MisskeyV11SendWithCtrlEnterForMobileMode/MisskeyV11SendWithCtrlEnterForMobileMode.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MisskeyV11SendWithCtrlEnterForMobileMode/MisskeyV11SendWithCtrlEnterForMobileMode.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

function addSendKeyBinding(e) {
    const textarea = document.querySelector('textarea[data-v-4e7c0a76=""]');
    if (textarea && !textarea.hasEventLisnerSendWithCtrlEnter) {
        textarea.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "Enter") {
                document.querySelector('button[class="submit"]').click();
            }
        });
        // Flag to confirm duplicate registration
        textarea.hasEventLisnerSendWithCtrlEnter = true;
    }
}

// the button in the screen is operated more than once.
new MutationObserver(addSendKeyBinding).observe(document.body, {
    childList: true,
});
