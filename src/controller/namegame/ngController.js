const { namegame } = require("../../model/namegame");
const { waitCounter } = require("./waitCounter");
const { requestOrderPattern } = require("../../component/order/requestOrderPattern");
const { user } = require("../../model/user");
const { order } = require("../../model/order");
const { score } = require("../../model/score");

exports.ngController = (socket, IOserver, waitCount) => {
    requestOrderPattern(socket, IOserver);

    // 画像番号の確認
    socket.on("checkImgNumber", async (data) => {
        let namedImgArray = [];
        const roomId = data.roomId;
        let random = Math.floor(Math.random() * 14) + 1;

        const cards = await namegame.getNamedCharaId(roomId);

        // 存在チェック
        if (typeof cards != "undefined" || cards.length != 0) {
            cards.map((card) => {
                namedImgArray.push(card.chara_number);
            });
        }

        while (true) {
            const number = parseInt(namedImgArray.indexOf(random));
            if (number === -1) {
                break;
            } else {
                random = Math.floor(Math.random() * 14) + 1;
            }
        }

        IOserver.emit("setImgNumber", {
            random: random,
        });
    });

    // 順番切り替えをする処理
    socket.on("order", async (data) => {
        const roomId = data.roomId;

        // ランダムで覚えたやつか名前つけるかを出す。
        // 1 => 名前つける
        // 2 => 回答する
        let pageFlg = 1;

        // DBから取得して、flg0なのが0のやつも入れる
        const namedCount = await namegame.namedCount(roomId);
        const answeredCount = await namegame.answeredCount(roomId);

        if (namedCount > answeredCount) {
            pageFlg = 2;
        } else if (answeredCount === 14) {
            pageFlg = 0;
        } else if (namedCount != 0 && namedCount < answeredCount) {
            pageFlg = 2;
        } else if (namedCount === 0 && namedCount < answeredCount) {
            pageFlg = 1;
        }

        switch (pageFlg) {
            case 0:
                IOserver.emit("gameResult", {});
                break;
            case 1:
                const first = await order.first(roomId);

                const orderId = first.id;
                const nextPattern = first.order_pattern;

                await order.flgUpdate(orderId);

                console.log("次の人：" + nextPattern);
                IOserver.emit("changeOrder", {
                    changePattern: nextPattern,
                    pageFlg: pageFlg,
                });
                break;

            case 2:
                IOserver.emit("changeOrder", {
                    pageFlg: pageFlg,
                });
                break;
        }
    });

    // キャラカード情報を受信して、チームに入っているメンバーに送る。
    socket.on("sendChara", async (data) => {
        const charaId = parseInt(data.randomCardNumber);
        const charaName = data.charaName;
        const nickname = data.nickName;
        const roomId = data.roomId;

        const PersonInfo = await user.find(nickname);
        const userId = PersonInfo.id;

        const gameData = {
            charaId: charaId,
            charaName: charaName,
            userId: userId,
            roomId: roomId,
        };

        // 名前をつけたカードを記録する。
        await namegame.add(gameData);

        const result = await namegame.find(charaId, roomId);

        // カードの名前をつけたやつを送信
        IOserver.emit("displayCardName", {
            randomCardNumber: result.chara_number,
            charaName: result.chara_name,
        });
    });

    // 確認用待機ルーム作製
    socket.on("waitInit", () => {
        waitCount = waitCounter();
    });

    // 全員確認したことを受信する
    socket.on("waitConfirm", (data) => {
        const countInRoom = parseInt(data.countInRoom);
        let count;

        // 待機人数をカウントする。
        if (typeof waitCount == "function") {
            count = waitCount();
        } else {
            console.log("error");
        }
        // 待機人数が入室人数と同じ時に画面遷移させるようなレスポンスを送る。
        if (count == countInRoom) {
            IOserver.emit("toNameGame", {});
        }
    });

    // 回答するときの表示する画像をおくる。
    socket.on("sendImg", async (data) => {
        const roomId = data.roomId;

        // DB操作
        const randomChara = await namegame.random(roomId);
        const id = randomChara.id;

        const tempCharaName = randomChara.chara_name;

        await namegame.flgUpdate(id);

        if (tempCharaName == undefined) {
            // 画像情報が入ってないときの処理。
            IOserver.emit("DisplayImg", {
                randomCardNumber: 0,
                charaName: "空",
            });
        } else {
            // ランダムで名前つけたカードを表示
            IOserver.emit("DisplayImg", {
                randomCardNumber: randomChara.chara_number,
                charaName: randomChara.chara_name,
            });
        }
    });

    // 回答チェックして、正解の場合は正解画面表示のレスポンスを送信
    socket.on("checkTheAnswer", async (data) => {
        const namedCharaName = data.namedCharaName;
        const roomId = data.roomId;
        const nickName = data.nickName;
        const token = data.answerToken;
        const charaId = data.charaId;

        const result = await namegame.find(charaId, roomId);
        const answer = result.chara_name;

        // 名前つけたカードと、回答した名前があってるかチェック。
        if (namedCharaName == answer) {
            IOserver.emit("correctAnswerer", {
                nickName: nickName,
                answerToken: token,
            });
        } else {
            IOserver.to(socket.id).emit("incorrectAnswer", {
                msg: "不正解です。",
            });
        }
    });

    // 確認画面に遷移するために画像番号、名前を送る
    socket.on("nameConfirm", () => {
        IOserver.emit("toNameConfirmResponse", {});
    });

    socket.on("isOrder", async (data) => {
        if (orderArray.length === 0) {
            const deleteSQL = "delete from namegame";

            await mycon.execute(deleteSQL);
            await socket.leave(data.entryRoomName);
            await IOserver.emit("toGameEnd", {});
        }
    });

    socket.on("ranking", async (data) => {
        const count = data.count;
        const roomId = data.roomId;

        const person = await user.find(data.nickname);
        const userId = person.id;
        console.log("個人" + JSON.stringify(person));
        console.log("ユーザID" + userId);

        await score.addNamegame(count, userId, roomId);
        const win = await score.getNamegame(roomId);
        console.log("勝ち" + win);
        const winner = win.nickname;
        IOserver.emit("displayWinner", {
            name: winner,
        });
    });
};
