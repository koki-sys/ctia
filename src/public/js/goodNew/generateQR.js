import { gnClientIO } from '../../link.js';
import { qr } from '../component/room/settings/qr.js';

const nextFromQr = document.getElementById("next-from-qr");

qr(gnClientIO, "goodnew");

nextFromQr.onclick = () => {
    document.location.href = `/room/game_rule_description?game=${nextFromQr.value}`
}