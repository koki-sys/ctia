const assert = require("assert")
const mysql = require("mysql2/promise")
const { config } = require("../../src/config/config")
const { room } = require("../../src/model/room")

const beforeInit = async () => {
    let mycon
    mycon = await mysql.createConnection(config.database)
    mycon.connect()
    await mycon.query("DELETE FROM room")
    mycon.end()
}

const afterInit = async () => {
    let mycon
    mycon = await mysql.createConnection(config.database)
    mycon.connect()
    await mycon.query("DELETE FROM room")
    mycon.end()
}

exports.roomModelTest = () => {
    const sampleData = {
        roomId: 48,
        enterRoomName: "部屋48",
        limitPerRoom: 2,
    }

    describe("Room Model Test", () => {
        before(async () => {
            await beforeInit()
        })

        it("room Add", async () => {
            const data = await room.create(sampleData)
            assert.equal(data, true)
        })

        it("room id:48 exists", async () => {
            const data = await room.exists(48)
            assert.equal(data, true)
        })

        it("room id:1 not exists", async () => {
            const data = await room.exists(1)

            assert.equal(data, false)
        })

        it("room getRoomId 48", async () => {
            const data = await room.getRoomId(48)

            assert.equal(data, 48)
        })

        it("room Add Duplicate", async () => {
            const data = await room.create(sampleData)
            assert.equal(data, false)
        })

        after(async () => {
            await afterInit()
        })
    })
}
