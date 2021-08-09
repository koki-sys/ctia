import { ngClientIO } from '../../../link.js';
import { getCount } from './cardCount.js';

const winnerName = document.getElementById('winner-name');

const roomId = sessionStorage.getItem('roomId');
const nickname = sessionStorage.getItem('nickName');

window.onload = () => {
    const count = getCount();
    console.log("自分が持ったカード数" + count);
    ngClientIO.emit('ranking', {
        count: count,
        roomId: roomId,
        nickname: nickname
    })
}

ngClientIO.on('displayWinner', (data) => {
    const name = data.name;
    winnerName.textContent = name + "さんの勝利!!";
})

setTimeout(() => {
    document.location.href="./gameEnd.html";
}, 3000);