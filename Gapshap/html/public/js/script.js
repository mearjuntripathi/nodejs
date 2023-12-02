let container = document.querySelector('.container');
let send = document.getElementById('send');
let message = document.getElementById('message');
let users = document.querySelectorAll('.user');
let chat_users = document.querySelector('.chat-users');
let chat_room = document.querySelector('.chat-room');
let name = document.getElementById('name');
const audio = new Audio('./tune/tune.mp3');
let activeChat = 'server';

const chats = { 'server': [{ 'server': 'Welcome to the Gapshap Server' }] };
// notifyMe();

send.addEventListener('click', () => {
    if (message.value != '') {
        createDiv(message.value, "me");
        if (activeChat === 'server')
            send_message(message.value);
        else
            send_personal_message(message.value, activeChat);
        message.value = '';
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

function createPrivateSenderDiv(message) {
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
    if (event.target.classList.contains('user') && event.target.id !== activeChat) {
        document.querySelector('.users').classList.add('small');
        document.querySelector('.select').classList.remove('select');
        document.getElementById(event.target.id).classList.add('select');
        activeChat = event.target.id;
        loadChatRoom(event.target.id);
    }
});

document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.users').classList.remove('small');
})

function insertOldUser(datas) {
    for (const dataId in datas) {
        if (!(dataId in chats)) {
            addUser(datas[dataId], dataId);
            chats[dataId] = [];
        }
    }
}

function updateMessage(position, from, message) {
    console.log(position, from, message);
    if (position === 'server') {
        let messageObject = {};
        messageObject[from] = message;
        chats[position].push(messageObject);
        if (position === activeChat) {
            if (from === 'server')
                createDiv(message, from);
            else createSenderDiv(message, from);
        } else {
            const notification = `<b>${from} <b>: ${message}`;
            notifyMe(position, notification);
        }
    } else {
        chats[position].push({ 'sender': message });
        if (position === activeChat) {
            createPrivateSenderDiv(message);
        }else{
            let name = document.getElementById(position).innerText
            const notification = `<b>${name} </b>: ${message}`;
            notifyMe(name, notification);
        }
    }
}

function loadMessage(id) {
    container.innerHTML = '';
    let chatArray = chats[id];
    if (id === 'server') {
        for (let i = 0; i < chatArray.length; i++) {
            for (const [name, value] of Object.entries(chatArray[i])) {
                if (name === 'me') createDiv(value, name);
                else if (name === 'server') createDiv(value, name);
                else createSenderDiv(value, name)
            }
        }
    } else {
        for (let i = 0; i < chatArray.length; i++) {
            for (const [name, value] of Object.entries(chatArray[i])) {
                if (name === 'me') createDiv(value, name);
                else if (name === 'sender') createPrivateSenderDiv(value);
            }
        }
    }
}

function loadChatRoom(id) {
    if (id === 'server') {
        chat_room.childNodes[1].childNodes[3].childNodes[1].innerHTML = `<i class="fa fa-users"></i>`;
        name.innerText = 'Our Server Group';
    } else {
        chat_room.childNodes[1].childNodes[3].childNodes[1].innerHTML = `<i class="fa fa-user"></i>`;
        name.innerText = document.getElementById(id).innerText;
    }
    loadMessage(id);
}

function notifyMe(position, message) {
    if (!("Notification" in window)) {
        alert(message);
    } else if (Notification.permission === 'granted') {
        const notification = new Notification(position, { body: message, icon: './image/gapshap.png' });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                const notification = new Notification(position, { body: message, icon: './image/gapshap.png' });
            }
        })
    }
    audio.play()
}