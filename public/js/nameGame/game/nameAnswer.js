import { ngClientIO } from "../../../link.js";

const namedCharaImg = document.getElementById('named_chara_img')
const namedBtn = document.getElementById('named-btn')
const incorrectText = document.getElementById('incorrect-text');

// session取得
const isNamed = sessionStorage.getItem('namedFlg');
const nickName = sessionStorage.getItem('nickName');

// 画面遷移処理
const toCorrectAnswerer = async () => {
    document.location.href = "./correctAnswerer.html";
}

// ロード時に画像をセット
window.onload = () => {
    setTimeout(() => {
        if (isNamed) {
            ngClientIO.emit('sendImg', {
                roomId: sessionStorage.getItem('roomId')
            });
        }
    }, 2000);
}

// 回答用の画像を表示
ngClientIO.on('DisplayImg', (data) => {
    const randomCardNumber = data.randomCardNumber;
    if (randomCardNumber == 0 && randomCardNumber == null) {
        const charaImgPath = "../allstars/gazou" + randomCardNumber + ".png";
        namedCharaImg.setAttribute('src', charaImgPath);
    } else {
        // サーバ側で定義したモノを配置
        const charaImgPath = "../allstars/gazou" + randomCardNumber + ".png";
        namedCharaImg.setAttribute('src', charaImgPath);
        sessionStorage.setItem('answername', data.charaName);
    }
})

// 正解者を受信して保存
ngClientIO.on('correctAnswerer', async (data) => {

    // 正解者の名前を保存
    sessionStorage.setItem('correctAnswerer', data.nickName);

    // 画面遷移処理
    await toCorrectAnswerer();
})

// 不正解の場合、画面に表示
ngClientIO.on('incorrectAnswer', (data) => {
    incorrectText.textContent = data.msg;
})

// ボタンクリック時にサーバーに送信して、回答チェックする。
namedBtn.onclick = () => {
    const namedCharaName = document.getElementById('named_chara_name').value;
    ngClientIO.emit('checkTheAnswer', {
        namedCharaName: namedCharaName,
        nickName: nickName
    })
}