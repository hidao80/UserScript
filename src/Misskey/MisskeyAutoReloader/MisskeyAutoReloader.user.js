// ==UserScript==
// @name        Misskey Auto Reloader
// @name:ja     Misskey 自動リロード
// @description Reload once every 10 minutes if there are no posts being typed.
// @match       https://misskey.dev/*
// @match       https://msky.work/*
// @author      hidao80
// @version     1.4.4
// @namespace   https://github.com/hidao80/UserScript/MisskeyAutoReloader
// @license     MIT
// @icon        https://twemoji.maxcdn.com/v/latest/72x72/1f552.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyAutoReloader/MisskeyAutoReloader.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyAutoReloader/MisskeyAutoReloader.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

// Prevent namespace contamination
(() => {
    // Wait until the monitored object has been drawn.
    const timer = setInterval(() => {
        /**
         * Fake jQuery object
         *
         * @param {string} selector - css selector
         * @returns {null|array<Element>}
         */
        function $(selector) {
            const elem = document.querySelectorAll(selector);
            if (elem === []) {
                return null;
            } else if (elem.length >= 2) {
                return elem;
            } else {
                return elem[0];
            }
        }

        /**
         * If the post is not in the process of being typed, reload.
         */
        function reload() {
            if (!$('textarea')?.value) {
                location.reload();
            }
        }

        /** @var {null|int} reloadTimerId  */
        let reloadTimerId = null;

        /**
         * Reset the reload timer when there is a new arrival.
         */
        function resetTimer() {
            if (reloadTimerId != null) {
                clearInterval(reloadTimerId);
            }
        }

        // Designation of lanes to watch for posts
        /** @var {array<Element>} columns  */
        const columns = document.querySelectorAll('.active.round:not(.naked)');
        console.debug(columns);

        if (columns != []) {
            // Stop waiting for the monitored timeline to be drawn
            clearInterval(timer);

            const waitMillisec = 600_000;  // 10 mins.
            reloadTimerId = setInterval(reload, waitMillisec);

            const observer = new MutationObserver(resetTimer);
            for (const column of columns) {
                observer.observe(column, { childList: true });
            }
        }
    }, 700);
})();
