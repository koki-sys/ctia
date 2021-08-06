const { namegame } = require('../../model/namegame');
const { waitCounter } = require('./waitCounter');
const { requestOrderPattern } = require('../../component/order/requestOrderPattern');
const { user } = require('../../model/user');
const { order } = require('../../model/order');

exports.ngController = (socket, IOserver, waitCount, namedImgArray, tempCharaName) => {

    requestOrderPattern(socket, IOserver);

    // 画像番号の確認
    socket.on('checkImgNumber', () => {
        let random = Math.floor(Math.random() * 14) + 1;

        while (true) {
            const number = parseInt(namedImgArray.indexOf(random));
            if (number === -1) {
                break;
            } else {
                random = Math.floor(Math.random() * 14) + 1;
            }
        }

        namedImgArray.push(random);

        IOserver.emit('setImgNumber', {
            random: random
        })
    })

    // 順番切り替えをする処理
    socket.on("order", async (data) => {
        const roomId = data.roomId;

        // ランダムで覚えたやつか名前つけるかを出す。
        // 1 => 名前つける
        // 2 => 回答する
        let pageFlg = Math.floor(Math.random() * 2) + 1;
        if (namedImgArray.length == 0) {
            pageFlg = 1;
        }

        switch (pageFlg) {
            case 1:
                const first = await order.first(roomId);

                const orderId = first.id;
                const nextPattern = first.order_pattern;

                await order.flgUpdate(orderId);

                console.log("次の人：" + nextPattern);
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
    socket.on('sendChara', async (data) => {
        const randomCardNumber = parseInt(data.randomCardNumber);
        const charaName = data.charaName;
        const nickname = data.nickName;
        const roomId = data.roomId;

        const PersonInfo = await user.find(nickname);
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
            randomCardNumber: result.chara_number,
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
        // 待機人数が入室人数と同じ時に画面遷移させるようなレスポンスを送る。
        if (count == countInRoom) {
            IOserver.emit('toNameGame', {})
        }
    })

    // 回答するときの表示する画像をおくる。
    socket.on('sendImg', async (data) => {
        const roomId = data.roomId;

        // DB操作
        const randomChara = await namegame.random(roomId);
        id = randomChara.id;
        tempCharaName = randomChara.chara_name;

        await namegame.flgUpdate(id);

        if (tempCharaName == undefined) {
            // 画像情報が入ってないときの処理。
            IOserver.emit('DisplayImg', {
                randomCardNumber: 0,
                charaName: "空"
            });
        } else {
            // ランダムで名前つけたカードを表示
            IOserver.emit('DisplayImg', {
                randomCardNumber: randomChara.chara_number,
                charaName: randomChara.chara_name
            });
        }
    })

    // 回答チェックして、正解の場合は正解画面表示のレスポンスを送信
    socket.on('checkTheAnswer', (data) => {
        const namedCharaName = data.namedCharaName;
        const nickName = data.nickName;

        // 名前つけたカードと、回答した名前があってるかチェック。
        if (namedCharaName == tempCharaName) {
            IOserver.emit('correctAnswerer', {
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
    socket.on('nameConfirm', () => {
        IOserver.emit("toNameConfirmResponse", {});
    })

    socket.on('isOrder', async (data) => {
        if (orderArray.length === 0) {
            const deleteSQL = 'delete from namegame';

            await mycon.execute(deleteSQL);
            await socket.leave(data.entryRoomName);
            await IOserver.emit('toGameEnd', {});
        }
    })
}