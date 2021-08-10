import { countDown } from "../../component/countdown";

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

//　確認ウィンドウのボタンをタップしたときの動作
announced.onclick = () => {
    sendOrder();
}

countDown(displayCount);