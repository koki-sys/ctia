import { ngClientIO } from "../../link.js";

// htmlの要素取得
const namedBtn = document.getElementById('named-btn');

const randomCardNumber = Math.floor(Math.random() * 14) + 1;

const toNameStore = async () => {
    document.location.href = "./namaeoboeta.html";
}

// 画像をランダムで表示する関数
const randomCard = () => {
    const charaImg = document.getElementById("chara-img");
    const charaImgPath = "../allstars/gazou" + randomCardNumber + ".png";
    charaImg.setAttribute('src', charaImgPath);
}

randomCard();

const storeSession = async (charaName) => {
    sessionStorage.setItem('randomCardNumber', randomCardNumber);
    sessionStorage.setItem('charaName', charaName);
    sessionStorage.setItem('flg', "answered");

    // 名前をつけた人が全員回答リクエストを送るとき(nameAnswer.js)に使うフラグ
    sessionStorage.setItem('namedFlg', "named");
    console.log("session保存しました。");
}

// ボタン押下時、値をサーバーに送信してセッションを一旦削除する。
namedBtn.onclick = async () => {
    const charaName = document.getElementById('chara_name').value;
    await storeSession(charaName);
    console.log("名前をつけたフラグを付けました。");
    // ここに確認画面を全員に見せる処理
    await ngClientIO.emit("toNameConfirmRequest", {
        
    });
    await toNameStore();
}