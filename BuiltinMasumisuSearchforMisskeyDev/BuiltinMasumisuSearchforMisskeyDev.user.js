// ==UserScript==
// @name        BuiltinMasumisuSearchforMisskeyDev
// @description Search for posts on Misskay.dev using Masumisearch.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.1
// @namespace   https://github.com/hidao80/UserScript
// @licence     MIT
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/BuiltinMasumisuSearchforMisskeyDev/BuiltinMasumisuSearchforMisskeyDev.user.js
// ==/UserScript==

function Masumisearch() {
    const search = document.querySelector("input[type=search]");
    if (search && !search.dataset.masumisu) {
        search.addEventListener("search", (e) => {
            e.stopImmediatePropagation();
            open(`https://masmis-search.ja-jp.org/search?q=account.domain:${location.host}+${search.value}`, '_blank');
        }, true);
        // Disable change events
        search.addEventListener("change", (e) => {
            e.stopImmediatePropagation();
        }, true);
        // Disable submit events
        document.querySelector("form").addEventListener("submit", (e) => {
            e.stopImmediatePropagation();
        }, true);
        search.dataset.masumisu = true;
    }
}

// Watch for the submit text area to be drawn.
new MutationObserver(Masumisearch).observe(document.body, {
    childList: true,
});
