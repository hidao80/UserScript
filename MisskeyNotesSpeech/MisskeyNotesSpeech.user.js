/*
 *  Licence: MIT
 *
 *  Copyright 2022 hidao80
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// ==UserScript==
// @name        MisskeyNotesSpeech
// @description Bookmarklet to read out Misskey's social timeline using the Speech API.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.2
// @grant       none
// @run-at      document-idle
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MisskeyNotesSpeech/MisskeyNotesSpeech.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MisskeyNotesSpeech/MisskeyNotesSpeech.user.js
// ==/UserScript==

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

// Voice tones are given priority to those found from left to right.
const setVoice = () => {
    utter.voice = getVoice(EDGE) || getVoice(GOOGLE_JAPANIESE) || getVoice(WIN) || getVoice(ENGLISH);
};

// When a voice color object is loaded, the voice color is set to "Nanami" for Edge.
synth.onvoiceschanged = setVoice;

const timer = setInterval(v => {
    // Designation of lanes to watch for posts
    var parentElment = [...document.querySelectorAll(".header")].find(
        v => /ソーシャル/.test(v.textContent)
    ).parentElement.parentElement;

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
            utter.text += parentElment.querySelector(".text").firstElementChild.getAttribute("text")
                .replace(/\n/g, '。')
                .replace(/。+/g, '。')
                .replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g, ' ');

            // Reading out notes
            synth.speak(utter);
        }

        // Call the read function when a post is added.
        const targetLane = parentElment.querySelector(".transition.notes") ?? parentElment.querySelector(".transition");
        (new MutationObserver(speech)).observe(targetLane, { childList: true });
    }
}, 500);
