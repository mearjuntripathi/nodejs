const socket=io('http://localhost:3000');
let button = document.getElementsByClassName("send")[0];
let msginp = document.getElementById("msgin");
let container = document.getElementsByClassName("msgcontainer")[0];
//handle send button event
button.onclick = function (e) {
    let div = document.createElement("div");
    let message = msginp.value;
    div.classList.add("right");
    let span=document.createElement("p");
    span.innerHTML=message;
    div.appendChild(span);
    container.appendChild(div);
    socket.emit('send', message);
    msginp.value = '';
}
// handles different socket events
socket.on('receive', data => {

    let div = document.createElement("div");
    div.classList.add("left");
    let span=document.createElement("p");
    span.innerHTML=data;
    div.appendChild(span);
    container.appendChild(div);
    container.appendChild(div);
})

// this is for enter send message
msginp.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        button.click();
    }    
});