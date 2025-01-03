const form = document.querySelector("#input-name");
const setName = () => {
    const redirect = async () => {
        document.location.href=location.href.replace("name_entry", "creating_group");
    }
    const isNickName = async() => {
        const nickName = document.getElementById('name').value
        if(nickName == null || nickName == ""){
            const p = document.getElementById('input-order');
            p.textContent = "ニックネームが空です。もう一度設定してください。";
        } else {
            form.textContent = "待機中・・・"
            await sessionStorage.setItem('nickName', nickName);
            await redirect();
        }
    }
    isNickName();
}
form.addEventListener('click', setName);