import { dgClientIO } from '../../link.js';

const name = sessionStorage.getItem('after_set_name');

const questionArray = [
    '出身地はどこですか？',
    '好きな食べ物はなんですか？',
    '好きな動物はなんですか？',
    '趣味はなんですか？',
    '好きな音楽はなんですか？',
    '好きなスポーツはなんですか？'
];
const questionNumber = Math.floor(Math.random() * 5) + 1;
const question = document.getElementById("question");
question.textContent = questionArray[questionNumber];

const announced = document.getElementById('announced');

const toComplete = async () => {
    document.location.href = "./taskComplete.html";
}

// 時間切れ、ボタン押下時の処理
const sendOrder = async () => {
    console.log("部屋名:" + sessionStorage.getItem('entryRoomName'));
    sessionStorage.setItem("isOrdered", true);
    sessionStorage.setItem('flg', "answered");
    await dgClientIO.emit("order", {
        flg: "answered",
        entryRoomName: sessionStorage.getItem('entryRoomName'),
        name: name,
    });
    console.log("ordered")
    await toComplete();
}

announced.onclick = () => {
    sendOrder();
}

const countDown = () => {
    // カウントダウンする秒数
    let sec = 31;

    // 開始日時を設定
    let dt = new Date();
    console.log("Start: ", dt);

    // 終了時刻を開始日時+カウントダウンする秒数に設定(1000ミリ秒 = 1秒)
    let endDt = new Date(dt.getTime() + sec * 1000);
    console.log("End : ", endDt);

    // 1秒おきにカウントダウン
    let cnt = sec;
    let id = setInterval(() => {
        cnt--;

        // 画面に表示
        const displayCount = document.getElementById("display-count");
        displayCount.textContent = cnt + "秒";

        // 現在日時と終了日時を比較
        dt = new Date();
        if (dt.getTime() >= endDt.getTime()) {
            clearInterval(id);
            displayCount.textContent = "発言終了！";

            sendOrder();
        }
    }, 1000);
};

countDown();
