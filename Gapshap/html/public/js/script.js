let container = document.querySelector('.container');
let send = document.getElementById('send');
let message = document.getElementById('message');
let users = document.querySelectorAll('.user');
let chat_users = document.querySelector('.chat-users');
let name = document.getElementById('name');

const chat = {};

window.onload = function () {
    document.querySelector('.users').style.display = 'none';
    document.querySelector('.chat-room').style.display = 'none';
}

send.addEventListener('click', () => {
    if (message.value != '') {
        createDiv(message.value, "me");
        send_message(message.value);
        message.value = ''
    }
})

message.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        send.click();
    }
})

function scrollToBottom() {
    container.scrollTop = container.scrollHeight;
}

function addUser(name, id) {
    let div = document.createElement('div');
    div.id = id;
    div.classList.add('user');
    let html = `<div class="icon"><i class="fa fa-user"></i></div><div class="name">${name}</div>`;
    div.innerHTML = html;
    chat_users.append(div);
    users = document.querySelectorAll('.user');
}

function removeUser(id) {
    let div = document.getElementById(id);
    chat_users.removeChild(div);
}

function createDiv(message, classname) {
    let div = document.createElement('div');
    div.classList.add(classname);
    let chat = `<p></p>`;
    div.innerHTML = chat;
    div.querySelector('p').textContent = message;
    container.append(div);
    scrollToBottom();
}

function createPrivateSenderDiv(message, id){
    let div = document.createElement('div');
    div.classList.add('sender');
    let chat = `<p class='personal'></p>`
    div.innerHTML = chat;
    div.querySelector('p').textContent = message;
    container.append(div);
    scrollToBottom();
}

function createSenderDiv(message, name) {
    let div = document.createElement('div');
    div.classList.add('sender');
    let chat = `<div class="chat"><span>${name}</span><p></p></div>`;
    div.innerHTML = chat;
    div.querySelector('.chat p').textContent = message;
    container.append(div);
    scrollToBottom();
}

document.querySelector('.users').addEventListener('click', function (event) {
    if (event.target.classList.contains('user')) {
        console.log(event.target.childNodes);
        document.querySelector('.users').classList.add('small');
        name.innerText = event.target.childNodes[1].innerText;
    }
});


document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.users').classList.remove('small');
})