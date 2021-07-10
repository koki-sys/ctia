import { ngClientIO } from '../../link.js';

// session取得
const flgFromSession = sessionStorage.getItem('flg');
const entryRoomNameFromSession = sessionStorage.getItem('entryRoomName');
const orderPatternFromSession = sessionStorage.getItem('orderPattern');

// 回答済みかを格納する変数
const isAnsweredFlg = (flgFromSession == "answered") ? true : false;

window.onload = () => {
    console.log("参加部屋名：" + entryRoomNameFromSession);
    ngClientIO.emit('requestOrderPattern', {
        entryRoomName: entryRoomNameFromSession,
    })

    if (isAnsweredFlg) {
        // 順番変更処理を入れる。セッションでansweredを送信
        ngClientIO.emit('order', {
            flg: flgFromSession,
            entryRoomName: entryRoomNameFromSession
        });
        console.log("順番変更処理をリクエストしました。")

        // セッション情報を削除 バグ原因
        sessionStorage.remove("answered");

    }
}

const toNameGame = async () => {
    document.location.href = "./namegame.html";
}

const toNameAnswered = async () => {
    document.location.href = "./nameAnswer.html";
}

// 順番受け取ってセッションに保存する処理
ngClientIO.on("sendOrderPattern", (data) => {
    sessionStorage.setItem('orderPattern', data.orderPattern);
    console.log("パータン：" + data.orderPattern);
})

// 順番が自分に回ってきたら遷移する。
ngClientIO.on('changeOrder', (data) => {
    const changePattern = data.changePattern;
    const pageFlg = parseInt(data.pageFlg);
    if (orderPatternFromSession == changePattern && pageFlg == 1) {
        toNameGame();
    } else if (pageFlg == 2) {
        toNameAnswered();
    }
})