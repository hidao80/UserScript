// ==UserScript==
// @name        BuiltinMasumisuSearchforMisskeyDev
// @description Search for posts on Misskay.dev using Masumisearch.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.2
// @namespace   https://github.com/hidao80/UserScript
// @licence     MIT
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js
// ==/UserScript==

function search(query) {
    open(`https://masmis-search.ja-jp.org/search?q=account.domain:${location.host}+${query}`, 'miskkey2masumisu');
}

function Masumisearch() {
    const input = document.querySelector("input[type=search]") || document.querySelector("[class=input]>input");
    if (input && !input.dataset.isSearchDisabled) {
        input.addEventListener("change", (e) => {
            e.stopImmediatePropagation();
            e.stopPropagation();
            search(input.value);
            // Close the search dialog when in mobile version mode
            document.querySelector("div[class='bg']")?.click();
        }, true);

        // Disable search events
        input.addEventListener("search", (e) => {
            e.stopImmediatePropagation();
            e.stopPropagation();
        }, true);
        // Disable keydown events
        input.addEventListener("keydown", (e) => {
            e.stopImmediatePropagation();
            e.stopPropagation();
        }, true);
        // Disable submit events
        document.querySelector("form")?.addEventListener("submit", (e) => {
            e.stopImmediatePropagation();
            e.stopPropagation();
        }, true);
        input.dataset.isSearchDisabled = true;
    }
    // Disable submit events
    // NOTE: In mobile version mode, the form is re-created for each search,
    // so it should be monitored separately from SEARCH.
    // const form = document.querySelector("form");
    // if (form && !form.dataset.masumisu) {
    //     form.addEventListener("submit", (e) => {
    //         e.stopImmediatePropagation();
    //     }, true);
    //     form.dataset.masumisuMobile = true;
    //     // Disable change events
    //     input.addEventListener("change", (e) => {
    //         e.stopImmediatePropagation();
    //     }, true);
    // }
}

// Watch for the submit text area to be drawn.
new MutationObserver(Masumisearch).observe(document.body, {
    childList: true,
});
