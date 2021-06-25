<?php require '../header.php'; ?>
<link rel="stylesheet" href="../style/colorjoe.css">
<div class="container">
    <div class="row-center">
        <h4 class="text-center">1番目です</h4><br>
        <div>
            <button id="clear-button">全消し</button>
            <button id="eraser-button">消しゴム</button>
            <button id="prev-button">戻る</button>
        </div><br>
        <div class=text-align-center>
            <canvas class=text-align-center id="draw-area" width="250px" height="350px" style="border: 1px solid #000000;"></canvas>
                <script src="../js/main.js"></script>
                <script src="../js/colorjoe.min.js"></script>
        </div>
    </div>
</div>
<?php require '../footer.php'; ?>
