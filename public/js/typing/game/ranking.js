// ニックネームとスコアを送る。nickName, score
// データベース使う
import { tpClientIO } from '../../../link.js';

// element
const rankingListFromElement = document.getElementById('ranking-list');

// session
const nickNameFromSession = sessionStorage.getItem('nickName');
const scoreFromSession = sessionStorage.getItem('score');
const limitPerRoomFromSession = sessionStorage.getItem('limitPerRoom');

let rankList = "";
console.log(nickNameFromSession);
window.onload = () => {
    tpClientIO.emit('requestRanking', {
        nickName: nickNameFromSession,
        score: scoreFromSession,

    });
}

const toGameEnd = () => {
    document.location.href = "./gameEnd.html";
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
        limitPerRoom: limitPerRoomFromSession
    });
})