// @license        MIT// ==UserScript==
// @name           Mei v11 reload button
// @name:ja        めいv11リロードボタン
// @description    Displays a button to force reload the Mei v11 screen.
// @description:ja めいv11の画面内で強制的にリロードさせるボタンを表示します。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.0.2
// @namespace      https://github.com/hidao80/UserScript/MeiV11ReloadButton
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f504.png
// @license        MIT
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11ReloadButton/MeiV11ReloadButton.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11ReloadButton/MeiV11ReloadButton.min.user.js
// ==/UserScript==
(async()=>{const e=false;const t="Mei v11 reload button";const o={};["log","debug","warn","info","error"].forEach((t=>{o[t]=e?window.console[t]:function(){}}));const n=Array.from(t).reduce(((e,t)=>(e<<5)-e+t.charCodeAt(0)),0).toString(16);const r=e=>{const t=document.querySelectorAll(e);return 1==t.length?t[0]:t};o.debug(`[${t}]: Script Loading... [HASH = ${n}]`);const a=document.createElement("button");a.classList.add("us-hidao80-"+n);Object.assign(a.style,{height:"50px",width:"50px",position:"fixed",right:"30px",bottom:"100px",color:JSON.parse(localStorage.getItem("theme")).primaryForeground,background:JSON.parse(localStorage.getItem("theme")).primary,borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1030});a.innerHTML=`\n    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw">\n        <path d="M21 2v6h-6"></path>\n        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>\n        <path d="M3 22v-6h6"></path>\n        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>\n    </svg>`;a.addEventListener("click",(()=>{location.reload()}));setTimeout((()=>{document.body.appendChild(a)}),1500)})();
