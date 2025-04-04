// ==UserScript==
// @name         Misskey v11 Post Log Search
// @name:ja      Misskey v11 投稿ログ検索
// @namespace    https://github.com/hidao80
// @version      0.1.0
// @description  Search through Misskey v11 posts via API
// @description:ja Misskey v11の投稿をAPI経由で検索
// @icon         https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f50d.png
// @author       hidao80
// @match        https://misskey.dev/*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/PostSearch/PostSearch.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/PostSearch/PostSearch.user.js
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
            // ベントーアイコン作成
            const bentoIcon = $$new('div');
            bentoIcon.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="4" y="4" width="4" height="4" rx="1"/>
                    <rect x="10" y="4" width="4" height="4" rx="1"/>
                    <rect x="16" y="4" width="4" height="4" rx="1"/>
                    <rect x="4" y="10" width="4" height="4" rx="1"/>
                    <rect x="10" y="10" width="4" height="4" rx="1"/>
                    <rect x="16" y="10" width="4" height="4" rx="1"/>
                    <rect x="4" y="16" width="4" height="4" rx="1"/>
                    <rect x="10" y="16" width="4" height="4" rx="1"/>
                    <rect x="16" y="16" width="4" height="4" rx="1"/>
                </svg>
            `;
            bentoIcon.style.cssText = `
                cursor: pointer;
                display: none;
                color: #666;
            `;

            searchContainer.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: white;
                padding: 10px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 2147483647;
                font-family: sans-serif;
                max-width: calc(100% - 20px);
                box-sizing: border-box;
                opacity: 0.9;
                transition: all 0.3s ease;
                min-width: 40px;
                min-height: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
            `;

            let isCollapsed = false;
            const collapse = () => {
                isCollapsed = true;
                searchContainer.style.width = '40px';
                searchContainer.style.height = '40px';
                bentoIcon.style.display = 'block';
                jsonUrlInput.style.display = 'none';
                searchInput.style.display = 'none';
                resultsContainer.style.display = 'none';
            };

            const expand = () => {
                isCollapsed = false;
                searchContainer.style.width = '';
                searchContainer.style.height = '';
                bentoIcon.style.display = 'none';
                jsonUrlInput.style.display = 'block';
                searchInput.style.display = 'block';
                resultsContainer.style.display = 'block';
            };

            searchContainer.addEventListener('mouseenter', () => {
                searchContainer.style.opacity = '1';
            });

            searchContainer.addEventListener('mouseleave', () => {
                searchContainer.style.opacity = '0.9';
            });

            // フォーカス管理
            searchContainer.addEventListener('focusout', (e) => {
                if (!searchContainer.contains(e.relatedTarget)) {
                    collapse();
                }
            });

            bentoIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isCollapsed) {
                    expand();
                    searchInput.focus();
                }
            });

            searchContainer.insertBefore(bentoIcon, searchContainer.firstChild);

            // Create JSON URL input
            const jsonUrlInput = $$new('input');
            jsonUrlInput.type = 'text';
            jsonUrlInput.placeholder = 'JSONファイルのURL（省略可）...';
            // 保存されたJSONのURLを読み込む
            const savedJsonUrl = localStorage.getItem(`${SCRIPT_NAME}-jsonUrl`);
            if (savedJsonUrl) {
                jsonUrlInput.value = savedJsonUrl;
            }

            // URLが変更されたら保存
            jsonUrlInput.addEventListener('change', () => {
                const url = jsonUrlInput.value.trim();
                if (url) {
                    localStorage.setItem(`${SCRIPT_NAME}-jsonUrl`, url);
                    console.debug(`[${SCRIPT_NAME}]: Saved JSON URL to localStorage`);
                } else {
                    localStorage.removeItem(`${SCRIPT_NAME}-jsonUrl`);
                    console.debug(`[${SCRIPT_NAME}]: Removed JSON URL from localStorage`);
                }
            });

            jsonUrlInput.style.cssText = `
                width: 300px;
                padding: 8px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                font-size: 14px;
                transition: all 0.3s ease;
            `;

            const searchInput = $$new('input');
            searchInput.type = 'text';
            searchInput.placeholder = '投稿を検索...';
            searchInput.style.cssText = `
                width: 300px;
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
                width: 300px;
                box-sizing: border-box;
                transition: all 0.3s ease;
            `;

            searchContainer.appendChild(jsonUrlInput);
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
                    const jsonUrl = jsonUrlInput.value.trim();
                    
                    if (jsonUrl) {
                        try {
                            const jsonText = await readFile(jsonUrl);
                            
                            try {
                                // Content-Typeをチェック
                                if (jsonText.startsWith('<!DOCTYPE html>') || jsonText.startsWith('<html>')) {
                                    throw new Error('HTMLファイルが指定されました。JSONファイルを指定してください。');
                                }
                                
                                // JSONとしてパース
                                jsonData = JSON.parse(jsonText);
                                
                                // データの形式を確認
                                if (typeof jsonData !== 'object') {
                                    throw new Error('不正なJSONフォーマットです');
                                }
                            } catch (parseError) {
                                console.error(`[${SCRIPT_NAME}]: JSON parse error:`, parseError);
                                throw new Error('JSONファイルの解析に失敗しました。正しいJSONファイルを指定してください。');
                            }
                            console.debug(`[${SCRIPT_NAME}]: Loaded and validated JSON data from URL`);
                        } catch (error) {
                            console.error(`[${SCRIPT_NAME}]: Error loading JSON:`, error);
                            resultsContainer.innerHTML = `<div style="color: red;">JSONの読み込みエラー: ${error.message}</div>`;
                            return;
                        }
                    }
                    if (!jsonData) {
                        throw new Error('検索するには、JSONファイルのURLを指定してください');
                    }

                    if (!Array.isArray(jsonData)) {
                        throw new Error('JSONファイルは投稿データの配列である必要があります');
                    }

                    // JSON内の投稿を検索
                    const searchResults = jsonData.filter(post => {
                        // 投稿の本文がない場合はスキップ
                        if (!post.text) return false;
                        
                        // 大文字小文字を区別せずに検索
                        return post.text.toLowerCase().includes(query.toLowerCase());
                    })
                    // 日付で降順ソート
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
     * ファイルを読み込む関数
     * @param {string} url - ファイルのURL
     * @returns {Promise<string>} - ファイルの内容
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
