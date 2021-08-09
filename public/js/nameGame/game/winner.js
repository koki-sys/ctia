import { ngClientIO } from '../../../link.js';
import { getCount } from './cardCount.js';

const winnerName = document.getElementById('winner-name');

window.onload = () => {
    const count = getCount();
    console.log("自分が持ったカード数" + count);
    ngClientIO.emit('ranking', {
        count: count
    })
}

ngClientIO.on('displayWinner', (data) => {
    const name = data.name;
    winnerName.textContent = name + "さんの勝利!!";
})