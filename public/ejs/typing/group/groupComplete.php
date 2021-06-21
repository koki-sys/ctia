<?php require '../header.php'; ?>
<div class="container mt-3">
<h1 id="room-name" class="text-center"></h1>
<h1 id="count-in-room" class="text-center"></h1>
<h1 class="text-center">ゲームを開始します。<br>しばらくお待ち下さい。</h1>
</div>
<script>
    const resultEntryRoomName= sessionStorage.getItem('entryRoomName');
    const roomNameText = document.getElementById('room-name');
    const countInRoomText = document.getElementById('count-in-room');
    const countInRoom = sessionStorage.getItem('countInRoom');
    roomNameText.textContent = "あなたの部屋は" + resultEntryRoomName + "です。";
    countInRoomText.textContent = "人数は" + countInRoom + "人です。";
    setTimeout(() => {
        location.href="../game/announce.php"
    }, 3000);
</script>
<?php require '../../footer.php'; ?>