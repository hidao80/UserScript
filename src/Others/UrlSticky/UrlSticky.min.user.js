// ==UserScript==
// @name        Url Sticky
// @name:ja     URLふせん
// @description Displays stickies tied to a url in the screen; anything copied on the web can be pasted.
// @match       *://*/*
// @author      hidao80
// @version     1.2.1
// @namespace   https://github.com/hidao80/UserScript/UrlSticky
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4d1.png
// @run-at      context-menu
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Others/UrlSticky/UrlSticky.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Others/UrlSticky/UrlSticky.user.js
// ==/UserScript==
//
// Contoributers magasine
(async()=>{const e=false;const t="Url Sticky";e&&console.debug(`[${t}]: script started.`);const o="sticky_10b58878";const n="url-sticky contents";let i=document.getElementById(o);if(!i){i=document.createElement("div");i.setAttribute("id",o);Object.assign(i.style,{backgroundColor:"lightyellow",transition:"width 0.5s",border:"2px solid black",borderRadius:"15px",boxShadow:"10px 10px 10px gray",color:"black",height:"90vh",width:"20vw",position:"fixed",top:"10px",right:"10px",zIndex:99999,padding:"15px",margin:0,overflow:"auto"});i.contentEditable="true";i.innerHTML=localStorage.getItem(n);document.body.appendChild(i);i.focus();const e=e=>{e.stopImmediatePropagation();e.stopPropagation();localStorage.setItem(n,i.innerHTML);if(e.key=="Escape"){i.remove()}};i.addEventListener("keydown",e);i.addEventListener("paste",e)}else{i.remove()}})();
