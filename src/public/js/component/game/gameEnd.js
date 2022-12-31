const gameEnd = () => {
    sessionStorage.clear();

    setTimeout(() => {
        document.location.href = "../../../index.html";
    }, 3000);
}

gameEnd();

export { gameEnd }