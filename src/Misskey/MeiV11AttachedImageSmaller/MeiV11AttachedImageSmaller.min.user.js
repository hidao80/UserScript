// ==UserScript==
// @name           Mei v11 attached image smaller
// @description    Make the preview of the attached image smaller.
// @name:ja        めいv11 添付画像縮小
// @description:ja 添付画像のプレビューを小さくします。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.1.3
// @namespace      https://github.com/hidao80/UserScript/MeiV11AttachedImageSmaller
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4cf.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11AttachedImageSmaller/MeiV11AttachedImageSmaller.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11AttachedImageSmaller/MeiV11AttachedImageSmaller.min.user.js
// ==/UserScript==
(async()=>{const e=false;const t="Attached image smaller";const o={};["log","debug","warn","info","error"].forEach((t=>{o[t]=e?window.console[t]:function(){}}));const n=Array.from(t).reduce(((e,t)=>(e<<5)-e+t.charCodeAt(0)),0).toString(16);const r=e=>{const t=document.querySelectorAll(e);return 1==t.length?t[0]:t};o.debug(`[${t}]: Script Loading... [HASH = ${n}]`);const c=setInterval((e=>{const n=document.querySelector(".transition.notes")??document.querySelector(".transition");if(n){clearInterval(c);function r(e,t){for(const e of document.querySelectorAll("div.mk-media-list, div.mk-media-list img, div.mk-media-list canvas, div[data-count]")){e.style.height="50px";e.onload=()=>e.style.height="50px";o.debug(e)}}o.debug(`[${t}]: get ready.`);new MutationObserver(r).observe(n,{childList:true});r()}}),1500)})();
