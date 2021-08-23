const assert = require("assert");
const { should } = require("chai");
const { order } = require("../../../src/model/order");
const { afterInit, beforeInit } = require("./init");

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
