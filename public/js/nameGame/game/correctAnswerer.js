import { toWait } from '../component/link/toWait.js';
import { ngClientIO } from '../../../link.js';

// html要素取得
const answerBtnElement = document.getElementById('answer-btn');
const answererElment = document.getElementById('correct-answerer');

// session取得
const correctAnswerer = sessionStorage.getItem('correctAnswerer');
const roomCount = sessionStorage.getItem('roomCount');
const countInRoom = sessionStorage.getItem('countInRoom');

// ロード時に画面に正解者を表示
window.onload = () => {
    answererElment.textContent = correctAnswerer + "さん";
    ngClientIO.emit('waitInit', {});
}

answerBtnElement.onclick = () => {
    ngClientIO.emit('waitConfirm', {
        roomCount: roomCount,
        countInRoom: countInRoom
    })
}

// 全員が確認したことを受信したときに画面遷移する処理
ngClientIO.on('toNameGame', () => {
    toWait();
})