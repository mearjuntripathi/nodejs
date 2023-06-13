

const io=require('socket.io')(4000,{cors: {
    origin: '*',
  }});
const users={};

io.on('connection',socket=>{
    socket.on('send',data=>{
        console.log(data);
        socket.broadcast.emit('receive',data);
    })
});
