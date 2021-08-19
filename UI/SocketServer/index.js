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

    socket.on('join',(data) =>{
        console.log('a user joined ');     
        //if(userlist.includes(data.user) == false) {
            userlist.push(data.user);
        //}
        console.log(userlist, data.room);
        socket.join(data.room);
        io.in(data.room).emit('updatedUserList',userlist);
        socket.broadcast.to(data.room).emit('user joined',`welcome ${data.user}`); 
        
    });

    socket.on('message', (data)=>{
        console.log(data);
        io.in(data.room).emit('new message',{user : data.user, message : data.message});
    });
    socket.on('gamestate', (data) =>{
        //console.log("gamestate data: " + JSON.stringify(data));
        io.in(data.room).emit('new gamestate',{a:data.GameState.food, b:data.GameState.snakePos, c:data.GameState.height, d:data.GameState.width, e:data.GameState.lost});
        
    });

    socket.on('gameboard', (data) => {
        console.log("gameboard data:" + JSON.stringify(data.gameboard));
        io.in(data.room).emit('new gameboard', {gameboard: data.gameboard});
    });
    

    socket.on('blackjack', (data)=> {
        console.log("blackjack data: " + JSON.stringify(data));
        io.in(data.room).emit('new blackjack',{data})
    });

    socket.on('leave', (data) => {
        console.log('a user left');  
        let index = userlist.indexOf(data.user);
        userlist.splice(index, 1);
        console.log(userlist);
        io.in(data.room).emit('updatedUserList',userlist);
    })
});
