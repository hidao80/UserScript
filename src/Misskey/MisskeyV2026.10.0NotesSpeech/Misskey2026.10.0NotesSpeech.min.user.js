// ==UserScript==
// @name           Misskey 2026.10.0 notes speech
// @name:ja        Misskey 2026.10.0 note読み上げ
// @description    UserScript to read out Misskey 2026.10.0's social timeline using the Speech API.
// @description:ja Speech APIを使ってMisskey 2026.10.0のソーシャルタイムラインを読み上げます。
// @match          https://misskey.*/*
// @match          https://freakmix.com/*
// @author         hidao80
// @version        1.0.0
// @namespace      https://github.com/hidao80/UserScript/Misskey2026.10.0NotesSpeech
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e3.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/Misskey2026.10.0NotesSpeech/Misskey2026.10.0NotesSpeech.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/Misskey2026.10.0NotesSpeech/Misskey2026.10.0NotesSpeech.min.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS
(async()=>{const e="Misskey notes speech",t={};["log","debug","warn","info","error"].forEach(e=>{t[e]=()=>{}});const n=e=>document.querySelector(e),a=Array.from(e).reduce((e,t)=>(e<<5)-e+t.charCodeAt(0),0).toString(16);t.debug(`[${e}]: Script Loading... [HASH = ${a}]`);const o=window.speechSynthesis,r=e=>o.getVoices().find(t=>t.name.indexOf(e)>=0),c=new SpeechSynthesisUtterance;c.rate=1.2,c.volume=.5;let s="contributor's name";const i="div[tabindex='0']:not([style*='none'])>article",l=":scope>div>div[style*='container-type']";const d=()=>{"ja"===function(){const e=window.navigator.languages?.[0]||window.navigator.language||window.navigator.userLanguage||window.navigator.browserLanguage,t=e.slice(0,2);return"ja"===t?s="さんのノート。":"en"===t&&(s="'s note."),c.lang=e,t}()&&(c.voice=r("七海")||r("Nanami")||r("Google 日本語")||r("日本語 (日本)")||r("Kyoko")||null)};o.onvoiceschanged=d,d(),document.body.addEventListener("click",()=>o.cancel());const g=setInterval(()=>{const a=n(i)?.closest("[data-scroll-anchor]")?.parentElement;if(a){function r(e){const a=n(i);t.debug(a),t.debug(e);const r=Array.from(e??[]).filter(e=>!(e?.addedNodes[0]instanceof Comment)&&"none"!==e?.addedNodes[0]?.style?.display)[0];let d;if(t.debug(r),r){const e=r.addedNodes[0];if(t.debug(e),d=e?.querySelector?.(i),d!==a)return}else{if("none"===n("div[tabindex='0']:has(>article)")?.style?.display)return;d=a}d&&(t.debug(d),setTimeout(()=>{o.cancel(),c.text=d.querySelector(":scope>div>header>a").textContent+s;const e=u(d.querySelector(`${l}>p>span`)?.textContent);c.text+=`${e??""}。`,c.text+=u(d.querySelector(`${l}>div>div>span[style*='white-space']`)?.textContent)??"",localStorage.getItem("lastSpeeched")!==c.text&&(o.speak(c),localStorage.setItem("lastSpeeched",c.text))},1500))}clearInterval(g),t.debug(`[${e}]: get ready.`),new MutationObserver(r).observe(a,{childList:!0}),r()}},1500);function u(e){return e?.replace(/\n/g,"。").replace(/。+/g,"。").replace(/```.+```/g," ").replace(/\\(.*\\)/g," ").replace(/https?:\/\/([\w/:#$&?()~.=+\-,]|%[0-9a-fA-F]+)+/g," ").replace(/[_'"`$&^\\@;:,./|[\](){}<>]/g," ").replace(/\*/gu," asterisk ").replace(/=/gu," equal ").replace(/&/gu," and ").replace(/\s\?/gu," question ").replace(/(?=[^\d#])\p{Emoji}/gu,"")}})();
