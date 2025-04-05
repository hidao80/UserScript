// ==UserScript==
// @name           Misskey Auto Reloader
// @name:ja        Misskey 自動リロード
// @description    Reload once every 10 minutes if there are no posts being typed.
// @description:ja 入力中の投稿がない場合は、10分に1回リロードします。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.6.3
// @namespace      https://github.com/hidao80/UserScript/MisskeyAutoReloader
// @license        MIT
// @icon           https://twemoji.maxcdn.com/v/latest/72x72/1f552.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyAutoReloader/MisskeyAutoReloader.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyAutoReloader/MisskeyAutoReloader.min.user.js
// ==/UserScript==
(async()=>{const e=false;const o="Misskey Auto Reloader";const t={};["log","debug","warn","info","error"].forEach((o=>{t[o]=e?window.console[o]:function(){}}));const n=Array.from(o).reduce(((e,o)=>(e<<5)-e+o.charCodeAt(0)),0).toString(16);const c=e=>{const o=document.querySelectorAll(e);return 1==o.length?o[0]:o};t.debug(`[${o}]: Script Loading... [HASH = ${n}]`);const r=setInterval((()=>{const e=document.querySelectorAll(".active.round:not(.naked)");t.debug(e);if(e!=[]){clearInterval(r);setInterval((()=>{if(document.activeElement==document.body){location.reload()}}),6e5)}}),700)})();
