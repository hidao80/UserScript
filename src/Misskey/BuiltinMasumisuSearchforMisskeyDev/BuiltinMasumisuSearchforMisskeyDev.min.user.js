// ==UserScript==
// @name           Builtin Masmis-Search for Misskey.dev
// @description    Search for posts on Misskay.dev using Masmis-search.
// @name:ja        ますみすサーチ内蔵 for Misskey.dev
// @description:ja ますみすサーチでMisskay.devの投稿を検索することができます。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.8.3
// @namespace      https://github.com/hidao80/UserScript/BuiltinMasumisuSearchforMisskeyDev
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f50d.png
// @license        MIT
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.min.user.js
// ==/UserScript==
(async()=>{const e=false;const t="Builtin Masmis-Search for for Misskey.dev";const o={};["log","debug","warn","info","error"].forEach((t=>{o[t]=e?window.console[t]:function(){}}));const a=Array.from(t).reduce(((e,t)=>(e<<5)-e+t.charCodeAt(0)),0).toString(16);o.debug(`[${t}]: Script Loading... [HASH = ${a}]`);function n(e){open(`https://masmis-search.ja-jp.org/search?q=account.domain:${location.host}+${encodeURIComponent(e)}`,"misskey2masumisu")}function s(e){return/^\s*@.*/.test(e)||/^\s*#.*/.test(e)||/^\s*https?:\/\/.*/.test(e)}function r(){const e=JSON.parse(localStorage.getItem("locale")).common?.search;const t=document.querySelector(".modal.modal header")?.textContent;o.debug(`labelSearch: ${e}, dialogTitle: ${t}`);const a=document.querySelector("input[type=search]");const r=document.querySelector("[class=input]>input");const i=a||e==t&&r;if(i){i.addEventListener("change",(e=>{if(!s(i.value)){e.stopImmediatePropagation();e.stopPropagation();n(i.value);document.querySelector("div[class='bg']")?.click()}}),true);i.addEventListener("search",(e=>{if(!s(i.value)){e.stopImmediatePropagation();e.stopPropagation()}}),true);i.addEventListener("keydown",(e=>{if(!s(i.value)){e.stopImmediatePropagation();e.stopPropagation()}}),true);document.querySelector("form")?.addEventListener("submit",(e=>{if(!s(i.value)){e.stopImmediatePropagation();e.stopPropagation()}}),true);i.dataset.isSearchDisabled=true}}setTimeout((()=>{new MutationObserver(r).observe(document.body,{childList:true})}),1500)})();
