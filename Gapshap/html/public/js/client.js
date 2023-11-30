const socket = io();

let audio = new Audio('./tune/tune.mp3')

function new_user_joined(name) {
    socket.emit('new_user_joined', name);
    fetch('/users',{
        method : 'POST',
        body : JSON.stringify({id: socket.id}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())  // Parse the JSON response
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function send_message(message) {
    socket.emit('send', message);
}

function send_target_message(message, id){
    socket.emit('target_send', {message: message, id: id});
}

socket.on('user_joined', (name, id) => {
    createDiv(`${name} is join chat`, 'server');
    addUser(name, id);
    audio.play();
})

socket.on('personal_message', data => {
    createPrivateSenderDiv(data.message, data.id);
    audio.play();
})

socket.on('user_removed', (name, id) => {
    createDiv(`${name} is left chat`, 'server');
    removeUser(id);
    audio.play()
})

socket.on('message', data => {
    createSenderDiv(data.message, data.name);
    audio.play();
})