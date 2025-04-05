// ==UserScript==
// @name        Mastodon Fediverse Ticker
// @name:ja     Mastodon fediverse ティッカー
// @description Display the server to which the contributor belongs in an easily viewable manner.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @match       https://pawoo.net/*
// @match       https://mstdn.sublimer.me/*
// @match       https://social.vivaldi.net/*
// @author      hidao80
// @version     1.0.4
// @namespace   https://github.com/hidao80/UserScript/MastodonFediverseTicker
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f6a9.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Mastodon/MastodonFediverseTicker/MastodonFediverseTicker.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Mastodon/MastodonFediverseTicker/MastodonFediverseTicker.min.user.js
// ==/UserScript==
const usableSheet=[...document.styleSheets].slice(-1)[0];let completedDomainList=[];const timer=setInterval((()=>{const e=document.querySelectorAll(".column");const t=document.querySelectorAll(".status");if(t.length>0){clearInterval(timer);for(const t of e){new MutationObserver(callback).observe(t,{childList:true})}for(const e of t){updateTicker(e)}}}),1e3);function callback(e){for(const t of e){updateTicker(t.target)}}function updateTicker(e){const t=new URL(e.querySelector(".status__display-name").href);const n=t.host;if(completedDomainList.find((e=>e==n))==undefined){const e=getBackgroundColor(n);const t=getTickerCss(n,e);console.log(n,e);usableSheet.insertRule(t,usableSheet.cssRules.length);completedDomainList.push(n);console.log({completedDomainList:completedDomainList})}}function getBackgroundColor(e){const t="abcdefghijklmnopqrstuvwxyz-_.,/?&%=[]0123456789";return(e.slice(0,3)+e.slice(-3)).split("").map((e=>{let n=t.indexOf(e)%16;return n.toString(16)})).join("")}function getTickerCss(e,t){return`a[class="status__display-name"][href*="${e}"]::before {\n        content: "${e}";\n        display: inline-block;\n        color: #FFF;\n        font-weight: 600;\n        padding: 0 0.5rem;\n        margin-bottom: 0.25rem;\n        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000;\n        background-image: linear-gradient(transparent 20%, #${t} 20%);\n    }`}
