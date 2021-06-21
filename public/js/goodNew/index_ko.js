import { gnClientIO } from '../../link.js';

const gameStart = document.getElementById('gamestart');

window.onload = () => {
    // ロード時に参加部屋などの情報を保存
    sessionStorage.setItem('entryRoomName', getParam('entry'));
    sessionStorage.setItem('roomCount', getParam('roomCount'));
    sessionStorage.setItem('countInRoom', getParam('countInRoom'));
}

// ボタン押下時に招待された部屋に参加
gameStart.onclick = () => {
    gnClientIO.emit('few_group', {
        roomName: sessionStorage.getItem('entryRoomName'),
    })
}