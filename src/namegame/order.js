exports.order = (socket, IOserver, orderArray, waitCount, namedImgNumberArray, tempCharaName) => {

    const { waitCounter } = require('./waitCounter');
    const { mycon } = require('../connectDB');

    const randomPattern = (digit) => {
        const patterns = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let val = '';

        if (typeof digit === 'undefined') digit = 8;

        for (let i = 0; i < digit; i++) {
            val += patterns[Math.floor(Math.random() * patterns.length)] + '';
        }

        return val;
    };

    // 順番を送る。
    socket.on("requestOrderPattern", () => {
        // 順番作製のために
        const orderPattern = randomPattern(15);
        orderArray.push(orderPattern);

        // 順番を受け取りに来たユーザに順番を送る。
        IOserver.to(socket.id).emit("sendOrderPattern", {
            orderPattern: orderPattern,
        });
    });

    // 順番切り替えをする処理
    socket.on("order", (data) => {
        console.log("順番切り替え処理を行っています・・・");
        // ランダムで覚えたやつか名前つけるかを出す。
        // 1 => 名前つける
        // 2 => 回答する
        let pageFlg = Math.floor(Math.random() * 2) + 1;
        if (namedImgNumberArray.length == 0) {
            pageFlg = 1;
        }

        // 名前つけるか、回答かのフラグを送る。
        if (data.flg == "answered" && pageFlg == 1) {
            const nextPattern = orderArray.shift();
            console.log("送信パターン(順番)" + nextPattern);
            console.log("参加部屋名：" + data.entryRoomName);
            IOserver.emit("changeOrder", {
                changePattern: nextPattern,
                pageFlg: pageFlg,
            })
        } else if (pageFlg == 2) {
            IOserver.emit("changeOrder", {
                pageFlg: pageFlg,
            })
        }
    })

    // キャラカード情報を受信して、チームに入っているメンバーに送る。
    socket.on('sendCardInformationToServer', async (data) => {
        const randomCardNumber = parseInt(data.randomCardNumber);
        const charaName = data.charaName;

        // 名前をつけたカードを記録する。
        const namedCharaCard = [randomCardNumber, charaName];
        const insertSQL = 'insert into namegame (id, chara_name) values (?, ?)';

        const [err] = await mycon.query(insertSQL, namedCharaCard);
        console.log(err);
        const selectSQL = 'select * from namegame where id=? and chara_name=?';
        const [results, fields] = await mycon.query(selectSQL, namedCharaCard);

        // カードの名前をつけたやつを送信
        IOserver.emit('displayCardName', {
            randomCardNumber: results[0].id,
            charaName: results[0].chara_name
        })
    });


    // 確認用待機ルーム作製
    socket.on('waitInit', () => {
        waitCount = waitCounter();
    })

    // 全員確認したことを受信する
    socket.on('waitConfirm', (data) => {
        const countInRoom = parseInt(data.countInRoom);
        let count;

        // 待機人数をカウントする。
        if (typeof waitCount == 'function') {
            count = waitCount();
        } else {
            console.log("error");
        }
        console.log("待機人数：" + count);
        // 待機人数が入室人数と同じ時に画面遷移させるようなレスポンスを送る。
        if (count == countInRoom) {
            IOserver.emit('toNameGame', {})
        }
    })

    // 回答するときの表示する画像をおくる。
    socket.on('requestDisplayCharaImg', () => {

        const randomNamedChara = namedImgNumberArray.shift();
        console.log(randomNamedChara);
        // 後で判定するために値を保存。
        tempCharaName = randomNamedChara.name;

        if (tempCharaName == undefined) {
            // 画像情報が入ってないときの処理。
            IOserver.emit('randomNamedCharaImg', {
                randomCardNumber: 0,
                charaName: "空"
            });
        } else {
            // ランダムで名前つけたカードを表示
            IOserver.emit('randomNamedCharaImg', {
                randomCardNumber: randomNamedChara.number,
                charaName: randomNamedChara.name
            });
        }
    })

    // 回答チェックして、正解の場合は正解画面表示のレスポンスを送信
    socket.on('checkTheAnswer', (data) => {
        const namedCharaName = data.namedCharaName;
        const nickName = data.nickName;

        // 名前つけたカードと、回答した名前があってるかチェック。
        if (namedCharaName == tempCharaName) {
            IOserver.emit('sendCorrectAnswerer', {
                nickName: nickName,
            })
            tempCharaName = '';
        } else {
            IOserver.to(socket.id).emit('incorrectAnswer', {
                msg: "不正解です。"
            })
        }
    })

    // 確認画面に遷移するために画像番号、名前を送る
    socket.on('toNameConfirmRequest', () => {
        IOserver.emit("toNameConfirmResponse", {});
    })

    socket.on('isOrderPatternArray', async (data) => {
        if (orderArray.length() === 0) {
            const deleteSQL = 'delete from namegame';

            await mycon.execute(deleteSQL);
            console.log('データ削除');
            await socket.leave(data.entryRoomName);
            await IOserver.emit('toGameEnd', {})
        }
    })
}