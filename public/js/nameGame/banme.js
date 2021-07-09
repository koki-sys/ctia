// セッションストレージ（セッション）
const name = sessionStorage.getItem('after_set_name');

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

// randomCard実行
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
    await toNameStore();
}