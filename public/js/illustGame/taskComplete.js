import { igClientIO } from "../../link.js"
import { everyTimechange } from "../component/game/everyTimechange.js";
import { setOrder } from "../component/game/setOrder.js";
import { toAnnounce } from "../component/link/toAnnounce.js";

window.onload = () => {
    igClientIO.emit("realtime-draw", {
        act: "towait",
    })

    everyTimechange(igClientIO, toAnnounce);
}

setOrder(igClientIO);

// 順番が自分に回ってきたら遷移する。
igClientIO.on('changeOrder', (data) => {
    const pattern = String(data.changePattern);
    const orderPattern = sessionStorage.getItem('orderPattern');

    // 順番が来たら、発表画面に切り替える。
    console.log("junnbannkae");
    if (orderPattern === pattern) {
        toAnnounce();
    } else {
        document.location.href = "./shiritori_receive.html";
    }
})

igClientIO.on('gameEnd', () => {
    toGameEnd();
})