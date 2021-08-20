const displayWaitUser = (element, userRow) => {
    let userList = "";
    element.innerHTML = userList;

    // ユーザ一覧を受信する。
    userRow.map((user) => {
        userList += '<li class="list-group-item">' + user.nickname + 'さん</li>';
    });
    element.innerHTML = userList;
}

export { displayWaitUser }