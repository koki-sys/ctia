<?php require '../header.php'; ?>
<nav class="navbar navbar-expand-lg navbar-light bg-white">
    <a class="d-block mx-auto" href="../../index.php">
        <img src="../images/CTIAssist.svg" alt="logo" />
    </a>
</nav><br>
<div class="container">
    <script src="../style/shiritori_game.css"></script>
    <div class="row-center">
        <h4 class="text-center">1番目です</h4><br>
            <div class="iconBtn text-align:center">
                <img src="../images/undo.svg" width="20" height="20" type="button" onclick="prevCanvas()">
                <img src="../images/redo.svg" width="20" height="20" type="button" onclick="nextCanvas()">
                <img src="../images/eraser.svg" width="20" height="20" type="button" onclick="eraser()">
                <img src="../images/marker.svg" width="20" height="20" type="button" onclick="drawInPen()">
                <img src="../images/trash.svg" width="20" height="20" type="button" onclick="resetCanvas()">
            </div>
        <div calss="text-align:center">
            <canvas id="canvassample" width="300px" height="350px" style="border: 1px solid #000000;" calss="text-align:center"></canvas>
        </div>
        <script src="../js/shiritori_game.js"></script>
    </div>
</div>
<?php require '../footer.php'; ?>
