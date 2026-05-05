const assert = require("assert")
const mysql = require("mysql2/promise")
const { config } = require("../../src/config/config")
const { user } = require("../../src/model/user")
const { room } = require("../../src/model/room")

const afterInit = async () => {
    let mycon
    mycon = await mysql.createConnection(config.database)
    mycon.connect()
    await mycon.query("DELETE FROM user")
    await mycon.query("DELETE FROM room")
    mycon.end()
}

exports.userModelTest = () => {
    const sampleData = {
        nickname: "testUser",
        roomId: 48,
    }

    describe("User Model Test", () => {
        before(async () => {
            const sampleData = {
                roomId: 48,
                enterRoomName: "部屋48",
                limitPerRoom: 2,
            }

            await room.create(sampleData)
        })

        it("user Add", async () => {
            const data = await user.add(sampleData)
            assert.equal(data, true)
        })

        it("user getAll", async () => {
            const datas = await user.all(sampleData.roomId)
            datas.map((data) => {
                assert.equal(data.nickname, "testUser")
            })
        })

        it("user getCount", async () => {
            const data = await user.count(48)

            assert.equal(data, 1)
        })

        it("user getFind", async () => {
            const data = await user.find(sampleData.nickname)

            assert.equal(data.nickname, "testUser")
            assert.equal(data.room_id, 48)
        })

        it("user Add Duplicate", async () => {
            const data = await user.add(sampleData)
            assert.equal(data, false)
        })

        after(async () => {
            await afterInit()
        })
    })
}
