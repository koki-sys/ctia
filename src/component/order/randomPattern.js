exports.randomPattern = () => {
    const patterns = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let val = "";
    for (let i = 0; i < 15; i++) {
        val += patterns[Math.floor(Math.random() * patterns.length)] + "";
    }
    return val;
};
