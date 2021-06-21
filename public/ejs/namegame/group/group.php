<?php require '../header.php'; ?>
<div class="container">
    <div class="row-center">
        <div class="col-4-center">
            <h4 class="text-center">グループをいくつに分けますか</h4>
        </div>
        <div class="mt-4">
            <div class="text-center">
                <input type="text" name="name" placeholder="グループ数" id="group-count">
            </div><br>
            <h4 class="text-right">に分ける</h4><br>
            <div class="text-center">
                <input type="text" name="name" placeholder="人数" id="person-count">
            </div>
        </div>
        <div class="row fixed-bottom">
            <button class="btn btn-lg text-white mt-5 mb-5 mx-auto"
                style="width:140px;height:40px; background-color: #00A6FB;" id="setgroup">
                <strong style="font-size:22px">次へ</strong>
            </button>
        </div>
    </div>
</div>
<script type="text/javascript">
    const group = document.getElementById('setgroup');
    const qrlink = async () => {
        document.location.href = "qr.php";
    }
    group.addEventListener('click', async () => {
        const groupCount = document.getElementById('group-count').value;
        const personCount = document.getElementById('person-count').value;
        await sessionStorage.setItem('client_room_count', groupCount);
        await sessionStorage.setItem('client_room_limit', personCount);
        console.log("sended.");
        await qrlink();
    })
</script>
<?php require '../../footer.php'; ?>