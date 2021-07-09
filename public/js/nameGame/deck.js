const myDeck = () => {
    let deckCount = 0;
    return () => ++deckCount;
}

export { myDeck }