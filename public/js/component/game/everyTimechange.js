import { setCount } from '../../nameGame/cardCount.js';
import { toAnnounce } from '../link/toAnnounce.js';

const everyTimechange = (client) => {

    const isOrder = (sessionStorage.getItem('orderPattern') != null) ? true : false;
    const isFirst = sessionStorage.getItem('firstPerson');
    const isAnsweredFlg = (sessionStorage.getItem('flg') == "answered") ? true : false;
    const isCorrect = sessionStorage.getItem('token');

    if (!isOrder) {
        client.emit('requestOrderPattern', {
            nickname: sessionStorage.getItem('nickName'),
            roomId: sessionStorage.getItem('roomId')
        });
    }

    if (isFirst) {
        sessionStorage.removeItem("firstPerson");
        toAnnounce();
    }

    setTimeout(() => {
        if (isAnsweredFlg) {
            console.log("答えたよ！");
            // 順番変更処理を入れる。セッションでansweredを送信
            client.emit('order', {
                roomId: sessionStorage.getItem('roomId'),
                flg: sessionStorage.getItem('flg')
            });

            // 回答したflgを削除
            sessionStorage.removeItem("flg");
        } else if (isCorrect) {
            console.log("せいかいしたよ！")
            // 順番変更処理を入れる。セッションでansweredを送信
            client.emit('order', {
                roomId: sessionStorage.getItem('roomId')
            });
            sessionStorage.removeItem('token');
            setCount();
        }
    }, 2000);
}

export { everyTimechange };