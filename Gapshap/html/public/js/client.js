const socket = io();

function new_user_joined(name) {
    socket.emit('new_user_joined', name);
    fetch('/users', {
        method: 'POST',
        body: JSON.stringify({ id: socket.id }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())  // Parse the JSON response
        .then(data => {
            // console.log(data);
            insertOldUser(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function send_message(message) {
    chats['server'].push({ 'me': message });
    socket.emit('send', message);
}

function send_personal_message(message, id) {
    socket.emit('personal_send', { message: message, id: id });
}

socket.on('user_joined', (name, id) => {
    if (name != null) {
        updateMessage('server', 'server', `${name} is join chat`);
        addUser(name, id);
        chats[id] = [];
    }
})

socket.on('personal_message', data => {
    // createPrivateSenderDiv(data.message, data.id);
    updateMessage(data.id, 'personal', data.message);
    // audio.play();
})

socket.on('user_removed', (name, id) => {
    if (name !== null) {
        updateMessage('server', 'server', `${name} is left chat`);
        // createDiv(`${name} is left chat`, 'server');
        if (activeChat === id) document.getElementById('server').click();
        removeUser(id);
        delete chats[id];
        // audio.play()
    }
})

socket.on('message', data => {
    // let name = data.name;
    // let messageObject = {};
    // messageObject[name] = data.message;
    // chats['server'].push(messageObject);
    updateMessage('server', data.name, data.message);
    // audio.play();
})