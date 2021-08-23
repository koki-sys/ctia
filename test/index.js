const { namegameModelTest } = require("./model/namegame");
const { orderModelTest } = require("./model/order");
const { roomModelTest } = require("./model/room");
const { userModelTest } = require("./model/user");
const { typingModelTest } = require('./model/typing');

// それぞれのテストファイルをインポートする
const ModelTest = () => {
    roomModelTest();
    userModelTest();
    orderModelTest();
    namegameModelTest();
    typingModelTest();
}

ModelTest();
