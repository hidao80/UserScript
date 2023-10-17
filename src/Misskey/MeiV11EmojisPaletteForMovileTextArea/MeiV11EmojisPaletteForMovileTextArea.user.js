// ==UserScript==
// @name           Mei v11 emojis palette for movile text area
// @description    Add emojis palette to mobile text area of Mei v11 home layout.
// @name:ja        めいv11 モバイル用テキストエリアの絵文字パレット
// @description:ja めいv11用のモバイル版ホームレイアウトのテキストエリアに絵文字パレットを追加します。
// @match          https://misskey.dev/*
// @author         hidao80
// @version        0.3.5
// @namespace      https://github.com/hidao80/UserScript/MeiV11EmojisPaletteForMovileTextArea
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f0cf.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11EmojisPaletteForMovileTextArea/MeiV11EmojisPaletteForMovileTextArea.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/Misskey/MeiV11EmojisPaletteForMovileTextArea/MeiV11EmojisPaletteForMovileTextArea.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';

/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = !false;
const SCRIPT_NAME = 'Mei v11 emojis palette for movile text area';
/** Suppress debug printing unless in debug mode */
const console = {};
["log", "debug", "warn", "info", "error"].map((o => { console[o] = DEBUG ? window.console[o] : function () { } }));
/** The script name is converted to a hexadecimal hash */
const HASH = Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0).toString(16);
/** Alias for querySelectorAll */
const $ = (e) => { const n = document.querySelectorAll(e); return 1 == n.length ? n[0] : n?.length == 0 ? undefined : n };
/** Property batch setting function */
const setProps = (obj, props) => { Object.keys(props).map(key => { obj[key] = props[key] }) }
console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);

const styles = [
    `@font-face {
        font-family: 'hidao-userscript-color-emoji';
        src: local('Noto Color Emoji'), local('Apple Color Emoji'),
        unicode-range: U+1F300-1F6A3, U+1F700-1F773, U+1F780-1F7D4, U+1F800-1F80B, U+1F810-1F847, U+1F850-1F859, U+1F860-1F887, U+1F890-1F8AD, U+1F900-1F90B, U+1F910-1F93E, U+1F940-1F970, U+1F973-1F976, U+1F97A-1F97C, U+1F97E-1F97F, U+1F980-1F991, U+1F9C0, U+1F9D0-1F9E6, U+1F9F0-1F9F9, U+1F9FF, U+1FA00-1FA6D, U+1FA70-1FA74, U+1FA78-1FA7A, U+1FA80-1FA86, U+1FA90-1FAA8, U+1FAB0-1FAB6, U+1FAC0-1FAC2, U+1FAD0-1FAD6, U+1FAE0-1FAEB, U+1FAF0-1FAF4, U+1FBC0-1FBE6, U+1FC2D, U+1FCC0-1FCC7, U+1FCE0-1FCE7, U+1FD00-1FD3E, U+1FD50-1FD88, U+1FD90-1FDCB, U+1FDD0-1FDE4, U+1FDF0-1FE4B, U+1FE50-1FE52, U+1FE54-1FE57, U+1FE5A, U+1FE5C, U+1FE5E, U+1FE64-1FE6E, U+1FE70-1FE74, U+1FE76-1FEFC, U+1FF01-1FF1E, U+1FF24-1FF44, U+1FF48-1FF60, U+1FF63-1FF64, U+1FF68-1FF6C, U+1FF71-1FF7E, U+1FF83-1FF8F, U+1FF93-1FF98, U+1FF9B-1FFA8, U+1FFAB-1FFBE, U+1FFC2-1FFC7, U+1FFCB-1FFE4, U+1FFE8, U+20000-2A6D6, U+2A700-2B734, U+2B740-2B81D, U+2B820-2CEA1, U+2CEB0-2EBE0, U+2EBE1-2EBEA, U+2EBEC-2EDEF, U+2ED01-2ED0D, U+2ED12, U+2ED20-2ED23, U+2ED25-2ED27, U+2ED3E, U+2ED40-2ED5E, U+2ED60-2ED65, U+2ED70-2ED7F, U+2EDA0-2EDA7, U+2EDB0-2EDBF, U+2EDC1-2EDC7, U+2EDD0-2EDDF, U+2EE80-2EEA1, U+2EEA2, U+2EEA4, U+2EEA5, U+2EEA8, U+2EEAB, U+2EEAE, U+2EEB0, U+2EEB5, U+2EEB9, U+2EEBA, U+2EEBD, U+2EEBF, U+2EEC5, U+2EECE, U+2EED0-2EED1, U+2EED4, U+2EED7, U+2EEDB, U+2EEDF, U+2EEE3, U+2EEE7, U+2EEEB, U+2EEEF, U+2EEF3, U+2EEF7, U+2EEFB, U+2EEFF, U+2EF03, U+2EF07, U+2EF0B, U+2EF0F, U+2EF13, U+2EF17, U+2EF1B, U+2EF1F, U+2EF23, U+2EF27, U+2EF2B, U+2EF2F, U+2EF33, U+2EF37, U+2EF3B, U+2EF3F, U+2EF43, U+2F800-2FA1D;
    }`,
    `.noto-color-emoji {
        font-family: "hidao-userscript-color-emoji", sans-serif
    }`,
];

// Wait for content to complete loading.
setTimeout(() => {
    const usableSheet = [...document.styleSheets].slice(-1)[0];

    for (let style of styles) {
        usableSheet.insertRule(style, usableSheet.cssRules.length);
    }
}, 500);

function main() {
    // Immediately hide input candidates when they appear in response to custom emoji tags entered from the emoji palette.
    // It does not respond to manually entered custom emoji tags.
    if ($('div.palette')?.dataset.use) {
        $('body>.mk-autocomplete')?.remove();
        $('div.palette').dataset.use = "";
    }
    // If there is already an emoji palette, nothing is done.
    if ($('div.palette')) {
        console.debug("return!");
        return;
    }
    // If the submission dialog opens
    if ($("body div.modal div.main>div.gafaadew")) {
        console.debug("Open Post Dialog.");
        createEmojiPalette();
    }
    $('textarea')?.classList.add("noto-color-emoji");
}
function switchingTabs(e) {
    [...$(".tab")].map(v => { v.style.opacity = 0.65 });
    e.target.style.opacity = 1;
    [...$(".table")].map(v => { v.style.display = "none" });
    $(".table." + e.target.dataset.category).style.display = "block";
}
function loadEmoji(emoji, category) {
    const table = $('.table.' + category);
    const span = document.createElement("span");
    span.className = `${HASH} emoji noto-color-emoji ${emoji[1]}`;
    setProps(span.style, {
        padding: "0",
        cursor: "pointer",
        margin: "2px",
        display: "inline-grid",
        width: "2.5rem",
        height: "2.5rem",
    });
    // console.log(codepoint);
    if (category === "custom") {
        const img = document.createElement("img");
        img.src = `https://raw.githubusercontent.com/tkmrgit/misskey-emoji/23af0c586f9b047987b45a5716e047feca4f0b01/emoji/${emoji[0]}`;
        img.title = `:${emoji[1]}:`;
        img.alt = `:${emoji[1]}:`;
        img.style.width = "2rem";
        span.appendChild(img);
    } else {
        span.style.fontSize = "2rem";
        span.innerHTML = emoji[0];
    }
    span.addEventListener("click", () => {
        // With a closing colon, only one candidate for pictogram expansion is not displayed.
        const emojiString = category === "custom" ? ":" + emoji[1] + ": " : emoji[0];
        const textArea = $("textarea");
        const cursorPosition = textArea.selectionStart;
        const text = textArea.value;
        const newText = text.substring(0, cursorPosition) + emojiString + text.substring(cursorPosition);
        textArea.value = newText;
        textArea.selectionStart = cursorPosition + emojiString.length;
        textArea.selectionEnd = cursorPosition + emojiString.length;
        // textArea.focus();

        // ダーティ状態にする
        const inputEvent = new Event('input', { bubbles: true });
        textArea.dispatchEvent(inputEvent);

        // Flag with emoji palette.
        // When this flag is set, the mk-autocomplete element is deleted as soon as it is created.
        $('div.palette').dataset.use = true;
    });
    table.appendChild(span);

    return true;
}
function createEmojiPalette() {
    // Create a palette for each emoji category.
    const palette = document.createElement("div");
    palette.className = `${HASH} palette`;
    setProps(palette.style, {
        display: "none",
        width: "100%",
        height: "18em",
        "margin-top": "2em",
    });
    $('body div.modal div.main>div.gafaadew').insertAdjacentElement("beforeend", palette);

    // Create an area to display emoji category selection tabs.
    const tabArea = document.createElement("div");
    tabArea.className = `${HASH} tabArea`;
    setProps(tabArea.style, {
        display: "flex",
        width: "100%",
        height: "2em",
    });
    palette.appendChild(tabArea);

    // Create a emoji category selection tab.
    const createEmojiSelectionTabs = Object.keys(emojis).map(category => {
        const tab = document.createElement("div");
        tab.className = `${HASH} tab`;
        tab.dataset.category = category;
        setProps(tab.style, {
            display: 1,
            fontSize: "1.75em",
            margin: "auto",
            marginTop: "-0.5em",
            opacity: 0.6,
            cursor: "pointer",
        });
        tab.textContent = tabIcons[category];
        tabArea.appendChild(tab);

        // Create a emoji category table.
        const table = document.createElement("div");
        table.className = `${HASH} table ${category}`;
        setProps(table.style, {
            display: "none",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            overflowX: "scroll",
        });
        palette.appendChild(table);
    });
    Promise.all(createEmojiSelectionTabs);

    // Place emoji in the emoji category table.
    Object.keys(emojis).map(category => {
        const loadEmojisPromise = emojis[category].map(emoji => loadEmoji(emoji, category));

        Promise.all(loadEmojisPromise);

        $(`.tab[data-category=${category}]`).addEventListener("click", switchingTabs);
        // When loading is complete, display the palette and open the FACE page.
        $('.modal .main>div .palette').style.display = "block";
        $('.tab[data-category=face]').click();
    });
}

// Each time body and below are drawn, run main() to attempt to add the emoji palette to the posting area.
new MutationObserver(main).observe($('body'), { childList: true });

// A dictionary to name emoji.
const emojis = {
    "custom": [
        ["AI_Yay.png", "yay_ai"],
        ["ablobcat_resonyance.apng", "ablobcat_resonyance"],
        ["blob3c.png", "blob3c"],
        ["blob_super_nod.gif", "blob_super_nod"],
        ["blobamused.png", "blobamused"],
        ["blobangel.png", "blobangel"],
        ["blobaw.png", "blobaww"],
        ["blobcat.png", "blobcat"],
        ["blobcataww.png", "blobcataww"],
        ["blobcatbounce.gif", "blobcatbounce"],
        ["blobcatnodblink.gif", "blobcatnodblink"],
        ["blobcatreachflip.PNG", "blobcatreachflip"],
        ["blobcatsweatflips.apng", "blobcatsweatflips"],
        ["blobcheerbounce.png", "blobcheerbounce"],
        ["blobhyperthink.png", "blobhyperthink"],
        ["blobok.png", "blobok"],
        ["blobreach.png", "blobreach"],
        ["blobthanks.png", "blobthanks"],
        ["blobthumbsup.png", "blobthumbsup"],
        ["blobyes.png", "blobyes"],
        ["cloudflare.png", "cloudflare"],
        ["dame.svg", "dame"],
        ["desuka.svg", "desuka"],
        ["desuyo.svg", "desuyo"],
        ["dore.svg", "dore"],
        ["emoit.svg", "emoit"],
        ["eti.svg", "eti"],
        ["fuji.png", "fujifilm"],
        ["fujitsu.png", "fujitsu"],
        ["gateway.svg", "gateway"],
        ["goannzenni.png", "goannzenni"],
        ["haisho.png", "haisho"],
        ["icon-qiita.png", "icon_qiita"],
        ["ii.svg", "ii"],
        ["kawaii.svg", "kawaii"],
        ["kore.svg", "kore"],
        ["leica.png", "leica"],
        ["letterpack-plus[1].png", "letterpack_plus[1]"],
        ["meimei.png", "meimei"],
        ["odaijini.png", "odaijini"],
        ["ohayo.png", "ohayo"],
        ["otsukaresama.png", "otsukaresama"],
        ["oyasumi.png", "oyasumi"],
        ["qiitan.png", "qiitan"],
        ["rec.png", "rec"],
        ["ryoukai.png", "ryoukai"],
        ["seyana.png", "seyana"],
        ["sodane.svg", "sodane"],
        ["sore.svg", "sore"],
        ["spam.png", "spam"],
        ["sugoi.png", "sugoi"],
        ["suki.svg", "suki"],
        ["surprised_ai.png", "surprised_ai"],
        ["syuilo.png", "syuilo"],
        ["tapioka.png", "tapioka"],
        ["tashikani.png", "tashikani"],
        ["taso.svg", "taso"],
        ["tere.svg", "tere"],
        ["thinkhappy.png", "thinkhappy"],
        ["thinking__ai.png", "thinking__ai"],
        ["thinking__ai.webp", "thinking__ai"],
        ["threads.png", "threads"],
        ["twinsparrot.gif", "twinsparrot"],
        ["ultrafastparrot.gif", "ultrafastparrot"],
        ["vscode.png", "vscode"],
        ["wakarimi.png", "wakarimi"],
        ["x-dot-com.png", "x_dot_com"],
        ["x68k.png", "x68k"],
        ["xtu.svg", "xtu"],
        ["yabaiwayo.png", "yabaiwayo"],
        ["zabunton_present.png", "zabunton_present"],
        ["zabuton_steal.png", "zabuton_steal"],
    ],
    "face": [["😀", "grinning"], ["😬", "grimacing"], ["😁", "grin"], ["😂", "joy"], ["🤣", "rofl"], ["🥳", "partying"], ["😃", "smiley"], ["😄", "smile"], ["😅", "sweat_smile"], ["🥲", "smiling_face_with_tear"], ["😆", "laughing"], ["😇", "innocent"], ["😉", "wink"], ["😊", "blush"], ["🙂", "slightly_smiling_face"], ["🙃", "upside_down_face"], ["☺️", "relaxed"], ["😋", "yum"], ["😌", "relieved"], ["😍", "heart_eyes"], ["🥰", "smiling_face_with_three_hearts"], ["😘", "kissing_heart"], ["😗", "kissing"], ["😙", "kissing_smiling_eyes"], ["😚", "kissing_closed_eyes"], ["😜", "stuck_out_tongue_winking_eye"], ["🤪", "zany"], ["🤨", "raised_eyebrow"], ["🧐", "monocle"], ["😝", "stuck_out_tongue_closed_eyes"], ["😛", "stuck_out_tongue"], ["🤑", "money_mouth_face"], ["🤓", "nerd_face"], ["🥸", "disguised_face"], ["😎", "sunglasses"], ["🤩", "star_struck"], ["🤡", "clown_face"], ["🤠", "cowboy_hat_face"], ["🤗", "hugs"], ["😏", "smirk"], ["😶", "no_mouth"], ["😐", "neutral_face"], ["😑", "expressionless"], ["😒", "unamused"], ["🙄", "roll_eyes"], ["🤔", "thinking"], ["🤥", "lying_face"], ["🤭", "hand_over_mouth"], ["🤫", "shushing"], ["🤬", "symbols_over_mouth"], ["🤯", "exploding_head"], ["😳", "flushed"], ["😞", "disappointed"], ["😟", "worried"], ["😠", "angry"], ["😡", "rage"], ["😔", "pensive"], ["😕", "confused"], ["🙁", "slightly_frowning_face"], ["☹", "frowning_face"], ["😣", "persevere"], ["😖", "confounded"], ["😫", "tired_face"], ["😩", "weary"], ["🥺", "pleading"], ["😤", "triumph"], ["😮", "open_mouth"], ["😱", "scream"], ["😨", "fearful"], ["😰", "cold_sweat"], ["😯", "hushed"], ["😦", "frowning"], ["😧", "anguished"], ["😢", "cry"], ["😥", "disappointed_relieved"], ["🤤", "drooling_face"], ["😪", "sleepy"], ["😓", "sweat"], ["🥵", "hot"], ["🥶", "cold"], ["😭", "sob"], ["😵", "dizzy_face"], ["😲", "astonished"], ["🤐", "zipper_mouth_face"], ["🤢", "nauseated_face"], ["🤧", "sneezing_face"], ["🤮", "vomiting"], ["😷", "mask"], ["🤒", "face_with_thermometer"], ["🤕", "face_with_head_bandage"], ["🥴", "woozy"], ["🥱", "yawning"], ["😴", "sleeping"], ["💤", "zzz"], ["😶‍🌫️", "face_in_clouds"], ["😮‍💨", "face_exhaling"], ["😵‍💫", "face_with_spiral_eyes"], ["🫠", "melting_face"], ["🫢", "face_with_open_eyes_and_hand_over_mouth"], ["🫣", "face_with_peeking_eye"], ["🫡", "saluting_face"], ["🫥", "dotted_line_face"], ["🫤", "face_with_diagonal_mouth"], ["🥹", "face_holding_back_tears"], ["💩", "poop"], ["😈", "smiling_imp"], ["👿", "imp"], ["👹", "japanese_ogre"], ["👺", "japanese_goblin"], ["💀", "skull"], ["👻", "ghost"], ["👽", "alien"], ["🤖", "robot"], ["😺", "smiley_cat"], ["😸", "smile_cat"], ["😹", "joy_cat"], ["😻", "heart_eyes_cat"], ["😼", "smirk_cat"], ["😽", "kissing_cat"], ["🙀", "scream_cat"], ["😿", "crying_cat_face"], ["😾", "pouting_cat"]], "people": [["🤲", "palms_up"], ["🙌", "raised_hands"], ["👏", "clap"], ["👋", "wave"], ["🤙", "call_me_hand"], ["👍", "+1"], ["👎", "-1"], ["👊", "facepunch"], ["✊", "fist"], ["🤛", "fist_left"], ["🤜", "fist_right"], ["✌", "v"], ["👌", "ok_hand"], ["✋", "raised_hand"], ["🤚", "raised_back_of_hand"], ["👐", "open_hands"], ["💪", "muscle"], ["🦾", "mechanical_arm"], ["🙏", "pray"], ["🦶", "foot"], ["🦵", "leg"], ["🦿", "mechanical_leg"], ["🤝", "handshake"], ["☝", "point_up"], ["👆", "point_up_2"], ["👇", "point_down"], ["👈", "point_left"], ["👉", "point_right"], ["🖕", "fu"], ["🖐", "raised_hand_with_fingers_splayed"], ["🤟", "love_you"], ["🤘", "metal"], ["🤞", "crossed_fingers"], ["🖖", "vulcan_salute"], ["✍", "writing_hand"], ["🫰", "hand_with_index_finger_and_thumb_crossed"], ["🫱", "rightwards_hand"], ["🫲", "leftwards_hand"], ["🫳", "palm_down_hand"], ["🫴", "palm_up_hand"], ["🫵", "index_pointing_at_the_viewer"], ["🫶", "heart_hands"], ["🤏", "pinching_hand"], ["🤌", "pinched_fingers"], ["🤳", "selfie"], ["💅", "nail_care"], ["👄", "lips"], ["🫦", "biting_lip"], ["🦷", "tooth"], ["👅", "tongue"], ["👂", "ear"], ["🦻", "ear_with_hearing_aid"], ["👃", "nose"], ["👁", "eye"], ["👀", "eyes"], ["🧠", "brain"], ["🫀", "anatomical_heart"], ["🫁", "lungs"], ["👤", "bust_in_silhouette"], ["👥", "busts_in_silhouette"], ["🗣", "speaking_head"], ["👶", "baby"], ["🧒", "child"], ["👦", "boy"], ["👧", "girl"], ["🧑", "adult"], ["👨", "man"], ["👩", "woman"], ["🧑‍🦱", "curly_hair"], ["👩‍🦱", "curly_hair_woman"], ["👨‍🦱", "curly_hair_man"], ["🧑‍🦰", "red_hair"], ["👩‍🦰", "red_hair_woman"], ["👨‍🦰", "red_hair_man"], ["👱‍♀️", "blonde_woman"], ["👱", "blonde_man"], ["🧑‍🦳", "white_hair"], ["👩‍🦳", "white_hair_woman"], ["👨‍🦳", "white_hair_man"], ["🧑‍🦲", "bald"], ["👩‍🦲", "bald_woman"], ["👨‍🦲", "bald_man"], ["🧔", "bearded_person"], ["🧓", "older_adult"], ["👴", "older_man"], ["👵", "older_woman"], ["👲", "man_with_gua_pi_mao"], ["🧕", "woman_with_headscarf"], ["👳‍♀️", "woman_with_turban"], ["👳", "man_with_turban"], ["👮‍♀️", "policewoman"], ["👮", "policeman"], ["👷‍♀️", "construction_worker_woman"], ["👷", "construction_worker_man"], ["💂‍♀️", "guardswoman"], ["💂", "guardsman"], ["🕵️‍♀️", "female_detective"], ["🕵", "male_detective"], ["🧑‍⚕️", "health_worker"], ["👩‍⚕️", "woman_health_worker"], ["👨‍⚕️", "man_health_worker"], ["🧑‍🌾", "farmer"], ["👩‍🌾", "woman_farmer"], ["👨‍🌾", "man_farmer"], ["🧑‍🍳", "cook"], ["👩‍🍳", "woman_cook"], ["👨‍🍳", "man_cook"], ["🧑‍🎓", "student"], ["👩‍🎓", "woman_student"], ["👨‍🎓", "man_student"], ["🧑‍🎤", "singer"], ["👩‍🎤", "woman_singer"], ["👨‍🎤", "man_singer"], ["🧑‍🏫", "teacher"], ["👩‍🏫", "woman_teacher"], ["👨‍🏫", "man_teacher"], ["🧑‍🏭", "factory_worker"], ["👩‍🏭", "woman_factory_worker"], ["👨‍🏭", "man_factory_worker"], ["🧑‍💻", "technologist"], ["👩‍💻", "woman_technologist"], ["👨‍💻", "man_technologist"], ["🧑‍💼", "office_worker"], ["👩‍💼", "woman_office_worker"], ["👨‍💼", "man_office_worker"], ["🧑‍🔧", "mechanic"], ["👩‍🔧", "woman_mechanic"], ["👨‍🔧", "man_mechanic"], ["🧑‍🔬", "scientist"], ["👩‍🔬", "woman_scientist"], ["👨‍🔬", "man_scientist"], ["🧑‍🎨", "artist"], ["👩‍🎨", "woman_artist"], ["👨‍🎨", "man_artist"], ["🧑‍🚒", "firefighter"], ["👩‍🚒", "woman_firefighter"], ["👨‍🚒", "man_firefighter"], ["🧑‍✈️", "pilot"], ["👩‍✈️", "woman_pilot"], ["👨‍✈️", "man_pilot"], ["🧑‍🚀", "astronaut"], ["👩‍🚀", "woman_astronaut"], ["👨‍🚀", "man_astronaut"], ["🧑‍⚖️", "judge"], ["👩‍⚖️", "woman_judge"], ["👨‍⚖️", "man_judge"], ["🦸‍♀️", "woman_superhero"], ["🦸‍♂️", "man_superhero"], ["🦹‍♀️", "woman_supervillain"], ["🦹‍♂️", "man_supervillain"], ["🤶", "mrs_claus"], ["🧑‍🎄", "mx_claus"], ["🎅", "santa"], ["🥷", "ninja"], ["🧙‍♀️", "sorceress"], ["🧙‍♂️", "wizard"], ["🧝‍♀️", "woman_elf"], ["🧝‍♂️", "man_elf"], ["🧛‍♀️", "woman_vampire"], ["🧛‍♂️", "man_vampire"], ["🧟‍♀️", "woman_zombie"], ["🧟‍♂️", "man_zombie"], ["🧞‍♀️", "woman_genie"], ["🧞‍♂️", "man_genie"], ["🧜‍♀️", "mermaid"], ["🧜‍♂️", "merman"], ["🧚‍♀️", "woman_fairy"], ["🧚‍♂️", "man_fairy"], ["👼", "angel"], ["🧌", "troll"], ["🤰", "pregnant_woman"], ["🫃", "pregnant_man"], ["🫄", "pregnant_person"], ["🫅", "person_with_crown"], ["🤱", "breastfeeding"], ["👩‍🍼", "woman_feeding_baby"], ["👨‍🍼", "man_feeding_baby"], ["🧑‍🍼", "person_feeding_baby"], ["👸", "princess"], ["🤴", "prince"], ["👰", "person_with_veil"], ["👰", "bride_with_veil"], ["🤵", "person_in_tuxedo"], ["🤵", "man_in_tuxedo"], ["🏃‍♀️", "running_woman"], ["🏃", "running_man"], ["🚶‍♀️", "walking_woman"], ["🚶", "walking_man"], ["💃", "dancer"], ["🕺", "man_dancing"], ["👯", "dancing_women"], ["👯‍♂️", "dancing_men"], ["👫", "couple"], ["🧑‍🤝‍🧑", "people_holding_hands"], ["👬", "two_men_holding_hands"], ["👭", "two_women_holding_hands"], ["🫂", "people_hugging"], ["🙇‍♀️", "bowing_woman"], ["🙇", "bowing_man"], ["🤦‍♂️", "man_facepalming"], ["🤦‍♀️", "woman_facepalming"], ["🤷", "woman_shrugging"], ["🤷‍♂️", "man_shrugging"], ["💁", "tipping_hand_woman"], ["💁‍♂️", "tipping_hand_man"], ["🙅", "no_good_woman"], ["🙅‍♂️", "no_good_man"], ["🙆", "ok_woman"], ["🙆‍♂️", "ok_man"], ["🙋", "raising_hand_woman"], ["🙋‍♂️", "raising_hand_man"], ["🙎", "pouting_woman"], ["🙎‍♂️", "pouting_man"], ["🙍", "frowning_woman"], ["🙍‍♂️", "frowning_man"], ["💇", "haircut_woman"], ["💇‍♂️", "haircut_man"], ["💆", "massage_woman"], ["💆‍♂️", "massage_man"], ["🧖‍♀️", "woman_in_steamy_room"], ["🧖‍♂️", "man_in_steamy_room"], ["🧏‍♀️", "woman_deaf"], ["🧏‍♂️", "man_deaf"], ["🧍‍♀️", "woman_standing"], ["🧍‍♂️", "man_standing"], ["🧎‍♀️", "woman_kneeling"], ["🧎‍♂️", "man_kneeling"], ["🧑‍🦯", "person_with_probing_cane"], ["👩‍🦯", "woman_with_probing_cane"], ["👨‍🦯", "man_with_probing_cane"], ["🧑‍🦼", "person_in_motorized_wheelchair"], ["👩‍🦼", "woman_in_motorized_wheelchair"], ["👨‍🦼", "man_in_motorized_wheelchair"], ["🧑‍🦽", "person_in_manual_wheelchair"], ["👩‍🦽", "woman_in_manual_wheelchair"], ["👨‍🦽", "man_in_manual_wheelchair"], ["💑", "couple_with_heart_woman_man"], ["👩‍❤️‍👩", "couple_with_heart_woman_woman"], ["👨‍❤️‍👨", "couple_with_heart_man_man"], ["💏", "couplekiss_man_woman"], ["👩‍❤️‍💋‍👩", "couplekiss_woman_woman"], ["👨‍❤️‍💋‍👨", "couplekiss_man_man"], ["👪", "family_man_woman_boy"], ["👨‍👩‍👧", "family_man_woman_girl"], ["👨‍👩‍👧‍👦", "family_man_woman_girl_boy"], ["👨‍👩‍👦‍👦", "family_man_woman_boy_boy"], ["👨‍👩‍👧‍👧", "family_man_woman_girl_girl"], ["👩‍👩‍👦", "family_woman_woman_boy"], ["👩‍👩‍👧", "family_woman_woman_girl"], ["👩‍👩‍👧‍👦", "family_woman_woman_girl_boy"], ["👩‍👩‍👦‍👦", "family_woman_woman_boy_boy"], ["👩‍👩‍👧‍👧", "family_woman_woman_girl_girl"], ["👨‍👨‍👦", "family_man_man_boy"], ["👨‍👨‍👧", "family_man_man_girl"], ["👨‍👨‍👧‍👦", "family_man_man_girl_boy"], ["👨‍👨‍👦‍👦", "family_man_man_boy_boy"], ["👨‍👨‍👧‍👧", "family_man_man_girl_girl"], ["👩‍👦", "family_woman_boy"], ["👩‍👧", "family_woman_girl"], ["👩‍👧‍👦", "family_woman_girl_boy"], ["👩‍👦‍👦", "family_woman_boy_boy"], ["👩‍👧‍👧", "family_woman_girl_girl"], ["👨‍👦", "family_man_boy"], ["👨‍👧", "family_man_girl"], ["👨‍👧‍👦", "family_man_girl_boy"], ["👨‍👦‍👦", "family_man_boy_boy"], ["👨‍👧‍👧", "family_man_girl_girl"], ["🧶", "yarn"], ["🧵", "thread"], ["🧥", "coat"], ["🥼", "labcoat"], ["👚", "womans_clothes"], ["👕", "tshirt"], ["👖", "jeans"], ["👔", "necktie"], ["👗", "dress"], ["👙", "bikini"], ["🩱", "one_piece_swimsuit"], ["👘", "kimono"], ["🥻", "sari"], ["🩲", "briefs"], ["🩳", "shorts"], ["💄", "lipstick"], ["💋", "kiss"], ["👣", "footprints"], ["🥿", "flat_shoe"], ["👠", "high_heel"], ["👡", "sandal"], ["👢", "boot"], ["👞", "mans_shoe"], ["👟", "athletic_shoe"], ["🩴", "thong_sandal"], ["🩰", "ballet_shoes"], ["🧦", "socks"], ["🧤", "gloves"], ["🧣", "scarf"], ["👒", "womans_hat"], ["🎩", "tophat"], ["🧢", "billed_hat"], ["⛑", "rescue_worker_helmet"], ["🪖", "military_helmet"], ["🎓", "mortar_board"], ["👑", "crown"], ["🎒", "school_satchel"], ["🧳", "luggage"], ["👝", "pouch"], ["👛", "purse"], ["👜", "handbag"], ["💼", "briefcase"], ["👓", "eyeglasses"], ["🕶", "dark_sunglasses"], ["🥽", "goggles"], ["💍", "ring"], ["🌂", "closed_umbrella"]], "animals_and_nature": [["🐶", "dog"], ["🐱", "cat"], ["🐈‍⬛", "black_cat"], ["🐭", "mouse"], ["🐹", "hamster"], ["🐰", "rabbit"], ["🦊", "fox_face"], ["🐻", "bear"], ["🐼", "panda_face"], ["🐨", "koala"], ["🐯", "tiger"], ["🦁", "lion"], ["🐮", "cow"], ["🐷", "pig"], ["🐽", "pig_nose"], ["🐸", "frog"], ["🦑", "squid"], ["🐙", "octopus"], ["🦐", "shrimp"], ["🐵", "monkey_face"], ["🦍", "gorilla"], ["🙈", "see_no_evil"], ["🙉", "hear_no_evil"], ["🙊", "speak_no_evil"], ["🐒", "monkey"], ["🐔", "chicken"], ["🐧", "penguin"], ["🐦", "bird"], ["🐤", "baby_chick"], ["🐣", "hatching_chick"], ["🐥", "hatched_chick"], ["🦆", "duck"], ["🦅", "eagle"], ["🦉", "owl"], ["🦇", "bat"], ["🐺", "wolf"], ["🐗", "boar"], ["🐴", "horse"], ["🦄", "unicorn"], ["🐝", "honeybee"], ["🐛", "bug"], ["🦋", "butterfly"], ["🐌", "snail"], ["🐞", "lady_beetle"], ["🐜", "ant"], ["🦗", "grasshopper"], ["🕷", "spider"], ["🪲", "beetle"], ["🪳", "cockroach"], ["🪰", "fly"], ["🪱", "worm"], ["🦂", "scorpion"], ["🦀", "crab"], ["🐍", "snake"], ["🦎", "lizard"], ["🦖", "t-rex"], ["🦕", "sauropod"], ["🐢", "turtle"], ["🐠", "tropical_fish"], ["🐟", "fish"], ["🐡", "blowfish"], ["🐬", "dolphin"], ["🦈", "shark"], ["🐳", "whale"], ["🐋", "whale2"], ["🐊", "crocodile"], ["🐆", "leopard"], ["🦓", "zebra"], ["🐅", "tiger2"], ["🐃", "water_buffalo"], ["🐂", "ox"], ["🐄", "cow2"], ["🦌", "deer"], ["🐪", "dromedary_camel"], ["🐫", "camel"], ["🦒", "giraffe"], ["🐘", "elephant"], ["🦏", "rhinoceros"], ["🐐", "goat"], ["🐏", "ram"], ["🐑", "sheep"], ["🐎", "racehorse"], ["🐖", "pig2"], ["🐀", "rat"], ["🐁", "mouse2"], ["🐓", "rooster"], ["🦃", "turkey"], ["🕊", "dove"], ["🐕", "dog2"], ["🐩", "poodle"], ["🐈", "cat2"], ["🐇", "rabbit2"], ["🐿", "chipmunk"], ["🦔", "hedgehog"], ["🦝", "raccoon"], ["🦙", "llama"], ["🦛", "hippopotamus"], ["🦘", "kangaroo"], ["🦡", "badger"], ["🦢", "swan"], ["🦚", "peacock"], ["🦜", "parrot"], ["🦞", "lobster"], ["🦠", "microbe"], ["🦟", "mosquito"], ["🦬", "bison"], ["🦣", "mammoth"], ["🦫", "beaver"], ["🐻‍❄️", "polar_bear"], ["🦤", "dodo"], ["🪶", "feather"], ["🦭", "seal"], ["🐾", "paw_prints"], ["🐉", "dragon"], ["🐲", "dragon_face"], ["🦧", "orangutan"], ["🦮", "guide_dog"], ["🐕‍🦺", "service_dog"], ["🦥", "sloth"], ["🦦", "otter"], ["🦨", "skunk"], ["🦩", "flamingo"], ["🌵", "cactus"], ["🎄", "christmas_tree"], ["🌲", "evergreen_tree"], ["🌳", "deciduous_tree"], ["🌴", "palm_tree"], ["🌱", "seedling"], ["🌿", "herb"], ["☘", "shamrock"], ["🍀", "four_leaf_clover"], ["🎍", "bamboo"], ["🎋", "tanabata_tree"], ["🍃", "leaves"], ["🍂", "fallen_leaf"], ["🍁", "maple_leaf"], ["🌾", "ear_of_rice"], ["🌺", "hibiscus"], ["🌻", "sunflower"], ["🌹", "rose"], ["🥀", "wilted_flower"], ["🌷", "tulip"], ["🌼", "blossom"], ["🌸", "cherry_blossom"], ["💐", "bouquet"], ["🍄", "mushroom"], ["🪴", "potted_plant"], ["🌰", "chestnut"], ["🎃", "jack_o_lantern"], ["🐚", "shell"], ["🕸", "spider_web"], ["🌎", "earth_americas"], ["🌍", "earth_africa"], ["🌏", "earth_asia"], ["🪐", "ringed_planet"], ["🌕", "full_moon"], ["🌖", "waning_gibbous_moon"], ["🌗", "last_quarter_moon"], ["🌘", "waning_crescent_moon"], ["🌑", "new_moon"], ["🌒", "waxing_crescent_moon"], ["🌓", "first_quarter_moon"], ["🌔", "waxing_gibbous_moon"], ["🌚", "new_moon_with_face"], ["🌝", "full_moon_with_face"], ["🌛", "first_quarter_moon_with_face"], ["🌜", "last_quarter_moon_with_face"], ["🌞", "sun_with_face"], ["🌙", "crescent_moon"], ["⭐", "star"], ["🌟", "star2"], ["💫", "dizzy"], ["✨", "sparkles"], ["☄", "comet"], ["☀️", "sunny"], ["🌤", "sun_behind_small_cloud"], ["⛅", "partly_sunny"], ["🌥", "sun_behind_large_cloud"], ["🌦", "sun_behind_rain_cloud"], ["☁️", "cloud"], ["🌧", "cloud_with_rain"], ["⛈", "cloud_with_lightning_and_rain"], ["🌩", "cloud_with_lightning"], ["⚡", "zap"], ["🔥", "fire"], ["💥", "boom"], ["❄️", "snowflake"], ["🌨", "cloud_with_snow"], ["⛄", "snowman"], ["☃", "snowman_with_snow"], ["🌬", "wind_face"], ["💨", "dash"], ["🌪", "tornado"], ["🌫", "fog"], ["☂", "open_umbrella"], ["☔", "umbrella"], ["💧", "droplet"], ["💦", "sweat_drops"], ["🌊", "ocean"], ["🪷", "lotus"], ["🪸", "coral"], ["🪹", "empty_nest"], ["🪺", "nest_with_eggs"]], "food_and_drink": [["🍏", "green_apple"], ["🍎", "apple"], ["🍐", "pear"], ["🍊", "tangerine"], ["🍋", "lemon"], ["🍌", "banana"], ["🍉", "watermelon"], ["🍇", "grapes"], ["🍓", "strawberry"], ["🍈", "melon"], ["🍒", "cherries"], ["🍑", "peach"], ["🍍", "pineapple"], ["🥥", "coconut"], ["🥝", "kiwi_fruit"], ["🥭", "mango"], ["🥑", "avocado"], ["🥦", "broccoli"], ["🍅", "tomato"], ["🍆", "eggplant"], ["🥒", "cucumber"], ["🫐", "blueberries"], ["🫒", "olive"], ["🫑", "bell_pepper"], ["🥕", "carrot"], ["🌶", "hot_pepper"], ["🥔", "potato"], ["🌽", "corn"], ["🥬", "leafy_greens"], ["🍠", "sweet_potato"], ["🥜", "peanuts"], ["🧄", "garlic"], ["🧅", "onion"], ["🍯", "honey_pot"], ["🥐", "croissant"], ["🍞", "bread"], ["🥖", "baguette_bread"], ["🥯", "bagel"], ["🥨", "pretzel"], ["🧀", "cheese"], ["🥚", "egg"], ["🥓", "bacon"], ["🥩", "steak"], ["🥞", "pancakes"], ["🍗", "poultry_leg"], ["🍖", "meat_on_bone"], ["🦴", "bone"], ["🍤", "fried_shrimp"], ["🍳", "fried_egg"], ["🍔", "hamburger"], ["🍟", "fries"], ["🥙", "stuffed_flatbread"], ["🌭", "hotdog"], ["🍕", "pizza"], ["🥪", "sandwich"], ["🥫", "canned_food"], ["🍝", "spaghetti"], ["🌮", "taco"], ["🌯", "burrito"], ["🥗", "green_salad"], ["🥘", "shallow_pan_of_food"], ["🍜", "ramen"], ["🍲", "stew"], ["🍥", "fish_cake"], ["🥠", "fortune_cookie"], ["🍣", "sushi"], ["🍱", "bento"], ["🍛", "curry"], ["🍙", "rice_ball"], ["🍚", "rice"], ["🍘", "rice_cracker"], ["🍢", "oden"], ["🍡", "dango"], ["🍧", "shaved_ice"], ["🍨", "ice_cream"], ["🍦", "icecream"], ["🥧", "pie"], ["🍰", "cake"], ["🧁", "cupcake"], ["🥮", "moon_cake"], ["🎂", "birthday"], ["🍮", "custard"], ["🍬", "candy"], ["🍭", "lollipop"], ["🍫", "chocolate_bar"], ["🍿", "popcorn"], ["🥟", "dumpling"], ["🍩", "doughnut"], ["🍪", "cookie"], ["🧇", "waffle"], ["🧆", "falafel"], ["🧈", "butter"], ["🦪", "oyster"], ["🫓", "flatbread"], ["🫔", "tamale"], ["🫕", "fondue"], ["🥛", "milk_glass"], ["🍺", "beer"], ["🍻", "beers"], ["🥂", "clinking_glasses"], ["🍷", "wine_glass"], ["🥃", "tumbler_glass"], ["🍸", "cocktail"], ["🍹", "tropical_drink"], ["🍾", "champagne"], ["🍶", "sake"], ["🍵", "tea"], ["🥤", "cup_with_straw"], ["☕", "coffee"], ["🫖", "teapot"], ["🧋", "bubble_tea"], ["🍼", "baby_bottle"], ["🧃", "beverage_box"], ["🧉", "mate"], ["🧊", "ice_cube"], ["🧂", "salt"], ["🥄", "spoon"], ["🍴", "fork_and_knife"], ["🍽", "plate_with_cutlery"], ["🥣", "bowl_with_spoon"], ["🥡", "takeout_box"], ["🥢", "chopsticks"], ["🫗", "pouring_liquid"], ["🫘", "beans"], ["🫙", "jar"]], "activity": [["⚽", "soccer"], ["🏀", "basketball"], ["🏈", "football"], ["⚾", "baseball"], ["🥎", "softball"], ["🎾", "tennis"], ["🏐", "volleyball"], ["🏉", "rugby_football"], ["🥏", "flying_disc"], ["🎱", "8ball"], ["⛳", "golf"], ["🏌️‍♀️", "golfing_woman"], ["🏌", "golfing_man"], ["🏓", "ping_pong"], ["🏸", "badminton"], ["🥅", "goal_net"], ["🏒", "ice_hockey"], ["🏑", "field_hockey"], ["🥍", "lacrosse"], ["🏏", "cricket"], ["🎿", "ski"], ["⛷", "skier"], ["🏂", "snowboarder"], ["🤺", "person_fencing"], ["🤼‍♀️", "women_wrestling"], ["🤼‍♂️", "men_wrestling"], ["🤸‍♀️", "woman_cartwheeling"], ["🤸‍♂️", "man_cartwheeling"], ["🤾‍♀️", "woman_playing_handball"], ["🤾‍♂️", "man_playing_handball"], ["⛸", "ice_skate"], ["🥌", "curling_stone"], ["🛹", "skateboard"], ["🛷", "sled"], ["🏹", "bow_and_arrow"], ["🎣", "fishing_pole_and_fish"], ["🥊", "boxing_glove"], ["🥋", "martial_arts_uniform"], ["🚣‍♀️", "rowing_woman"], ["🚣", "rowing_man"], ["🧗‍♀️", "climbing_woman"], ["🧗‍♂️", "climbing_man"], ["🏊‍♀️", "swimming_woman"], ["🏊", "swimming_man"], ["🤽‍♀️", "woman_playing_water_polo"], ["🤽‍♂️", "man_playing_water_polo"], ["🧘‍♀️", "woman_in_lotus_position"], ["🧘‍♂️", "man_in_lotus_position"], ["🏄‍♀️", "surfing_woman"], ["🏄", "surfing_man"], ["🛀", "bath"], ["⛹️‍♀️", "basketball_woman"], ["⛹", "basketball_man"], ["🏋️‍♀️", "weight_lifting_woman"], ["🏋", "weight_lifting_man"], ["🚴‍♀️", "biking_woman"], ["🚴", "biking_man"], ["🚵‍♀️", "mountain_biking_woman"], ["🚵", "mountain_biking_man"], ["🏇", "horse_racing"], ["🤿", "diving_mask"], ["🪀", "yo_yo"], ["🪁", "kite"], ["🦺", "safety_vest"], ["🪡", "sewing_needle"], ["🪢", "knot"], ["🕴", "business_suit_levitating"], ["🏆", "trophy"], ["🎽", "running_shirt_with_sash"], ["🏅", "medal_sports"], ["🎖", "medal_military"], ["🥇", "1st_place_medal"], ["🥈", "2nd_place_medal"], ["🥉", "3rd_place_medal"], ["🎗", "reminder_ribbon"], ["🏵", "rosette"], ["🎫", "ticket"], ["🎟", "tickets"], ["🎭", "performing_arts"], ["🎨", "art"], ["🎪", "circus_tent"], ["🤹‍♀️", "woman_juggling"], ["🤹‍♂️", "man_juggling"], ["🎤", "microphone"], ["🎧", "headphones"], ["🎼", "musical_score"], ["🎹", "musical_keyboard"], ["🥁", "drum"], ["🎷", "saxophone"], ["🎺", "trumpet"], ["🎸", "guitar"], ["🎻", "violin"], ["🪕", "banjo"], ["🪗", "accordion"], ["🪘", "long_drum"], ["🎬", "clapper"], ["🎮", "video_game"], ["👾", "space_invader"], ["🎯", "dart"], ["🎲", "game_die"], ["♟️", "chess_pawn"], ["🎰", "slot_machine"], ["🧩", "jigsaw"], ["🎳", "bowling"], ["🪄", "magic_wand"], ["🪅", "pinata"], ["🪆", "nesting_dolls"], ["🪬", "hamsa"], ["🪩", "mirror_ball"]], "travel_and_places": [["🚗", "red_car"], ["🚕", "taxi"], ["🚙", "blue_car"], ["🚌", "bus"], ["🚎", "trolleybus"], ["🏎", "racing_car"], ["🚓", "police_car"], ["🚑", "ambulance"], ["🚒", "fire_engine"], ["🚐", "minibus"], ["🚚", "truck"], ["🚛", "articulated_lorry"], ["🚜", "tractor"], ["🛴", "kick_scooter"], ["🏍", "motorcycle"], ["🚲", "bike"], ["🛵", "motor_scooter"], ["🦽", "manual_wheelchair"], ["🦼", "motorized_wheelchair"], ["🛺", "auto_rickshaw"], ["🪂", "parachute"], ["🚨", "rotating_light"], ["🚔", "oncoming_police_car"], ["🚍", "oncoming_bus"], ["🚘", "oncoming_automobile"], ["🚖", "oncoming_taxi"], ["🚡", "aerial_tramway"], ["🚠", "mountain_cableway"], ["🚟", "suspension_railway"], ["🚃", "railway_car"], ["🚋", "train"], ["🚝", "monorail"], ["🚄", "bullettrain_side"], ["🚅", "bullettrain_front"], ["🚈", "light_rail"], ["🚞", "mountain_railway"], ["🚂", "steam_locomotive"], ["🚆", "train2"], ["🚇", "metro"], ["🚊", "tram"], ["🚉", "station"], ["🛸", "flying_saucer"], ["🚁", "helicopter"], ["🛩", "small_airplane"], ["✈️", "airplane"], ["🛫", "flight_departure"], ["🛬", "flight_arrival"], ["⛵", "sailboat"], ["🛥", "motor_boat"], ["🚤", "speedboat"], ["⛴", "ferry"], ["🛳", "passenger_ship"], ["🚀", "rocket"], ["🛰", "artificial_satellite"], ["🛻", "pickup_truck"], ["🛼", "roller_skate"], ["💺", "seat"], ["🛶", "canoe"], ["⚓", "anchor"], ["🚧", "construction"], ["⛽", "fuelpump"], ["🚏", "busstop"], ["🚦", "vertical_traffic_light"], ["🚥", "traffic_light"], ["🏁", "checkered_flag"], ["🚢", "ship"], ["🎡", "ferris_wheel"], ["🎢", "roller_coaster"], ["🎠", "carousel_horse"], ["🏗", "building_construction"], ["🌁", "foggy"], ["🏭", "factory"], ["⛲", "fountain"], ["🎑", "rice_scene"], ["⛰", "mountain"], ["🏔", "mountain_snow"], ["🗻", "mount_fuji"], ["🌋", "volcano"], ["🗾", "japan"], ["🏕", "camping"], ["⛺", "tent"], ["🏞", "national_park"], ["🛣", "motorway"], ["🛤", "railway_track"], ["🌅", "sunrise"], ["🌄", "sunrise_over_mountains"], ["🏜", "desert"], ["🏖", "beach_umbrella"], ["🏝", "desert_island"], ["🌇", "city_sunrise"], ["🌆", "city_sunset"], ["🏙", "cityscape"], ["🌃", "night_with_stars"], ["🌉", "bridge_at_night"], ["🌌", "milky_way"], ["🌠", "stars"], ["🎇", "sparkler"], ["🎆", "fireworks"], ["🌈", "rainbow"], ["🏘", "houses"], ["🏰", "european_castle"], ["🏯", "japanese_castle"], ["🗼", "tokyo_tower"], ["", "shibuya_109"], ["🏟", "stadium"], ["🗽", "statue_of_liberty"], ["🏠", "house"], ["🏡", "house_with_garden"], ["🏚", "derelict_house"], ["🏢", "office"], ["🏬", "department_store"], ["🏣", "post_office"], ["🏤", "european_post_office"], ["🏥", "hospital"], ["🏦", "bank"], ["🏨", "hotel"], ["🏪", "convenience_store"], ["🏫", "school"], ["🏩", "love_hotel"], ["💒", "wedding"], ["🏛", "classical_building"], ["⛪", "church"], ["🕌", "mosque"], ["🕍", "synagogue"], ["🕋", "kaaba"], ["⛩", "shinto_shrine"], ["🛕", "hindu_temple"], ["🪨", "rock"], ["🪵", "wood"], ["🛖", "hut"], ["🛝", "playground_slide"], ["🛞", "wheel"], ["🛟", "ring_buoy"]], "objects": [["⌚", "watch"], ["📱", "iphone"], ["📲", "calling"], ["💻", "computer"], ["⌨", "keyboard"], ["🖥", "desktop_computer"], ["🖨", "printer"], ["🖱", "computer_mouse"], ["🖲", "trackball"], ["🕹", "joystick"], ["🗜", "clamp"], ["💽", "minidisc"], ["💾", "floppy_disk"], ["💿", "cd"], ["📀", "dvd"], ["📼", "vhs"], ["📷", "camera"], ["📸", "camera_flash"], ["📹", "video_camera"], ["🎥", "movie_camera"], ["📽", "film_projector"], ["🎞", "film_strip"], ["📞", "telephone_receiver"], ["☎️", "phone"], ["📟", "pager"], ["📠", "fax"], ["📺", "tv"], ["📻", "radio"], ["🎙", "studio_microphone"], ["🎚", "level_slider"], ["🎛", "control_knobs"], ["🧭", "compass"], ["⏱", "stopwatch"], ["⏲", "timer_clock"], ["⏰", "alarm_clock"], ["🕰", "mantelpiece_clock"], ["⏳", "hourglass_flowing_sand"], ["⌛", "hourglass"], ["📡", "satellite"], ["🔋", "battery"], ["🪫", "battery"], ["🔌", "electric_plug"], ["💡", "bulb"], ["🔦", "flashlight"], ["🕯", "candle"], ["🧯", "fire_extinguisher"], ["🗑", "wastebasket"], ["🛢", "oil_drum"], ["💸", "money_with_wings"], ["💵", "dollar"], ["💴", "yen"], ["💶", "euro"], ["💷", "pound"], ["💰", "moneybag"], ["🪙", "coin"], ["💳", "credit_card"], ["🪫", "identification_card"], ["💎", "gem"], ["⚖", "balance_scale"], ["🧰", "toolbox"], ["🔧", "wrench"], ["🔨", "hammer"], ["⚒", "hammer_and_pick"], ["🛠", "hammer_and_wrench"], ["⛏", "pick"], ["🪓", "axe"], ["🦯", "probing_cane"], ["🔩", "nut_and_bolt"], ["⚙", "gear"], ["🪃", "boomerang"], ["🪚", "carpentry_saw"], ["🪛", "screwdriver"], ["🪝", "hook"], ["🪜", "ladder"], ["🧱", "brick"], ["⛓", "chains"], ["🧲", "magnet"], ["🔫", "gun"], ["💣", "bomb"], ["🧨", "firecracker"], ["🔪", "hocho"], ["🗡", "dagger"], ["⚔", "crossed_swords"], ["🛡", "shield"], ["🚬", "smoking"], ["☠", "skull_and_crossbones"], ["⚰", "coffin"], ["⚱", "funeral_urn"], ["🏺", "amphora"], ["🔮", "crystal_ball"], ["📿", "prayer_beads"], ["🧿", "nazar_amulet"], ["💈", "barber"], ["⚗", "alembic"], ["🔭", "telescope"], ["🔬", "microscope"], ["🕳", "hole"], ["💊", "pill"], ["💉", "syringe"], ["🩸", "drop_of_blood"], ["🩹", "adhesive_bandage"], ["🩺", "stethoscope"], ["🪒", "razor"], ["🩻", "xray"], ["🩼", "crutch"], ["🧬", "dna"], ["🧫", "petri_dish"], ["🧪", "test_tube"], ["🌡", "thermometer"], ["🧹", "broom"], ["🧺", "basket"], ["🧻", "toilet_paper"], ["🏷", "label"], ["🔖", "bookmark"], ["🚽", "toilet"], ["🚿", "shower"], ["🛁", "bathtub"], ["🧼", "soap"], ["🧽", "sponge"], ["🧴", "lotion_bottle"], ["🔑", "key"], ["🗝", "old_key"], ["🛋", "couch_and_lamp"], ["🪔", "diya_Lamp"], ["🛌", "sleeping_bed"], ["🛏", "bed"], ["🚪", "door"], ["🪑", "chair"], ["🛎", "bellhop_bell"], ["🧸", "teddy_bear"], ["🖼", "framed_picture"], ["🗺", "world_map"], ["🛗", "elevator"], ["🪞", "mirror"], ["🪟", "window"], ["🪠", "plunger"], ["🪤", "mouse_trap"], ["🪣", "bucket"], ["🪥", "toothbrush"], ["🫧", "bubbles"], ["⛱", "parasol_on_ground"], ["🗿", "moyai"], ["🛍", "shopping"], ["🛒", "shopping_cart"], ["🎈", "balloon"], ["🎏", "flags"], ["🎀", "ribbon"], ["🎁", "gift"], ["🎊", "confetti_ball"], ["🎉", "tada"], ["🎎", "dolls"], ["🎐", "wind_chime"], ["🎌", "crossed_flags"], ["🏮", "izakaya_lantern"], ["🧧", "red_envelope"], ["✉️", "email"], ["📩", "envelope_with_arrow"], ["📨", "incoming_envelope"], ["📧", "e-mail"], ["💌", "love_letter"], ["📮", "postbox"], ["📪", "mailbox_closed"], ["📫", "mailbox"], ["📬", "mailbox_with_mail"], ["📭", "mailbox_with_no_mail"], ["📦", "package"], ["📯", "postal_horn"], ["📥", "inbox_tray"], ["📤", "outbox_tray"], ["📜", "scroll"], ["📃", "page_with_curl"], ["📑", "bookmark_tabs"], ["🧾", "receipt"], ["📊", "bar_chart"], ["📈", "chart_with_upwards_trend"], ["📉", "chart_with_downwards_trend"], ["📄", "page_facing_up"], ["📅", "date"], ["📆", "calendar"], ["🗓", "spiral_calendar"], ["📇", "card_index"], ["🗃", "card_file_box"], ["🗳", "ballot_box"], ["🗄", "file_cabinet"], ["📋", "clipboard"], ["🗒", "spiral_notepad"], ["📁", "file_folder"], ["📂", "open_file_folder"], ["🗂", "card_index_dividers"], ["🗞", "newspaper_roll"], ["📰", "newspaper"], ["📓", "notebook"], ["📕", "closed_book"], ["📗", "green_book"], ["📘", "blue_book"], ["📙", "orange_book"], ["📔", "notebook_with_decorative_cover"], ["📒", "ledger"], ["📚", "books"], ["📖", "open_book"], ["🧷", "safety_pin"], ["🔗", "link"], ["📎", "paperclip"], ["🖇", "paperclips"], ["✂️", "scissors"], ["📐", "triangular_ruler"], ["📏", "straight_ruler"], ["🧮", "abacus"], ["📌", "pushpin"], ["📍", "round_pushpin"], ["🚩", "triangular_flag_on_post"], ["🏳", "white_flag"], ["🏴", "black_flag"], ["🏳️‍🌈", "rainbow_flag"], ["🏳️‍⚧️", "transgender_flag"], ["🔐", "closed_lock_with_key"], ["🔒", "lock"], ["🔓", "unlock"], ["🔏", "lock_with_ink_pen"], ["🖊", "pen"], ["🖋", "fountain_pen"], ["✒️", "black_nib"], ["📝", "memo"], ["✏️", "pencil2"], ["🖍", "crayon"], ["🖌", "paintbrush"], ["🔍", "mag"], ["🔎", "mag_right"], ["🪦", "headstone"], ["🪧", "placard"]], "symbols": [["💯", "100"], ["🔢", "1234"], ["❤️", "heart"], ["🧡", "orange_heart"], ["💛", "yellow_heart"], ["💚", "green_heart"], ["💙", "blue_heart"], ["💜", "purple_heart"], ["🤎", "brown_heart"], ["🖤", "black_heart"], ["🤍", "white_heart"], ["💔", "broken_heart"], ["❣", "heavy_heart_exclamation"], ["💕", "two_hearts"], ["💞", "revolving_hearts"], ["💓", "heartbeat"], ["💗", "heartpulse"], ["💖", "sparkling_heart"], ["💘", "cupid"], ["💝", "gift_heart"], ["💟", "heart_decoration"], ["❤️‍🔥", "heart_on_fire"], ["❤️‍🩹", "mending_heart"], ["☮", "peace_symbol"], ["✝", "latin_cross"], ["☪", "star_and_crescent"], ["🕉", "om"], ["☸", "wheel_of_dharma"], ["✡", "star_of_david"], ["🔯", "six_pointed_star"], ["🕎", "menorah"], ["☯", "yin_yang"], ["☦", "orthodox_cross"], ["🛐", "place_of_worship"], ["⛎", "ophiuchus"], ["♈", "aries"], ["♉", "taurus"], ["♊", "gemini"], ["♋", "cancer"], ["♌", "leo"], ["♍", "virgo"], ["♎", "libra"], ["♏", "scorpius"], ["♐", "sagittarius"], ["♑", "capricorn"], ["♒", "aquarius"], ["♓", "pisces"], ["🆔", "id"], ["⚛", "atom_symbol"], ["⚧️", "transgender_symbol"], ["🈳", "u7a7a"], ["🈹", "u5272"], ["☢", "radioactive"], ["☣", "biohazard"], ["📴", "mobile_phone_off"], ["📳", "vibration_mode"], ["🈶", "u6709"], ["🈚", "u7121"], ["🈸", "u7533"], ["🈺", "u55b6"], ["🈷️", "u6708"], ["✴️", "eight_pointed_black_star"], ["🆚", "vs"], ["🉑", "accept"], ["💮", "white_flower"], ["🉐", "ideograph_advantage"], ["㊙️", "secret"], ["㊗️", "congratulations"], ["🈴", "u5408"], ["🈵", "u6e80"], ["🈲", "u7981"], ["🅰️", "a"], ["🅱️", "b"], ["🆎", "ab"], ["🆑", "cl"], ["🅾️", "o2"], ["🆘", "sos"], ["⛔", "no_entry"], ["📛", "name_badge"], ["🚫", "no_entry_sign"], ["❌", "x"], ["⭕", "o"], ["🛑", "stop_sign"], ["💢", "anger"], ["♨️", "hotsprings"], ["🚷", "no_pedestrians"], ["🚯", "do_not_litter"], ["🚳", "no_bicycles"], ["🚱", "non-potable_water"], ["🔞", "underage"], ["📵", "no_mobile_phones"], ["❗", "exclamation"], ["❕", "grey_exclamation"], ["❓", "question"], ["❔", "grey_question"], ["‼️", "bangbang"], ["⁉️", "interrobang"], ["🔅", "low_brightness"], ["🔆", "high_brightness"], ["🔱", "trident"], ["⚜", "fleur_de_lis"], ["〽️", "part_alternation_mark"], ["⚠️", "warning"], ["🚸", "children_crossing"], ["🔰", "beginner"], ["♻️", "recycle"], ["🈯", "u6307"], ["💹", "chart"], ["❇️", "sparkle"], ["✳️", "eight_spoked_asterisk"], ["❎", "negative_squared_cross_mark"], ["✅", "white_check_mark"], ["💠", "diamond_shape_with_a_dot_inside"], ["🌀", "cyclone"], ["➿", "loop"], ["🌐", "globe_with_meridians"], ["Ⓜ️", "m"], ["🏧", "atm"], ["🈂️", "sa"], ["🛂", "passport_control"], ["🛃", "customs"], ["🛄", "baggage_claim"], ["🛅", "left_luggage"], ["♿", "wheelchair"], ["🚭", "no_smoking"], ["🚾", "wc"], ["🅿️", "parking"], ["🚰", "potable_water"], ["🚹", "mens"], ["🚺", "womens"], ["🚼", "baby_symbol"], ["🚻", "restroom"], ["🚮", "put_litter_in_its_place"], ["🎦", "cinema"], ["📶", "signal_strength"], ["🈁", "koko"], ["🆖", "ng"], ["🆗", "ok"], ["🆙", "up"], ["🆒", "cool"], ["🆕", "new"], ["🆓", "free"], ["0️⃣", "zero"], ["1️⃣", "one"], ["2️⃣", "two"], ["3️⃣", "three"], ["4️⃣", "four"], ["5️⃣", "five"], ["6️⃣", "six"], ["7️⃣", "seven"], ["8️⃣", "eight"], ["9️⃣", "nine"], ["🔟", "keycap_ten"], ["*⃣", "asterisk"], ["⏏️", "eject_button"], ["▶️", "arrow_forward"], ["⏸", "pause_button"], ["⏭", "next_track_button"], ["⏹", "stop_button"], ["⏺", "record_button"], ["⏯", "play_or_pause_button"], ["⏮", "previous_track_button"], ["⏩", "fast_forward"], ["⏪", "rewind"], ["🔀", "twisted_rightwards_arrows"], ["🔁", "repeat"], ["🔂", "repeat_one"], ["◀️", "arrow_backward"], ["🔼", "arrow_up_small"], ["🔽", "arrow_down_small"], ["⏫", "arrow_double_up"], ["⏬", "arrow_double_down"], ["➡️", "arrow_right"], ["⬅️", "arrow_left"], ["⬆️", "arrow_up"], ["⬇️", "arrow_down"], ["↗️", "arrow_upper_right"], ["↘️", "arrow_lower_right"], ["↙️", "arrow_lower_left"], ["↖️", "arrow_upper_left"], ["↕️", "arrow_up_down"], ["↔️", "left_right_arrow"], ["🔄", "arrows_counterclockwise"], ["↪️", "arrow_right_hook"], ["↩️", "leftwards_arrow_with_hook"], ["⤴️", "arrow_heading_up"], ["⤵️", "arrow_heading_down"], ["#️⃣", "hash"], ["ℹ️", "information_source"], ["🔤", "abc"], ["🔡", "abcd"], ["🔠", "capital_abcd"], ["🔣", "symbols"], ["🎵", "musical_note"], ["🎶", "notes"], ["〰️", "wavy_dash"], ["➰", "curly_loop"], ["✔️", "heavy_check_mark"], ["🔃", "arrows_clockwise"], ["➕", "heavy_plus_sign"], ["➖", "heavy_minus_sign"], ["➗", "heavy_division_sign"], ["✖️", "heavy_multiplication_x"], ["🟰", "heavy_equals_sign"], ["♾", "infinity"], ["💲", "heavy_dollar_sign"], ["💱", "currency_exchange"], ["©️", "copyright"], ["®️", "registered"], ["™️", "tm"], ["🔚", "end"], ["🔙", "back"], ["🔛", "on"], ["🔝", "top"], ["🔜", "soon"], ["☑️", "ballot_box_with_check"], ["🔘", "radio_button"], ["⚫", "black_circle"], ["⚪", "white_circle"], ["🔴", "red_circle"], ["🟠", "orange_circle"], ["🟡", "yellow_circle"], ["🟢", "green_circle"], ["🔵", "large_blue_circle"], ["🟣", "purple_circle"], ["🟤", "brown_circle"], ["🔸", "small_orange_diamond"], ["🔹", "small_blue_diamond"], ["🔶", "large_orange_diamond"], ["🔷", "large_blue_diamond"], ["🔺", "small_red_triangle"], ["▪️", "black_small_square"], ["▫️", "white_small_square"], ["⬛", "black_large_square"], ["⬜", "white_large_square"], ["🟥", "red_square"], ["🟧", "orange_square"], ["🟨", "yellow_square"], ["🟩", "green_square"], ["🟦", "blue_square"], ["🟪", "purple_square"], ["🟫", "brown_square"], ["🔻", "small_red_triangle_down"], ["◼️", "black_medium_square"], ["◻️", "white_medium_square"], ["◾", "black_medium_small_square"], ["◽", "white_medium_small_square"], ["🔲", "black_square_button"], ["🔳", "white_square_button"], ["🔈", "speaker"], ["🔉", "sound"], ["🔊", "loud_sound"], ["🔇", "mute"], ["📣", "mega"], ["📢", "loudspeaker"], ["🔔", "bell"], ["🔕", "no_bell"], ["🃏", "black_joker"], ["🀄", "mahjong"], ["♠️", "spades"], ["♣️", "clubs"], ["♥️", "hearts"], ["♦️", "diamonds"], ["🎴", "flower_playing_cards"], ["💭", "thought_balloon"], ["🗯", "right_anger_bubble"], ["💬", "speech_balloon"], ["🗨", "left_speech_bubble"], ["🕐", "clock1"], ["🕑", "clock2"], ["🕒", "clock3"], ["🕓", "clock4"], ["🕔", "clock5"], ["🕕", "clock6"], ["🕖", "clock7"], ["🕗", "clock8"], ["🕘", "clock9"], ["🕙", "clock10"], ["🕚", "clock11"], ["🕛", "clock12"], ["🕜", "clock130"], ["🕝", "clock230"], ["🕞", "clock330"], ["🕟", "clock430"], ["🕠", "clock530"], ["🕡", "clock630"], ["🕢", "clock730"], ["🕣", "clock830"], ["🕤", "clock930"], ["🕥", "clock1030"], ["🕦", "clock1130"], ["🕧", "clock1230"]], "flags": [["🇦🇫", "afghanistan"], ["🇦🇽", "aland_islands"], ["🇦🇱", "albania"], ["🇩🇿", "algeria"], ["🇦🇸", "american_samoa"], ["🇦🇩", "andorra"], ["🇦🇴", "angola"], ["🇦🇮", "anguilla"], ["🇦🇶", "antarctica"], ["🇦🇬", "antigua_barbuda"], ["🇦🇷", "argentina"], ["🇦🇲", "armenia"], ["🇦🇼", "aruba"], ["🇦🇨", "ascension_island"], ["🇦🇺", "australia"], ["🇦🇹", "austria"], ["🇦🇿", "azerbaijan"], ["🇧🇸", "bahamas"], ["🇧🇭", "bahrain"], ["🇧🇩", "bangladesh"], ["🇧🇧", "barbados"], ["🇧🇾", "belarus"], ["🇧🇪", "belgium"], ["🇧🇿", "belize"], ["🇧🇯", "benin"], ["🇧🇲", "bermuda"], ["🇧🇹", "bhutan"], ["🇧🇴", "bolivia"], ["🇧🇶", "caribbean_netherlands"], ["🇧🇦", "bosnia_herzegovina"], ["🇧🇼", "botswana"], ["🇧🇷", "brazil"], ["🇮🇴", "british_indian_ocean_territory"], ["🇻🇬", "british_virgin_islands"], ["🇧🇳", "brunei"], ["🇧🇬", "bulgaria"], ["🇧🇫", "burkina_faso"], ["🇧🇮", "burundi"], ["🇨🇻", "cape_verde"], ["🇰🇭", "cambodia"], ["🇨🇲", "cameroon"], ["🇨🇦", "canada"], ["🇮🇨", "canary_islands"], ["🇰🇾", "cayman_islands"], ["🇨🇫", "central_african_republic"], ["🇹🇩", "chad"], ["🇨🇱", "chile"], ["🇨🇳", "cn"], ["🇨🇽", "christmas_island"], ["🇨🇨", "cocos_islands"], ["🇨🇴", "colombia"], ["🇰🇲", "comoros"], ["🇨🇬", "congo_brazzaville"], ["🇨🇩", "congo_kinshasa"], ["🇨🇰", "cook_islands"], ["🇨🇷", "costa_rica"], ["🇭🇷", "croatia"], ["🇨🇺", "cuba"], ["🇨🇼", "curacao"], ["🇨🇾", "cyprus"], ["🇨🇿", "czech_republic"], ["🇩🇰", "denmark"], ["🇩🇯", "djibouti"], ["🇩🇲", "dominica"], ["🇩🇴", "dominican_republic"], ["🇪🇨", "ecuador"], ["🇪🇬", "egypt"], ["🇸🇻", "el_salvador"], ["🇬🇶", "equatorial_guinea"], ["🇪🇷", "eritrea"], ["🇪🇪", "estonia"], ["🇪🇹", "ethiopia"], ["🇪🇺", "eu"], ["🇫🇰", "falkland_islands"], ["🇫🇴", "faroe_islands"], ["🇫🇯", "fiji"], ["🇫🇮", "finland"], ["🇫🇷", "fr"], ["🇬🇫", "french_guiana"], ["🇵🇫", "french_polynesia"], ["🇹🇫", "french_southern_territories"], ["🇬🇦", "gabon"], ["🇬🇲", "gambia"], ["🇬🇪", "georgia"], ["🇩🇪", "de"], ["🇬🇭", "ghana"], ["🇬🇮", "gibraltar"], ["🇬🇷", "greece"], ["🇬🇱", "greenland"], ["🇬🇩", "grenada"], ["🇬🇵", "guadeloupe"], ["🇬🇺", "guam"], ["🇬🇹", "guatemala"], ["🇬🇬", "guernsey"], ["🇬🇳", "guinea"], ["🇬🇼", "guinea_bissau"], ["🇬🇾", "guyana"], ["🇭🇹", "haiti"], ["🇭🇳", "honduras"], ["🇭🇰", "hong_kong"], ["🇭🇺", "hungary"], ["🇮🇸", "iceland"], ["🇮🇳", "india"], ["🇮🇩", "indonesia"], ["🇮🇷", "iran"], ["🇮🇶", "iraq"], ["🇮🇪", "ireland"], ["🇮🇲", "isle_of_man"], ["🇮🇱", "israel"], ["🇮🇹", "it"], ["🇨🇮", "cote_divoire"], ["🇯🇲", "jamaica"], ["🇯🇵", "jp"], ["🇯🇪", "jersey"], ["🇯🇴", "jordan"], ["🇰🇿", "kazakhstan"], ["🇰🇪", "kenya"], ["🇰🇮", "kiribati"], ["🇽🇰", "kosovo"], ["🇰🇼", "kuwait"], ["🇰🇬", "kyrgyzstan"], ["🇱🇦", "laos"], ["🇱🇻", "latvia"], ["🇱🇧", "lebanon"], ["🇱🇸", "lesotho"], ["🇱🇷", "liberia"], ["🇱🇾", "libya"], ["🇱🇮", "liechtenstein"], ["🇱🇹", "lithuania"], ["🇱🇺", "luxembourg"], ["🇲🇴", "macau"], ["🇲🇰", "macedonia"], ["🇲🇬", "madagascar"], ["🇲🇼", "malawi"], ["🇲🇾", "malaysia"], ["🇲🇻", "maldives"], ["🇲🇱", "mali"], ["🇲🇹", "malta"], ["🇲🇭", "marshall_islands"], ["🇲🇶", "martinique"], ["🇲🇷", "mauritania"], ["🇲🇺", "mauritius"], ["🇾🇹", "mayotte"], ["🇲🇽", "mexico"], ["🇫🇲", "micronesia"], ["🇲🇩", "moldova"], ["🇲🇨", "monaco"], ["🇲🇳", "mongolia"], ["🇲🇪", "montenegro"], ["🇲🇸", "montserrat"], ["🇲🇦", "morocco"], ["🇲🇿", "mozambique"], ["🇲🇲", "myanmar"], ["🇳🇦", "namibia"], ["🇳🇷", "nauru"], ["🇳🇵", "nepal"], ["🇳🇱", "netherlands"], ["🇳🇨", "new_caledonia"], ["🇳🇿", "new_zealand"], ["🇳🇮", "nicaragua"], ["🇳🇪", "niger"], ["🇳🇬", "nigeria"], ["🇳🇺", "niue"], ["🇳🇫", "norfolk_island"], ["🇲🇵", "northern_mariana_islands"], ["🇰🇵", "north_korea"], ["🇳🇴", "norway"], ["🇴🇲", "oman"], ["🇵🇰", "pakistan"], ["🇵🇼", "palau"], ["🇵🇸", "palestinian_territories"], ["🇵🇦", "panama"], ["🇵🇬", "papua_new_guinea"], ["🇵🇾", "paraguay"], ["🇵🇪", "peru"], ["🇵🇭", "philippines"], ["🇵🇳", "pitcairn_islands"], ["🇵🇱", "poland"], ["🇵🇹", "portugal"], ["🇵🇷", "puerto_rico"], ["🇶🇦", "qatar"], ["🇷🇪", "reunion"], ["🇷🇴", "romania"], ["🇷🇺", "ru"], ["🇷🇼", "rwanda"], ["🇧🇱", "st_barthelemy"], ["🇸🇭", "st_helena"], ["🇰🇳", "st_kitts_nevis"], ["🇱🇨", "st_lucia"], ["🇵🇲", "st_pierre_miquelon"], ["🇻🇨", "st_vincent_grenadines"], ["🇼🇸", "samoa"], ["🇸🇲", "san_marino"], ["🇸🇹", "sao_tome_principe"], ["🇸🇦", "saudi_arabia"], ["🇸🇳", "senegal"], ["🇷🇸", "serbia"], ["🇸🇨", "seychelles"], ["🇸🇱", "sierra_leone"], ["🇸🇬", "singapore"], ["🇸🇽", "sint_maarten"], ["🇸🇰", "slovakia"], ["🇸🇮", "slovenia"], ["🇸🇧", "solomon_islands"], ["🇸🇴", "somalia"], ["🇿🇦", "south_africa"], ["🇬🇸", "south_georgia_south_sandwich_islands"], ["🇰🇷", "kr"], ["🇸🇸", "south_sudan"], ["🇪🇸", "es"], ["🇱🇰", "sri_lanka"], ["🇸🇩", "sudan"], ["🇸🇷", "suriname"], ["🇸🇿", "swaziland"], ["🇸🇪", "sweden"], ["🇨🇭", "switzerland"], ["🇸🇾", "syria"], ["🇹🇼", "taiwan"], ["🇹🇯", "tajikistan"], ["🇹🇿", "tanzania"], ["🇹🇭", "thailand"], ["🇹🇱", "timor_leste"], ["🇹🇬", "togo"], ["🇹🇰", "tokelau"], ["🇹🇴", "tonga"], ["🇹🇹", "trinidad_tobago"], ["🇹🇦", "tristan_da_cunha"], ["🇹🇳", "tunisia"], ["🇹🇷", "tr"], ["🇹🇲", "turkmenistan"], ["🇹🇨", "turks_caicos_islands"], ["🇹🇻", "tuvalu"], ["🇺🇬", "uganda"], ["🇺🇦", "ukraine"], ["🇦🇪", "united_arab_emirates"], ["🇬🇧", "uk"], ["🏴󠁧󠁢󠁥󠁮󠁧󠁿", "england"], ["🏴󠁧󠁢󠁳󠁣󠁴󠁿", "scotland"], ["🏴󠁧󠁢󠁷󠁬󠁳󠁿", "wales"], ["🇺🇸", "us"], ["🇻🇮", "us_virgin_islands"], ["🇺🇾", "uruguay"], ["🇺🇿", "uzbekistan"], ["🇻🇺", "vanuatu"], ["🇻🇦", "vatican_city"], ["🇻🇪", "venezuela"], ["🇻🇳", "vietnam"], ["🇼🇫", "wallis_futuna"], ["🇪🇭", "western_sahara"], ["🇾🇪", "yemen"], ["🇿🇲", "zambia"], ["🇿🇼", "zimbabwe"], ["🇺🇳", "united_nations"], ["🏴‍☠️", "pirate_flag"]]
};
const tabIcons = {
    "custom": "*✳️",
    "face": "😊",
    "people": "🧑‍🦱",
    "animals_and_nature": "😾",
    "food_and_drink": "🍔",
    "activity": "🏀",
    "travel_and_places": "🚗",
    "objects": "⌚",
    "symbols": "❤️",
    "flags": "🇯🇵",
};
