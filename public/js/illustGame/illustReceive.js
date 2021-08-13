import { igClientIO } from '../../link.js';

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

function prevCanvas() {
    var logs = JSON.parse(myStorage.getItem("__log"));
    if (logs.length > 0) {
        temp.unshift(logs.shift());
        setTimeout(function () {
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
}

function nextCanvas() {
    var logs = JSON.parse(myStorage.getItem("__log"));
    if (temp.length > 0) {
        logs.unshift(temp.shift());
        setTimeout(function () {
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
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
            prevCanvas();
            break;
        case "next":
            nextCanvas();
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
    }
})