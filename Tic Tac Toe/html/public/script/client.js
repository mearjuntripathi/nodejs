const socket = io();

const opponent = {id: "", name: ""};

function joingame(name){
    socket.emit('new-player', name);
}

socket.on('waiting', () => {
    showWaiting();
})

socket.on('match',(name, id, condition)=>{
    opponent.name = name;
    opponent.id = id;
    turn = condition;
    if(!condition){ 
        message.innerHTML = `${opponent.name} Turn`;
        mode = 'O';
    }
    removeWaiting();
})

function otherplayerturn(position){
    socket.emit('player-turn',position, opponent.id);
}

socket.on('my-turn', (position) => {
    playerMove(position);
});