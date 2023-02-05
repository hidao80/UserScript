// ==UserScript==
// @name        OnScreenConsole
// @description Display the contents of the browser's developer tools console on the screen
// @match       http://*/*
// @match       https://*/*
// @author      hidao80
// @version     1.3.1
// @namespace   https://github.com/hidao80/UserScript
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f5a5.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/OnScreenConsole/OnScreenConsole.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/OnScreenConsole/OnScreenConsole.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

const styles = [`
    #debug-details {
        display: none;
        position: absolute;
        top: 0;
        width: 350px;
        opacity: 0.6;
        z-index: 2000;
        background-color: gray;
        color: white;
    }
    `,`
    #debug-details[open] {
        height: -webkit-fill-available;
        max-height: -webkit-fill-available;
    }
    `,`
    #debug-div {
        height: calc(100% - 1.2rem);
        background-color: gray;
        color: white;
        overflow: scroll;
    }
    `,`
    #debug-opposite {
        cursor: pointer;
        color: blue;
        font-weight: 800;
    }
    `,`
    .debug-top {
        border-top: 1px solid #999;
    }
`];

// Embed style sheets in the last style tag
const usableSheet = [...document.styleSheets].slice(-1)[0];

for (let style of styles) {
    usableSheet.insertRule(style, usableSheet.cssRules.length);
}



/**
 * Multilingualization library class
 *
 * @class Multilingualization
 */
class Multilingualization {
    /**
     *  @var dictionaries Multilingual dictionary object
     */
    static dictionaries = {
        "en": {
            "Details: ": "Details: ",
            "Move to the Opposite": "Move to the Opposite",
        },
        "ja": {
            "Details: ": "詳細: ",
            "Move to the Opposite": "反対側へ移動",
        },
        "es": {
            "Details: ": "Detalles: ",
            "Move to the Opposite": "Pasar al otro lado",
        },
        "ru": {
            "Details: ": "Подробности: ",
            "Move to the Opposite": "Перейдите на другую сторону",
        },
        "fr": {
            "Details: ": "Détails : ",
            "Move to the Opposite": "Passez à l'opposé",
        },
        "de": {
            "Details: ": "Détails : ",
            "Move to the Opposite": "Auf die Gegenseite gehen",
        },
        "zh": {
            "Details: ": "细节。",
            "Move to the Opposite": "转移到对立面",
        },
    }

    /**
     * Get current language
     *
     * @returns {string} Current language
     */
    static language() {
        const lang = ((window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage).slice(0, 2);

        // Show English for undefined languages
        return this.dictionaries[lang] ? lang : "en";
    }

    /**
     * Get translated term
     *
     * @param {string} term Term to be translated
     * @returns {string} Translated term
     */
    static translate(index) {
        return this.dictionaries[this.language()][index];
    }

    /**
     * Initialization of dictionary object
     */
    static translateAll() {
        const dictionary = this.dictionaries[this.language()];
        for (let elem of document.querySelectorAll('[data-translate]')) {
            elem.innerHTML = dictionary[elem.dataset.translate];
        }
    }
}

// Output area
const div = document.createElement("div");
const details = document.createElement("details");

// Output logs
const log = msg => {
    const str = typeof msg  == "string" ? `<pre>${msg}<pre>` : JSON.stringify(msg,undefined,1);
    div.insertAdjacentHTML("beforeend", `<p class="debug-top">${str}</p>`);
    div.scrollTop = div.scrollHeight;
};

// Right-aligned (left-aligned by default)
const alignRight = (condition) => {
    if (condition) {
        details.style.right = 0;
        details.style.left = null;
    } else {
        details.style.right = null;
        details.style.left = 0;
    }
};

// Enabling the debug function
const summary = document.createElement("summary");
summary.textContent = Multilingualization.translate("Details: ");

const moveOpposite = document.createElement("a");
moveOpposite.insertAdjacentHTML("beforeend", Multilingualization.translate("Move to the Opposite"));
moveOpposite.addEventListener("click", () => {
    alignRight(details.style.left == "0px");
});
summary.appendChild(moveOpposite);

div.setAttribute("id", "debug-div");
details.setAttribute("id", "debug-details");
moveOpposite.setAttribute("id", "debug-opposite");

details.appendChild(summary);
details.appendChild(div);

// Whether to display or not
details.style.display = "block";
details.style.position = "absolute";
details.style.left = 0;
details.style.top = 0;

// Overwrite console.log
console.log = log;

setTimeout(() => {
    document.body.appendChild(details);
}, 300);

