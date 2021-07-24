import { tpClientIO } from '../../../link.js';

const entryRoomName = sessionStorage.getItem('entryRoomName');
sessionStorage.clear();

window.onload = () => {
    tpClientIO.emit('deleteData', {
        entryRoomName: entryRoomName
    });
}

tpClientIO.on('deletedGameData', () => {
    setTimeout(() => {
        document.location.href = "../../../index.html";
    }, 2000);
})
