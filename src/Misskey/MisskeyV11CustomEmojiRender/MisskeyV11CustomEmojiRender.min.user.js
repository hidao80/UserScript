// ==UserScript==
// @name        Misskey v11 Custom Emoji Render
// @name:ja     カスタム絵文字の読み込み直し（Misskey.dev専用）
// @description Retry to load custom emoji that could not be loaded, for Misskey.dev only.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.1.2
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
(async()=>{const t=false;const e="MisskeyV11CustomEmojiRender";t&&console.debug(`[${e}]: script started.`);const n="CUSTOM_EMOJI_TAG";const o=`https://raw.githubusercontent.com/tkmrgit/misskey-emoji/main/emoji/${n}`;const s=["png","svg","apng"];const c={};const r=async t=>{if(c[t])return c[t];try{const e=await fetch(t,{method:"HEAD"});c[t]=e.ok?t:"";return c[t]}catch{c[t]="";return c[t]}};function i(){const c=document.querySelector("button > span");const i=c?.parentNode?.getAttribute("title")?.replaceAll(":","");if(!i)return;(async()=>{for(const c of s){const s=o.replace(n,i+"."+c);if(await r(s)){t&&console.debug(`[${e}]: ${i}.${c} render!`);break}else{t&&console.debug(`[${e}]: ${i}.${c} is not found...`)}}})()}new MutationObserver(i).observe(document.body,{childList:true})})();
