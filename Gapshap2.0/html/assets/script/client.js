class Connector{
    Connector(){
        this.ws = new WebSocket('ws://localhost:3000');
    }

    joined(){
        
    }

    sendMessage(msg){

    }
}
function sendMessage(msg){
    ws.send(msg);
}

ws.onmessage = (event) => {
    createDiv(event.data,"server");
};