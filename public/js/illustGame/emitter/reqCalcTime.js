import { igClientIO } from "../../../link.js";

const reqCalcTime = () => {
    // 送信処理、保存処理をする。
    igClientIO.emit("reqCalcTime", {
        sec: sessionStorage.getItem('time')
    });
}

export { reqCalcTime }