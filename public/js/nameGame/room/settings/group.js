import { ngClientIO } from '../../../../link.js';

// html要素取得
const group = document.getElementById('setgroup');

window.onload = () => {
    // sessionをリセット
    sessionStorage.clear();
    ngClientIO.emit("connectDatabase",{});
}
// qr.htmlに遷移するメソッド
const qrlink = async () => {
    console.log("qr画面に遷移しました。");
    document.location.href = "qr.html";
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