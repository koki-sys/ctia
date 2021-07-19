const completeGroupingUrl = "./groupComplete.html";

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
const dgClientIO = io(backendUrl + "/dg");
const ngClientIO = io(backendUrl + "/ng");
const tpClientIO = io(backendUrl + "/tp");

export {
    frontendUrl,
    gnClientIO,
    dgClientIO,
    ngClientIO,
    tpClientIO,
    completeGroupingUrl
}