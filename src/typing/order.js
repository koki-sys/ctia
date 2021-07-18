exports.order = (socket, IOserver) => {
    const { mycon } = require('../connectDB');

    socket.on('requestRanking', async (data) => {
        const nickName = data.nickName;
        const score = parseInt(data.score);


        // 名前をつけたカードを記録する。
        const personalScore = [nickName, score];
        const doubleCheckSQL = 'select count(id) as cnt from typing where nickname = ?';
        const [doubleCheck] = await mycon.query(doubleCheckSQL, nickName);
        console.log(doubleCheck);
        console.log(doubleCheck[0].cnt);
        const count = parseInt(doubleCheck[0].cnt);
        if (count === 0) {
            const insertSQL = 'insert into typing (id, nickname, score) values (null, ?, ?)';
            const [err] = await mycon.query(insertSQL, personalScore);
        }
        const selectSQL = 'select * from typing order by score desc';
        const [results, fields] = await mycon.query(selectSQL, personalScore);
        IOserver.emit('displayRanking', {
            results: results
        })
    })
    socket.on('requestGameEnd', async (data) => {
        const limitPerRoom = parseInt(data.limitPerRoom);
        const countPersonSQL = 'select count(id) as cnt from typing';
        const [countPersonRow] = await mycon.query(countPersonSQL);
        const countPerson = parseInt(countPersonRow[0].cnt);

        if (countPerson === limitPerRoom) {
            IOserver.emit('toGameEnd', {});
        }
    })
    socket.on('deleteData', async (data) => {
        const deleteSQL = 'delete from namegame';

        await mycon.execute(deleteSQL);
        console.log('データ削除');
        await socket.leave(data.entryRoomName);
        await IOserver.emit('deletedGameData', {});
    })
}