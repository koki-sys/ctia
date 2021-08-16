import { igClientIO } from "../../link.js"
import { change } from "../component/game/change.js"
import { sendOrder } from "../component/game/sendOrder.js";
import { setOrder } from "../component/game/setOrder.js";

window.onload = () => {
    igClientIO.emit("realtime-draw", {
        act: "towait",
    })
    
    sendOrder();

    change(igClientIO);
}

setOrder();