import { dgClientIO } from '../../link.js';
import { change } from '../component/game/change.js';
import { setOrder } from '../component/game/setOrder.js';
import { toAnnounce } from '../component/link/toAnnounce.js';
import { toGameEnd } from '../component/link/toGameEnd.js';

window.onload = () => {
    change(dgClientIO);
}

setOrder(dgClientIO);

// 順番が自分に回ってきたら遷移する。
dgClientIO.on('changeOrder', (data) => {
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

dgClientIO.on('gameEnd', () => {
    toGameEnd();
})