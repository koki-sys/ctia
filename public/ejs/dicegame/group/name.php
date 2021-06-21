<?php require '../header.php'; ?>
<div class="container mt-5">
<p id="input-order">名前、ニックネームの入力をお願いします。</p>
<form>
    <input type="text" id="name" class="form-control mt-5"><br>
</form>
<div class="row fixed-bottom">
        <button type="button" class="btn btn-lg text-white mt-5 mb-5 mx-auto" 
        style="background-color: #00A6FB;" id="input-name">確定して次へ</button>
    </div>
</div>
<script type="text/javascript">
    const form = document.querySelector("#input-name");
    const setName = () => {
        const redirect = async () => {
            document.location.href="./wait.php";
        }
        const isNickName = async() => {
            const nickName = document.getElementById('name').value
            if(nickName == null || nickName == ""){
                const p = document.getElementById('input-order');
                p.textContent = "ニックネームが空です。もう一度設定してください。";
            } else {
                form.textContent = "待機中・・・"
                console.log("setting...")
                await sessionStorage.setItem('nickNameFromClient', nickName);
                await redirect();
            }
        }
        isNickName();
    }
    form.addEventListener('click', setName);
</script>
<?php require '../../footer.php'; ?>