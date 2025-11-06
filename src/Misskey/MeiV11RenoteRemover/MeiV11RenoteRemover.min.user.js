// ==UserScript==
// @name        Mei v11 Renote Remove Button
// @name:ja     めいv11向けリノート削除ボタン
// @description Adds a button to remove renotes in Mei v11.
// @description:ja めいv11のリノートを削除するボタンを追加します。
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.0.1
// @namespace   https://github.com/hidao80/UserScript/MeiV11RenoteRemover
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f5d1.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/MeiV11RenoteRemover/MeiV11RenoteRemover.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/MeiV11RenoteRemover/MeiV11RenoteRemover.min.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS
(async()=>{const e="MeiV11RenoteRemover",t="us-hidao80-"+e,n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 1em; height: 1em; opacity: 1;">\n    <g>\n        <path fill="${JSON.parse(localStorage.getItem("theme")).noteText}" d="M3 6h18v2H3V6zm2 3h14l-1.5 13h-11L5 9zm3 2v8h2v-8H8zm4 0v8h2v-8h-2zM9 4V2h6v2h5v2H4V4h5z"/>\n    </g>\n</svg>`;let o=document.querySelector(".transition.notes")??document.querySelector(".transition")??document.body;const r=new MutationObserver(function(e){for(const t of e)if("childList"===t.type){const e=document.querySelectorAll(".note.renote");e.length>0&&s(e)}o=document.querySelector(".transition.notes")??document.querySelector(".transition")??document.body,r.observe(o,{childList:!0})});function s(e){if(0!=e.length)for(const o of e){if(o.querySelector(`.${t}`))continue;const e=document.createElement("button");e.className=`${t}`,e.innerHTML=n,e.title="リノートを削除",e.style.cssText="background: transparent; border: none; cursor: pointer; padding: 0;";const r=o.querySelector("article header .info a.created-at")?.href.match(/\/notes\/([a-zA-Z0-9]+)/)?.[1],s=JSON.parse(localStorage.getItem("vuex")).i.token;e.addEventListener("click",()=>{fetch(`https://${location.host}/api/notes/unrenote`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({i:s,noteId:r}),credentials:"omit"}).then(e=>{e.ok&&o.remove()})}),o.appendChild(e);const i=o.querySelector(".renote");i&&(i.style.display="flex",i.style.justifyContent="space-between",i.style.alignItems="center",i.appendChild(e))}}r.observe(o,{childList:!0})})();
