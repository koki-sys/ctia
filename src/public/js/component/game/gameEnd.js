const gameEnd = () => {
    sessionStorage.clear()

    setTimeout(() => {
        document.location.href = "/"
    }, 3000)
}

gameEnd()

export { gameEnd }
