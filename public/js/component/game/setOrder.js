const setOrder = (client) => {
    client.on("sendOrderPattern", (data) => {
        sessionStorage.setItem('orderPattern', data.orderPattern);
        console.log("パターン" + data.orderPattern);
    })
}

export { setOrder }