const { typing } = require('../../model/typing');
const { user } = require('../../model/user');

exports.tpController = async (socket, IOserver) => {
    const { mycon } = require('../../database/connectDB');

    socket.on('requestRanking', async (data) => {
        const nickname = data.nickName;
        const score = parseInt(data.score);

        const PersonInfo = await user.find(mycon, nickname);
        console.log(PersonInfo)
        const userId = PersonInfo.id;

        const typingData = {
            nickname: nickname,
            score: score,
            userId: userId
        }

        const isScore = await typing.isScore(mycon, typingData);

        if (!isScore) {
            await typing.add(mycon, typingData);
        }

        const scoreData = await typing.all(mycon);
        console.log(scoreData[0]);
        console.log(scoreData[0].id);
        console.log(scoreData[0].nickname);

        IOserver.emit('displayRanking', {
            results: scoreData
        })
    })

    socket.on('requestGameEnd', async (data) => {
        const limitPerRoom = parseInt(data.limitPerRoom);

        const count = await typing.count(mycon);
        console.log("ユーザ数：" + count);

        if (count === limitPerRoom) {
            IOserver.emit('toGameEnd', {});
        }
    })

    socket.on('deleteData', async (data) => {

        await typing.delete(mycon);

        console.log('データ削除');
        await socket.leave(data.entryRoomName);
        await IOserver.emit('deletedGameData', {});
    })
}