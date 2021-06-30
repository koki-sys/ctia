const resultEntryRoomName = sessionStorage.getItem('entryRoomName');
const roomNameText = document.getElementById('room-name');
const countInRoomText = document.getElementById('count-in-room');
const countInRoom = sessionStorage.getItem('countInRoom');
roomNameText.textContent = "あなたの部屋は" + resultEntryRoomName + "です。";
countInRoomText.textContent = "人数は" + countInRoom + "人です。";
setTimeout(() => {
    location.href = "../game/banme.html"
}, 3000);