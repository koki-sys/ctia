<?php require '../header.php'; ?>
<div class="container">
    <div class="row mt-4">
        <div class="col-6">
            <h2>サイコロ自己紹介</h2>
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
        <li>サイコロ振る</li>
        <li>「好きな食べ物は？」「特技は？」など、それぞれの面に書かれた質問を答える。</li>
        <li> サイコロに書く質問を参加者で考えたり、一つの面を「自由なお題」にしたりとアレンジしたり...</li>
    </ul>
    <h4>手順</h4>
    <ul>
        <li>サイコロを回す順番を決める（乱数、ルーレット）</li>
        <li>このとき、サイコロの出たお題をもとに話を始める</li>
        <li>お題の話が終わったら、みんな拍手をする。</li>
    </ul>
    <div class="row fixed-bottom bg-white">
        <a href="../../develop.php" class="btn btn-lg text-white mt-2 mb-2 mx-auto" style="background-color: #04CCFF;">
            <strong>今すぐゲームを開始する</strong>
        </a>
    </div>
</div>
<?php require '../../footer.php'; ?>