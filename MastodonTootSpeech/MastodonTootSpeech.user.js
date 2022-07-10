/*
Licence: MIT

Copyright 2022 hidao80

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// ==UserScript==
// @name        MastodonTootSpeach
// @description UserScript that uses the Speech API to read out new toots in Mastodon's home timeline.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @author      hidao80
// @version     1.5
// @namespace   https://github.com/hidao80/UserScript
// @icon        data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjQ0Ljg1NzcxIgogICBoZWlnaHQ9IjIzMy45ODI3NCIKICAgdmlld0JveD0iMCAwIDY0Ljc4NTI2OCA2MS45MDc5MzQiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzUiCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMS4xICgzYmY1YWUwZDI1LCAyMDIxLTA5LTIwKSIKICAgc29kaXBvZGk6ZG9jbmFtZT0ibG9nby5zdmciCiAgIGlua3NjYXBlOmV4cG9ydC1maWxlbmFtZT0iQzpcVXNlcnNcaGlkYW9cT25lRHJpdmVccHJpdmF0ZVxwcm9qZWN0XGxvZ28zMi5wbmciCiAgIGlua3NjYXBlOmV4cG9ydC14ZHBpPSIyMDAuNzIiCiAgIGlua3NjYXBlOmV4cG9ydC15ZHBpPSIyMDAuNzIiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc3IgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9InRydWUiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIzLjExMDg1ODYiCiAgICAgaW5rc2NhcGU6Y3g9IjEwNi44ODM2OCIKICAgICBpbmtzY2FwZTpjeT0iMTAzLjY2OTEzIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTg0NSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDgxIgogICAgIGlua3NjYXBlOndpbmRvdy14PSI0MzciCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjYwMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMiIKICAgICB1bml0cz0icHgiCiAgICAgbG9jay1tYXJnaW5zPSJmYWxzZSIKICAgICBmaXQtbWFyZ2luLXRvcD0iMCIKICAgICBmaXQtbWFyZ2luLWxlZnQ9IjAiCiAgICAgZml0LW1hcmdpbi1yaWdodD0iMCIKICAgICBmaXQtbWFyZ2luLWJvdHRvbT0iMCIgLz4KICA8ZGVmcwogICAgIGlkPSJkZWZzMiIgLz4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjQuNDI1MTk1LC0yOS41NzIwNCkiPgogICAgPGcKICAgICAgIGlkPSJnMjgiCiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMS4wMjAwMTA1LC04OS45MTYwNDMpIj4KICAgICAgPGcKICAgICAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgICAgIGlkPSJsYXllcjEtMiI+CiAgICAgICAgPHJlY3QKICAgICAgICAgICBzdHlsZT0iZmlsbDojZmZmZjAwO3N0cm9rZS13aWR0aDowLjI2NDU4MyIKICAgICAgICAgICBpZD0icmVjdDM1NiIKICAgICAgICAgICB3aWR0aD0iMC4zNDAyMDYyMSIKICAgICAgICAgICBoZWlnaHQ9IjEuMzYwODI0OCIKICAgICAgICAgICB4PSIyOS4yNTc3MzIiCiAgICAgICAgICAgeT0iMTM0LjM4MTQ0IgogICAgICAgICAgIHJ5PSIwLjE3MDEwMzEiIC8+CiAgICAgIDwvZz4KICAgICAgPGcKICAgICAgICAgaWQ9ImxheWVyMiIKICAgICAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDIiPgogICAgICAgIDxyZWN0CiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2M0NTcwZTtmaWxsLW9wYWNpdHk6MC43NztmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6I2Y5OWI1YztzdHJva2Utd2lkdGg6MDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eTowLjk4IgogICAgICAgICAgIGlkPSJyZWN0MzEtNS0wIgogICAgICAgICAgIHdpZHRoPSIxNi4xNjI5NzkiCiAgICAgICAgICAgaGVpZ2h0PSI0Ny4xOTExOTMiCiAgICAgICAgICAgeD0iMTQyLjM2MDU1IgogICAgICAgICAgIHk9Ii03Mi42MzYzOTgiCiAgICAgICAgICAgcnk9IjAiCiAgICAgICAgICAgdHJhbnNmb3JtPSJyb3RhdGUoOTApIgogICAgICAgICAgIGlua3NjYXBlOmV4cG9ydC1maWxlbmFtZT0iQzpcVXNlcnNcaGlkYW9cT25lRHJpdmVccHJpdmF0ZVxwcm9qZWN0XGxvZ28zMi5wbmciCiAgICAgICAgICAgaW5rc2NhcGU6ZXhwb3J0LXhkcGk9IjEyLjU0IgogICAgICAgICAgIGlua3NjYXBlOmV4cG9ydC15ZHBpPSIxMi41NCIgLz4KICAgICAgICA8cmVjdAogICAgICAgICAgIHN0eWxlPSJmaWxsOiNmNzZlMTE7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLXdpZHRoOjAuMzI4MjkiCiAgICAgICAgICAgaWQ9InJlY3QzMSIKICAgICAgICAgICB3aWR0aD0iMTcuODU2NjY1IgogICAgICAgICAgIGhlaWdodD0iNjEuOTA3OTMyIgogICAgICAgICAgIHg9IjI1LjUxNTQ2MyIKICAgICAgICAgICB5PSIxMTkuNDg4MDgiCiAgICAgICAgICAgcnk9IjguOTI4MzMyMyIKICAgICAgICAgICBpbmtzY2FwZTpleHBvcnQtZmlsZW5hbWU9IkM6XFVzZXJzXGhpZGFvXE9uZURyaXZlXHByaXZhdGVccHJvamVjdFxsb2dvMzIucG5nIgogICAgICAgICAgIGlua3NjYXBlOmV4cG9ydC14ZHBpPSIxMi41NCIKICAgICAgICAgICBpbmtzY2FwZTpleHBvcnQteWRwaT0iMTIuNTQiIC8+CiAgICAgICAgPHJlY3QKICAgICAgICAgICBzdHlsZT0iZmlsbDojZjc2ZTExO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZS13aWR0aDowLjMyODI5IgogICAgICAgICAgIGlkPSJyZWN0MzEtMyIKICAgICAgICAgICB3aWR0aD0iMTcuODU2NjY1IgogICAgICAgICAgIGhlaWdodD0iNjEuOTA3OTMyIgogICAgICAgICAgIHg9IjU0Ljc4MzI3NiIKICAgICAgICAgICB5PSIxMTkuNDg4MDgiCiAgICAgICAgICAgcnk9IjguOTI4MzMyMyIKICAgICAgICAgICBpbmtzY2FwZTpleHBvcnQtZmlsZW5hbWU9IkM6XFVzZXJzXGhpZGFvXE9uZURyaXZlXHByaXZhdGVccHJvamVjdFxsb2dvMzIucG5nIgogICAgICAgICAgIGlua3NjYXBlOmV4cG9ydC14ZHBpPSIxMi41NCIKICAgICAgICAgICBpbmtzY2FwZTpleHBvcnQteWRwaT0iMTIuNTQiIC8+CiAgICAgICAgPHJlY3QKICAgICAgICAgICBzdHlsZT0iZmlsbDojYzQ1NzBlO2ZpbGwtb3BhY2l0eTowLjc3O2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZS13aWR0aDowLjIyNDQ0NCIKICAgICAgICAgICBpZD0icmVjdDMxLTciCiAgICAgICAgICAgd2lkdGg9IjExLjIyNjgwNCIKICAgICAgICAgICBoZWlnaHQ9IjQ2LjAyNDcxOSIKICAgICAgICAgICB4PSI3OC45Mjc4MzQiCiAgICAgICAgICAgeT0iMTM1LjEyNTUiCiAgICAgICAgICAgcnk9IjUuODU0NjQ5MSIKICAgICAgICAgICBpbmtzY2FwZTpleHBvcnQtZmlsZW5hbWU9IkM6XFVzZXJzXGhpZGFvXE9uZURyaXZlXHByaXZhdGVccHJvamVjdFxsb2dvMzIucG5nIgogICAgICAgICAgIGlua3NjYXBlOmV4cG9ydC14ZHBpPSIxMi41NCIKICAgICAgICAgICBpbmtzY2FwZTpleHBvcnQteWRwaT0iMTIuNTQiIC8+CiAgICAgICAgPHJlY3QKICAgICAgICAgICBzdHlsZT0iZmlsbDojZjk5YjVjO2ZpbGwtb3BhY2l0eTowLjk4O3N0cm9rZTojZjk5YjVjO3N0cm9rZS13aWR0aDoxLjIxO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjAuOTgiCiAgICAgICAgICAgaWQ9InJlY3QyNjA0OCIKICAgICAgICAgICB3aWR0aD0iMTAuOTA0ODkzIgogICAgICAgICAgIGhlaWdodD0iMTAuMzY5ODA2IgogICAgICAgICAgIHg9Ijc4LjcyMDU4MSIKICAgICAgICAgICB5PSIxMjAuMTMwNSIKICAgICAgICAgICByeT0iNS4xODQ5MDMxIgogICAgICAgICAgIGlua3NjYXBlOmV4cG9ydC1maWxlbmFtZT0iQzpcVXNlcnNcaGlkYW9cT25lRHJpdmVccHJpdmF0ZVxwcm9qZWN0XGxvZ28zMi5wbmciCiAgICAgICAgICAgaW5rc2NhcGU6ZXhwb3J0LXhkcGk9IjEyLjU0IgogICAgICAgICAgIGlua3NjYXBlOmV4cG9ydC15ZHBpPSIxMi41NCIgLz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MastodonTootSpeach/MastodonTootSpeech.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MastodonTootSpeach/MastodonTootSpeech.user.js
// ==/UserScript==

// Initialization of reading voice
const synth = window.speechSynthesis;
const WIN = "Kyoko";
const EDGE = "Nanami";
const GOOGLE_JAPANIESE = "Google 日本語";
const ENGLISH = "Aria";
const getVoice = (n) => synth.getVoices().find((v) => v.name.indexOf(n) != -1);
const utter = new SpeechSynthesisUtterance();
// utterrate = 1;
// uttervolume = 20;

// Voice tones are given priority to those found from left to right.
const setVoice = () => {
    utter.voice = getVoice(EDGE) || getVoice(GOOGLE_JAPANIESE) || getVoice(WIN) || getVoice(ENGLISH);
};

const timer = setInterval(v => {
// Designation of lanes to watch for posts
    const parentElment = document.querySelector('[aria-label="ホーム"]');
    if (parentElment) {
        clearInterval(timer);

        setVoice();

        // If there is a change in the lane,
        // check if it is the first and read it out if the first has changed
        function topTootId() {
            return parentElment.querySelector("article")?.dataset.id;
        };

        let oldTootId = topTootId();
        // console.log(oldTootId);
        var mo = new MutationObserver(() => {
            var newTootId = topTootId();
            // console.log(newTootId);
            if (newTootId != oldTootId) {
                oldTootId = newTootId;
                speech();
            }
        });
        mo.observe(parentElment.querySelector(".item-list"), { childList: true, subtree: true });

        // Trimming the readout
        function speech() {
            // Cancel reading
            synth.cancel();

            // Get toot
            const elem = parentElment?.querySelector(".status__wrapper");

            if (elem?.querySelector(".display-name__html") == undefined) return;

            // Trimming date and user ID
            const name = elem?.querySelector(".display-name__html").textContent + "さんのトゥート。";
            const toot = elem?.getAttribute('aria-label')?.split(', ');

            // Retrieve any comma in the message, even if there is a comma in the message.
            let message = '';
            for (let i = 0; i < toot?.length; i++) {
                if (i != 0 && i != (toot.length - 1) && i != (toot.length - 2)) {
                    message += toot[i];
                }
            }

            utter.text = name;
            utter.text += message
                .replace(/。+/g, "。") // Combine multiple consecutive readings into one.
                .replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g, " ") // Remove URL
            ;

            // Toot reads.
            synth.speak(utter);
        }

        // When a voice color object is loaded,
        // the voice color is set to "Nanami" for Edge.
        synth.onvoiceschanged = setVoice;

        speech();
    }
}, 500);
