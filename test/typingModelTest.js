const assert = require("assert");
const { typing } = require("../src/model/typing");
const { beforeTypingTest, afterTypingTest } = require("./init/testInit");

let sampleData;

describe("Typing Model Test", () => {

    before(async () => {
        const initResultUserId = await beforeTypingTest();
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
        await afterTypingTest();
    })
})