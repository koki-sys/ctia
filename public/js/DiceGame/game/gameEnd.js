const entryRoomName = sessionStorage.getItem('entryRoomName');
sessionStorage.clear();

setTimeout(() => {
    document.location.href = "../../../index.html";
}, 3000);
