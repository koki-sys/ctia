import { ngClientIO } from "../../../link.js";

// htmlの要素取得
const namedBtn = document.getElementById('named-btn');

window.onload = () => {
    ngClientIO.emit('checkImgNumber', {});
}

const toNameStore = async () => {
    document.location.href = "./namaeoboeta.html";
}

let imgNumber;

// 画像をランダムで表示する関数
const randomCard = () => {
    const charaImg = document.getElementById("chara-img");
    const charaImgPath = "../allstars/gazou" + imgNumber + ".png";
    charaImg.setAttribute('src', charaImgPath);
}

// チェックする関数
ngClientIO.on('setImgNumber', (data) => {
    imgNumber = data.random;
    randomCard();
})

const storeSession = async (charaName) => {
    sessionStorage.setItem('randomCardNumber', imgNumber);
    sessionStorage.setItem('charaName', charaName);
    sessionStorage.setItem('flg', "answered");

    // 名前をつけた人が全員回答リクエストを送るとき(nameAnswer.js)に使うフラグ
    sessionStorage.setItem('namedFlg', true);
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