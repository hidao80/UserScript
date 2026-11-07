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

(async () => {
    /** Constant variable */
    // When debugging: DEBUG = !false;
    const DEBUG = false;
    const SCRIPT_NAME = 'Misskey notes speech';
    /** Suppress debug printing unless in debug mode */
    const console = {};
    ["log", "debug", "warn", "info", "error"].forEach((o => { console[o] = DEBUG ? window.console[o] : () => { } }));/** The script name is converted to a hexadecimal hash */
    /** indolence.js */
    const $$one = e => document.querySelector(e);
    const HASH = Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0).toString(16);
    /** Alias for querySelectorAll */
    console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);


    // Initialization of reading voice
    const synth = window.speechSynthesis;
    const getVoice = (n) => synth.getVoices().find((v) => v.name.indexOf(n) >= 0);
    const utter = new SpeechSynthesisUtterance();
    const WIN = "Kyoko";
    const EDGE = "Nanami";
    const EDGE_JP = "七海";
    const GOOGLE_JAPANIESE = "Google 日本語";
    const FIREFOX = "日本語 (日本)";
    utter.rate = 1.2;
    utter.volume = 0.5;
    let from = "contributor's name";
    // Class names are hashed, so select elements by DOM structure
    const NOTE_ARTICLE = "div[tabindex='0']:not([style*='none'])>article";
    const NOTE_CONTENT = ":scope>div>div[style*='container-type']";

    /**
     * Get current language
     *
     * @returns {string} Current language
     */
    function language() {
        const locale = (window.navigator.languages?.[0] ||
            window.navigator.language ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage);
        const lang = locale.slice(0, 2);

        if (lang === "ja") {
            from = "さんのノート。"
        } else if (lang === "en") {
            from = "'s note."
        }
        utter.lang = locale;
        return lang;
    }

    // Voice tones are given priority to those found from left to right.
    const setVoice = () => {
        if (language() === "ja") {
            utter.voice = getVoice(EDGE_JP) || getVoice(EDGE) || getVoice(GOOGLE_JAPANIESE) || getVoice(FIREFOX) || getVoice(WIN) || null;
        }
    };

    // When a voice color object is loaded, the voice color is set to "Nanami" for Edge.
    synth.onvoiceschanged = setVoice;
    setVoice();

    // Clicking in the screen cancels the reading.
    document.body.addEventListener('click', () => synth.cancel());

    const timer = setInterval(() => {
        const targetLane = $$one(NOTE_ARTICLE)?.closest("[data-scroll-anchor]")?.parentElement;

        if (targetLane) {
            clearInterval(timer);

            // Trimming the readout
            function speech(mutationList) {
                const firstArticle = $$one(NOTE_ARTICLE);
                console.debug(firstArticle);
                console.debug(mutationList);
                const mutationRecord = Array.from(mutationList ?? []).filter(mutationRecord => !(mutationRecord?.addedNodes[0] instanceof Comment) && mutationRecord?.addedNodes[0]?.style?.display !== "none")[0];
                console.debug(mutationRecord);
                let article;
                if (mutationRecord) {
                    const note = mutationRecord.addedNodes[0];
                    console.debug(note);
                    article = note?.querySelector?.(NOTE_ARTICLE);
                    if (article !== firstArticle) {
                        return;
                    }
                } else {
                    if ($$one("div[tabindex='0']:has(>article)")?.style?.display === "none") {
                        return;
                    }
                    article = firstArticle;
                }
                if (!article) return;
                console.debug(article);

                // Waiting for DOM rendering
                setTimeout(() => {
                    // Cancel speak
                    synth.cancel();

                    // Nickname cutout
                    utter.text = article.querySelector(":scope>div>header>a").textContent + from;

                    // CW cutout
                    const cw = removeSymbols(article.querySelector(`${NOTE_CONTENT}>p>span`)?.textContent);
                    utter.text += `${cw ?? ""}。`;

                    // Notebook cutout (excluding CW)
                    utter.text += removeSymbols(article.querySelector(`${NOTE_CONTENT}>div>div>span[style*='white-space']`)?.textContent) ?? "";

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
        return text?.replace(/\n/g, '。') // Exclude new lines
            .replace(/。+/g, '。') // Exclude Japanese periods
            .replace(/```.+```/g, ' ') // Exclude code
            .replace(/\\(.*\\)/g, ' ') // Exclude MathJax(KaTeX)
            .replace(/https?:\/\/([\w/:#$&?()~.=+\-,]|%[0-9a-fA-F]+)+/g, ' ') // Exclude URL
            .replace(/[_'"`$&^\\@;:,./|[\](){}<>]/g, ' ') // Exclude symbols. Only # is an exception.
            .replace(/\*/gu, ' asterisk ') // Include 'asterisk'
            .replace(/=/gu, ' equal ') // Include 'equal'
            .replace(/&/gu, ' and ') // Include 'and'
            .replace(/\s\?/gu, ' question ') // Include 'question'
            .replace(/(?=[^\d#])\p{Emoji}/gu, '') // Exclude emoji
            ;
    }
})();
