const assert = require("assert");
const { illust } = require("../../../src/model/illust");
const { afterInit, beforeInit } = require("./init");

let sampleData;

exports.IllustModelTest = () => {
    describe("illust Model Test", () => {
        before(() => {
            sampleData = {
                roomId: 48,
                enterRoomName: "部屋48",
                limitPerRoom: 2
            }
            beforeInit(sampleData);
        })

        it("illust beforeAdd data_exists false", async () => {
            const isSec = await illust.exists(sampleData.roomId);
            assert.equal(isSec, false);
        })

        it("illust Add 300sec.(Initialize)", async () => {
            const data = await illust.add(300, sampleData.roomId);
            assert.equal(data, true);
        })

        it("illust getsec 300sec.", async () => {
            const data = await illust.getSec(sampleData.roomId);

            assert.equal(data, 300);
        })

        it("illust update 300sec->200sec.", async () => {
            const isUpdate = await illust.update(200, sampleData.roomId);
            const data = await illust.getSec(sampleData.roomId);

            assert.equal(isUpdate, true);
            assert.equal(data, 200);
        })

        it("illust update 200sec-> -100sec.", async () => {
            const gameTime = await illust.getSec(sampleData.roomId);
            const isUpdate = await illust.update(gameTime - 300, sampleData.roomId);
            const result = await illust.getSec(sampleData.roomId);

            assert.equal(isUpdate, true);
            assert.equal(result, -100);
        })

        it("illust afterAdd data_exists true", async () => {
            const isSec = await illust.exists(sampleData.roomId);
            assert.equal(isSec, true);
        })

        after(async () => {
            await afterInit();
        })
    })
}
