import { ngClientIO } from '../../../link.js';

// 順番に関する処理
import { checkAndChangeOrder } from '../component/order/checkAndChangeOrder.js';
import { isFirst } from '../component/order/isFirst.js';
import { sendCheckAndOrder } from '../component/order/sendCheckAndOrder.js';

// リンク
import { toNameGame } from '../component/link/toNameGame.js';
import { toNameConfirm } from '../component/link/toNameConfirm.js';
import { toNameAnswered } from '../component/link/toNameAnswered.js';
import { toGameEnd } from '../component/link/toGameEnd.js';

// session取得
const nickNameFromSession = sessionStorage.getItem('nickName');
const flgFromSession = sessionStorage.getItem('flg');
const roomIdFromSession = sessionStorage.getItem('roomId');
const orderPatternFromSession = sessionStorage.getItem('orderPattern');
const firstPersonFromSession = sessionStorage.getItem('firstPerson');

// 回答済みかを格納する変数
const isAnsweredFlg = (flgFromSession == "answered") ? true : false;
const isOrderPattern = (orderPatternFromSession != "undifined" || orderPatternFromSession != null) ? true : false;
console.log(orderPatternFromSession);
console.log(isOrderPattern);

window.onload = async () => {

    const order = {
        nickname: nickNameFromSession,
        roomId: roomIdFromSession,
        first: firstPersonFromSession,
        flg: flgFromSession,
        isAnswer: isAnsweredFlg
    }

    await sendCheckAndOrder(ngClientIO, order);

    await isFirst(firstPersonFromSession);

    await checkAndChangeOrder(ngClientIO, order);

}

// 順番受け取ってセッションに保存する処理
ngClientIO.on("sendOrderPattern", (data) => {
    sessionStorage.setItem('orderPattern', data.orderPattern);
    console.log("パータン：" + data.orderPattern);
});

// 順番が自分に回ってきたら遷移する。
ngClientIO.on('changeOrder', (data) => {
    const changePattern = data.changePattern;
    const pageFlg = parseInt(data.pageFlg);
    const sessionOrder = sessionStorage.getItem('orderPattern');
    if (sessionOrder === changePattern && pageFlg == 1) {
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