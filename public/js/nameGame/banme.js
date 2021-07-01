// セッションストレージ（セッション）
const name = sessionStorage.getItem('after_set_name');

// htmlの要素取得
const named = document.getElementById('named');
const charaName= document.getElementById('chara_name');

const toNameStore = async () => {
    document.location.href = "./namaeoboeta.html";
}

// 画像をランダムで表示する関数
const randomCard = () => {
    const randomCardNumber = Math.floor(Math.random() * 14) + 1;
    const charaImg = document.getElementById("chara-img");
    const charaImgPath = "../allstars/gazou" + randomCardNumber + ".png";
    charaImg.setAttribute('src', charaImgPath);
}

// randomCard実行
randomCard();

// ボタン押下時、値をサーバーに送信してセッションを一旦削除する。
named.onclick = async () => {
    sessionStorage.setItem('charaName', charaName);
    await toNameStore();
}