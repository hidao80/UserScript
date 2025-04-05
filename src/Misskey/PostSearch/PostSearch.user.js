// ==UserScript==
// @name         Misskey v11 Post Log Search
// @name:ja      Misskey v11 投稿ログ検索
// @namespace    https://github.com/hidao80
// @version      1.0.1
// @description  Search through Misskey v11 posts via API
// @description:ja Misskey v11の投稿をAPI経由で検索
// @icon         https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f50d.png
// @author       hidao80
// @match        https://misskey.dev/*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @updateURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/PostSearch/PostSearch.user.js
// @downloadURL  https://github.com/hidao80/UserScript/raw/main/src/Misskey/PostSearch/PostSearch.min.user.js
// ==/UserScript==

(function() {
    /** Constant variable */
    // When debugging: DEBUG = !false;
    const DEBUG = !false;
    const SCRIPT_NAME = 'MissQueryUS';
    /** Suppress debug printing unless in debug mode */
    const console = {};
    ["log","debug","warn","info","error"].forEach((o=>{console[o]=DEBUG?window.console[o]:function(){}}));
    /** The script name is converted to a hexadecimal hash */
    /** indolence.js */
    const $$new=e=>document.createElement(e);
    const $$one=e=>document.querySelector(e);
    const $$all=e=>document.querySelectorAll(e);
    const HASH = Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0).toString(16);
    /** Alias for querySelectorAll */
    const $ = (e)=>{const n=document.querySelectorAll(e);return 1==n.length?n[0]:n};
    console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);

    // Initialize search interface when DOM is ready
    function initializeSearchInterface() {
        // Don't add search interface if it already exists
        if ($$one(`#${SCRIPT_NAME}-search`)) {
            console.debug(`[${SCRIPT_NAME}]: Search interface already exists`);
            return;
        }

        // Get API token from localStorage (v11 format)
        const vuex = localStorage.getItem('vuex');
        const apiToken = vuex ? JSON.parse(vuex).i : null;

        if (!apiToken) {
            console.debug(`[${SCRIPT_NAME}]: No API token found`);
            return;
        }

        // Use misskey.dev as the instance URL
        const instanceUrl = 'https://misskey.dev';

        try {
            // Create search interface
            const searchContainer = $$new('div');
            searchContainer.id = `${SCRIPT_NAME}-search`;
            searchContainer.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: white;
                padding: 10px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 5020;
                font-family: sans-serif;
                max-width: calc(100% - 20px);
                box-sizing: border-box;
                opacity: 0.9;
                transition: all 0.3s ease;
                display: none;
            `;

            // Triple tap detection
            let lastTapTime = 0;
            let tapCount = 0;
            const TAP_THRESHOLD = 500; // milliseconds between taps

            document.addEventListener('click', (e) => {
                // Don't process if clicking on or within the search interface
                if (searchContainer.contains(e.target)) {
                    return;
                }

                const currentTime = new Date().getTime();
                const timeDiff = currentTime - lastTapTime;

                if (timeDiff < TAP_THRESHOLD) {
                    tapCount++;
                    if (tapCount === 3) {
                        // Triple tap detected
                        searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
                        if (searchContainer.style.display === 'block') {
                            searchInput.focus();
                        }
                        tapCount = 0;
                    }
                } else {
                    tapCount = 1;
                }
                lastTapTime = currentTime;
            });

            searchContainer.addEventListener('mouseenter', () => {
                searchContainer.style.opacity = '1';
            });

            searchContainer.addEventListener('mouseleave', () => {
                searchContainer.style.opacity = '0.9';
            });

            // Container for URL input and toggle button
            const urlContainer = $$new('div');
            urlContainer.style.cssText = `
                width: 100%;
                margin-bottom: 10px;
                display: flex;
                gap: 8px;
            `;

            // Create JSON URL input
            const jsonUrlInput = $$new('input');
            jsonUrlInput.type = 'text';
            jsonUrlInput.placeholder = 'JSON ファイルの URL（任意）...';
            jsonUrlInput.style.cssText = `
                flex-grow: 1;
                height: 36px;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                font-size: 14px;
                background: white;
                margin: 0;
            `;

            // Create toggle button
            const toggleButton = $$new('button');
            toggleButton.textContent = '非表示';
            toggleButton.style.cssText = `
                padding: 0 12px;
                height: 36px;
                border: 1px solid #ccc;
                border-radius: 4px;
                background: white;
                cursor: pointer;
                font-size: 14px;
                white-space: nowrap;
                transition: all 0.2s ease;
            `;

            toggleButton.addEventListener('mouseenter', () => {
                toggleButton.style.backgroundColor = '#f0f0f0';
            });

            toggleButton.addEventListener('mouseleave', () => {
                toggleButton.style.backgroundColor = 'white';
            });

            // Toggle functionality
            toggleButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const isEnabled = !jsonUrlInput.disabled;
                jsonUrlInput.disabled = isEnabled;

                if (isEnabled) {
                    // Hide & disable
                    jsonUrlInput.value = '';
                    toggleButton.textContent = '表示';
                    jsonUrlInput.style.backgroundColor = '#f5f5f5';
                    jsonUrlInput.style.color = '#999';
                } else {
                    // Show & enable
                    toggleButton.textContent = '非表示';
                    jsonUrlInput.style.backgroundColor = 'white';
                    jsonUrlInput.style.color = 'black';
                    // Restore saved URL if exists
                    const savedJsonUrl = localStorage.getItem(`${SCRIPT_NAME}-jsonUrl`);
                    if (savedJsonUrl) {
                        jsonUrlInput.value = savedJsonUrl;
                    }
                }
            });

            // Load saved JSON URL
            const savedJsonUrl = localStorage.getItem(`${SCRIPT_NAME}-jsonUrl`);
            if (savedJsonUrl) {
                jsonUrlInput.value = savedJsonUrl;
            }

            // Save URL when changed
            jsonUrlInput.addEventListener('change', () => {
                const url = jsonUrlInput.value.trim();
                if (url && !jsonUrlInput.disabled) {
                    localStorage.setItem(`${SCRIPT_NAME}-jsonUrl`, url);
                    console.debug(`[${SCRIPT_NAME}]: Saved JSON URL to localStorage`);
                } else {
                    localStorage.removeItem(`${SCRIPT_NAME}-jsonUrl`);
                    console.debug(`[${SCRIPT_NAME}]: Removed JSON URL from localStorage`);
                }
            });

            // Create help icon
            const helpIcon = $$new('button');
            helpIcon.type = 'button';
            helpIcon.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>`;
            helpIcon.style.cssText = `
                cursor: pointer;
                flex-shrink: 0;
                color: #666;
                padding: 6px;
                border-radius: 4px;
                transition: all 0.2s ease;
                height: 36px;
                width: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                border: 1px solid #ccc;
                background: white;
            `;

            helpIcon.addEventListener('mouseenter', () => {
                helpIcon.style.backgroundColor = '#f0f0f0';
            });

            helpIcon.addEventListener('mouseleave', () => {
                helpIcon.style.backgroundColor = 'white';
            });

            // Create help modal
            const helpModal = $$new('div');
            helpModal.id = `${SCRIPT_NAME}-help-modal`;
            helpModal.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100dvw;
                height: 100dvh;
                background: rgba(0, 0, 0, 0.7);
                z-index: 5050;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            const helpContent = $$new('div');
            helpContent.style.cssText = `
                position: relative;
                width: 90%;
                max-width: 90%;
                margin: 40px auto;
                max-height: 90%;
                height: auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transform: translateY(-20px);
                transition: transform 0.3s ease;
                overflow-y: scroll;
            `;

            helpContent.innerHTML = `
                <h2 style="margin-top: 0; margin-bottom: 20px; color: #333;">投稿検索の使い方</h2>
                <div style="color: #666; line-height: 1.6;">
                    <h3 style="color: #333; margin: 16px 0 8px;">検索インターフェースの表示</h3>
                    <p>ページ上の任意の場所をトリプルクリックすると、検索インターフェースの表示/非表示を切り替えられます。</p>

                    <h3 style="color: #333; margin: 16px 0 8px;">JSONファイルの設定</h3>
                    <ol>
                        <li>投稿をJSONファイルとしてエクスポートし、アクセス可能な場所にホストします。Misskey内の自分のストレージ内でも構いません。</li>
                        <li>入力フィールドにJSONファイルのURLを入力します</li>
                        <li>URLは自動的に保存され、次回以降も使用できます</li>
                    </ol>
                    <h3 style="color: #333; margin: 16px 0 8px;">JSONフォーマット</h3>
                    <p>JSONファイルは以下の構造を持つ投稿オブジェクトの配列である必要があります：</p>
                    <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto;">[
    {
        "text": "投稿内容",
        "createdAt": "2023-01-01T00:00:00.000Z"
    },
    ...
]</pre>

                    <h3 style="color: #333; margin: 16px 0 8px;">投稿の検索</h3>
                    <ol>
                    <li>検索ボックスに検索キーワードを入力します</li>
                    <li>入力に応じて結果が自動的に更新されます</li>
                    <li>結果は日付の降順で表示されます</li>
                    </ol>
                    <h3 style="color: #333; margin: 16px 0 8px;">URL入力オプション</h3>
                    <p>非表示/表示ボタンを使用して、URL入力を一時的に無効にできます</p>
                </div>
                <button style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    padding: 5px;
                    line-height: 1;
                ">×</button>
            `;

            // Close button click handler
            const closeButton = helpContent.querySelector('button');
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                helpModal.style.opacity = '0';
                helpContent.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    helpModal.style.display = 'none';
                }, 300);
            });

            // Handle help icon click
            const showHelp = (e) => {
                e.preventDefault();
                e.stopPropagation();
                helpModal.style.display = 'block';
                requestAnimationFrame(() => {
                    helpModal.style.opacity = '1';
                    helpContent.style.transform = 'translateY(0)';
                });
            };

            helpIcon.onclick = showHelp;

            // Close modal on background click
            helpModal.addEventListener('click', (e) => {
                if (e.target === helpModal) {
                    closeButton.click();
                }
            });

            helpModal.appendChild(helpContent);
            document.body.appendChild(helpModal);

            searchContainer.style.width = '300px';

            urlContainer.appendChild(jsonUrlInput);
            urlContainer.appendChild(toggleButton);
            urlContainer.appendChild(helpIcon);

            const searchInput = $$new('input');
            searchInput.type = 'text';
            searchInput.placeholder = '投稿を検索...';
            searchInput.style.cssText = `
                width: 100%;
                padding: 8px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                font-size: 14px;
                transition: all 0.3s ease;
            `;

            const resultsContainer = $$new('div');
            resultsContainer.style.cssText = `
                max-height: 400px;
                overflow-y: auto;
                font-size: 14px;
                width: 100%;
                box-sizing: border-box;
                transition: all 0.3s ease;
            `;

            searchContainer.appendChild(urlContainer);
            searchContainer.appendChild(searchInput);
            searchContainer.appendChild(resultsContainer);
            document.body.appendChild(searchContainer);

            // Search function
            async function searchPosts(query) {
                if (!query) {
                    resultsContainer.innerHTML = '';
                    return;
                }

                try {
                    console.debug(`[${SCRIPT_NAME}]: Searching for: ${query}`);

                    let jsonData = null;
                    const jsonUrl = localStorage.getItem(`${SCRIPT_NAME}-jsonUrl`);

                    if (jsonUrl) {
                        try {
                            const jsonText = await readFile(jsonUrl);

                            try {
                                // Check Content-Type
                                if (jsonText.startsWith('<!DOCTYPE html>') || jsonText.startsWith('<html>')) {
                                    throw new Error('HTMLファイルが指定されています。JSONファイルを指定してください。');
                                }

                                // Parse as JSON
                                jsonData = JSON.parse(jsonText);

                                // Validate data format
                                if (typeof jsonData !== 'object') {
                                    throw new Error('不正なJSONフォーマットです');
                                }
                            } catch (parseError) {
                                console.error(`[${SCRIPT_NAME}]: JSON parse error:`, parseError);
                                throw new Error('JSONファイルのパースに失敗しました。有効なJSONファイルを指定してください。');
                            }
                            console.debug(`[${SCRIPT_NAME}]: Loaded and validated JSON data from URL`);
                        } catch (error) {
                            console.error(`[${SCRIPT_NAME}]: Error loading JSON:`, error);
                            resultsContainer.innerHTML = `<div style="color: red;">JSONの読み込みエラー: ${error.message}</div>`;
                            return;
                        }
                    }
                    if (!jsonData) {
                        throw new Error('検索するJSONファイルのURLを指定してください');
                    }

                    if (!Array.isArray(jsonData)) {
                        throw new Error('JSONファイルは投稿データの配列である必要があります');
                    }

                    // Search posts in JSON data
                    const searchResults = jsonData.filter(post => {
                        // Skip posts without text content
                        if (!post.text) return false;

                        // Case-insensitive search
                        return post.text.toLowerCase().includes(query.toLowerCase());
                    })
                    // Sort by date in descending order
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    console.debug(`[${SCRIPT_NAME}]: Found ${searchResults.length} results`);
                    resultsContainer.innerHTML = searchResults.map(post => `
                        <div style="margin-bottom: 10px; padding: 8px; border: 1px solid #eee; border-radius: 4px; background: white;">
                            <div style="margin-bottom: 5px; color: #666; font-size: 12px;">
                                ${new Date(post.createdAt).toLocaleString()}
                            </div>
                            <div style="white-space: pre-wrap; word-break: break-all;">${post.text || ''}</div>
                        </div>
                    `).join('');

                    if (searchResults.length === 0) {
                        resultsContainer.innerHTML = '<div style="color: #666;">検索結果がありません</div>';
                    }
                } catch (error) {
                    console.error(`[${SCRIPT_NAME}]: Error searching posts:`, error);
                    resultsContainer.innerHTML = `<div style="color: red;">エラー: ${error.message}</div>`;
                }
            }

            // Debounce function
            function debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }

            // Add search event listener with debouncing
            const debouncedSearch = debounce(searchPosts, 300);
            searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));

            console.debug(`[${SCRIPT_NAME}]: Search interface initialized`);

        } catch (error) {
            console.error(`[${SCRIPT_NAME}]: Script error:`, error);
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSearchInterface);
    } else {
        initializeSearchInterface();
    }

    // Handle SPA navigation
    const observer = new MutationObserver((mutations) => {
        if (!$$one(`#${SCRIPT_NAME}-search`)) {
            console.debug(`[${SCRIPT_NAME}]: Reinitializing search interface after navigation`);
            initializeSearchInterface();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    /**
     * Function to load file
     * @param {string} url - URL of the file
     * @returns {Promise<string>} - File contents
     */
    function readFile(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: (response) => {
                    if (response.status === 200) {
                        resolve(response.responseText);
                    } else {
                        reject(new Error(`ファイルの読み込みに失敗しました: ${response.status}`));
                    }
                },
                onerror: () => reject(new Error('ファイルの読み込み中にエラーが発生しました'))
            });
        });
    }
})();
