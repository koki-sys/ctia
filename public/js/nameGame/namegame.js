import { ngClientIO } from '../../link.js';

// session取得
const flgFromSession = sessionStorage.getItem('flg');
const entryRoomNameFromSession = sessionStorage.getItem('entryRoomName');
const orderPatternFromSession = sessionStorage.getItem('orderPattern');
const firstPersonFromSession = sessionStorage.getItem('firstPerson');

// 回答済みかを格納する変数
const isAnsweredFlg = (flgFromSession == "answered") ? true : false;
const isOrderPattern = (orderPatternFromSession != "undifined" || orderPatternFromSession != null) ? true : false;

window.onload = () => {
    console.log("参加部屋名：" + entryRoomNameFromSession);
    if (!isOrderPattern) {
        ngClientIO.emit('requestOrderPattern', {
            entryRoomName: entryRoomNameFromSession,
        })
    } else {
        ngClientIO.emit('isOrderPatternArray', {});
    }

    //最初の人は、名前をつける。
    if (firstPersonFromSession == "first") {
        sessionStorage.removeItem('firstPerson');
        toNameGame();
    }

    // 名前を変えた人が順番変え処理をリクエストする。
    if (isAnsweredFlg) {
        // 順番変更処理を入れる。セッションでansweredを送信
        ngClientIO.emit('order', {
            flg: flgFromSession,
            entryRoomName: entryRoomNameFromSession
        });
        console.log("順番変更処理をリクエストしました。");

        // 回答したflgを削除
        sessionStorage.removeItem("flg");
    }
}

// ゲーム画面に遷移する
const toNameGame = async () => {
    document.location.href = "./banme.html";
}

// 名前確認画面に遷移する。
const toNameConfirm = async () => {
    document.location.href = "./namaeoboeta.html";
}

// 名前を当てる画面に遷移する
const toNameAnswered = async () => {
    document.location.href = "./nameAnswer.html";
}

// ゲーム終了画面に遷移する
const toGameEnd = async () => {
    document.location.href = "./gameEnd.html";
}

// 順番受け取ってセッションに保存する処理
ngClientIO.on("sendOrderPattern", (data) => {
    if (!isOrderPattern) {
        sessionStorage.setItem('orderPattern', data.orderPattern);
    }
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

ngClientIO.on("toNameConfirmResponse", () => {
    // 名前の確認画面に遷移
    toNameConfirm();
})

ngClientIO.on("toGameEnd", () => {
    // ゲーム終了画面に遷移
    toGameEnd();
})