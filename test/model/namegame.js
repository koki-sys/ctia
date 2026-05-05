const assert = require("assert");
const mysql = require("mysql2/promise");
const { config } = require("../../src/config/config");
const { namegame } = require("../../src/model/namegame");
const { user } = require("../../src/model/user");
const { room } = require("../../src/model/room");

const beforeInit = async () => {
    const sampleData = {
        roomId: 48,
        enterRoomName: "部屋48",
        nickname: "testUser",
        limitPerRoom: 2
    }

    await room.create(sampleData);
    await user.add(sampleData);
    const result = await user.find(sampleData.nickname);
    const id = result.id;

    return id;
}

const afterInit = async () => {
    let mycon;
    mycon = await mysql.createConnection(config.database);
    mycon.connect();
    await mycon.query("DELETE FROM namegame");
    await mycon.query("DELETE FROM user");
    await mycon.query("DELETE FROM room");
    mycon.end();
}

let sampleData;

exports.namegameModelTest = () => {
    describe("NameGame Model Test", () => {
        before(async () => {
            const initResultUserId = await beforeInit();
            sampleData = {
                roomId: 48,
                userId: initResultUserId,
                charaId: 3,
                charaName: "どら"
            }
        });

        it("namegame Add", async () => {
            const data = await namegame.add(sampleData);
            assert.equal(data, true);
        })

        it("namegame find", async () => {
            const data = await namegame.find(sampleData.charaId, sampleData.roomId);

            assert.equal(data.chara_number, 3);
            assert.equal(data.chara_name, "どら");
        })

        it("namegame answer charaCard", async () => {
            const data = await namegame.random(sampleData.roomId);

            assert.equal(data.chara_number, 3);
            assert.equal(data.chara_name, "どら");
        })

        it("namegame flgupdate 1", async () => {
            const sample = await namegame.random(sampleData.roomId);
            const id = sample.id;
            const data = await namegame.flgUpdate(id);

            assert.equal(data, true);
        })

        it("namegame unansweredCount 0", async () => {
            const sample = await namegame.unansweredCount(sampleData.roomId);
            const count = sample;

            assert.equal(count, 0);
        })

        after(async () => {
            await afterInit();
        })
    })
}
