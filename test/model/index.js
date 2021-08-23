const { namegameModelTest } = require("./namegame");
const { orderModelTest } = require("./order");
const { roomModelTest } = require("./room");
const { userModelTest } = require("./user");
const { typingModelTest } = require('./typing');
const { beforeInit } = require("./init");

// それぞれのテストファイルをインポートする

exports.ModelTest = () => {
    before(async () => {
        await beforeInit();
    })
    roomModelTest();
    userModelTest();
    orderModelTest();
    namegameModelTest();
    typingModelTest();
}