// ==UserScript==
// @name           Template
// @name:ja        テンプレート
// @description    Summary of this script
// @description:ja このスクリプトの概要
// @match          https://misskey.dev/*
// @author         hidao80
// @version        1.0.1
// @namespace      https://github.com/hidao80/UserScript/Template
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3a8.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Template/Template.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Template/Template.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';
(async () => {
/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'Browser back recommend disabler';
/** Suppress debug printing unless in debug mode */
const console = {};
["log","debug","warn","info","error"].forEach((o=>{console[o]=DEBUG?window.console[o]:function(){}}));
/** The script name is converted to a hexadecimal hash */
const HASH = Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0).toString(16);
/** Alias for querySelectorAll */
const $ = (e)=>{const n=document.querySelectorAll(e);return 1==n.length?n[0]:n};
console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);

/** Individual script body */
})();
