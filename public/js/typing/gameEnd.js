import { tpClientIO } from '../../link.js';
import { gameEnd } from '../../component/gameEnd.js';

window.onload = () => {
    tpClientIO.emit('deleteData', {});
}

tpClientIO.on('deletedGameData', () => {
    gameEnd();
})
