class Client{
    constructor(){
        this.socket = io();
        this.#socketWork();
    }

    #socketWork(){
        this.socket.on('waiting', () => {
            console.log('wating');
            multiplayer.waiting();
        });

        this.socket.on('match', (name,id,move)=>{
            console.log(name,id,move);
            multiplayer.startGame(name,move,id);
        });

        this.socket.on('leave', ()=>{
            console.log('opponent leave');
            multiplayer.opponentLeave();
        });

        this.socket.on('opponent-move', (position) => {
            multiplayer.opponentMove(position);
        })
        // this.socket.on
    }

    JoinUser(name){
        this.socket.emit('new-player', name);
    }

    myMove(position,toid){
        
        this.socket.emit('player-move', position, toid);
    }

}