const socket_io = require('socket.io')
const io = socket_io();

var socketAPI = {};
socketAPI.io = io;


io.on('connection',(socket)=>{
    console.log('A client connected')

    socket.on('new_message', (msg)=>{
        console.log('new message: ',msg)
    })
})

socketAPI.sendNofication = (msg) =>{
    io.sockets.emit('server_msg', {msg})
}

module.exports = socketAPI;