const assert = require("assert");
const { should } = require("chai");
const mysql = require("mysql2/promise");
const { config } = require("../../src/config/config");
const { order } = require("../../src/model/order");
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
    await mycon.query("DELETE FROM order_pattern");
    await mycon.query("DELETE FROM user");
    await mycon.query("DELETE FROM room");
    mycon.end();
}

let sampleData;

exports.orderModelTest = () => {
    describe("OrderPattern Model Test", () => {

        before(async () => {
            const initResult = await beforeInit();
            sampleData = {
                roomId: 48,
                userId: initResult,
                random: "9crsSrQzzCuYUhV"
            }
        });

        it("order Add", async () => {
            const data = await order.add(sampleData);
            assert.equal(data, true);
        })

        it("order first pattern:9crsSrQzzCuYUhV", async () => {
            const data = await order.first(sampleData.roomId);
            assert.equal(data.order_pattern, "9crsSrQzzCuYUhV");
        })

        it("order first not exists", async () => {
            const data = await order.first(3);

            should().equal(data, undefined);
        })

        it("order update flg:1", async () => {
            const data = await order.first(sampleData.roomId);
            const resultId = data.id;
            const isOrder = await order.flgUpdate(resultId);

            assert.equal(isOrder, true);
        })

        it("order Add Duplicate", async () => {
            const data = await order.add(sampleData);
            assert.equal(data, false);
        })

        after(async () => {
            await afterInit();
        })
    })
}
