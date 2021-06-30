import { ngClientIO } from '../../link.js';

const name = sessionStorage.getItem('after_set_name');

const toComplete = async () => {
    document.location.href = "./taskComplete.html";
}

// 時間切れ、ボタン押下時の処理
const sendOrder = async () => {
    console.log("部屋名:" + sessionStorage.getItem('entryRoomName'));
    sessionStorage.setItem("isOrdered", true);
    await ngClientIO.emit("order", {
        flg: "answered",
        entryRoomName: sessionStorage.getItem('entryRoomName'),
        name: name,
    });
    console.log("ordered")
    await toComplete();
}

// 画像をランダムで表示する関数
const randomCard = () => {
    const randomCardNumber = Math.floor(Math.random() * 14) + 1;
    const charaImg = document.getElementById("chara-img");
    const charaImgPath = "../allstars/gazou" + randomCardNumber + ".png";
    charaImg.setAttribute('src', charaImgPath);
}

randomCard();