// ==========================================================
// 怠惰くんの一週間
// ==========================================================
//
// このファイルでは
//
// ・ステータス計算
// ・行動
// ・曜日
// ・朝昼晩
// ・画像切り替え
// ・エンディング
//
// を管理しています。
// ==========================================================



// ==========================================================
// ★ 怠惰くんの画像
// ==========================================================
//
// images/character/ の中に画像を入れてください。
// ==========================================================

const CHARACTER_IMAGES = {

    normal:
        "images/character/normal.png",

    happy:
        "images/character/normal.png",

    sleepy:
        "images/character/normal.png",

    hungry:
        "images/character/normal.png",

    tired:
        "images/character/tired.png",


    // ごはん
    eating:
        "images/character/eat.png",

    // おでかけ(趣味に変更)
    outing:
        "images/character/hobby.png",

    // ねる
    sleeping:
        "images/character/sleep.png"
};



// ==========================================================
// ★ 背景画像
// ==========================================================

const BACKGROUND_IMAGES = {

    // 朝
    morning:
        "images/background/morning.png",

    // 昼
    noon:
        "images/background/noon.png",

    // 晩
    night:
        "images/background/night.png"
};



// ==========================================================
// ★ エンディング背景
// ==========================================================

const ENDING_IMAGES = {

    // 心が0
    bad:
        "images/ending/bad.png",

    // 心が1～80
    normal:
        "images/ending/normal.png",

    // 心が81～100
    good:
        "images/ending/good.png"
};



// ==========================================================
// ★ エンディング用怠惰くん
// ==========================================================

const ENDING_CHARACTER_IMAGES = {

    bad: "",

    normal: "",

    good: ""
};



// ==========================================================
// 曜日
// ==========================================================

const DAYS = [

    "月曜日",

    "火曜日",

    "水曜日",

    "木曜日",

    "金曜日"

];



// ==========================================================
// 時間
// ==========================================================

const TIMES = [

    {
        key: "morning",
        name: "朝"
    },

    {
        key: "noon",
        name: "昼"
    },

    {
        key: "night",
        name: "夜"
    }

];



// ==========================================================
// ゲームデータ
// ==========================================================

let game = {

    // 0 = 月曜日
    // 1 = 火曜日
    // 2 = 水曜日
    // 3 = 木曜日
    // 4 = 金曜日

    day: 0,


    // 0 = 朝
    // 1 = 昼
    // 2 = 晩

    time: 0,


    // ステータス

    hunger: 2,

    energy: 2,

    sleep: 2,

    heart: 25

    // 現在のキャラクター画像
    //characterType: "normal"

};



// ==========================================================
// 数値を範囲内にする
// ==========================================================

function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );
}



// ==========================================================
// ステータス変更
// ==========================================================

function changeStatus(change) {


    game.hunger =
        clamp(
            game.hunger +
            (change.hunger || 0),

            0,
            10
        );


    game.energy =
        clamp(
            game.energy +
            (change.energy || 0),

            0,
            10
        );


    game.sleep =
        clamp(
            game.sleep +
            (change.sleep || 0),

            0,
            10
        );


    game.heart =
        clamp(
            game.heart +
            (change.heart || 0),

            0,
            100
        );

}



// ==========================================================
// ゲームリセット
// ==========================================================

function resetGame() {


    game = {

        day: 0,

        time: 0,

        hunger: 2,

        energy: 2,

        sleep: 2,

        heart: 25

    };


    // エンディングを隠す

    document
        .getElementById("ending-screen")
        .classList
        .add("hidden");


    // 行動ボタンを表示

    document
        .getElementById("actions")
        .style
        .display = "flex";


    // 次へボタンを隠す

    document
        .getElementById("next-button")
        .classList
        .add("hidden");


    // メッセージ

    document
        .getElementById("message")
        .textContent =
        "行動を選んでね。";

    setCharacter("normal");

    updateScreen();

}



// ==========================================================
// ごはん
// ==========================================================

function eat() {


    // おなかが10の場合

    if (game.hunger === 10) {


        // 指定どおり
        //
        // おなかとこころは増えない
        //
        // ただし「ごはん」という行動自体は
        // 1ターン消費します。


        document
            .getElementById("message")
            .textContent =
            "「おなかがいっぱい」";


        return;
    }



    // おなか +4
    // すいみん -1
    // こころ +5

    changeStatus({

        hunger: 4,

        sleep: -1,

        heart: 5

    });


    document
        .getElementById("message")
        .textContent =
        "「おいしい！しあわせだな」";


}



// ==========================================================
// おでかけ
// ==========================================================

function outing() {


    // しゅみ +3
    // おなか -2
    // すいみん -1
    // こころ +5

    changeStatus({

        energy: 3,

        hunger: -2,

        sleep: -1,

        heart: 5

    });


    document
        .getElementById("message")
        .textContent =
        "「たのしい！しあわせだな」";

}



// ==========================================================
// ねる
// ==========================================================

function sleepAction() {


    // すいみん +5
    // おなか -2
    // しゅみ -2
    // こころ +5

    changeStatus({

        sleep: 5,

        hunger: -2,

        energy: -2,

        heart: 5

    });


    document
        .getElementById("message")
        .textContent =
        "「やすもう、しあわせだな」";

}



// ==========================================================
// 行動を選択
// ==========================================================

function chooseAction(action) {


    // 行動ボタンを消す

    document
        .getElementById("actions")
        .style
        .display = "none";



    // ======================================================
    // ごはん
    // ======================================================

    if (action === "eat") {

        game.characterType = "eating";
        setCharacter("eating");


        eat();

    }



    // ======================================================
    // おでかけ
    // ======================================================

    else if (action === "out") {

        game.characterType = "outing";
        setCharacter("outing");


        outing();

    }



    // ======================================================
    // ねる
    // ======================================================

    else if (action === "sleep") {

        game.characterType = "sleeping";
        setCharacter("sleeping");


        sleepAction();

    }



    // 数値を画面に反映

    updateScreen();

    setCharacter(game.characterType);

    // 次のターンボタンを表示

    document
        .getElementById("next-button")
        .classList
        .remove("hidden");

}



// ==========================================================
// 次のターン
// ==========================================================

function nextTurn() {


    // 次へボタンを消す

    document
        .getElementById("next-button")
        .classList
        .add("hidden");



    // ======================================================
    // 晩 → 次の日
    // ======================================================

    if (game.time === 2) {


        // ----------------------------------------------
        // 0のステータスがあるか
        // ----------------------------------------------

        const zeroStatus =

            game.hunger === 0 ||

            game.energy === 0 ||

            game.sleep === 0;



        // ----------------------------------------------
        // 曜日が変わるとき
        // こころ -30
        // ----------------------------------------------

        if (zeroStatus) {

            game.heart =
                clamp(
                    game.heart - 30,
                    0,
                    100
                );

        }



        // ----------------------------------------------
        // 金曜の晩ならエンディング
        // ----------------------------------------------

        if (game.day === 4) {

            showEnding();

            return;
        }



        // 次の日

        game.day++;


        // 朝にする

        game.time = 0;

    }



    // ======================================================
    // 朝 → 昼
    // 昼 → 晩
    // ======================================================

    else {

        game.time++;

    }


    // ==========================================
    // ★ 次のターンのキャラクターを決定
    // ==========================================

    const zeroStatus =

        game.hunger === 0 ||

        game.energy === 0 ||

        game.sleep === 0;


    if (zeroStatus) {

        // どれかが0なら tired

        game.characterType = "tired";

        setCharacter("tired");

    }

    else {

        // 問題なければ normal

        game.characterType = "normal";

        setCharacter("normal");

    }

    // ======================================================
    // ★ 行動ボタンを復活
    // ======================================================

    document
        .getElementById("actions")
        .style
        .display = "flex";



    // ======================================================
    // 時間ごとのメッセージ
    // ======================================================

    document
        .getElementById("message")
        .textContent =
        "行動を選んでね。";



    // 画面更新

    updateScreen();

}



// ==========================================================
// 怠惰くん画像変更
// ==========================================================

function setCharacter(type) {


    const imagePath =
        CHARACTER_IMAGES[type];


    const image =
        document.getElementById(
            "character-image"
        );


    const placeholder =
        document.getElementById(
            "character-placeholder"
        );



    // ======================================================
    // 画像がある
    // ======================================================

    if (imagePath !== "") {


        image.src =
            imagePath;


        image.style.display =
            "block";


        placeholder.style.display =
            "none";

    }



    // ======================================================
    // 画像がない
    // ======================================================

    else {


        image.style.display =
            "none";


        placeholder.style.display =
            "block";


        const names = {

            normal:
                "通常",

            happy:
                "嬉しい",

            sleepy:
                "眠い",

            hungry:
                "お腹が空いた",

            tired:
                "元気がない",

            eating:
                "ごはんを食べている",

            outing:
                "おでかけしている",

            sleeping:
                "寝ている"

        };


        placeholder.textContent =

            "【ここに怠惰くん：" +

            names[type] +

            "画像】";

    }

}



// ==========================================================
// ステータスから怠惰くんを決める
// ==========================================================

function updateCharacterByStatus() {


    let type =
        "normal";



    if (game.energy === 0) {

        type =
            "tired";

    }


    else if (game.hunger === 0) {

        type =
            "hungry";

    }


    else if (game.sleep === 0) {

        type =
            "sleepy";

    }


    else if (game.heart >= 81) {

        type =
            "happy";

    }



    setCharacter(type);

}



// ==========================================================
// 背景変更
// ==========================================================

function updateBackground() {


    const timeKey =
        TIMES[game.time].key;


    const imagePath =
        BACKGROUND_IMAGES[timeKey];


    const background =
        document.getElementById(
            "background"
        );


    const placeholder =
        document.getElementById(
            "background-placeholder"
        );



    // ======================================================
    // 背景画像が設定されている
    // ======================================================

    if (imagePath !== "") {


        background.style.backgroundImage =

            'url("' +
            imagePath +
            '")';


        placeholder.style.display =
            "none";

    }



    // ======================================================
    // 背景画像がない
    // ======================================================

    else {


        background.style.backgroundImage =
            "none";


        placeholder.style.display =
            "block";

    }

}



// ==========================================================
// 画面更新
// ==========================================================

function updateScreen() {


    // ======================================================
    // 曜日
    // ======================================================

    document
        .getElementById("day")
        .textContent =
        DAYS[game.day];



    // ======================================================
    // 朝・昼・晩
    // ======================================================

    document
        .getElementById("time")
        .textContent =
        TIMES[game.time].name;



    // ======================================================
    // 数値
    // ======================================================

    document
        .getElementById("hunger-value")
        .textContent =
        game.hunger + " / 10";


    document
        .getElementById("energy-value")
        .textContent =
        game.energy + " / 10";


    document
        .getElementById("sleep-value")
        .textContent =
        game.sleep + " / 10";


    document
        .getElementById("heart-value")
        .textContent =
        game.heart + " / 100";



    // ======================================================
    // ゲージ
    // ======================================================

    document
        .getElementById("hunger-bar")
        .style
        .width =
        (game.hunger * 10) + "%";


    document
        .getElementById("energy-bar")
        .style
        .width =
        (game.energy * 10) + "%";


    document
        .getElementById("sleep-bar")
        .style
        .width =
        (game.sleep * 10) + "%";


    document
        .getElementById("heart-bar")
        .style
        .width =
        game.heart + "%";

    // 背景

    updateBackground();

}



// ==========================================================
// エンディング
// ==========================================================

function showEnding() {


    // 行動ボタンを消す

    document
        .getElementById("actions")
        .style
        .display = "none";



    // ======================================================
    // エンディング判定
    // ======================================================

    let endingType;


    if (game.heart === 0) {

        endingType =
            "bad";

    }

    else if (game.heart <= 80) {

        endingType =
            "normal";

    }

    else {

        endingType =
            "good";

    }



    // ======================================================
    // 文章
    // ======================================================

    const endings = {


        bad: {

            title:
                "BAD END",

            message:
                "「これが　いつまで　つづくんだろう」\n" +
                "たいだくんの　こころは　空っぽに　なって　しまった。"

        },


        normal: {

            title:
                "NORMAL END",

            message:
                "「がんばって　いきれたね」\n" +
                "たいだくんと　過ごした　一週間が　終わった。"

        },


        good: {

            title:
                "GOOD END",

            message:
                "「しあわせだな　いきるの　たのしいな」\n" +
                "たいだくんは　とても　うれしそうだ。"

        }

    };



    const ending =
        endings[endingType];



    document
        .getElementById("ending-title")
        .textContent =
        ending.title;



    document
        .getElementById("ending-message")
        .textContent =
        ending.message;



    document
        .getElementById("ending-heart")
        .textContent =
        game.heart;



    // ======================================================
    // エンディング背景
    // ======================================================

    const backgroundPath =
        ENDING_IMAGES[endingType];


    const endingBackground =
        document.getElementById(
            "ending-background"
        );


    const endingPlaceholder =
        document.getElementById(
            "ending-background-placeholder"
        );



    if (backgroundPath !== "") {


        endingBackground.style.backgroundImage =

            'url("' +
            backgroundPath +
            '")';


        endingPlaceholder.style.display =
            "none";

    }



    else {


        endingBackground.style.backgroundImage =
            "none";


        endingPlaceholder.style.display =
            "block";

    }



    // ======================================================
    // エンディング用怠惰くん
    // ======================================================

    const endingCharacterPath =
        ENDING_CHARACTER_IMAGES[
            endingType
        ];


    const endingCharacter =
        document.getElementById(
            "ending-character"
        );



    if (endingCharacterPath !== "") {


        endingCharacter.innerHTML =

            '<img src="' +
            endingCharacterPath +
            '" alt="怠惰くん">';

    }



    else {


        endingCharacter.textContent =
            "【ここにエンディング用画像】";

    }



    // エンディング表示

    document
        .getElementById("ending-screen")
        .classList
        .remove("hidden");

}



// ==========================================================
// ボタン
// ==========================================================

document
    .getElementById("eat-button")
    .addEventListener(
        "click",
        function() {

            chooseAction("eat");

        }
    );



document
    .getElementById("out-button")
    .addEventListener(
        "click",
        function() {

            chooseAction("out");

        }
    );



document
    .getElementById("sleep-button")
    .addEventListener(
        "click",
        function() {

            chooseAction("sleep");

        }
    );



document
    .getElementById("next-button")
    .addEventListener(
        "click",
        function() {

            nextTurn();

        }
    );



document
    .getElementById("restart-button")
    .addEventListener(
        "click",
        function() {

            resetGame();

        }
    );



// ==========================================================
// ゲーム開始
// ==========================================================

resetGame();