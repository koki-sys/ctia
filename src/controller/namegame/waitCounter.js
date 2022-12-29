exports.waitCounter = () => {
    var count = 0;
    return () => ++count;
};
