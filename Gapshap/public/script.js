const socket=io('http://localhost:4000');
let button = document.getElementsByClassName("send")[0];
let msginp = document.getElementById("msgin");
let container = document.getElementsByClassName("msgcontainer")[0];

button.onclick = function (e) {
    let div = document.createElement("div");
    let message = msginp.value;
    div.classList.add("right");
    div.innerText = message;
    container.appendChild(div);
    socket.emit('send', message);
    msginp.value = '';
}

socket.on('receive', data => {

    let div = document.createElement("div");
    div.classList.add("left");
    div.innerText = data;
    container.appendChild(div);
})