import { gnClientIO } from '../../../link.js';

const answeredFlg = sessionStorage.getItem('flg');
const nickname = sessionStorage.getItem('nickName');
const firstPerson = sessionStorage.getItem('firstPerson');
const roomId = sessionStorage.getItem('roomId');

const isAnswered = (answeredFlg == "answered") ? true : false;
const isFirst = (firstPerson == "first") ? true : false;

// ゲーム画面に遷移する
const toGoodNew = async () => {
    document.location.href = "./announce.html";
}

// ゲーム画面に遷移する
const toGameEnd = async () => {
    document.location.href = "./gameEnd.html";
}

window.onload = () => {
    gnClientIO.emit('requestOrderPattern', {
        flg: answeredFlg,
        nickname: nickname,
        roomId: roomId
    })

    //最初の人は、名前をつける。
    if (isFirst) {
        sessionStorage.removeItem('firstPerson');
        toGoodNew();
    }

    // 名前を変えた人が順番変え処理をリクエストする。
    if (isAnswered) {
        gnClientIO.emit("order", {
            flg: "answered",
            roomId: roomId
        });
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
    const pattern = String(data.changePattern);
    const orderPattern = sessionStorage.getItem('orderPattern');
    console.log("'" + pattern + "'");
    console.log("'" + orderPattern + "'");

    // 順番が来たら、発表画面に切り替える。
    console.log("junnbannkae");
    if (orderPattern === pattern) {
        toGoodNew();
    }
})

gnClientIO.on('gameEnd', () => {
    toGameEnd();
})