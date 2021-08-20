import { igClientIO } from '../../link.js';
import { toComplete } from '../component/link/toComplete.js';

var canvas = document.getElementById('draw-area'),
    ctx = canvas.getContext('2d'),
    moveflg = 0,
    currentCanvas,
    temp = [];

//初期値（サイズ、色、アルファ値）の決定
var defSize = 3,
    defColor = "#555";

// ストレージの初期化
var myStorage = localStorage;
window.onload = initLocalStorage();

function resetCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

function initLocalStorage() {
    myStorage.setItem("__log", JSON.stringify([]));
}

function setLocalStoreage() {
    var png = canvas.toDataURL();
    var logs = JSON.parse(myStorage.getItem("__log"));
    setTimeout(function () {
        logs.unshift({ png });
        myStorage.setItem("__log", JSON.stringify(logs));
        currentCanvas = 0;
        temp = [];
    }, 0);
}

function draw(src) {
    var img = new Image();
    img.src = src;
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    }
}

//消しゴムモード 色をホワイトに変えるだけ
function eraser() {
    defColor = '#FFFFFF';
}

//描画モード　色を元の色に戻すだけ
function drawInPen() {
    defColor = "#555";
}

igClientIO.on("draw", (data) => {
    switch (data.act) {
        case "down":
            ctx.beginPath();
            ctx.moveTo(data.x, data.y);
            break;
        case "move":
            moveflg = 1;
            ctx.lineTo(data.x, data.y);
            ctx.lineCap = "round";
            ctx.lineWidth = defSize * 2;
            ctx.strokeStyle = defColor;
            ctx.stroke();
            break;
        case "up":
            if (moveflg === 0) {
                ctx.lineTo(data.x - 1, data.y - 1)
                ctx.lineCap = "round";
                ctx.lineWidth = defSize * 2;
                ctx.strokeStyle = defColor;
                ctx.stroke();
            }
            moveflg = 0;

            setLocalStoreage();
            break;
        case "prev":
            console.log("前");
            draw(data.src);
            break;
        case "next":
            console.log("後")
            draw(data.src);
            break;
        case "eraser":
            eraser();
            break;
        case "drawPen":
            drawInPen();
            break;
        case "reset":
            resetCanvas();
            break;
        case "towait":
            toComplete();
        break;
    }
})