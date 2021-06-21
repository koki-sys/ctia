const completeGroupingUrl = "./groupComplete.php";

let backendUrl = "";
let frontendUrl = "";
switch (document.domain) {
    case "localhost":
        backendUrl, frontendUrl = "http://localhost:8000";
        break;
    case "ctiassist.lolipop.io":
        backendUrl, frontendUrl = "https://ctiassist.lolipop.io";
        break;
}

// socket.IO接続部分
const gnClientIO = io(backendUrl + "/gn");

export {
    frontendUrl,
    gnClientIO,
    completeGroupingUrl
}