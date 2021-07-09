import { ngClientIO } from "../../link.js";

// html要素取得
const namedCharaImg = document.getElementById('named_chara_img')
const namedBtn = document.getElementById('named-btn')
const incorrectText = document.getElementById('incorrect-text');

// session取得
const namedFlg = sessionStorage.getItem('namedFlg');
const nickName = sessionStorage.getItem('nickName');

// 画面遷移処理
const toCorrectAnswerer = async () => {
    document.location.href = "./correctAnswerer";
}

// ロード時に画像をセット
window.onload = () => {
    console.log(namedFlg);
    /*
    名前をつけた人（name.js）でsessionつけて、
    それに当てはまる人がサーバーに送信していく。(emit)
    */
    if (namedFlg == "named") {
        ngClientIO.emit('requestDisplayCharaImg', {});

        // デバッグ
        console.log("画像取得をサーバーにリクエストしました。");
    }
    
}

// 回答用の画像を表示
ngClientIO.on('randomNamedCharaImg', (data) => {
    // デバッグ
    console.log("サーバーから受信しました。");
    // サーバ側で定義したモノを配置
    const randomCardNumber = data.randomCardNumber;
    const charaImgPath = "../allstars/gazou" + randomCardNumber + ".png";;
    namedCharaImg.setAttribute('src', charaImgPath);
    sessionStorage.setItem('answername', data.charaName);
})

// 正解者を受信して保存
ngClientIO.on('sendCorrectAnswerer', async (data) => {

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