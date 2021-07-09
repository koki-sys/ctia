
window.onload = () => {

    // ロード時に参加部屋などの情報を保存
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('entryRoomName')) {
        sessionStorage.setItem('entryRoomName', urlParams.get('entryRoomName'));
        sessionStorage.setItem('roomCount', urlParams.get('roomCount'));
        sessionStorage.setItem('limitPerRoom', urlParams.get('limitPerRoom'));

        // デバッグ
        console.log("招待者の部屋:" + sessionStorage.getItem('entryRoomName'));
        console.log("招待者の:部屋数" + sessionStorage.getItem('roomCount'));
        console.log("招待者の制限人数:" + sessionStorage.getItem('limitPerRoom'));
    }
    console.log("ロードしました。");
}