import { ngClientIO } from '../../../link.js';

// リンク
import { toNameGame } from '../component/link/toNameGame.js';
import { toNameConfirm } from '../component/link/toNameConfirm.js';
import { toNameAnswered } from '../component/link/toNameAnswered.js';
import { toGameEnd } from '../component/link/toGameEnd.js';
import { toWinner } from '../component/link/toWinner.js';

// session取得
const nickName = sessionStorage.getItem('nickName');
const flg = sessionStorage.getItem('flg');
const roomId = sessionStorage.getItem('roomId');
const isFirst = sessionStorage.getItem('firstPerson');
const orderPattern = sessionStorage.getItem('orderPattern');
const isCorrect = sessionStorage.getItem('token');

// 回答済みかを格納する変数
const isAnsweredFlg = (flg == "answered") ? true : false;
const isOrder = (orderPattern != null) ? true : false;

window.onload = async () => {
    console.log(orderPattern);
    if (!isOrder) {
        ngClientIO.emit('requestOrderPattern', {
            nickname: nickName,
            roomId: roomId
        });
    }

    if (isFirst) {
        sessionStorage.removeItem("firstPerson");
        toNameGame();
    }

    setTimeout(() => {
        if (isAnsweredFlg) {
            // 順番変更処理を入れる。セッションでansweredを送信
            ngClientIO.emit('order', {
                roomId: roomId
            });

            // 回答したflgを削除
            sessionStorage.removeItem("flg");
        } else if (isCorrect) {
            // 順番変更処理を入れる。セッションでansweredを送信
            ngClientIO.emit('order', {
                roomId: roomId
            });

            sessionStorage.removeItem('token');
        }
    }, 2000);
}

// 順番受け取ってセッションに保存する処理
ngClientIO.on("sendOrderPattern", (data) => {
    sessionStorage.setItem('orderPattern', data.orderPattern);
    console.log("パターン" + data.orderPattern);
});

// 順番が自分に回ってきたら遷移する。
ngClientIO.on('changeOrder', (data) => {
    const changePattern = data.changePattern;
    const pageFlg = parseInt(data.pageFlg);
    const sessionOrder = sessionStorage.getItem('orderPattern');

    if (sessionOrder === changePattern && pageFlg == 1) {
        sessionStorage.removeItem("orderPattern");
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

ngClientIO.on('gameResult', () => {
    // winner.ejsへの遷
    toWinner();
})