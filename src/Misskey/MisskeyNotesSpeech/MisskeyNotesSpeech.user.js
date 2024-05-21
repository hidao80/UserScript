// ==UserScript==
// @name           Mei v11 notes speech
// @name:ja        めいv11 note読み上げ
// @description    UserScript to read out Mei v11's social timeline using the Speech API.
// @description:ja Speech APIを使ってめいv11のソーシャルタイムラインを読み上げます。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        2.5.1
// @namespace      https://github.com/hidao80/UserScript/MisskeyNotesSpeech
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e3.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyNotesSpeech/MisskeyNotesSpeech.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyNotesSpeech/MisskeyNotesSpeech.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';
(async () => {
/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = !false;
const SCRIPT_NAME = 'Misskey notes speech';
/** Suppress debug printing unless in debug mode */
const console = {};
["log","debug","warn","info","error"].forEach((o=>{console[o]=DEBUG?window.console[o]:function(){}}));/** The script name is converted to a hexadecimal hash */
/** indolence.js */
const $$new=e=>document.createElement(e);
const $$one=e=>document.querySelector(e);
const $$all=e=>document.querySelectorAll(e);
const HASH = Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0).toString(16);
/** Alias for querySelectorAll */
const $ = (e)=>{const n=document.querySelectorAll(e);return 1==n.length?n[0]:n};
console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);


// Initialization of reading voice
const synth = window.speechSynthesis;
const getVoice = (n) => synth.getVoices().find((v) => v.name.indexOf(n) >= 0);
const utter = new SpeechSynthesisUtterance();
const WIN = "Kyoko";
const EDGE = "Nanami";
const GOOGLE_JAPANIESE = "Google 日本語";
const FIREFOX = "日本語 (日本)";
utter.rate = 1.2;
utter.volume = 0.5;
let target = "Title of Socail Time Line";
let from = "contributor's name";

/**
 * Get current language
 *
 * @returns {string} Current language
 */
function language() {
    const locale = ((window.navigator.languages && window.navigator.languages[0]) ||
        window.navigator.language ||
        window.navigator.userLanguage ||
        window.navigator.browserLanguage);
    const lang = locale.slice(0, 2);

    if (lang == "ja") {
        target = /ソーシャル/;
        from = "さんのノート。"
    } else if (lang == "en") {
        target = /[Ss]ocial/;
        from = "'s note."
    }
    utter.lang = locale;
    return lang;
}

// Voice tones are given priority to those found from left to right.
const setVoice = () => {
    if (language() === "ja") {
        utter.voice = getVoice(EDGE) || getVoice(GOOGLE_JAPANIESE) || getVoice(FIREFOX) || getVoice(WIN) || null;
    }
};

// When a voice color object is loaded, the voice color is set to "Nanami" for Edge.
synth.onvoiceschanged = setVoice;
setVoice();

// Clicking in the screen cancels the reading.
document.body.addEventListener('click', () => synth.cancel());

const timer = setInterval(v => {
    const targetLane = document.querySelector(".transition.notes") ?? document.querySelector(".transition");

    if (targetLane) {
        clearInterval(timer);

        // Trimming the readout
        function speech(mutationList, observer) {
            const firstArticle = $$one("div.note:not([style*='none'])>article");
            console.debug(firstArticle);
            console.debug(mutationList);
            const mutationRecord = Array.from(mutationList ?? []).filter(mutationRecord => !(mutationRecord?.addedNodes[0] instanceof Comment) && mutationRecord?.addedNodes[0]?.style?.display != "none")[0];
            console.debug(mutationRecord);
            let article;
            if (mutationRecord) {
                const note = mutationRecord.addedNodes[0];
                console.debug(note);
                article = note?.querySelector("div.note:not([style*='none'])>article");
                if (article != firstArticle) {
                    return;
                }
            } else {
                if ($$one("div.note").style?.display == "none") {
                    return;
                }
                article = firstArticle;
            }
            console.debug(article);

            // Waiting for DOM rendering
            setTimeout(() => {
                // Cancel speak
                synth.cancel();

                // Nickname cutout
                utter.text = article.querySelector(".havbbuyv.nowrap").textContent + from;

                // CW cutout
                const cw = removeSymbols(article.querySelector(".cw>.havbbuyv.text")?.getAttribute("text"));
                utter.text += (cw ?? "") + "。";

                // Notebook cutout (excluding CW)
                utter.text += removeSymbols(article.querySelector(".text>.havbbuyv").getAttribute("text"));

                // If it is identical to the previous sentence, skip it.
                if (localStorage.getItem("lastSpeeched") === utter.text) return;

                // Reading out notes
                synth.speak(utter);

                localStorage.setItem("lastSpeeched", utter.text);
            }, 1_500);
        }

        // Call the read function when a post is added.
        console.debug(`[${SCRIPT_NAME}]: get ready.`);
        (new MutationObserver(speech)).observe(targetLane, { childList: true });

        speech()
    }
}, 1_500);

/**
 * Remove symbols and codes from the string that are not needed for reading.
 *
 * @param {string} text
 * @returns {string}
 */
function removeSymbols(text) {
    return text && text.replace(/\n/g, '。') // Exclude new lines
    .replace(/。+/g, '。') // Exclude Japanese periods
    .replace(/\`\`\`.+\`\`\`/g, ' ') // Exclude code
    .replace(/\\(.*\\)/g, ' ') // Exclude MathJax(KaTeX)
    .replace(/https?:\/\/([\w\/:#\$&\?\(\)~\.=\+\-,]|\%[0-9a-fA-F]+)+/g, ' ') // Exclude URL
    .replace(/[_'"`$&\^\\@;:,\.\/\|\[\]\(\)\{\}<>]/g, ' ') // Exclude symbols. Only # is an exception.
    .replace(/\*/gu, ' asterisk ') // Include 'asterisk'
    .replace(/=/gu, ' equal ') // Include 'equal'
    .replace(/&/gu, ' and ') // Include 'and'
    .replace(/\s\?/gu, ' question ') // Include 'question'
    .replace(/(?=[^\d#])\p{Emoji}/gu, '') // Exclude emoji
    ;
}
})();
