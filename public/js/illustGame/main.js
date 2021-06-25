window.addEventListener('load', () => {
  const canvas = document.querySelector('#draw-area');
  const context = canvas.getContext('2d');

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
 
  // canvas上に書いた絵を全部消す
  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // canvas上に描いた絵を一つ前に戻す
  function prevCanvas(){
    
  }
 
  // マウスのドラッグを開始したらisDragのフラグをtrueにしてdraw関数内で
  // お絵かき処理が途中で止まらないようにする
  function dragStart(event) {
    context.beginPath();
 
    isDrag = true;
  }
  function dragEnd(event) {
    // 線を書く処理の終了を宣言する
    context.closePath();
    isDrag = false;
 
    // 描画中に記録していた値をリセットする
    lastPosition.x = null;
    lastPosition.y = null;
  }
 
  // マウス操作やボタンクリック時のイベント処理を定義する
  function initEventHandler() {
    const clearButton = document.querySelector('#clear-button');
    clearButton.addEventListener('click', clear);
 
    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener('mouseup', dragEnd);
    canvas.addEventListener('mouseout', dragEnd);
    canvas.addEventListener('mousemove', (event) => {
      draw(event.layerX, event.layerY);
    });

    canvas.addEventListener('touchdown', touchstart);
    canvas.addEventListener('touchup', touchend);
    canvas.addEventListener('touchout', touchend);
    canvas.addEventListener('touchmove', (event) => {
      draw(event.layerX, event.layerY);
    });

    const prevButton = document.querySelector('#prev-button');
    prevButton.addEventListener('click', prev);


  }
 
  // イベント処理を初期化する
  initEventHandler();
});