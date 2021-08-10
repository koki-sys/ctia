import { countDown } from "../../component/countdown.js";

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
const displayCount = document.getElementById("display-count");

const toComplete = async () => {
    document.location.href = "./taskComplete.html";
}

// 時間切れ、ボタン押下時の処理
const sendOrder = async () => {
    console.log("部屋名:" + sessionStorage.getItem('entryRoomName'));
    sessionStorage.setItem("isOrdered", true);
    sessionStorage.setItem('flg', "answered");

    console.log("ordered")
    await toComplete();
}

announced.onclick = () => {
    sendOrder();
}

countDown(displayCount);