const assert = require("assert");
const { illust } = require("../../../src/model/illust");
const { beforeIllustTest, afterIllustTest } = require("../../init/testInit");

let sampleData;

exports.IllustModelTest = () => {
    describe("illust Model Test", () => {

        before(async () => {
            const initResultUserId = await beforeIllustTest();
            sampleData = {
                roomId: 48,
                userId: initResultUserId,
                charaId: 3,
                charaName: "どら"
            }
        });

        it("illust Add", async () => {
            const data = await illust.add(sampleData);
            assert.equal(data, true);
        })

        it("illust getsec", async () => {
            const data = await illust.update(sampleData);

            assert.equal(data.chara_number, 3);
            assert.equal(data.chara_name, "どら");
        })

        it("illust update", async () => {
            const data = await illust.random(sampleData.roomId);

            assert.equal(data.chara_number, 3);
            assert.equal(data.chara_name, "どら");
        })

        after(async () => {
            await afterIllustTest();
        })
    })
}
