import { igClientIO } from "../../link.js"

window.onload = () => {
    igClientIO.emit("realtime-draw", {
        act: "towait",
    })
}