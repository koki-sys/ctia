import { igClientIO } from '../../link.js';

const canvas = document.getElementById('draw-area');
const ctx = canvas.getContext('2d');

igClientIO.on("draw", (data) => {
    switch (data.act) {
        case "down":
            ctx.beginPath();
            ctx.moveTo(data.x, data.y);
            break;
        case "move":
            ctx.lineTo(data.x, data.y);
            ctx.stroke();
            break;
        case "up":
            ctx.lineTo(data.x - 1, data.y - 1)
            ctx.stroke();
            ctx.closePath();
    }
})

