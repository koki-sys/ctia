import { countDown } from "../component/game/countdown.js";
import { sendOrder } from "../component/game/sendOrder.js";

const questionArray = [
    '出身地はどこですか？',
    '好きな食べ物はなんですか？',
    '好きな動物はなんですか？',
    '趣味はなんですか？',
    '好きな音楽はなんですか？',
    '好きなスポーツはなんですか？'
];

const question = document.getElementById("question");
const announced = document.getElementById('announced');
const displayCount = document.getElementById("display-count");

const questionNumber = Math.floor(Math.random() * 5) + 1;
question.textContent = questionArray[questionNumber];

announced.onclick = () => {
    sendOrder();
}

countDown(31, displayCount);