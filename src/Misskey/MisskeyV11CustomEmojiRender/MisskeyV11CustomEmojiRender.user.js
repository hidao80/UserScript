// ==UserScript==
// @name        Misskey v11 Custom Emoji Render
// @name:ja     カスタム絵文字の読み込み直し（Misskey.dev専用）
// @description Retry to load custom emoji that could not be loaded, for Misskey.dev only.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.1.1
// @namespace   https://github.com/hidao80/UserScript/MisskeyV11CustomEmojiRender
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60a.png
// @license     MIT
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11CustomEmojiRender/MisskeyV11CustomEmojiRender.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11CustomEmojiRender/MisskeyV11CustomEmojiRender.min.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

(async() => {
/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'MisskeyV11CustomEmojiRender';
DEBUG && console.debug(`[${SCRIPT_NAME}]: script started.`);

const PLACEHOLDER = 'CUSTOM_EMOJI_TAG';
const SOURCE_URL = `https://raw.githubusercontent.com/tkmrgit/misskey-emoji/main/emoji/${PLACEHOLDER}`
const SUPPORTED_EXTENSIONS = ['png', 'svg', 'apng'];

/**
 * Check if the destination of the url is an image
 *
 * @param   {string} url Target url.
 * @returns {Promise}
 */
function isImage(url){
    return new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
    });
};

/**
 * Prompts for loading when custom pictograms are not drawn
 */
function callbackLoadImages() {
    const elem = document.querySelector('button > span');
    const customEmojiTagName = elem?.parentNode?.getAttribute('title')?.replaceAll(':', '');

    if (!customEmojiTagName) return;

    for (const extension of SUPPORTED_EXTENSIONS) {
        const url = SOURCE_URL.replace(PLACEHOLDER, customEmojiTagName + '.' + extension);

        isImage(url)
            .then(url => {
                DEBUG && console.debug(`[${SCRIPT_NAME}]: ${customEmojiTagName}.${extension} render!`);
            })
            .catch(url => {
                DEBUG && console.debug(`[${SCRIPT_NAME}]: ${customEmojiTagName}.${extension} is not found...`);
            });
    }
}

// Monitor whether emoji are drawn or not.
(new MutationObserver(callbackLoadImages)).observe(document.body, { childList: true });
})();
