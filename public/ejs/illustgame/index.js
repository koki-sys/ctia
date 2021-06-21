const countDown = () => {
    // カウントダウンする秒数
    var sec = 30;

    // 開始日時を設定
    var dt = new Date();
    console.log("Start: ", dt);

    // 終了時刻を開始日時+カウントダウンする秒数に設定(1000ミリ秒 = 1秒)
    var endDt = new Date(dt.getTime() + sec * 1000);
    console.log("End : ", endDt);

    // 1秒おきにカウントダウン
    var cnt = sec;
    var id = setInterval(function () {
        cnt--;

        // 画面に表示
        const displayCount = document.getElementById("借り");
        displayCount.textContent = cnt;

        // 現在日時と終了日時を比較
        dt = new Date();
        if (dt.getTime() >= endDt.getTime()) {
            clearInterval(id);
            console.log("Finish!");
        }
    }, 1000);
};
