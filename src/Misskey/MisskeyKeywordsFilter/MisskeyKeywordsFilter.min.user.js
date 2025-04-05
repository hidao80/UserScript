// @license     MIT// ==UserScript==
// @name        Misskey Keywords Filter
// @name:ja     Misskey キーワードフィルター
// @description Filter out offensive words in Misskey.
// @match       https://misskey.dev/*
// @match       https://misskey.io/*
// @match       https://misskey.noellabo.jp/*
// @match       https://msky.work/*
// @author      hidao80
// @version     1.5.4
// @namespace   https://github.com/hidao80/UserScript/MisskeyKeywordsFilter
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26d4.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyKeywordsFilter/MisskeyKeywordsFilter.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyKeywordsFilter/MisskeyKeywordsFilter.min.user.js
// ==/UserScript==
const FILTERED_WORDS="■■■";const KEYWORDS=["馬鹿","バカ","ﾊﾞｶ","うんこ","ウンコ","ｳﾝｺ","くそ","クソ","ｸｿ","fuck","f*ck","fu*k","f**k","shit","sh*t","s*it","s**t"];function replace(t){for(const e of KEYWORDS){t=t.replaceAll(e,FILTERED_WORDS)}return t}const timer=setInterval((()=>{var t=[...document.querySelectorAll(".header")].find((t=>/ソーシャル/.test(t.textContent)))?.parentElement.parentElement;if(t){clearInterval(timer);function e(){setTimeout((()=>{for(const e of t.querySelectorAll(".text>.havbbuyv,.cw>.havbbuyv")){e.innerHTML=replace(e.innerHTML);e.setAttribute("text",replace(e.getAttribute("text")))}}),100)}const r=t.querySelector(".transition.notes")??t.querySelector(".transition");new MutationObserver(e).observe(r,{childList:true})}}),300);
