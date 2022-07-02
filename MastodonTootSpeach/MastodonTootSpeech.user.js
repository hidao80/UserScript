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
// @name        MastodonTootSpeach
// @description This is a script to read out the timeline of a mastodon home using the Speech API.
// @match       https://fedibird.com/*/*
// @author      hidao80
// @version     1.2
// @grant       none
// @run-at      document-idle
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MastodonTootSpeach.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MastodonTootSpeach.user.js
// ==/UserScript==

// Initialization of reading voice
const synth = window.speechSynthesis;
const WIN = "Kyoko";
const EDGE = "Nanami";
const GOOGLE_JAPANIESE = "Google 日本語";
const ENGLISH = "Aria";
const getVoice = (n) => synth.getVoices().find((v) => v.name.indexOf(n) != -1);
const utter = new SpeechSynthesisUtterance();
// utterrate = 1;
// uttervolume = 20;

// Voice tones are given priority to those found from left to right.
const setVoice = () => {
    utter.voice = getVoice(EDGE) || getVoice(GOOGLE_JAPANIESE) || getVoice(WIN) || getVoice(ENGLISH);
};

const timer = setInterval(v => {
// Designation of lanes to watch for posts
    var parentElment = document.querySelector('[aria-label="ホーム"]');
    if (parentElment) {
        clearInterval(timer);

        setVoice();

        // If there is a change in the lane,
        // check if it is the first and read it out if the first has changed
        const topTootId = () => {
            return parentElment.querySelector(".status").dataset.id;
        };
        let oldTootId = topTootId();
        // console.log(oldTootId);
        var mo = new MutationObserver(() => {
            var newTootId = topTootId();
            // console.log(newTootId);
            if (newTootId != oldTootId) {
                oldTootId = newTootId;
                speech();
            }
        });
        mo.observe(parentElment.querySelector(".item-list"), { childList: true });

        // Trimming the readout
        function speech() {
            // Cancel reading
            synth.cancel();

            // Get toot
            const elem = parentElment.querySelector(".status__wrapper");

            // Trimming date and user ID
            const name = elem.querySelector(".display-name__html").textContent + "さんのトゥート。";
            const toot = elem.getAttribute('aria-label').split(', ');

            // Retrieve any comma in the message, even if there is a comma in the message.
            let message = '';
            for (let i = 0; i < toot.length; i++) {
                if (i != 0 && i != (toot.length - 1) && i != (toot.length - 2)) {
                    message += toot[i];
                }
            }

            utter.text = name;
            utter.text += message
                .replace(/。+/g, "。") // Combine multiple consecutive readings into one.
                .replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g, " ") // Remove URL
            ;

            // Toot reads.
            synth.speak(utter);
        }

        // When a voice color object is loaded,
        // the voice color is set to "Nanami" for Edge.
        synth.onvoiceschanged = setVoice;

        speech();
    }
}, 500);
