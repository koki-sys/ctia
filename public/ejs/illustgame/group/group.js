const personCount = sessionStorage.getItem(['count']);
const roomName = sessionStorage.getItem(['room']);

$('div').append('<p>あなたは<br>' + roomName + 'です</p>');
$('div').append('<p>人数は' + personCount + '人です。<br>集まったら準備完了を押してください</p>');

// 数秒後に
setTimeout(location.href = "http://localhost/CTIAssist/goodnew/announce.php", 3000);

/* グルーピング完了画面に追加 */