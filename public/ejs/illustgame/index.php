<?php require '../header.php'; ?>

<div class="container">
    <div class="row mt-4">
        <div class="col-6">
            <h2>絵しりとり</h2>
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
        <li>話してはいけない</li>
        <li>プリントとペンを使用する</li>
        <li>最初のお題から繋がる言葉の絵を描いていく</li>
        <li>絵を描く時間は１分程度にする</li>
    </ul>
    <h4>手順</h4>
    <ul>
        <li>最初のお題を決める</li>
        <li>しりとりの順番を決める（ルーレットや乱数で決めてもいい）</li>
        <li>タイマーなどで１分計り進める</li>
        <li>ペンとプリントで絵を描いていく
            （オンラインの場合ホワイト
            ボード機能などを使う）</li>
        <li>１プレイが終わり、メンバーが描
            いた絵をしりとりになっているか確認しながら楽しむ</li>
    </ul>
    <div class="row fixed-bottom bg-white">
        <a href="gamestart.php" class="btn btn-lg text-white mt-2 mb-2 mx-auto" style="background-color: #04CCFF;">
            <strong>今すぐゲームを開始する</strong>
        </a>
    </div>
</div>
<?php require '../../footer.php'; ?>