// @license     MIT// ==UserScript==
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
(async()=>{const e=false;const t="MisskeyV11CustomEmojiRender";e&&console.debug(`[${t}]: script started.`);const n="CUSTOM_EMOJI_TAG";const o=`https://raw.githubusercontent.com/tkmrgit/misskey-emoji/main/emoji/${n}`;const s=["png","svg","apng"];function c(e){return new Promise((function(t,n){const o=new Image;o.src=e;o.onload=()=>t(e);o.onerror=()=>n(e)}))}function r(){const r=document.querySelector("button > span");const i=r?.parentNode?.getAttribute("title")?.replaceAll(":","");if(!i)return;for(const r of s){const s=o.replace(n,i+"."+r);c(s).then((n=>{e&&console.debug(`[${t}]: ${i}.${r} render!`)})).catch((n=>{e&&console.debug(`[${t}]: ${i}.${r} is not found...`)}))}}new MutationObserver(r).observe(document.body,{childList:true})})();
