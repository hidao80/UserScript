// ==UserScript==
// @name        MisskeyReactionViewForMobile
// @description You will also be able to see who has reacted on your phone or tablet.
// @match       https://misskey.dev/*
// @match       https://misskey.io/*
// @match       https://misskey.noellabo.jp/*
// @author      hidao80
// @version     1.2.1
// @namespace   https://github.com/hidao80/UserScript
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/
// @license     MIT
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MisskeyReactionViewForMobile/MisskeyReactionViewForMobile.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MisskeyReactionViewForMobile/MisskeyReactionViewForMobile.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

const tooltip = document.createElement('div');
tooltip.style = {
    position: "absolute",
    display: "flex",
    flexWrap: "wrap",
    display: "none",
    right: 0,
};

function createReactionTooltip() {
    // Create tooltip
    tooltip.innerHTML = "";
    const notifications = document.querySelectorAll('span[class^="reaction"]:not([data-has-touch-start])');
    console.log(notifications);
    for (const notification of notifications) {
        console.log(notification);
        for (const eventType of ["touchstart", "mouseover"]) {
            notification.addEventListener(eventType, e => {
                tooltip.style.display = 'block';
                tooltip.style.top = notification.clientY;

                const avatar = notification.querySelector('img');
                const emoji = notification.querySelector('header > img');
                const userName = notification.querySelector('header > a > span > span');

                const entry = document.createElement('span');
                entry.insertAdjacentHTML("beforeend", avatar);
                entry.insertAdjacentHTML("beforeend", emoji);
                entry.insertAdjacentHTML("beforeend", userName);

                tooltip.insertAdjacentHTML("beforeend", entry);

                // After displaying the tooltip, turn it off after 10 illnesses.
                setTimeout(() => {
                    tooltip.style.display = 'none';
                }, 10_000);
            });
        }

        // Prevent duplicate event registration
        notification.dataset.hasTouchStart = true;
    }
}

(new MutationObserver(createReactionTooltip)).observe(document.body, { childList: true });
