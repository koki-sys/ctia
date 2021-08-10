import { tpClientIO } from '../../link.js';
import { toGameEnd } from '../component/link/toGameEnd.js';

// element
const rankingListFromElement = document.getElementById('ranking-list');
let rankList = "";

window.onload = () => {
    tpClientIO.emit('requestRanking', {
        nickName: sessionStorage.getItem('nickName'),
        score: sessionStorage.getItem('score'),
        roomId: sessionStorage.getItem('roomId')
    });
}

const addList = async (list) => {
    rankingListFromElement.innerHTML = list;
}

tpClientIO.on('toGameEnd', () => {
    toGameEnd();
})

tpClientIO.on('displayRanking', async (data) => {
    const results = data.results;
    rankList = "";
    await addList(rankList);
    await results.map((result) => {
        rankList += "<li class='border border-primary mt-3 rounded p-2'>" + result.nickname + "さん   " + result.score + "点" + "</li>";
    })
    await addList(rankList);

    tpClientIO.emit('requestGameEnd', {
        limitPerRoom: sessionStorage.getItem('limitPerRoom')
    });
})