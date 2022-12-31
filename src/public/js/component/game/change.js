import { toAnnounce } from "../link/toAnnounce.js";

const change = (client) => {

    const isAnsweredFlg = (sessionStorage.getItem('flg') == "answered") ? true : false;
    const isFirst = (sessionStorage.getItem('firstPerson') == "first") ? true : false;

    client.emit('requestOrderPattern', {
        flg: sessionStorage.getItem('flg'),
        nickname: sessionStorage.getItem('nickName'),
        roomId: sessionStorage.getItem('roomId')
    })

    //最初の人は、名前をつける。
    if (isFirst) {
        sessionStorage.removeItem('firstPerson');
        toAnnounce();
    }

    // 名前を変えた人が順番変え処理をリクエストする。
    if (isAnsweredFlg) {
        client.emit("order", {
            flg: "answered",
            roomId: sessionStorage.getItem('roomId')
        });
        // セッション情報を削除 バグ原因
        sessionStorage.remove("answered");
    }
}

export { change }