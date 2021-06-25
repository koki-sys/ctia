<?php require '../header.php'; ?>
        <div>
        <script src="../style/shiritori_game.css"></script>
        <button type="button" onclick="prevCanvas()">戻る</button>
        <button type="button" onclick="nextCanvas()">進む</button>
        <button type="button" onclick="eraser()">消しゴムモード</button>
        <button type="button" onclick="drawInPen()">描画モード</button>
        <button type="button" onclick="resetCanvas()">全消し</button>
        </div><br>
        <div class=text-align-center>
            <canvas id="canvassample" width="250px" height="350px" style="border: 1px solid #000000;"></canvas>
            <script src="../js/shiritori_game.js"></script>
        </div>
<?php require '../footer.php'; ?>
