const { namegame } = require('../../model/namegame');
const { waitCounter } = require('./waitCounter');
const { requestOrderPattern } = require('../../component/order/requestOrderPattern');
const { user } = require('../../model/user');
const { order } = require('../../model/order');

exports.ngController = (socket, IOserver, waitCount, namedImgNumberArray, tempCharaName) => {

    requestOrderPattern(socket, IOserver);

    // 画像番号の確認
    socket.on('checkImgNumber', () => {

        let random = Math.floor(Math.random() * 14) + 1;

        while (true) {
            const number = namedImgNumberArray.indexOf(random);
            if (number === -1) {
                break;
            } else {
                random = Math.floor(Math.random() * 14) + 1;
            }
        }

        IOserver.emit('setImgNumber', {
            random: random
        })
    })

    // 順番切り替えをする処理
    socket.on("order", async (data) => {
        const roomId = data.roomId;

        // roomId
        console.log(roomId);

        // ランダムで覚えたやつか名前つけるかを出す。
        // 1 => 名前つける
        // 2 => 回答する
        let pageFlg = Math.floor(Math.random() * 2) + 1;
        if (namedImgNumberArray.length == 0) {
            pageFlg = 1;
        }

        switch (pageFlg) {
            case 1:
                const first = await order.first(roomId);
                console.log(JSON.stringify(first));

                const orderId = first.id;
                const nextPattern = first.order_pattern;

                await order.flgUpdate(orderId);

                IOserver.emit("changeOrder", {
                    changePattern: nextPattern,
                    pageFlg: pageFlg
                })
                break;

            case 2:
                IOserver.emit("changeOrder", {
                    pageFlg: pageFlg,
                })
                break;
        }
    })

    // キャラカード情報を受信して、チームに入っているメンバーに送る。
    socket.on('sendCardInformationToServer', async (data) => {
        const randomCardNumber = parseInt(data.randomCardNumber);
        const charaName = data.charaName;
        const nickname = data.nickName;
        const roomId = data.roomId;
        console.log("にっくねーむ" + nickname);

        const PersonInfo = await user.find(nickname);
        console.log("PersonInfo:" + PersonInfo);
        const userId = PersonInfo.id;

        const gameData = {
            charaId: randomCardNumber,
            charaName: charaName,
            userId: userId,
            roomId: roomId
        }

        // 名前をつけたカードを記録する。
        await namegame.add(gameData);

        const result = await namegame.find(gameData);

        // カードの名前をつけたやつを送信
        IOserver.emit('displayCardName', {
            randomCardNumber: result.id,
            charaName: result.chara_name
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
        console.log(orderArray.length);
        if (orderArray.length === 0) {
            const deleteSQL = 'delete from namegame';

            await mycon.execute(deleteSQL);
            console.log('データ削除');
            await socket.leave(data.entryRoomName);
            await IOserver.emit('toGameEnd', {});
        }
    })
}