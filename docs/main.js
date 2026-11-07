(() => {
  var LANGS = ["en", "ja", "zh-CN", "zh-TW", "es", "ru", "de"];
  var META = {
    en: {
      title: "UserScript by hidao80 — UserScripts for Misskey, Mastodon & the web",
      description: "A collection of 33 free UserScripts for Misskey, Mastodon and everyday websites. Install with one click in Tampermonkey or Userscripts.",
      themeLabel: "Toggle color theme",
      install: "Install"
    },
    ja: {
      title: "UserScript by hidao80 — Misskey・Mastodon・Web 向け UserScript 集",
      description: "Misskey、Mastodon、普段使いの Web サイト向けの無料 UserScript 33 本。Tampermonkey や Userscripts にワンクリックでインストールできます。",
      themeLabel: "カラーテーマを切り替え",
      install: "インストール"
    },
    "zh-CN": {
      title: "UserScript by hidao80 — 适用于 Misskey、Mastodon 和网页的用户脚本",
      description: "33 个适用于 Misskey、Mastodon 及日常网站的免费用户脚本。可在 Tampermonkey 或 Userscripts 中一键安装。",
      themeLabel: "切换颜色主题",
      install: "安装"
    },
    "zh-TW": {
      title: "UserScript by hidao80 — 適用於 Misskey、Mastodon 與網頁的使用者腳本",
      description: "33 個適用於 Misskey、Mastodon 及日常網站的免費使用者腳本。可在 Tampermonkey 或 Userscripts 中一鍵安裝。",
      themeLabel: "切換色彩主題",
      install: "安裝"
    },
    es: {
      title: "UserScript by hidao80 — UserScripts para Misskey, Mastodon y la web",
      description: "Una colección de 33 UserScripts gratuitos para Misskey, Mastodon y sitios web cotidianos. Instálalos con un clic en Tampermonkey o Userscripts.",
      themeLabel: "Cambiar tema de color",
      install: "Instalar"
    },
    ru: {
      title: "UserScript by hidao80 — пользовательские скрипты для Misskey, Mastodon и веба",
      description: "Коллекция из 33 бесплатных пользовательских скриптов для Misskey, Mastodon и повседневных сайтов. Устанавливаются в один клик в Tampermonkey или Userscripts.",
      themeLabel: "Переключить цветовую тему",
      install: "Установить"
    },
    de: {
      title: "UserScript by hidao80 — UserScripts für Misskey, Mastodon & das Web",
      description: "Eine Sammlung von 33 kostenlosen UserScripts für Misskey, Mastodon und alltägliche Websites. Mit einem Klick in Tampermonkey oder Userscripts installierbar.",
      themeLabel: "Farbschema wechseln",
      install: "Installieren"
    }
  };

  var root = document.documentElement;

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) {}
  }

  // Language
  var ml = new MultilanguageJS({ languages: LANGS, defaultLanguage: "en" });
  var langSelect = document.getElementById("lang-select");
  var themeToggle = document.getElementById("theme-toggle");

  function applyMeta(lang) {
    var m = META[lang] || META.en;
    document.title = m.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", m.description);
    if (themeToggle) themeToggle.setAttribute("aria-label", m.themeLabel);
    // 各スクリプトカードで繰り返す短い文言は data-i18n で一括置換する
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      var text = m[el.dataset.i18n];
      if (text) el.textContent = text;
    });
  }

  // ブラウザの言語 (例: zh-Hant-TW, zh-HK, de-AT) を対応言語へ寄せる
  function detectLanguage() {
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var tag = langs[i].toLowerCase();
      if (tag.indexOf("zh") === 0) {
        return /hant|tw|hk|mo/.test(tag) ? "zh-TW" : "zh-CN";
      }
      var base = tag.split("-")[0];
      if (LANGS.indexOf(base) !== -1) return base;
    }
    return "en";
  }

  function setLanguage(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "en";
    ml.setLanguage(lang);
    applyMeta(lang);
    root.setAttribute("lang", lang);
    if (langSelect) langSelect.value = lang;
    storageSet("lang", lang);
  }

  setLanguage(storageGet("lang") || detectLanguage());

  if (langSelect) {
    langSelect.addEventListener("change", (e) => setLanguage(e.target.value));
  }

  // Theme: 現在のテーマ (保存済み、なければ OS 設定) の反対へ切り替えて保存する
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      var current = root.dataset.theme
        || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      storageSet("theme", next);
    });
  }
})();
