// @license     MIT// ==UserScript==
// @name        Misskey Fediverse Ticker
// @name:ja     Misskey fediverseティッカー
// @description Display the server to which the contributor belongs in an easily viewable manner.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.7.4
// @namespace   https://github.com/hidao80/UserScript/MisskeyFediverseTicker
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f6a9.png
// @run-at      document-idle
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyFediverseTicker/MisskeyFediverseTicker.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyFediverseTicker/MisskeyFediverseTicker.min.user.js
// ==/UserScript==
const CHARACTER="abcdefghijklmnopqrstuvwxyz-_.,/?&%=[]0123456789";const CLASS_NAME="fediverse-ticker";const styles=[`.${CLASS_NAME} span {\n        display: inline-block;\n        color: #FFF;\n        font-weight:600;\n        padding: 0 0.5rem;\n        margin-bottom: 0.25rem;\n        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000;\n    }`];for(let e of styles){document.styleSheets[0].insertRule(e)}function showTicker(e){const t=e.querySelector("a.name")?.getAttribute("href").split("@")[2]??location.hostname;const n=(t.slice(0,3)+t.slice(-3)).split("").map((e=>parseInt(("0"+CHARACTER.indexOf(e)%16).slice(-2)).toString(16))).join("");const o=document.createElement("div");o.className=CLASS_NAME;o.innerHTML=`<span style="background-image: linear-gradient(transparent 20%, #${n} 20%)">${t}</span>`;e.before(o)}function showTickerAll(e){const t=e.querySelectorAll(".main > header");for(const e of t){if(e.parentElement.querySelector(`.${CLASS_NAME}`)===null){showTicker(e)}}}const timer=setInterval((()=>{const e=document.querySelectorAll(".transition");if(e.length>0){clearInterval(timer);for(const t of e){new MutationObserver((()=>showTickerAll(t))).observe(t,{childList:true});showTickerAll(t)}}}),1e3);
