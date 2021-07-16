
import { ngClientIO } from '../../link.js';

// session取得
const randomCardNumberFromSession = sessionStorage.getItem('randomCardNumber');
const charaNameFromSession = sessionStorage.getItem('charaName');
const entryRoomNameFromSession = sessionStorage.getItem('entryRoomName');
const roomCountFromSession = sessionStorage.getItem('roomCount');
const flgFromSession = sessionStorage.getItem('flg');
const countInRoomFromSession = sessionStorage.getItem('countInRoom');

// html要素取得
const charaImgElement = document.getElementById('chara-img');
const charaNameElement = document.getElementById('chara-name');
const confirmBtnElement = document.getElementById('confirm-btn');

const toNameGame = async () => {
    document.location.href = "./namegame.html";
}

// ロード時にsessionで保存されている名前と画像の番号を送信、順番変更をリクエスト
window.onload = () => {

    console.log("回答情報を送信しました。")
    // 回答者の場合、確認用待機ルームを作製。
    if (flgFromSession == "answered") {
        // キャラ情報をサーバーに送信
        setTimeout(() => {
            ngClientIO.emit('sendCardInformationToServer', {
                entryRoomName: entryRoomNameFromSession,
                randomCardNumber: randomCardNumberFromSession,
                charaName: charaNameFromSession
            });
        }, 2000);
        ngClientIO.emit('waitInit', {});
        console.log("確認用待機ルーム作成しました。");
    }

}

// 回答者が名前をつけた画像と名前を表示する。
ngClientIO.on('displayCardName', (data) => {
    const randomCardNumber = data.randomCardNumber;
    const charaName = data.charaName;

    console.log("カード番号：" + randomCardNumber);
    console.log("キャラの名前：" + charaName);

    charaImgElement.src = "../allstars/gazou" + randomCardNumber + ".png";
    charaNameElement.textContent = charaName;
})

// ボタンを押した時に待機させる。
/**
* @emits {Number} data.roomCount 部屋数
* @emits {Number} data.limitPerRoom 部屋あたりの制限人数
*/
confirmBtnElement.onclick = () => {
    ngClientIO.emit('waitConfirm', {
        entryRoomName: entryRoomNameFromSession,
        roomCount: roomCountFromSession,
        countInRoom: countInRoomFromSession
    })

}

// 全員が確認したことを受信したときに画面遷移する処理
ngClientIO.on('toNameGame', () => {
    toNameGame();
})
