var canvas = document.getElementById('canvassample'),
    ctx = canvas.getContext('2d'),
    currentCanvas,
    temp = [];
 
// ストレージの初期化
var myStorage = localStorage;
window.onload = initLocalStorage();
 
 
canvas.addEventListener('mousedown', dragStart);
canvas.addEventListener('mouseup', dragEnd);
canvas.addEventListener('mouseout', dragEnd);


canvas.addEventListener('touchdown', touchstart);
canvas.addEventListener('touchup', touchend);
canvas.addEventListener('touchout', touchend);

 
// 直前のマウスのcanvas上のx座標とy座標を記録する
const lastPosition = { x: null, y: null };
let isDrag = false;

// 絵を書く
function draw(x, y) {
  // マウスがドラッグされていなかったら処理を中断する。
  // ドラッグしながらしか絵を書くことが出来ない。
  if(!isDrag) {
    return;
  }

 
  context.lineCap = 'round'; // 丸みを帯びた線にする
  context.lineJoin = 'round'; // 丸みを帯びた線にする
  context.lineWidth = 5; // 線の太さ
  context.strokeStyle = 'black'; // 線の色


  if (lastPosition.x === null || lastPosition.y === null) {
    // ドラッグ開始時の線の開始位置
    context.moveTo(x, y);
  } else {
    // ドラッグ中の線の開始位置
    context.moveTo(lastPosition.x, lastPosition.y);
  }

  context.lineTo(x, y);

  // context.moveTo, context.lineToの値を元に実際に線を引く
  context.stroke();

  // 現在のマウス位置を記録して、次回線を書くときの開始点に使う
  lastPosition.x = x;
  lastPosition.y = y;
}
 
function endPoint(e)
{
    if(moveflg === 0)
    {
       ctx.lineTo(Xpoint-1, Ypoint-1);
       ctx.lineCap = "round";
       ctx.lineWidth = defSize * 2;
       ctx.strokeStyle = defColor;
       ctx.stroke();
        
    }
    moveflg = 0;
    
    setLocalStoreage();
}

function resetCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

function initLocalStorage(){
    myStorage.setItem("__log", JSON.stringify([]));
}

function setLocalStoreage(){
    var png = canvas.toDataURL();
    var logs = JSON.parse(myStorage.getItem("__log"));
    setTimeout(function(){
        logs.unshift({png});
        myStorage.setItem("__log", JSON.stringify(logs));
        currentCanvas = 0;
        temp = [];
    }, 0);
}

function prevCanvas(){
    var logs = JSON.parse(myStorage.getItem("__log"));
    if(logs.length > 0)
    {
        temp.unshift(logs.shift());
        setTimeout(function(){
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
}

function nextCanvas(){
    var logs = JSON.parse(myStorage.getItem("__log"));
    if(temp.length > 0)
    {
        logs.unshift(temp.shift());
        setTimeout(function(){
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
}

function draw(src) {
    var img = new Image();
    img.src = src;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}

//追加したのは以下の部分 GenSaito at 2021-06-25
//全消し
function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
//消しゴムモード 色をホワイトに変えるだけ
function eraser(){
    defColor = '#FFFFFF';
}

//描画モード　色を元の色に戻すだけ
function drawInPen(){
    defColor = "#555";
}