// ==UserScript==
// @name        MastodonTootSpeach
// @description UserScript that uses the Speech API to read out new toots in Mastodon's home timeline.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @match       https://pawoo.net/*
// @match       https://mstdn.sublimer.me/*
// @match       https://social.vivaldi.net/*
// @author      hidao80
// @version     1.7.1
// @namespace   https://github.com/hidao80/UserScript
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e3.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MastodonTootSpeach/MastodonTootSpeech.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MastodonTootSpeach/MastodonTootSpeech.user.js
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
const getVoice = (n) => synth.getVoices().find((v) => v.name.indexOf(n) != -1);
const utter = new SpeechSynthesisUtterance();
// utterrate = 1;
// uttervolume = 20;

// Voice tones are given priority to those found from left to right.
function setVoice() {
    utter.voice = getVoice(EDGE) || getVoice(GOOGLE_JAPANIESE) || getVoice(WIN) || getVoice(ENGLISH);
};

function callback(mutationLists) {
    for (const mutation of mutationLists) {
        const nodes = mutation.addedNodes
        console.log(nodes);
        if (nodes) {
            speech(nodes[0].querySelector('.status__wrapper'));
        }
    }
}

// Trimming the readout
function speech(elem) {
    // Cancel reading
    synth.cancel();

    // Get toot
    const toot = elem?.getAttribute('aria-label')?.split(', ');

    // Trimming date and user ID
    const name = toot[0] + "さんのトゥート。";
    const message = toot.slice(1, -2).join(', ');

    utter.text = name;
    utter.text += message
        .replace(/。+/g, "。") // Combine multiple consecutive readings into one.
        .replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g, " ") // Remove URL
        ;

    // Toot reads.
    synth.speak(utter);
}

const timer = setInterval(() => {
    // Designation of lanes to watch for posts
    const parentElment = document.querySelector('[aria-label="ホーム"]');
    const elem = parentElment.querySelector('.status__wrapper');
    if (parentElment && elem) {
        clearInterval(timer);
        setVoice();

        (new MutationObserver(callback)).observe(parentElment.querySelector(".item-list"), { childList: true });

        // When a voice color object is loaded,
        // the voice color is set to "Nanami" for Edge.
        synth.onvoiceschanged = setVoice;

        speech(elem);
    }
}, 500);
