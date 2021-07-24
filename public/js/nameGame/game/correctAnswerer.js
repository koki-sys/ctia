// html要素取得
const correctAnswererFromElement = document.getElementById('correct-answerer');

// session取得
const correctAnswererFromSession = sessionStorage.getItem('correctAnswerer');

// ロード時に画面に正解者を表示
window.onload = () => {
    correctAnswererFromElement.textContent = correctAnswererFromSession + "さん";
}
