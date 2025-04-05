// ==UserScript==
// @name           Misskey v11 Send With Ctrl Enter For Mobile Mode
// @name:ja        Ctrl+Enterで送信する（Misskey v11 モバイル版モード用）
// @description    When in mobile view of Misskey ver.11, Ctrl+Enter can be used to post a NOTE.
// @description:ja Misskey ver.11のモバイルビューで、Ctrl+EnterでNOTEを投稿できるようにしました。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.3.1
// @namespace      https://github.com/hidao80/UserScript/MisskeyV11SendWithCtrlEnterForMobileMode
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e8.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11SendWithCtrlEnterForMobileMode/MisskeyV11SendWithCtrlEnterForMobileMode.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11SendWithCtrlEnterForMobileMode/MisskeyV11SendWithCtrlEnterForMobileMode.min.user.js
// ==/UserScript==
(async()=>{const e=false;const o="Misskey v11 Send With Ctrl Enter For Mobile Mode";const t={};["log","debug","warn","info","error"].forEach((o=>{t[o]=e?window.console[o]:function(){}}));const c=Math.abs(Array.from(o).reduce(((e,o)=>(e<<5)-e+o.charCodeAt(0)),0)).toString(16);t.debug(`[${o}]: Script Loading... [HASH = ${c}]`);document.body.addEventListener("keydown",(e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter"){document.querySelector('button[class="submit"]')?.click()}else if(e.key==="Escape"){document.querySelector('button[class="cancel"]')?.click()}}))})();
