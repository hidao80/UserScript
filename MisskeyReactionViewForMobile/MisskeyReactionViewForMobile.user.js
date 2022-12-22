/*
MIT License

Copyright (c) 2022 hidao80

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

// ==UserScript==
// @name        MisskeyReactionViewForMobile
// @description You will also be able to see who has reacted on your phone or tablet.
// @match       https://misskey.dev/*
// @match       https://misskey.io/*
// @author      hidao80
// @version     0.1.0
// @namespace   https://github.com/hidao80/UserScript
// @icon        https://twemoji.maxcdn.com/v/latest/72x72/2b50.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MisskeyReactionViewForMobile/MisskeyReactionViewForMobile.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MisskeyReactionViewForMobile/MisskeyReactionViewForMobile.user.js
// ==/UserScript==

// Prevent namespace contamination
(() => {
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

    function dispatch(e) {
        e.target.dispatchEvent(new Event('mouseover'));
    }

    // Wait until the monitored object has been drawn.
    const timer = setInterval(() => {
        // Designation of lanes to watch for posts
        /** @var {array<Element>} columns  */
        const columns = document.querySelectorAll('.active.round:not(.naked)');

        if (columns?.length > 0) {
            // Stop waiting for the monitored timeline to be drawn
            clearInterval(timer);

            const observer = new MutationObserver(mutationList => {
                for (const elem of mutationList) {
                    if (/reaction/.test(elem.target.className)) {
                        elem.target.removeEventListener('touchstart', dispatch);
                        elem.target.addEventListener("touchstart", dispatch);
                    }
                }
            });
            for (const column of columns) {
                observer.observe(column, { childList: true });
            }
        }
    }, 700);
})();
