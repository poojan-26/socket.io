// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 7007

app.get('/', function(req,res) {
    // res.sendFile('index.html');
    res.sendFile(__dirname +'/index.html')
});

/*********** this code is for connect and disconnect event also one more event message(built-in) event *************************** */
//in browser first it shows hello world after 4 second it show sent message 4 second after connection... message
// // whenever someone connect this get exicuted
io.on('connect', function(socket){
    console.log("a user connected");

    //send message after a timeout of 4 sec

    setTimeout(function(){
        socket.send('sent message 4 second after connection...');
    }, 4000);

    // when ever someone disconnected this piece of code executed
    socket.on('disconnect', function(){
        console.log("a user disconnected");
        
    })
})

/**************************************************here is the event which we create (custom event)****************************** */
// testerEvent
//in browser first it shows hello world after 4 second it shows => A custom event named testerEvent! message

// io.on('connection', function(socket) {
//     console.log('A user connected');
 
//     //Send a message when 
//     setTimeout(function() {
//        //Sending an object when emmiting an event
//        socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
//     }, 4000);
 
//     socket.on('disconnect', function () {
//        console.log('A user disconnected');
//     });
//  });

/***************************this event is from client side ************************************ */
 
//  io.on('connection', function(socket) {
//     socket.on('clientEvent', function(data) {
//        console.log(data);
//     });
//  });
 

/****************************** Broadcasting ***********************************8 */
//  This will emit the event to ALL the connected clients (event the socket that might have fired this event).
// we will broadcast the number of connected clients to all the users. Update the app.js file to incorporate the following.
//here we use io.sockets.emit()

// var clients = 0;
// io.on('connection', function(socket) {
//    clients++;
//    io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
//    socket.on('disconnect', function () {
//       clients--;
//       io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
//    });
// });


//it first page give Hey,welcome after 2nd user also 2nd user get Hey,welcome msg first page change msg 2 clients connected
// the newest client gets a welcome message and others get how many clients are connected currently to the server.
//now we use socket.broadcast.emit()
// var clients = 0;
// io.on('connection', function(socket) {
//    clients++;
//    socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
//    socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//    socket.on('disconnect', function () {
//       clients--;
//       socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
//    });
// });

/*********************************************** Namespace **************************************** */
//default namespace we use it previously like => var socket = io();
//custom namespace We can create our own custom namespaces. To set up a custom namespace, 
// we can call the ‘of’ function on the server side −

// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket) {
//    console.log('someone connected');
//    nsp.emit('hi', 'Hello everyone!');
// });


// var roomno = 1;
// io.on('connection', function(socket) {
   
//    //Increase roomno 2 clients are present in a room.
//    if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) roomno++;
//    socket.join("room-"+roomno);

//    //Send this event to everyone in the room.
//    io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
// })

// io.on('connect', function(socket){
// socket.on('connect_failed', function() {
//     document.write("Sorry, there seems to be an issue with the connection!");
//  })
// })


http.listen(PORT, function(){
    console.log(`LISTINING ON : ${PORT}`)
})