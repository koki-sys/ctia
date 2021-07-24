import { gnClientIO } from '../../../link.js';

const flgFromSession = sessionStorage.getItem('flg');
const entryRoomNameFromSession = sessionStorage.getItem('entryRoomName');
const orderPatternFromSession = sessionStorage.getItem('orderPattern');
const firstPersonFromSession = sessionStorage.getItem('firstPerson');

const isAnsweredFlg = (flgFromSession == "answered") ? true : false;

// ゲーム画面に遷移する
const toGoodNew = async () => {
    document.location.href = "./announce.html";
}

// ゲーム画面に遷移する
const toGameEnd = async () => {
    document.location.href = "./gameEnd.html";
}

window.onload = () => {
    console.log("参加部屋名：" + entryRoomNameFromSession);
    gnClientIO.emit('requestOrderPattern', {
        flg: flgFromSession,
        entryRoomName: entryRoomNameFromSession,
    })

    //最初の人は、名前をつける。
    if (firstPersonFromSession == "first") {
        sessionStorage.removeItem('firstPerson');
        toGoodNew();
    }

    // 名前を変えた人が順番変え処理をリクエストする。
    if (isAnsweredFlg) {
        // 順番変更処理を入れる。セッションでansweredを送信
        gnClientIO.emit('order', {
            flg: flgFromSession,
            entryRoomName: entryRoomNameFromSession
        });
        console.log("順番変更処理をリクエストしました。");

        // セッション情報を削除 バグ原因
        sessionStorage.remove("answered");
    }
}

// 順番受け取り処理
gnClientIO.on("sendOrderPattern", (data) => {
    sessionStorage.setItem('orderPattern', data.orderPattern);
    console.log("パータン：" + data.orderPattern);
})

// 順番が自分に回ってきたら遷移する。
gnClientIO.on('changeOrder', (data) => {
    const changePattern = data.changePattern;
    const isOrdered = sessionStorage.getItem('isOrdered');
    // 順番が来たら、発表画面に切り替える。
    if (isOrdered) {
        console.log("発表しました。");
    } else if (orderPatternFromSession == changePattern) {
        toGoodNew();
    }
})

gnClientIO.on('gameEnd', () => {
    toGameEnd();
})