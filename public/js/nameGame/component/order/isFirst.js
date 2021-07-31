import { toNameGame } from "../link/toNameGame.js";

const isFirst = async (person) => {
    //最初の人は、名前をつける。
    if (person == "first") {
        console.log("firstPersonを削除");
        sessionStorage.removeItem('firstPerson');
        toNameGame();
    }
}

export { isFirst }