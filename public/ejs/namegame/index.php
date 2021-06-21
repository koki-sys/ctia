<?php require '../header.php'; ?>
<div class="container">
    <div class="row mt-4">
        <div class="col-6">
            <h2>名前当てゲーム</h2>
        </div>
        <div class="col-6">
            <a href="qr.php" class="btn qr-btn text-white" style="background-color: #00A6FB;">
                <img src="../../images/qr.png" width="40">
                QRを表示
            </a>
        </div>
    </div>
    <h4>ルール</h4>
    <ul>
        <li>キャラクターに名前をつける</li>
        <li>名前の付けられたキャラクターの名前を叫ぶこと</li>
        <li>カードを順番に引いていき、デッキが全てなくなったら、ゲ―ムの終了です。</li>
        <li> 獲得した枚数が一番多いプレイヤーがゲームの勝者</li>
    </ul>
    <h4>手順</h4>
    <ul>
        <li>カードを引く順番を決める</li>
        <li>自分の番になったら、デッキの上から1枚カードを引きます</li>
        <li>このとき、引いたカードが新しい種類のキャラクターであった場合には、その星人に名前をつけることができます</li>
    </ul>
    <div class="row fixed-bottom bg-white">
        <a href="../../develop.php" class="btn btn-lg text-white mt-2 mb-2 mx-auto" style="background-color: #04CCFF;">
            <strong>今すぐゲームを開始する</strong>
        </a>
    </div>
</div>
<?php require '../../footer.php'; ?>