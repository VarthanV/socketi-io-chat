var express =require('express');
var app =express();
var http =require('http').createServer(app);
var io =require('socket.io')(http);
// The dict of the user and their corresponding socket ids
const userDict = new Object();
app.get('/',function(req,res){
    res.sendFile(__dirname +'/index.html');
})
// Socket Stuffs


io.on('connection',(socket) =>{
    var id = socket.id;
    console.log("A new user connected");
    socket.on('disconnect',function(){
        io.emit('user_disconnected',id)
        console.log("User disconnected ");
        
    })
    socket.on('connected',(msg) =>{
        // console.log(msg);
        io.emit('connected' ,msg);
        


    })
    socket.on('chat msg',function(msg){
        io.emit('chat msg',msg);
    })
    
  
    socket.on('typing',function(msg){
        console.log(`${msg} is typing`);
    })
})


http.listen(3000,() => console.log("Listening on Port 3000"));