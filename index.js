const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);



app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
    socket.on('mes', (msg) => {
    socket.broadcast.emit('mes', msg);
    });
    socket.on('disconnect',()=>{
        console.log("Disconnect!!!..");
        io.emit('dis',"disconnected");
    });
});

const port = process.env.PORT || 9000

server.listen(port, () => {
  console.log('listening on *:3000');
});
