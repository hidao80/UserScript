// ==UserScript==
// @name        Mastodon Toot Speach
// @name:ja     Mastodon toot読み上げ
// @description UserScript that uses the Speech API to read out new toots in Mastodon's home timeline.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @match       https://pawoo.net/*
// @match       https://mstdn.sublimer.me/*
// @match       https://social.vivaldi.net/*
// @author      hidao80
// @version     1.7.4
// @namespace   https://github.com/hidao80/UserScript/MastodonTootSpeach
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e3.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Mastodon/MastodonTootSpeach/MastodonTootSpeech.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Mastodon/MastodonTootSpeach/MastodonTootSpeech.min.user.js
// ==/UserScript==
const synth=window.speechSynthesis;const WIN="Kyoko";const EDGE="Nanami";const GOOGLE_JAPANIESE="Google 日本語";const ENGLISH="Aria";const getVoice=e=>synth.getVoices().find((t=>t.name.indexOf(e)!=-1));const utter=new SpeechSynthesisUtterance;function setVoice(){utter.voice=getVoice(EDGE)||getVoice(GOOGLE_JAPANIESE)||getVoice(WIN)||getVoice(ENGLISH)}function callback(e){for(const t of e){const e=t.addedNodes;console.log(e);if(e){speech(e[0].querySelector(".status__wrapper"))}}}function speech(e){synth.cancel();const t=e?.getAttribute("aria-label")?.split(", ");const c=t[0]+"さんのトゥート。";const o=t.slice(1,-2).join(", ");utter.text=c;utter.text+=o.replace(/。+/g,"。").replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g," ");synth.speak(utter)}const timer=setInterval((()=>{const e=document.querySelector('[aria-label="ホーム"]');const t=e.querySelector(".status__wrapper");if(e&&t){clearInterval(timer);setVoice();new MutationObserver(callback).observe(e.querySelector(".item-list"),{childList:true});synth.onvoiceschanged=setVoice;speech(t)}}),500);
