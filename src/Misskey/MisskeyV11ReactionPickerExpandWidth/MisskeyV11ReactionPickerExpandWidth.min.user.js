// ==UserScript==
// @name           Mei v11 Reaction Picker Expand Width
// @description    Widen the width of the reaction picker in Mei v11.
// @name:ja        リアクションパレットを画面下部に表示させる（めいv11 モバイル版モード用）
// @description:ja めいv11のリアクションピッカーの幅を画面いっぱいに広くします。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.6.5
// @namespace      https://github.com/hidao80/UserScript/MisskeyV11ReactionPickerExpandWidth
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f44d.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11ReactionPickerExpandWidth/MisskeyV11ReactionPickerExpandWidth.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyV11ReactionPickerExpandWidth/MisskeyV11ReactionPickerExpandWidth.min.user.js
// ==/UserScript==
(async()=>{const n=false;const t="Misskey v11 Reaction Picker Expand Width";const o={};["log","debug","warn","info","error"].forEach((t=>{o[t]=n?window.console[t]:function(){}}));const i=Array.from(t).reduce(((n,t)=>(n<<5)-n+t.charCodeAt(0)),0).toString(16);o.debug(`[${t}]: Script Loading... [HASH = ${i}]`);const e=[`div.popover.isMobile {\n        position: fixed !important;\n        top: auto !important;\n        bottom: 0;\n        left: 0 !important;\n        transition: 0s;\n        animation: none;\n        transform: none !important;\n        width: 100%;\n    }`,`div.buttons {\n        width: 100% !important;\n        padding: 0;\n    }`,`div.popover.isMobile>.buttons>.text>input {\n        flex: 1;\n    }`,`div.popover.isMobile,\n    div.popover.isMobile>.text,\n    div.buttons div {\n        width: 100% !important;\n    }`];setTimeout((()=>{const n=[...document.styleSheets].slice(-1)[0];for(let t of e){n.insertRule(t,n.cssRules.length)}}),500)})();
