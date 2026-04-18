// ==UserScript==
// @name           Mei v11 notes speech
// @name:ja        めいv11 note読み上げ
// @description    UserScript to read out Mei v11's social timeline using the Speech API.
// @description:ja Speech APIを使ってめいv11のソーシャルタイムラインを読み上げます。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        2.8.1
// @namespace      https://github.com/hidao80/UserScript/MisskeyNotesSpeech
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e3.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyNotesSpeech/MisskeyNotesSpeech.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyNotesSpeech/MisskeyNotesSpeech.min.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS
(async()=>{const e="Misskey notes speech",t={};["log","debug","warn","info","error"].forEach(e=>{t[e]=function(){}});const n=e=>document.querySelector(e),o=Array.from(e).reduce((e,t)=>(e<<5)-e+t.charCodeAt(0),0).toString(16);t.debug(`[${e}]: Script Loading... [HASH = ${o}]`);const a=window.speechSynthesis,r=e=>a.getVoices().find(t=>t.name.indexOf(e)>=0),c=new SpeechSynthesisUtterance;c.rate=1.2,c.volume=.5;let i="Title of Social Time Line",s="contributor's name";const l=()=>{"ja"===function(){const e=window.navigator.languages&&window.navigator.languages[0]||window.navigator.language||window.navigator.userLanguage||window.navigator.browserLanguage,t=e.slice(0,2);return"ja"==t?(i=/ソーシャル/,s="さんのノート。"):"en"==t&&(i=/[Ss]ocial/,s="'s note."),c.lang=e,t}()&&(c.voice=r("七海")||r("Nanami")||r("Google 日本語")||r("日本語 (日本)")||r("Kyoko")||null)};a.onvoiceschanged=l,l(),document.body.addEventListener("click",()=>a.cancel());const u=setInterval(o=>{const r=document.querySelector(".transition.notes")??document.querySelector(".transition");if(r){function i(e,o){const r=n("div.note:not([style*='none'])>article");t.debug(r),t.debug(e);const i=Array.from(e??[]).filter(e=>!(e?.addedNodes[0]instanceof Comment)&&"none"!=e?.addedNodes[0]?.style?.display)[0];let l;if(t.debug(i),i){const e=i.addedNodes[0];if(t.debug(e),l=e?.querySelector("div.note:not([style*='none'])>article"),l!=r)return}else{if("none"==n("div.note").style?.display)return;l=r}t.debug(l),setTimeout(()=>{a.cancel(),c.text=l.querySelector(".havbbuyv.nowrap").textContent+s;const e=d(l.querySelector(".cw>.havbbuyv.text")?.getAttribute("text"));c.text+=(e??"")+"。",c.text+=d(l.querySelector(".text>.havbbuyv").getAttribute("text")),localStorage.getItem("lastSpeeched")!==c.text&&(a.speak(c),localStorage.setItem("lastSpeeched",c.text))},1500)}clearInterval(u),t.debug(`[${e}]: get ready.`),new MutationObserver(i).observe(r,{childList:!0}),i()}},1500);function d(e){return e&&e.replace(/\n/g,"。").replace(/。+/g,"。").replace(/\`\`\`.+\`\`\`/g," ").replace(/\\(.*\\)/g," ").replace(/https?:\/\/([\w\/:#\$&\?\(\)~\.=\+\-,]|\%[0-9a-fA-F]+)+/g," ").replace(/[_'"`$&\^\\@;:,\.\/\|\[\]\(\)\{\}<>]/g," ").replace(/\*/gu," asterisk ").replace(/=/gu," equal ").replace(/&/gu," and ").replace(/\s\?/gu," question ").replace(/(?=[^\d#])\p{Emoji}/gu,"")}})();
