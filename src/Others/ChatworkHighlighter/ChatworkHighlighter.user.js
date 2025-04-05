/*
I based my work on this article. <https://qiita.com/A-Ota/items/6a6cc8976aa3e5ae0f92>
Thank you @A-Ota!
 */
// ==UserScript==
// @name        Chatwork Syntax Highlighter
// @name:ja     Chatworkシンタックスハイライト
// @description Syntax highlighting is applied to the code notation in Chatwork.
// @match       https://www.chatwork.com/
// @author      hidao80
// @version     1.0.4
// @namespace   https://github.com/hidao80/UserScript/ChatworkSyntaxHighlighter
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4ac.png
// @run-at      document-end
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @require     https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js#sha512-yUUc0qWm2rhM7X0EFe82LNnv2moqArj5nro/w1bi05A09hRVeIZbN6jlMoyu0+4I/Bu4Ck/85JQIU82T82M28w==
// @resource    style https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/monokai.min.css#sha512-RLF8eOxhuwsRINc7r56dpl9a3VStqrXD+udWahutJrYdyh++2Ghnf+s4jFsOyryKZt/GNjPwbXVPH3MJpKrn2g==
// @resource    default https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/default.min.css#sha512-hasIneQUHlh06VNBe7f6ZcHmeRTLIaQWFd43YriJ0UND19bvYRauxthDg8E4eVNPm9bRUhr5JGeqH7FRFXQu5g==
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Others/ChatworkHighlighter/ChatworkHighlighter.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Others/ChatworkHighlighter/ChatworkHighlighter.min.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

GM_addStyle(GM_getResourceText('style'));
GM_addStyle(GM_getResourceText('default'));

// The background color does not change, so change it manually.
// Change the COLOR and BACKGROUND to match your theme.
GM_addStyle(`
code.hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #abb2bf;
    background: #282c34;
}
`);



const observerConfig = { attributes: false, childList: true, characterData: false };
const root = document.getElementById('root');

function highlight(nodes) {
    for (const elem of nodes) {
        hljs.highlightBlock(elem);
    }
}

// Observer for root element monitoring
// Stop monitoring _timeLine elements as soon as they are found
const rootObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.target.id === 'root') {
            rootObserver.disconnect();
            const chatContent = document.getElementById('_chatContent');
            chatContentObserver.observe(chatContent, observerConfig);
        }
    };
});


// Observer for monitoring _timeLine element
const chatContentObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            const timeLine = document.getElementById('_timeLine');
            timeLineObserver.observe(timeLine.childNodes[0], observerConfig);
            highlight(document.getElementsByTagName('code'));
        }
    };
});


// Observer for monitoring _timeLine element
const timeLineObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            highlight(document.getElementsByTagName('code'));
        }
    };
});

// Start monitoring root element
rootObserver.observe(root, observerConfig);
