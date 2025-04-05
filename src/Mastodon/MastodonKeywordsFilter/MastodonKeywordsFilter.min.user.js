// ==UserScript==
// @name        Mastodon Keywords Filter
// @name:ja     Mastodon キーワードフィルター
// @description Filter out offensive words in Misskey.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @match       https://pawoo.net/*
// @match       https://mstdn.sublimer.me/*
// @match       https://social.vivaldi.net/*
// @author      hidao80
// @version     1.2.4
// @namespace   https://github.com/hidao80/UserScript/MastodonKeywordsFilter
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26d4.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Mastodon/MastodonKeywordsFilter/MastodonKeywordsFilter.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Mastodon/MastodonKeywordsFilter/MastodonKeywordsFilter.min.user.js
// ==/UserScript==
const FILTERED_WORDS="■■■";const KEYWORDS=["馬鹿","ばか","バカ","ﾊﾞｶ","うんこ","ウンコ","ｳﾝｺ","くそ","クソ","ｸｿ","fuck","f*ck","fu*k","f**k","shit","sh*t","s*it","s**t"];function replace(t){for(const e of KEYWORDS){t=t.replaceAll(e,FILTERED_WORDS)}return t}function filter(t){for(const e of t){const t=e.querySelector(".status__wrapper");t.setAttribute("aria-label",replace(t.getAttribute("aria-label")));const r=e.querySelector(".status__content__text");r.innerHTML=replace(r.innerHTML)}}function callback(t){for(const e of t){const t=e.addedNodes;if(t){filter(t)}}}const timer=setInterval((()=>{const t=document.querySelectorAll(".item-list");const e=document.querySelectorAll("article");if(t?.length>0&&e?.length>0){clearInterval(timer);for(const e of t){new MutationObserver(callback).observe(e,{childList:true})}filter(e)}}),100);
