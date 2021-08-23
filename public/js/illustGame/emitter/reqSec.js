import { igClientIO } from "../../../link.js";

const reqSec = () => {
    // データベースから取得する処理（データベースになかったら、作成。）
    igClientIO.emit("reqSec", {
        sec: sessionStorage.getItem('time'),
        roomId: sessionStorage.getItem('roomId')
    });
}

export { reqSec };