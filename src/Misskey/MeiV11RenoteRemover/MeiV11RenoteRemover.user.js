// ==UserScript==
// @name        Mei v11 Renote Remove Button
// @name:ja     めいv11向けリノート削除ボタン
// @description Adds a button to remove renotes in Mei v11.
// @description:ja めいv11のリノートを削除するボタンを追加します。
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.0.0
// @namespace   https://github.com/hidao80/UserScript/MeiV11RenoteRemover
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f5d1.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/MeiV11RenoteRemover/MeiV11RenoteRemover.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/MeiV11RenoteRemover/MeiV11RenoteRemover.min.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

(async() => {
/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'MeiV11RenoteRemover';
const SCRIPT_CLASS = 'us-hidao80-' + SCRIPT_NAME;
DEBUG && console.debug(`[${SCRIPT_NAME}]: script started.`);

 // Trash icon SVG
let themeColor = 'rgb(255, 255, 255)';
try {
    themeColor = JSON.parse(localStorage.getItem('theme'))?.noteText ?? 'rgb(255, 255, 255)';
} catch (e) {
    DEBUG && console.warn(`[${SCRIPT_NAME}]: Failed to parse theme from localStorage, using default color.`);
}
const buttonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 1em; height: 1em; opacity: 1;">
    <g>
        <path fill="${themeColor}" d="M3 6h18v2H3V6zm2 3h14l-1.5 13h-11L5 9zm3 2v8h2v-8H8zm4 0v8h2v-8h-2zM9 4V2h6v2h5v2H4V4h5z"/>
    </g>
</svg>`;

// Get the target lane
let targetLane = document.querySelector(".transition.notes") ?? document.querySelector(".transition") ?? document.body;

// Observe for renotes
const observer = new MutationObserver(observerCallback);
observer.observe(targetLane, { childList: true });

/**
 * Adds a button to remove renotes.
 * This function creates a button with a trash icon and appends it to the renote element.
 *
 * @param {MutationRecord[]} mutationsList - List of mutations observed by the MutationObserver.
 * @param {MutationObserver} observer - The MutationObserver instance that detected the mutations.
 */
function observerCallback(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const renotes = document.querySelectorAll(".note.renote");
            if (renotes.length > 0) {
                addRenoteRemoveButton(renotes);
            }
        }
    }

    // Re-observe the target lane in case it has changed
    targetLane = document.querySelector(".transition.notes") ?? document.querySelector(".transition") ?? document.body;
    observer.observe(targetLane, { childList: true });
}

/**
 * Adds a button to remove renotes.
 * This function creates a button with a trash icon and appends it to each renote element.
 *
 * @param {NodeListOf<Element>} renotes - A NodeList of renote elements to which the button will be added.
 */
function addRenoteRemoveButton(renotes) {
    DEBUG && console.debug(`[${SCRIPT_NAME}]: addRenoteRemoveButton called. Found ${renotes.length} renotes.`);
    if (renotes.length == 0) {
        return;
    }

    for (const renote of renotes) {
        if (renote.querySelector(`.${SCRIPT_CLASS}`)) {
            continue;
        }
        const button = document.createElement('button');
        button.className = `${SCRIPT_CLASS}`;
        button.innerHTML = buttonIcon;
        button.title = 'リノートを削除';
        button.style.cssText = 'background: transparent; border: none; cursor: pointer; padding: 0;';

        const noteId = renote.querySelector("article header .info a.created-at")?.href.match(/\/notes\/([a-zA-Z0-9]+)/)?.[1];
        const i = JSON.parse(localStorage.getItem('vuex')).i.token;
        DEBUG && console.debug(`[${SCRIPT_NAME}]:`, /*i,*/ noteId);

        button.addEventListener('click', () => {
            DEBUG && console.debug(`[${SCRIPT_NAME}]: Removing renote.`);
            fetch(`https://${location.host}/api/notes/unrenote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    i,
                    noteId,
                }),
                credentials: 'omit',
            })
            .then(response => {
                if (!response.ok) {
                    DEBUG && console.error(`[${SCRIPT_NAME}]: Failed to remove renote. Status: ${response.status}`);
                } else {
                    DEBUG && console.debug(`[${SCRIPT_NAME}]: Renote removed successfully.`);
                    renote.remove();
                }
            });
        });

        renote.appendChild(button);

        const renoteInfo = renote.querySelector('.renote');
        if (renoteInfo) {
            renoteInfo.style.display = 'flex';
            renoteInfo.style.justifyContent = 'space-between';
            renoteInfo.style.alignItems = 'center';
            renoteInfo.appendChild(button);
        } else {
            DEBUG && console.warn(`[${SCRIPT_NAME}]: renoteInfo not found for renote, appending button directly.`);
        }
    }
}
})();
