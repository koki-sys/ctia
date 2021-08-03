const { typing } = require('../../model/typing');
const { user } = require('../../model/user');

exports.tpController = async (socket, IOserver) => {

    socket.on('requestRanking', async (data) => {
        const nickname = data.nickName;
        const score = parseInt(data.score);
        const roomId = parseInt(data.roomId);

        const PersonInfo = await user.find(nickname);
        console.log(PersonInfo)
        const userId = PersonInfo.id;

        const typingData = {
            nickname: nickname,
            score: score,
            roomId: roomId,
            userId: userId
        }

        const isScore = await typing.isScore(typingData);

        if (!isScore) {
            await typing.add(typingData);
        }

        const scoreData = await typing.all();
        console.log(scoreData[0]);
        console.log(scoreData[0].id);
        console.log(scoreData[0].nickname);

        IOserver.emit('displayRanking', {
            results: scoreData
        })
    })

    socket.on('requestGameEnd', async (data) => {
        const limitPerRoom = parseInt(data.limitPerRoom);

        const count = await typing.count();
        console.log("ユーザ数：" + count);

        if (count === limitPerRoom) {
            IOserver.emit('toGameEnd', {});
        }
    })

    socket.on('deleteData', async (data) => {

        console.log('データ削除');
        await socket.leave(data.entryRoomName);
        await IOserver.emit('deletedGameData', {});
    })
}