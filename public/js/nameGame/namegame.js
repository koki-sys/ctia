import { ngClientIO } from '../../link.js';

// リンク
import { toNameGame } from '../component/link/toNameGame.js';
import { toNameConfirm } from '../component/link/toNameConfirm.js';
import { toNameAnswered } from '../component/link/toNameAnswered.js';
import { toWinner } from '../component/link/toWinner.js';
import { toGameEnd } from '../component/link/toGameEnd.js';
import { setOrder } from '../component/game/setOrder.js';
import { everyTimechange } from '../component/game/everyTimechange.js';

window.onload = async () => {
    everyTimechange(ngClientIO);
}

setOrder(ngClientIO);

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