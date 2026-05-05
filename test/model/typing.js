const assert = require("assert");
const mysql = require("mysql2/promise");
const { config } = require("../../src/config/config");
const { typing } = require("../../src/model/typing");
const { user } = require("../../src/model/user");
const { room } = require("../../src/model/room");

const afterInit = async () => {
    let mycon;
    mycon = await mysql.createConnection(config.database);
    mycon.connect();
    await mycon.query("DELETE FROM typing");
    await mycon.query("DELETE FROM user");
    await mycon.query("DELETE FROM room");
    mycon.end();
}

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

let sampleData;

exports.typingModelTest = () => {
    describe("Typing Model Test", () => {

        before(async () => {
            const initResultUserId = await beforeInit();
            sampleData = {
                roomId: 48,
                userId: initResultUserId,
                score: 1875
            }
        });

        it("typing Add", async () => {
            const data = await typing.add(sampleData);
            assert.equal(data, true);
        })

        it("typing getAll", async () => {
            const datas = await typing.all();
            datas.map((data) => {
                assert.notEqual(data, false);
            })
        })

        it("typing getCount", async () => {
            const data = await typing.count(48);

            assert.equal(data, 1);
        })

        it("typing isScore true", async () => {
            const data = await typing.isScore(sampleData);

            assert.equal(data, true);
        })

        it("typing delete true", async () => {
            const data = await typing.delete();

            assert.equal(data, true);
        })

        it("typing isScore false", async () => {
            const data = await typing.isScore(sampleData);

            assert.equal(data, false);
        })

        after(async () => {
            await afterInit();
        })
    })
}
