// ==UserScript==
// @name        ChatGptSuggest
// @description ChatGPT prompt suggestion function
// @match       https://chat.openai.com/chat
// @author      hidao80
// @version     1.0.1
// @namespace   https://github.com/hidao80/UserScript
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f5e3.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/ChatGptSuggest/ChatGptSuggest.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/ChatGptSuggest/ChatGptSuggest.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

const promptList = [
    // Japanese
    "について教えて",
    "に関するWikipediaのような記事を作成して",
    "をタスク化して",
    "の間に をする。その間のスケジュールを 分刻みで示して",
    "以下を要約して\n\n",
    "以下を文章化して\n\n",
    "以下をタスク化して\n\n",
    "に関するブログ記事のタイトルを教えて",
    "Pythonでサンプルプログラムを表示して",
    "Rubyでサンプルプログラムを表示して",
    "C#でサンプルプログラムを表示して",
    "Javaでサンプルプログラムを表示して",
    "JavaScriptでサンプルプログラムを表示して",
    "PHPでサンプルプログラムを表示して",
    "以下のコードのドキュメントをJSDoc形式で出力して\n\n```",
    "以下のコードのドキュメントをPHPDoc形式で出力して\n\n```",
    "以下のコードをリファクタリングして\n\n",
    "に必要なtable一覧を表示して",
    "関数を出力して",
    "以下の単体テストを書いて\n\n```",
    "「〜ですの」を語尾につけて について説明して",
    "っぽく、敬語を使わず可愛く、 について説明して",

    // English
    "What is  like?",
    "What does  means?",
    "Please create an article about  like Wikipedia.",
    "Please create a task for  .",
    "Between  and , I do . Show the schedule in  minute increments during that time.",
    "Summarize follow sentences.\n\n",
    "Convert the following bullet points into sentences.\n\n",
    "Convert the following sentences into some tasks.\n\n",
    "Tell me some example titles of blog post about .",
    "Show me sample code in JavaScript.",
    "Show me sample code in Java.",
    "Show me sample code in Ruby.",
    "Show me sample code in Python.",
    "Show me sample code in C#.",
    "Show me sample code in PHP.",
    "Output the documentation for the code below in JSDoc format.\n\n```",
    "Output the documentation for the code below in PHPDoc format.\n\n```",
    "Refactor the following code.\n\n",
    "Display the table list required for .",
];

function appendCss(URL) {
	var el = document.createElement('link');
	el.href = URL;
	el.rel = 'stylesheet';
	el.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(el);
}

// init autoComplete.js
var e,t;e=this,t=function(){"use strict";function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function t(t){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?e(Object(i),!0).forEach((function(e){r(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):e(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var u=function(e){return"string"==typeof e?document.querySelector(e):e()},a=function(e,t){var n="string"==typeof e?document.createElement(e):e;for(var r in t){var i=t[r];if("inside"===r)i.append(n);else if("dest"===r)u(i[0]).insertAdjacentElement(i[1],n);else if("around"===r){var o=i;o.parentNode.insertBefore(n,o),n.append(o),null!=o.getAttribute("autofocus")&&o.focus()}else r in n?n[r]=i:n.setAttribute(r,i)}return n},c=function(e,t){return e=String(e).toLowerCase(),t?e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").normalize("NFC"):e},l=function(e,n){return a("mark",t({innerHTML:e},"string"==typeof n&&{class:n})).outerHTML},f=function(e,t){t.input.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:t.feedback,cancelable:!0}))},p=function(e,t,n){var r=n||{},i=r.mode,o=r.diacritics,s=r.highlight,u=c(t,o);if(t=String(t),e=c(e,o),"loose"===i){var a=(e=e.replace(/ /g,"")).length,f=0,p=Array.from(t).map((function(t,n){return f<a&&u[n]===e[f]&&(t=s?l(t,s):t,f++),t})).join("");if(f===a)return p}else{var d=u.indexOf(e);if(~d)return e=t.substring(d,d+e.length),d=s?t.replace(e,l(e,s)):t}},d=function(e,t){return new Promise((function(n,r){var i;return(i=e.data).cache&&i.store?n():new Promise((function(e,n){return"function"==typeof i.src?i.src(t).then(e,n):e(i.src)})).then((function(t){try{return e.feedback=i.store=t,f("response",e),n()}catch(e){return r(e)}}),r)}))},h=function(e,t){var n=t.data,r=t.searchEngine,i=[];n.store.forEach((function(s,u){var a=function(n){var o=n?s[n]:s,u="function"==typeof r?r(e,o):p(e,o,{mode:r,diacritics:t.diacritics,highlight:t.resultItem.highlight});if(u){var a={match:u,value:s};n&&(a.key=n),i.push(a)}};if(n.keys){var c,l=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=o(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,u=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){a=!0,s=e},f:function(){try{u||null==n.return||n.return()}finally{if(a)throw s}}}}(n.keys);try{for(l.s();!(c=l.n()).done;)a(c.value)}catch(e){l.e(e)}finally{l.f()}}else a()})),n.filter&&(i=n.filter(i));var s=i.slice(0,t.resultsList.maxResults);t.feedback={query:e,matches:i,results:s},f("results",t)},m="aria-expanded",b="aria-activedescendant",y="aria-selected",v=function(e,n){e.feedback.selection=t({index:n},e.feedback.results[n])},g=function(e){e.isOpen||((e.wrapper||e.input).setAttribute(m,!0),e.list.removeAttribute("hidden"),e.isOpen=!0,f("open",e))},w=function(e){e.isOpen&&((e.wrapper||e.input).setAttribute(m,!1),e.input.setAttribute(b,""),e.list.setAttribute("hidden",""),e.isOpen=!1,f("close",e))},O=function(e,t){var n=t.resultItem,r=t.list.getElementsByTagName(n.tag),o=!!n.selected&&n.selected.split(" ");if(t.isOpen&&r.length){var s,u,a=t.cursor;e>=r.length&&(e=0),e<0&&(e=r.length-1),t.cursor=e,a>-1&&(r[a].removeAttribute(y),o&&(u=r[a].classList).remove.apply(u,i(o))),r[e].setAttribute(y,!0),o&&(s=r[e].classList).add.apply(s,i(o)),t.input.setAttribute(b,r[t.cursor].id),t.list.scrollTop=r[e].offsetTop-t.list.clientHeight+r[e].clientHeight+5,t.feedback.cursor=t.cursor,v(t,e),f("navigate",t)}},A=function(e){O(e.cursor+1,e)},k=function(e){O(e.cursor-1,e)},L=function(e,t,n){(n=n>=0?n:e.cursor)<0||(e.feedback.event=t,v(e,n),f("selection",e),w(e))};function j(e,n){var r=this;return new Promise((function(i,o){var s,u;return s=n||((u=e.input)instanceof HTMLInputElement||u instanceof HTMLTextAreaElement?u.value:u.innerHTML),function(e,t,n){return t?t(e):e.length>=n}(s=e.query?e.query(s):s,e.trigger,e.threshold)?d(e,s).then((function(n){try{return e.feedback instanceof Error?i():(h(s,e),e.resultsList&&function(e){var n=e.resultsList,r=e.list,i=e.resultItem,o=e.feedback,s=o.matches,u=o.results;if(e.cursor=-1,r.innerHTML="",s.length||n.noResults){var c=new DocumentFragment;u.forEach((function(e,n){var r=a(i.tag,t({id:"".concat(i.id,"_").concat(n),role:"option",innerHTML:e.match,inside:c},i.class&&{class:i.class}));i.element&&i.element(r,e)})),r.append(c),n.element&&n.element(r,o),g(e)}else w(e)}(e),c.call(r))}catch(e){return o(e)}}),o):(w(e),c.call(r));function c(){return i()}}))}var S=function(e,t){for(var n in e)for(var r in e[n])t(n,r)},T=function(e){var n,r,i,o=e.events,s=(n=function(){return j(e)},r=e.debounce,function(){clearTimeout(i),i=setTimeout((function(){return n()}),r)}),u=e.events=t({input:t({},o&&o.input)},e.resultsList&&{list:o?t({},o.list):{}}),a={input:{input:function(){s()},keydown:function(t){!function(e,t){switch(e.keyCode){case 40:case 38:e.preventDefault(),40===e.keyCode?A(t):k(t);break;case 13:t.submit||e.preventDefault(),t.cursor>=0&&L(t,e);break;case 9:t.resultsList.tabSelect&&t.cursor>=0&&L(t,e);break;case 27:t.input.value="",w(t)}}(t,e)},blur:function(){w(e)}},list:{mousedown:function(e){e.preventDefault()},click:function(t){!function(e,t){var n=t.resultItem.tag.toUpperCase(),r=Array.from(t.list.querySelectorAll(n)),i=e.target.closest(n);i&&i.nodeName===n&&L(t,e,r.indexOf(i))}(t,e)}}};S(a,(function(t,n){(e.resultsList||"input"===n)&&(u[t][n]||(u[t][n]=a[t][n]))})),S(u,(function(t,n){e[t].addEventListener(n,u[t][n])}))};function E(e){var n=this;return new Promise((function(r,i){var o,s,u;if(o=e.placeHolder,u={role:"combobox","aria-owns":(s=e.resultsList).id,"aria-haspopup":!0,"aria-expanded":!1},a(e.input,t(t({"aria-controls":s.id,"aria-autocomplete":"both"},o&&{placeholder:o}),!e.wrapper&&t({},u))),e.wrapper&&(e.wrapper=a("div",t({around:e.input,class:e.name+"_wrapper"},u))),s&&(e.list=a(s.tag,t({dest:[s.destination,s.position],id:s.id,role:"listbox",hidden:"hidden"},s.class&&{class:s.class}))),T(e),e.data.cache)return d(e).then((function(e){try{return c.call(n)}catch(e){return i(e)}}),i);function c(){return f("init",e),r()}return c.call(n)}))}function x(e){var t=e.prototype;t.init=function(){E(this)},t.start=function(e){j(this,e)},t.unInit=function(){if(this.wrapper){var e=this.wrapper.parentNode;e.insertBefore(this.input,this.wrapper),e.removeChild(this.wrapper)}var t;S((t=this).events,(function(e,n){t[e].removeEventListener(n,t.events[e][n])}))},t.open=function(){g(this)},t.close=function(){w(this)},t.goTo=function(e){O(e,this)},t.next=function(){A(this)},t.previous=function(){k(this)},t.select=function(e){L(this,null,e)},t.search=function(e,t,n){return p(e,t,n)}}return function e(t){this.options=t,this.id=e.instances=(e.instances||0)+1,this.name="autoComplete",this.wrapper=1,this.threshold=1,this.debounce=0,this.resultsList={position:"afterend",tag:"ul",maxResults:5},this.resultItem={tag:"li"},function(e){var t=e.name,r=e.options,i=e.resultsList,o=e.resultItem;for(var s in r)if("object"===n(r[s]))for(var a in e[s]||(e[s]={}),r[s])e[s][a]=r[s][a];else e[s]=r[s];e.selector=e.selector||"#"+t,i.destination=i.destination||e.selector,i.id=i.id||t+"_list_"+e.id,o.id=o.id||t+"_result",e.input=u(e.selector)}(this),x.call(this,e),E(this)}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).autoComplete=t();

// autoComplete.js CSS
appendCss("https://cdnjs.cloudflare.com/ajax/libs/tarekraafat-autocomplete.js/10.2.7/css/autoComplete.min.css#sha512-Cl6P91twTLis4a7MT/NkD886Dg7VMs4whSKEKDnCAl5gE6m8lCIENcyZBpbV8d/+KZV77POP5qWrPuwA9/EZAQ==");

// setup autoComplete
const autoCompleteJS = new autoComplete({
    data: {
        src: promptList,
        cache: true,
    },
    selector: "textarea",
    resultsList: {
        render: true,
    },
    events: {
        input: {
            focus() {
                if (autoCompleteJS.input.value.length) autoCompleteJS.start();
            },
            selection(event) {
                autoCompleteJS.input.blur();
                const feedback = event.detail;
                const selection = feedback.selection.value;
                autoCompleteJS.input.value = selection;
            },
            keydown(event) {
                // Not processed during IME conversion
                if (event.isComposing || event.keyCode === 229) {
                    return;
                }

                if (event.key == "Tab") {
                    event.preventDefault();
                    event.stopPropagation();
                    autoCompleteJS.next();
                } else if(event.shiftKey && event.key == "Enter") {
                    event.preventDefault();
                    event.stopPropagation();
                    autoCompleteJS.select();
                    autoCompleteJS.close();
                    document.querySelector("textarea").focus();
                }
            }
        },
    },
});

// Position of suggest list
const style = `
ul[id^=autoComplete_list_] {
    position: fixed;
    top: 4em;
    margin-right: 1em;
    margin-left: auto;
    max-width: 768px;
    width: 100%;
    border: 1px solid black;
}`;
const usableSheet = [...document.styleSheets].slice(-1)[0];
usableSheet.insertRule(style, usableSheet.cssRules.length);
