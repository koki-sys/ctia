<?php require '../header.php'; ?>
<div class="container">
    <canvas width="250" height="300" style="border: solid"></canvas>
</div>

<script>
    var a = document.querySelector("canvas");
    var c = a.getContext("2d");

    a.ontouchstart = function(e) {
        e.preventDefault();
        c.moveTo(e.touches[0].pageX, e.touches[0].pageY);
    };

    a.ontouchmove = function(e) {
        c.lineTo(e.touches[0].pageX, e.touches[0].pageY);
        c.stroke();
    };
</script>
<?php require '../../footer.php'; ?>