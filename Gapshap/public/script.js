const socket = io('http://localhost:3000');
let button = document.getElementsByClassName("send")[0];
let msginp = document.getElementById("msgin");
let container = document.getElementsByClassName("msgcontainer")[0];
let usrcontainer = document.getElementsByClassName("usercontiner")[0];

let userId = [];
let currentId;
//handle send button event

button.onclick = function (e) {
    if (msginp.value === '') {
        alert("Empty msg cant be send");
    }
    else {
        let div = document.createElement("div");
        let message = {id:currentId,msg:msginp.value};
        div.classList.add("right");
        let span = document.createElement("p");
        span.innerHTML = message.msg;
        div.appendChild(span);
        container.appendChild(div);
        socket.emit('send', message);
        msginp.value = '';
    }

}
// handles different socket events
socket.on('receive', data => {

    let div = document.createElement("div");
    div.classList.add("left");
    let span = document.createElement("p");
    span.innerHTML = data;
    div.appendChild(span);
    container.appendChild(div);
    container.appendChild(div);
});
socket.on('userAdded', (data) => {
    userId.push(data);
    let div = document.createElement('div');
    div.classList.add("user");
    div.innerHTML = data;
    div.onclick=()=>{
        currentId=data;
    }
    usrcontainer.appendChild(div);
});

// this is for enter send message
msginp.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        button.click();
    }
});
