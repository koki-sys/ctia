import { sendOrder } from "./sendOrder.js";

const countDown = (time, displayCount) => {
    // カウントダウンする秒数
    let sec = time;

    // 開始日時を設定
    let dt = new Date();
    console.log("Start: ", dt);

    // 終了時刻を開始日時+カウントダウンする秒数に設定(1000ミリ秒 = 1秒)
    let endDt = new Date(dt.getTime() + sec * 1000);
    console.log("End : ", endDt);

    // 1秒おきにカウントダウン
    let cnt = sec;
    let id = setInterval(() => {
        cnt--;

        // 画面に表示
        displayCount.textContent = cnt + "秒";

        // 現在日時と終了日時を比較
        dt = new Date();
        if (dt.getTime() >= endDt.getTime()) {
            clearInterval(id);
            displayCount.textContent = "発言終了！";

            sendOrder();
        }
    }, 1000);
};

export { countDown }