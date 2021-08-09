import { getCount } from './cardCount.js';

window.onload = () => {
    const count = getCount();
    console.log("自分が持ったカード数" + count);
}