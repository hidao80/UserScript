// ==UserScript==
// @name        Misskey v11 Remote Custom Emoji Marker
// @name:ja     Misskey v11用リモートカスタム絵文字マーカー
// @description Make remote custom emoji reactions prominent in Misskey v11.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.4.1
// @namespace   https://github.com/hidao80/UserScript/MisskeyV11RemoteCustomEmojiMarker
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e1.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11RemoteCustomEmojiMarker/MisskeyV11RemoteCustomEmojiMarker.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11RemoteCustomEmojiMarker/MisskeyV11RemoteCustomEmojiMarker.min.user.js
// ==/UserScript==
//
// collaborators takimura
(async()=>{const t=false;const e="MisskeyV11RemoteCustomEmojiMarker";t&&console.debug(`[${e}]: script started.`);const o="rgba(0,0,0,0)";function n(){setTimeout((()=>{const t=document.querySelectorAll('.mk-reactions-viewer > span.reaction > img[title*="@"]:not([title$="@.:"]:not([transparent]))');if(t?.length){for(const e of t){const t=e.parentElement;if(t.style.backgroundColor!=o){t.style.backgroundColor=o;t.setAttribute("transparent","true")}}}}),500)}new MutationObserver(n).observe(document.body,{childList:true})})();
