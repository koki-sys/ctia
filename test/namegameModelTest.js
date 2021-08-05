const assert = require("assert");
const { namegame } = require("../src/model/namegame");
const { beforeNameGameTest, afterNameGameTest } = require("./init/testInit");

let sampleData;

describe("NameGame Model Test", () => {

    before(async () => {
        const initResultUserId = await beforeNameGameTest();
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
        const data = await namegame.find(sampleData);

        assert.equal(data.chara_number, 3);
        assert.equal(data.chara_name, "どら");
    })

    after(async () => {
        await afterNameGameTest();
    })
})