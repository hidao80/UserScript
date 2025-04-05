// ==UserScript==
// @name        Fediverse Time ToAbsolute
// @name:ja     Fediverse絶対時刻
// @description Change time to absolute notation UserScript for Fediverse.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @match       https://pawoo.net/*
// @match       https://mstdn.sublimer.me/*
// @match       https://misskey.dev/*
// @match       https://misskey.io/*
// @match       https://misskey.noellabo.jp/*
// @match       https://msky.work/*
// @match       https://social.vivaldi.net/*
// @author      hidao80
// @version     1.14.1
// @namespace   https://github.com/hidao80/UserScript/FediverseTimeToAbsolute
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f552.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/FediverseTimeToAbsolute/FediverseTimeToAbsolute.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/FediverseTimeToAbsolute/FediverseTimeToAbsolute.min.user.js
// ==/UserScript==
const styles=[`article time::before {\n        content: attr(title) " (";\n    }`,`article time::after {\n        content: ")";\n    }`,`.mk-note-detail article .info time::before {\n        content: attr(title) " (";\n    }`,`.mk-note-detail article .info time::after {\n        content: ")";\n    }`,`.mk-note-detail .reply-to .info time::before {\n        content: attr(title) " (";\n    }`,`.mk-note-detail article .info time::after {\n        content: ")";\n    }`,`.mk-note-detail article time::before {\n        content: "";\n    }`,`.mk-note-detail article time::after {\n        content: "";\n    }`,`article .status__info {\n        display: flex;\n        flex-wrap: wrap;\n        flex-direction: row-reverse;\n    }`,`article .status__info .status__display-name {\n        margin-right: auto;\n        padding-right: 0;\n    }`,`.transition time::before {\n        content: attr(title) " (";\n    }`,`.transition time::after {\n        content: ")";\n    }`,`.transition header.header {\n        flex-wrap: wrap\n    }`,`.transition header.header>.name {\n        display: block;\n    }`,`.transition header.header>.username {\n        display: block;\n    }`,`.transition .info {\n        display: block;\n        text-align: right;\n        margin-left: auto;\n    }`,`.transition .info>a, .transition .info>span {\n        display: inline-block;\n    }`,`.mk-notifications>.notifications>div>.notification>.text>header[data-v-b78fea54] {\n        flex-wrap: wrap\n    }`,`.notification header time {\n        display: block;\n        text-align: right;\n        margin-left: auto;\n    }`,`.dsfykdcjpuwfvpefwufddclpjhzktmpw>.notification>div>header[data-v-bb2367fa] {\n        flex-wrap: wrap\n    }`,`.notification .header .info {\n        display: block;\n        text-align: right;\n        margin-left: auto;\n    }`,`.transition header.header {\n        flex-wrap: nowrap !important;\n    }`,`.transition header.header > .username, .transition header.header > .username > .mk-acct {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n    }`];setTimeout((()=>{const t=[...document.styleSheets].slice(-1)[0];for(let n of styles){t.insertRule(n,t.cssRules.length)}}),500);
