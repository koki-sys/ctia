import { igClientIO } from "../../link.js"
import { everyTimechange } from "../component/game/everyTimechange.js";
import { setOrder } from "../component/game/setOrder.js";

window.onload = () => {
    igClientIO.emit("realtime-draw", {
        act: "towait",
    })

    everyTimechange(igClientIO);
}

setOrder(igClientIO);

// 順番が自分に回ってきたら遷移する。
igClientIO.on('changeOrder', (data) => {
    const pattern = String(data.changePattern);
    const orderPattern = sessionStorage.getItem('orderPattern');
    console.log("'" + pattern + "'");
    console.log("'" + orderPattern + "'");

    // 順番が来たら、発表画面に切り替える。
    console.log("junnbannkae");
    if (orderPattern === pattern) {
        toAnnounce();
    }
})

igClientIO.on('gameEnd', () => {
    toGameEnd();
})