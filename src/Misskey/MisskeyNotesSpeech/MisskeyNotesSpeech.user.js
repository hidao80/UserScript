// ==UserScript==
// @name        MisskeyNotesSpeech
// @description UserScript to read out Misskey's social timeline using the Speech API.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.11.1
// @namespace   https://github.com/hidao80/UserScript/MisskeyNotesSpeech
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e3.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyNotesSpeech/MisskeyNotesSpeech.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyNotesSpeech/MisskeyNotesSpeech.user.js
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
    const lang = ((window.navigator.languages && window.navigator.languages[0]) ||
        window.navigator.language ||
        window.navigator.userLanguage ||
        window.navigator.browserLanguage).slice(0, 2);

    if (lang == "ja") {
        target = /ソーシャル/;
        from = "さんのノート。"
    } else if (lang == "en") {
        target = /[Ss]ocial/;
        from = "'s note."
    }
}

// Voice tones are given priority to those found from left to right.
const setVoice = () => {
    utter.voice = getVoice(EDGE) || getVoice(GOOGLE_JAPANIESE) || getVoice(WIN) || getVoice(ENGLISH);
    language();
};

// When a voice color object is loaded, the voice color is set to "Nanami" for Edge.
synth.onvoiceschanged = setVoice;

const timer = setInterval(v => {
    const regexp = new RegExp(target, 'i')
    // Designation of lanes to watch for posts
    var lane = [...document.querySelectorAll(".round")];
    if (lane.length > 1) {
        lane = lane.find(v => regexp.test(v.textContent));
    } else {
        lane = lane[0];
    }

    if (lane) {
        clearInterval(timer);
        setVoice();

        // Trimming the readout
        function speech() {
            // Muted posts are not read out loud.
            if (lane.querySelector('[class=transition]>div').style.display == 'none') {
                return;
            }

            // I'm reading it out now, and I'm going to stop in the middle.
            synth.cancel();

            // Nickname cutout
            utter.text = lane.querySelector(".havbbuyv.nowrap").textContent + from;

            // Notebook cutout (excluding CW)
            utter.text += lane.querySelector(".text>.havbbuyv").getAttribute("text")
                .replace(/\n/g, '。')
                .replace(/。+/g, '。')
                .replace(/\`\`\`.+\`\`\`/g, ' ')
                .replace(/\`/g, '')
                .replace(/https?:\/\/([\w/:#\$&\?\(\)~\.=\+\-]|%[0-9a-fA-F]+)+/g, ' ');

            // Reading out notes
            synth.speak(utter);
        }

        // Call the read function when a post is added.
        const targetLane = lane.querySelector(".transition.notes") ?? lane.querySelector(".transition");
        (new MutationObserver(speech)).observe(targetLane, { childList: true });
    }
}, 500);
