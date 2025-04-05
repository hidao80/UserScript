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
GM_addStyle(GM_getResourceText("style"));GM_addStyle(GM_getResourceText("default"));GM_addStyle(`\ncode.hljs {\n    display: block;\n    overflow-x: auto;\n    padding: 0.5em;\n    color: #abb2bf;\n    background: #282c34;\n}\n`);const observerConfig={attributes:false,childList:true,characterData:false};const root=document.getElementById("root");function highlight(e){for(const t of e){hljs.highlightBlock(t)}}const rootObserver=new MutationObserver((e=>{for(const t of e){if(t.type==="childList"&&t.target.id==="root"){rootObserver.disconnect();const e=document.getElementById("_chatContent");chatContentObserver.observe(e,observerConfig)}}}));const chatContentObserver=new MutationObserver((e=>{for(const t of e){if(t.type==="childList"){const e=document.getElementById("_timeLine");timeLineObserver.observe(e.childNodes[0],observerConfig);highlight(document.getElementsByTagName("code"))}}}));const timeLineObserver=new MutationObserver((e=>{for(const t of e){if(t.type==="childList"){highlight(document.getElementsByTagName("code"))}}}));rootObserver.observe(root,observerConfig);
