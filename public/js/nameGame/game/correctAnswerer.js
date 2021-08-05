// html要素取得
const answererElment = document.getElementById('correct-answerer');

// session取得
const correctAnswerer = sessionStorage.getItem('correctAnswerer');

// ロード時に画面に正解者を表示
window.onload = () => {
    answererElment.textContent = correctAnswerer + "さん";
}
