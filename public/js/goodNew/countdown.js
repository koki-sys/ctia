import { gnClientIO } from '../../link.js';

const name = sessionStorage.getItem(['after_set_name']);

const countDown = () => {
    // カウントダウンする秒数
    let sec = 6;

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
        const displayCount = document.getElementById("display-count");
        displayCount.textContent = cnt + "秒";

        // 現在日時と終了日時を比較
        dt = new Date();
        if (dt.getTime() >= endDt.getTime()) {
            clearInterval(id);
            displayCount.textContent = "発言終了！";

            gnClientIO.emit("order", {
                flg: "answered",
                entryRoomName: sessionStorage.getItem('entryRoomName'),
                name: name,
            });
            console.log("ordered")

            // 送ったら遷移する処理に変える
            setTimeout(function () {
                console.log("sended.");
                document.location.href = "./taskComplete.html";
            }, 1000);
        }
    }, 1000);
};

countDown();