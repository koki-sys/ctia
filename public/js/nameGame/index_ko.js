import { dgClientIO } from '../../link.js';

const gameStart = document.getElementById('gamestart');

window.onload = () => {
    // ロード時に参加部屋などの情報を保存
    const urlParams = new URLSearchParams(window.location.search);
    sessionStorage.setItem('entryRoomName', urlParams.get('entry'));
}

// ボタン押下時に招待された部屋に参加
gameStart.onclick = () => {
    dgClientIO.emit('few_group', {
        roomName: sessionStorage.getItem('entryRoomName'),
    })
}