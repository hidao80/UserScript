// ==UserScript==
// @name        BuiltinMasumisuSearchforMisskeyDev
// @description Search for posts on Misskay.dev using Masumisearch.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.3.3
// @namespace   https://github.com/hidao80/UserScript
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f50d.png
// @license     MIT
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

/**
 * Open a separate window for search and search in Masumisu-search.
 * @param {*} query search string
 */
function search(query) {
    open(`https://masmis-search.ja-jp.org/search?q=account.domain:${location.host}+${query}`, 'miskkey2masumisu');
}

/**
 * User search or not
 * @param {*} query search string
 * @returns {bool}
 */
function isUserSearch(query) {
    return /^\s*@.*/.test(query);
}

/**
 * Override the search window execution event whenever something is drawn on the screen.
 * If the flag has already been overwritten, nothing is done.
 */
function MasumisuSearch() {
    const input = document.querySelector("input[type=search]") || document.querySelector("[class=input]>input");
    if (input && !input.dataset.isSearchDisabled) {
        input.addEventListener("change", (e) => {
            // For user search, do not use Masumisu Search.
            if (!isUserSearch(input.value)) {
                e.stopImmediatePropagation();
                e.stopPropagation();
                search(input.value);

                // Close the search dialog when in mobile version mode
                document.querySelector("div[class='bg']")?.click();
            }
        }, true);

        // Disable search events
        input.addEventListener("search", (e) => {
            // For user search, do not use Masumisu Search.
            if (!isUserSearch(input.value)) {
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
        }, true);
        // Disable keydown events
        input.addEventListener("keydown", (e) => {
            // For user search, do not use Masumisu Search.
            if (!isUserSearch(input.value)) {
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
        }, true);
        // Disable submit events
        document.querySelector("form")?.addEventListener("submit", (e) => {
            // For user search, do not use Masumisu Search.
            if (!isUserSearch(input.value)) {
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
        }, true);
        input.dataset.isSearchDisabled = true;
    }
}

// Watch for the submit text area to be drawn.
new MutationObserver(MasumisuSearch).observe(document.body, {
    childList: true,
});
