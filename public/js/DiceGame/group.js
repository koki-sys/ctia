const group = document.getElementById('setgroup');
const qrlink = async () => {
    document.location.href = "qr.html";
}
group.addEventListener('click', async () => {
    const groupCount = document.getElementById('group-count').value;
    const personCount = document.getElementById('person-count').value;
    await sessionStorage.setItem('clientRoomCount', groupCount);
    await sessionStorage.setItem('clientRoomLimit', personCount);
    console.log("sended.");
    await qrlink();
})