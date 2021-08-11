let express = require('express');
let  app =express();

let http = require('http');
let server = http.createServer(app);

let socketIO = require('socket.io');
let io = socketIO(server);

// to store user list in live chat
var userlist = [];

const port = process.env.PORT ||  3001;

server.listen(port, ()=>{
    console.log(`started on port: ${port}`);
});

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('join',(data) =>{
        console.log('a user joined ');
        console.log(data);

        // add joined user to the userlist
        if(userlist.includes(data.user) == false) {
            userlist.push(data.user);
        }
        console.log(userlist);

        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
        
    });
    socket.on('message', (data)=>{
        console.log(data);
       // socket.broadcast.in(data.room).emit('new message',{user : data.user, message : data.message});
        io.in(data.room).emit('new message',{user : data.user, message : data.message});
    });
    
    socket.on('leave', (data) => {
        // add joined user to the userlist
        let index = userlist.indexOf(data.user);
        if(index > -1) {
            userlist.splice(index, 1);
        }
        console.log(userlist);
        
        socket.leave(data.room)
    })

});
 


// let users = [];
// const messages = {
//     snakeRoomMessages:[],
//     BlackJackRoomMessages:[],
// }

// io.on('connection', (socket)=>{
//     socket.on('join server',(username) =>{
//         const user = {
//             username,
//             id:socket.id,
//         };
//         users.push(user);
//         io.emit("new user", users)
//     });

//     socket.on("join room", (roomName, cb) =>{
//         socket.join(roomName);
//         cb(messages[roomName]);
//         socket.emit("joined", messages[roomName]);
//     });

//     socket.on("send message",({content,to,sender,chatName,isChannel})=>{
//         if(isChannel){
//             const payload = {
//                 content,
//                 chatName,
//                 sender,
//             };
//             socket.to(to).emit("new message", payload);
//         }else{
//             const payload = {
//                 content,
//                 chatName:sender,
//                 sender,
//             };
//             socket.to(to).emit("new message", payload);
//         }
//         if(messages[chatName]){
//             messages[chatName].push({
//                 sender,
//                 content,
//             });
//         }
//     });

//     socket.on("disconnect",() => {
//         users = users.filter(u =>u.id !== socket.id);
//         io.emit("new user",users);
//     });
// });