// ==UserScript==
// @name        MisskeyNotesSpeech
// @description UserScript to read out Misskey's social timeline using the Speech API.
// @match       https://misskey.dev/*
// @match       https://misskey.io/*
// @match       https://misskey.noellabo.jp/*
// @author      hidao80
// @version     1.6
// @namespace   https://github.com/hidao80/UserScript
// @licence     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e3.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MisskeyNotesSpeech/MisskeyNotesSpeech.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MisskeyNotesSpeech/MisskeyNotesSpeech.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

// Initialization of reading voice
const synth = window.speechSynthesis;
const WIN = "Kyoko";
const EDGE = "Nanami";
const GOOGLE_JAPANIESE = "Google 日本語";
const ENGLISH = "Aria";
const getVoice = (n) => synth.getVoices().find((v) => v.name.indexOf(n) >= 0);
const utter = new SpeechSynthesisUtterance();
// utterrate = 1;
// uttervolume = 20;
let target = "Title of Socail Time Line";

/**
 * Get current language
 *
 * @returns {string} Current language
 */
function language() {
    const lang = ((window.navigator.languages && window.navigator.languages[0]) ||
        window.navigator.language ||
        window.navigator.userLanguage ||
        window.navigator.browserLanguage).slice(0, 2);

    if (lang == "ja") {
        return /ソーシャル/;
    } else if (lang == "en") {
        return /[Ss]ocial/;
    }
}

// Voice tones are given priority to those found from left to right.
const setVoice = () => {
    utter.voice = getVoice(EDGE) || getVoice(GOOGLE_JAPANIESE) || getVoice(WIN) || getVoice(ENGLISH);
    target = language();
};

// When a voice color object is loaded, the voice color is set to "Nanami" for Edge.
synth.onvoiceschanged = setVoice;

const timer = setInterval(v => {
    regexp = new RegExp(target, 'i')
    // Designation of lanes to watch for posts
    var parentElment = [...document.querySelectorAll(".header")].find(
        v => regexp.test(v.textContent)
    )?.parentElement.parentElement;

    if (parentElment) {
        clearInterval(timer);
        setVoice();

        // Trimming the readout
        function speech() {
            // I'm reading it out now, and I'm going to stop in the middle.
            synth.cancel();

            // Nickname cutout
            utter.text = parentElment.querySelector(".havbbuyv.nowrap").textContent + "さんのノート。";

            // Notebook cutout (excluding CW)
            utter.text += parentElment.querySelector(".text>.havbbuyv").getAttribute("text")
                .replace(/\n/g, '。')
                .replace(/。+/g, '。')
                .replace(/\`\`\`.+\`\`\`/g, ' ')
                .replace(/\`/g, '')
                .replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g, ' ');

            // Reading out notes
            synth.speak(utter);
        }

        // Call the read function when a post is added.
        const targetLane = parentElment.querySelector(".transition.notes") ?? parentElment.querySelector(".transition");
        (new MutationObserver(speech)).observe(targetLane, { childList: true });
    }
}, 500);
