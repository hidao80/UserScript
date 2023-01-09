// ==UserScript==
// @name        MastodonKeywordsFilter
// @description Filter out offensive words in Misskey.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @match       https://pawoo.net/*
// @match       https://mstdn.sublimer.me/*
// @match       https://social.vivaldi.net/*
// @author      hidao80
// @version     1.2
// @namespace   https://github.com/hidao80/UserScript
// @licence     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26d4.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MastodonKeywordsFilter/MastodonKeywordsFilter.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MastodonKeywordsFilter/MastodonKeywordsFilter.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

const FILTERED_WORDS = "■■■";

const KEYWORDS = [
    // User defined keywords

    // Default keywords
    "馬鹿",
    "ばか",
    "バカ",
    "ﾊﾞｶ",
    "うんこ",
    "ウンコ",
    "ｳﾝｺ",
    "くそ",
    "クソ",
    "ｸｿ",
    "fuck",
    "f*ck",
    "fu*k",
    "f**k",
    "shit",
    "sh*t",
    "s*it",
    "s**t",
];

/**
 * Replace all keywords
 *
 * @param {string} text target string
 * @return {string} replaced text
 */
function replace(text) {
    for (const word of KEYWORDS) {
        text = text.replaceAll(word, FILTERED_WORDS);
    }
    return text;
}

/**
 * Filter out offensive remarks on social networking sites.
 *
 * @param {NodeList} elems
 */
function filter(elems) {
    for (const elem of elems) {
        // Text to speach
        const wrapper = elem.querySelector(".status__wrapper");
        wrapper.setAttribute("aria-label", replace(wrapper.getAttribute('aria-label')));

        // Text to display
        const textElem = elem.querySelector(".status__content__text");
        textElem.innerHTML = replace(textElem.innerHTML);
    }
}

/**
 * MutationObserver callback function
 *
 * @param {Array<MutationRecord>} mutationLists
 */
function callback(mutationLists) {
    for (const mutation of mutationLists) {
        const nodes = mutation.addedNodes
        if (nodes) {
            filter(nodes);
        }
    }
}

/**
 * Main routine
 */
const timer = setInterval(() => {
    // Designation of columns to watch for posts
    const columns = document.querySelectorAll(".item-list");
    const elems = document.querySelectorAll("article");

    if (columns?.length > 0 && elems?.length > 0) {
        clearInterval(timer);

        for (const column of columns) {
            (new MutationObserver(callback)).observe(column, { childList: true });
        }

        filter(elems);
    }
}, 100);
