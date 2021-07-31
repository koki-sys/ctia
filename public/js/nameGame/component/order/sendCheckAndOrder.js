const sendCheckAndOrder = async (client, order) => {
    const nickname = order.nickname;
    const roomId = order.roomId;

    const orderPatternFromSession = sessionStorage.getItem('orderPattern');
    const isOrder = (orderPatternFromSession != "undifined" || orderPatternFromSession != null) ? true : false;

    if(!isOrder){
        console.log("ニックネーム" + nickname);
        console.log("順番を受け取っています。。。。")
        client.emit('requestOrderPattern', {
            nickname: nickname,
            roomId: roomId
        });
    }
}

export { sendCheckAndOrder }