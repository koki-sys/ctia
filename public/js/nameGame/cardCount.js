const setCount = () => {
    let cardCount;
    const initCount = sessionStorage.getItem('cardCount');
    if(initCount == null){
        cardCount = 0;
    } else {
        cardCount = parseInt(initCount);
    }
    ++cardCount;
    sessionStorage.setItem('cardCount', cardCount);
}

const getCount = () => {
    const count = parseInt(sessionStorage.getItem('cardCount'));
    return count;
}

export { setCount, getCount }