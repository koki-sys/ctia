exports.namegame = {

    add: async (mycon, gameData) => {

        // 部屋情報
        const cardNumber = gameData.cardNumber;
        const charaName = gameData.charaName;
        const userId = gameData.userId;

        // ルーム追加
        const params = [cardNumber, charaName, userId];
        const sql = 'insert into namegame (id, chara_name, user_id) values (?, ?, ?)';
        const [err] = await mycon.query(sql, params);
        console.log(err);
    },

    find: async (mycon, gameData) => {

        // 部屋情報
        const cardNumber = gameData.cardNumber;
        const charaName = gameData.charaName;

        // ルーム追加
        const params = [cardNumber, charaName];
        const sql = 'select * from namegame where id=? and chara_name=?';
        const [results, fields] = await mycon.query(sql, params);

        const result = results[0];
        return result;
    }
}