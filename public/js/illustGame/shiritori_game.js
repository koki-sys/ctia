var canvas = document.getElementById('canvassample'),
    ctx = canvas.getContext('2d'),
    moveflg = 0,
    Xpoint,
    Ypoint,
    currentCanvas,
    temp = [];
 
//初期値（サイズ、色、アルファ値）の決定
var defSize = 3,
    defColor = "#555";
 
// ストレージの初期化
var myStorage = localStorage;
window.onload = initLocalStorage();
 
 
// PC対応
canvas.addEventListener('mousedown', startPoint, false);
canvas.addEventListener('mousemove', movePoint, false);
canvas.addEventListener('mouseup', endPoint, false);
// スマホ対応
canvas.addEventListener('touchstart', startPoint, false);
canvas.addEventListener('touchmove', movePoint, false);
canvas.addEventListener('touchend', endPoint, false);

 
function startPoint(e){
  e.preventDefault();
  ctx.beginPath();
  console.log(e.clientX);
 
   
  // 矢印の先っぽから始まるように調整
  Xpoint = e.clientX-215;
  Ypoint = e.clientY-170;
   
  ctx.moveTo(Xpoint, Ypoint);
}
 
function movePoint(e){
  if(e.buttons === 1 || e.witch === 1 || e.type == 'touchmove')
  {
    Xpoint = e.pageX-215;
  　Ypoint = e.pageY-170;
    moveflg = 1;
     
    ctx.lineTo(Xpoint, Ypoint);
    ctx.lineCap = "round";
    ctx.lineWidth = defSize * 2;
    ctx.strokeStyle = defColor;
    ctx.stroke();
     
  }
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