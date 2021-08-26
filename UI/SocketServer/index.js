let express = require('express');
let  app =express();

let http = require('http');
let server = http.createServer(app);

let socketIO = require('socket.io');
let io = socketIO(server);

// to store user list in live chat
// var userlist = [];

// Seunghoon's update from here ***********************************************
var roomList = [];
// Seunghoon's update to here *************************************************


const port = process.env.PORT ||  3000;

server.listen(port, ()=>{
    console.log(`started on port: ${port}`);
});

io.on('connection',(socket)=>{   

    socket.on('join',(data) =>{

        console.log('join requested by ' + data.user);
        console.log(data);
        socket.join(data.room);
        console.log('a user joined');
        let room = roomList.find(({id}) => id == data.room);
        if(!room && data.room) 
        {
            roomList.push({id: data.room, users: []});
        }
        room = roomList.find(({id}) => id == data.room);
        if(room && room.users && !room.users.find((user) => user == data.user) && data.user)
        {
            room.users.push(data.user);
        }
        console.log(roomList);
        console.log(io.sockets.adapter.rooms);
        io.emit('updatedRoomList',roomList);
        socket.broadcast.to(data.room).emit('user joined',`welcome ${data.user}`); 
        
    });

    socket.on('message', (data)=>{
        console.log('message')
        console.log(data);
        io.in(data.room).emit('new message',{user : data.user, message : data.message});
    });

    socket.on('gamestate', (data) =>{
        console.log("gamestate data: " + JSON.stringify(data.GameState.snakePos));
        socket.broadcast.to(data.room).emit('new gamestate',{b:data.GameState.snakePos, User: data.User, Score: data.Score, GameOver:data.GameState.lost});
        
    });

    socket.on('gameboard', (data) => {
        // console.log(data.room);
        // console.log("gameboard data:" + JSON.stringify(data.gameboard));
        io.to(data.room).emit('new gameboard', data.gameboard);
    });
    
    socket.on('blackjack', (data)=> {
        console.log("blackjack data: " + JSON.stringify(data));
        io.in(data.room).emit('new blackjack',{data})
    });

    socket.on('leave', (data) => {
        console.log('leave requested by ' + data.user);
        console.log(data);
        let room = roomList.find(({id}) => id == data.room);
        if(room){
            let index = room.users.indexOf(data.user);
            if(index >= 0) {
                socket.leave(data.room);
                room.users.splice(index, 1);
                console.log('a user left');  
            }
            console.log(roomList);
            index = roomList.findIndex(room => room.users.length == 0);
            console.log(index);
            if(index >= 0) roomList.splice(index, 1);
        }
        console.log(roomList);
        console.log(io.sockets.adapter.rooms);
        io.emit('updatedRoomList',roomList);
    })

    socket.on('reloadRoomList', (username) =>
    {
        console.log('reload requested by ' + username);
        console.log(roomList);
        console.log(io.sockets.adapter.rooms);
        io.emit('updatedRoomList',roomList);
    })
    socket.on('getPlayers',(data) => {
        console.log("getting players");
        let room = roomList.find(({id}) => id == data.room)
        console.log(room.users);
        io.in(data.room).emit('foundPlayers', room.users)
    });

    socket.on('play audio', (data) => {
        socket.to(data.room).emit('receive audio', data.audioFile);
      });
});
