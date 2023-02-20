// ==UserScript==
// @name        MisskeyV11RemoteCustomEmojiMarker
// @description Make remote custom emoji reactions prominent in Misskey v11.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.0
// @namespace   https://github.com/hidao80/UserScript/MisskeyV11RemoteCustomEmojiMarker
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e1.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/MisskeyV11RemoteCustomEmojiMarker/MisskeyV11RemoteCustomEmojiMarker.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/MisskeyV11RemoteCustomEmojiMarker/MisskeyV11RemoteCustomEmojiMarker.user.js
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

const styles = [`
.mk-reactions-viewer > span.reaction > :not(img[title$="@.:"]) {
    opacity: 0.6;
}
`];

// Style is a later winner, so send and add
setTimeout(() => {
    const usableSheet = [...document.styleSheets].slice(-1)[0];

    for (let style of styles) {
        usableSheet.insertRule(style, usableSheet.cssRules.length);
    }
}, 500);
