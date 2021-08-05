
import { ngClientIO } from '../../../link.js';

// session取得
const roomId = sessionStorage.getItem('roomId');
const nickName = sessionStorage.getItem('nickName');
const randomCard = sessionStorage.getItem('randomCardNumber');
const charaName = sessionStorage.getItem('charaName');
const roomCount = sessionStorage.getItem('roomCount');
const flg = sessionStorage.getItem('flg');
const countInRoom = sessionStorage.getItem('countInRoom');

// html要素取得
const confirmBtnElement = document.getElementById('confirm-btn');
const charaElement = document.getElementById('chara-card');

const toNameGame = async () => {
    document.location.href = "./namegame.html";
}

// ロード時にsessionで保存されている名前と画像の番号を送信、順番変更をリクエスト
window.onload = () => {
    console.log("回答情報を送信しました。")
    // 回答者の場合、確認用待機ルームを作製。
    if (flg == "answered") {
        console.log("nickname" + nickName);
        // キャラ情報をサーバーに送信
        setTimeout(() => {
            ngClientIO.emit('sendCardInformationToServer', {
                nickName: nickName,
                randomCardNumber: randomCard,
                charaName: charaName,
                roomId: roomId
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

    const charaImgElement = '<img src="../allstars/gazou'+ randomCardNumber + '.png" width="100%" height="auto" class="d-block mx-auto border"/>';
    const charaNameElement = '<h6 class="text-center mt-3">' + charaName + '</h3>';
    charaElement.innerHTML = charaImgElement + charaNameElement;
})

// ボタンを押した時に待機させる。
/**
* @emits {Number} data.roomCount 部屋数
* @emits {Number} data.limitPerRoom 部屋あたりの制限人数
*/
confirmBtnElement.onclick = () => {
    ngClientIO.emit('waitConfirm', {
        roomCount: roomCount,
        countInRoom: countInRoom
    })
}

// 全員が確認したことを受信したときに画面遷移する処理
ngClientIO.on('toNameGame', () => {
    toNameGame();
})
