import { toComplete } from "../link/toComplete.js";

// 時間切れ、ボタン押下時の処理
const sendOrder = async () => {
    sessionStorage.setItem("isOrdered", true);
    sessionStorage.setItem('flg', "answered");

    console.log("ordered")
    await toComplete();
}

export { sendOrder }