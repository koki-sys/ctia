// html要素取得
const group = document.getElementById('setgroup');

window.onload = () => {
    // sessionをリセット
    sessionStorage.clear();
}

// qr.htmlに遷移するメソッド
const qrlink = async () => {
    document.location.href = location.href.replace("setting", "qr_code_display");
}

// ボタンをクリックしたときに部屋情報を保存する
group.addEventListener('click', async () => {
    // valueを取得する
    const groupCount = document.getElementById('group-count').value;
    const personCount = document.getElementById('person-count').value;

    // 保存する
    await sessionStorage.setItem('firstPerson', "first");
    await sessionStorage.setItem('roomCount', groupCount);
    await sessionStorage.setItem('limitPerRoom', personCount);
    console.log("部屋情報を保存しました。");

    // qr画面に遷移する
    await qrlink();
})