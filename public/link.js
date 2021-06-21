const completeGroupingUrl = "./groupComplete.php";

let backendUrl = "";
let frontendUrl = "";
switch (document.domain) {
    case "localhost":
        backendUrl = "http://localhost:3000";
        frontendUrl = "http://localhost/CTIAssist";
        break;
    case "ice-break.lolipop.io":
        backendUrl = "https://ctia-backend.lolipop.io";
        frontendUrl = "https://ice-break.lolipop.io";
        break;
}

// socket.IO接続部分
const gnClientIO = io(backendUrl + "/gn");

export {
    frontendUrl,
    gnClientIO,
    completeGroupingUrl
}