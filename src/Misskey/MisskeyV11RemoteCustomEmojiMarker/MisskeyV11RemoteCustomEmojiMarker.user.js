// ==UserScript==
// @name        MisskeyV11RemoteCustomEmojiMarker
// @description Make remote custom emoji reactions prominent in Misskey v11.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.3
// @namespace   https://github.com/hidao80/UserScript/MisskeyV11RemoteCustomEmojiMarker
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e1.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11RemoteCustomEmojiMarker/MisskeyV11RemoteCustomEmojiMarker.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11RemoteCustomEmojiMarker/MisskeyV11RemoteCustomEmojiMarker.user.js
// ==/UserScript==
//
// collaborators takimura

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';

/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'MisskeyV11RemoteCustomEmojiMarker';
DEBUG && console.debug(`[${SCRIPT_NAME}]: script started.`);
const TRANSPARENT = 'rgba(0,0,0,0)';

/**
 * Make the background color 100% transparent
 */
function callback() {
    setTimeout(() => {
        const elems = document.querySelectorAll('.mk-reactions-viewer > span.reaction > img[title*="@"]:not([title$="@.:"]:not([transparent]))');
        if (elems?.length) {
            for (const elem of elems) {
                const background = elem.parentElement;
                if (background.style.backgroundColor != TRANSPARENT) {
                    background.style.backgroundColor = TRANSPARENT;
                    background.setAttribute('transparent', 'true');
                }
            }
        }
    }, 500);
}

// Monitor whether emoji are drawn or not.
(new MutationObserver(callback)).observe(document.body, { childList: true });
