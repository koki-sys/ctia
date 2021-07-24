exports.typing = {

    add: async (mycon, typingData) => {
        const score = typingData.score;
        const userId = typingData.userId;

        const params = [score, userId];
        const sql = 'INSERT INTO typing (id, score, user_id) values (null, ?, ?)';
        const [err] = await mycon.query(sql, params);
    },

    all: async (mycon) => {
        const sql = 'SELECT * FROM typing LEFT OUTER JOIN user ON typing.user_id = user.id ORDER BY score DESC';
        const [results, fields] = await mycon.query(sql);

        return results;
    },

    count: async (mycon) => {
        const sql = 'SELECT count(id) as cnt FROM typing';
        const [results] = await mycon.query(sql);
        const count = parseInt(results[0].cnt);

        return count;
    },

    delete: async (mycon) => {
        const deleteSQL = 'delete FROM typing';

        await mycon.execute(deleteSQL);
    },

    isScore: async (mycon, typingData) => {
        const userId = typingData.userId;

        const params = [userId];
        const sql = 'SELECT COUNT(id) AS cnt FROM typing WHERE user_id = ?';
        const [doubleCheck] = await mycon.query(sql, params);
        console.log(doubleCheck);
        console.log(doubleCheck[0].cnt);
        const count = parseInt(doubleCheck[0].cnt);

        if (count === 0) {
            return false;
        }
        return true;
    }
}