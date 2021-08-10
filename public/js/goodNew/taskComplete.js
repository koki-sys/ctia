import { gnClientIO } from '../../link.js';
import { order } from '../component/game/order.js';
import { setOrder } from '../component/game/setOrder.js';
import { toAnnounce } from '../component/link/toAnnounce.js';
import { toGameEnd } from '../component/link/toGameEnd.js';

window.onload = () => {
    order(gnClientIO);
}

setOrder(gnClientIO);

// 順番が自分に回ってきたら遷移する。
gnClientIO.on('changeOrder', (data) => {
    const pattern = String(data.changePattern);
    const orderPattern = sessionStorage.getItem('orderPattern');
    console.log("'" + pattern + "'");
    console.log("'" + orderPattern + "'");

    // 順番が来たら、発表画面に切り替える。
    console.log("junnbannkae");
    if (orderPattern === pattern) {
        toAnnounce();
    }
})

gnClientIO.on('gameEnd', () => {
    toGameEnd();
})