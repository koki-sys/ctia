import { countDown } from "../component/game/countdown.js";
import { sendOrder } from "../component/game/sendOrder.js";

const announced = document.getElementById('announced');
const displayCount = document.getElementById("display-count");

//　確認ウィンドウのボタンをタップしたときの動作
announced.onclick = () => {
    sendOrder();
}

countDown(31, displayCount);