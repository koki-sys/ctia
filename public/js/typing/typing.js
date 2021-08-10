const wordlistJapanese = [
    "ちょうどしょなのかのよるのことでした",
    "わたしはしんだおとうとのしょさいにはいって",
    "なにかとかれのかきのしたものなどをとりだしては",
    "ひとりものおもいにふけっていました",
    "とうきょうのしたまちとやまのてのさかいめといったような",
    "ひどくさかやがけのおおいまちがある",
    "おもてどおりのはんかがいからおれまがってきたものには",
    "べってんちのかんじをあたえる",
    "これはいまからよねんまえのはなしである",
    "わたしがいずのみしまのしりあいのうちのにかいでいちかをくらし",
    "ろまねすくというしょうせつをかいていたところのはなしである",
    "うとうとしたとおもううちにめがさめた",
    "するととなりのへやでみょうなおとがする",
    "はじめはなんのおともまたどこからくるともはんしかしはけんとうがつかなかったが",
    "きいているうちにだんだんみみのなかへまとまったかんねんができてきた",
    "さむいふゆがほっぽうから",
    "きつねのおやこのすんでいるもりへやってきました",
    "あるあさほらあなからこどものきつねがでようとしましたが",
    "あっとさんでめをおさえながらかあさんぎつねのところへころげてきました",
    "まつどよさんはせめんとあけをやっていた",
    "そとのぶぶんはたいしてめだたなかったけれど",
    "あたまのけとはなのしたはせめんとではいいろにおおわれていた",
    "かれははなのあなにゆびをつっこんで",
    "てっきんこんくりーとのようにはなげをしゃちこばらせている",
    "かいちゅうどけいがたんすのむこうがわへおちてひとりでちくたくとうごいておりました",
    "ねずみがみつけてわらいました",
    "ばかだなあだれもみるものはないのになんだってうごいているんだえ",
    "あるひのくれがたのことである",
    "ひとりのげにんがらしょうもんのしたであめやみをまっていた",
    "ひろいもんのしたにはこのおとこのほかにだれもいない",
    "ただところどころにぬりのはげた",
    "おおきなえんちゅうにこおろぎがいっぴきとまっている",
    "ふたりのわかいしんしが",
    "すっかりいぎりすのへいたいのかたちをして",
    "ぴかぴかするてっぽうをかついで",
    "しろくまのようないぬをにひきつれて",
    "だいぶやまおくのきのはのかさかさしたとこを",
    "こんなことをいいながらあるいておりました"
];
const wordlist = [
    "chodoshonanokanoyorunokotodeshita",
    "watashihashindaototonoshosainihaitte",
    "nanikatokarenokakinoshitamononadotoridashiteha",
    "hitorimonomoinifuketteimashita",
    "tokyonoshitamachitoyamanotenosakaimetoittayona",
    "hidokusakayagakenooimachigaaru",
    "omotedorinohankagaikaraoremagattekitamononiha",
    "bettenchinokanjioataeru",
    "korehaimakarayonemmaenohanashidearu",
    "watashigaizunomishimanoshiriainochinonikaideichikaokurashi",
    "romanesukutoiushosetsuokaiteitatokoronohanashidearu",
    "utotoshitatomouchinimegasameta",
    "surutotonarinoheyademyonaotogasuru",
    "hajimehanannotomomatadokokarakurutomohanshikashihakentogatsukanakattaga",
    "kiiteiruchinidandammiminonakahematomattakannengadekitekita",
    "samuifuyugahoppokara",
    "kitsunenoyakonosundeirumoriheyattekimashita",
    "aruasahoraanakarakodomonokitsunegadeyotoshimashitaga",
    "attosandemeosaenagarakaasangitsunenotokorohekorogetekimashita",
    "matsudoyosanhasementoakeoyatteita",
    "sotonobubunhataishitemedatanakattakeredo",
    "atamanoketohananoshitahasementodehaiironiowareteita",
    "karehahananoananiyubiotsukkonde",
    "tekkinkonkuritonoyonihanageoshachikobaraseteiru",
    "kaichudokeigatansunomukogawaheochitehitoridechikutakutogoiteorimashita",
    "nezumigamitsuketewaraimashita",
    "bakadanaadaremomirumonohanainoninandatteugoiteirundae",
    "aruhinokuregatanokotodearu",
    "hitorinogeningarashomonnoshitadeameyamiomatteita",
    "hiroimonnoshitanihakonotokonohokanidaremoinai",
    "tadatokorodokoroninurinohageta",
    "okinaenchunikorogigaippikitomatteiru",
    "futarinowakaishinshiga",
    "sukkariigirisunoheitainokatachioshite",
    "pikapikasuruteppookatsuide",
    "shirokumanoyonainuonihikitsurete",
    "daibuyamaokunokinohanokasakasashitatoko",
    "konnakotoiinagaraaruiteorimashita"
];
let time_limit = 120;
let readytime = 3;
let score;
let correct;
let mistake;
let char_num = 0;
let word_char;
let random;


function ready() {
    readytime = 3;
    scoredis.innerHTML = "";
    const readytimer = setInterval(function () {
        count.innerHTML = "<h1>" + readytime + "</h1>";
        readytime--;
        if (readytime < 0) {
            clearInterval(readytimer);
            gameStart();
        }
    }, 1000);
}

window.onload = () => {
    ready();
}

const toRanking = async () => {
    document.location.href = "./ranking.html";
}

function gameStart() {
    score = 0.0;
    mistake = 0;
    correct = 0;
    wordDisplay();
    let time_remaining = time_limit;
    const gametimer = setInterval(function () {
        count.innerHTML = "残り時間：" + time_remaining;
        time_remaining--;
        if (time_remaining <= 0) {
            clearInterval(gametimer);
            finish();
        }
    }, 1000);
}
function wordDisplay() {
    random = Math.floor(Math.random() * wordlist.length);
    word.innerHTML = wordlist[random];
    japanese.innerHTML = wordlistJapanese[random] + "<br>";
    charInsort();
}
function charInsort() {
    word_char = wordlist[random].charAt(char_num);
}
async function finish() {
    score = Math.floor(correct * (correct / (correct + mistake)));
    console.log(score);
    count.innerHTML = "";
    word.innerHTML = "";
    japanese.innerHTML = "";
    word_char = 0;
    random = 0;
    char_num = 0;
    await sessionStorage.setItem('score', score);
    await toRanking();
}
document.onkeydown = function (e) {
    if (e.keyCode == 189) {
        keyStr = "-";
    } else if (e.keyCode == 188) {
        keyStr = ","
    } else {
        var keyStr = String.fromCharCode(e.keyCode);
        keyStr = keyStr.toLowerCase();
    }
    if (keyStr == word_char) {
        document.getElementById('missaudio').pause();
        document.getElementById('missaudio').currentTime = 0;
        document.getElementById('correctaudio').pause();
        document.getElementById('correctaudio').currentTime = 0;
        document.getElementById('correctaudio').play();
        word.innerHTML = "<span style='color: red;'>" + wordlist[random].substr(0, char_num + 1) + "</span>" + wordlist[random].substr(char_num + 1, wordlist[random].length);
        char_num++;
        correct++;
        charInsort();
    } else {
        document.getElementById('missaudio').pause();
        document.getElementById('missaudio').currentTime = 0;
        document.getElementById('correctaudio').pause();
        document.getElementById('correctaudio').currentTime = 0;
        mistake++;
        document.getElementById('missaudio').play();
    }
    if (char_num == wordlist[random].length) {
        char_num = 0;
        wordDisplay();
    }
};
