const myDeck = () => {
    let deckCount = 0;
    return () => {
        ++deckCount;
        console.log("自分のデッキ内のカードの数" + deckCount);
    }
}

export { myDeck }