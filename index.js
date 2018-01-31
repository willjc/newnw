var express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sd = require('silly-datetime');
var os =require('os');
var getip=require('getip');;
app.set("view engine","ejs");
app.use(express.static('public'));
app.get('/', function(req, res){    
 res.render('index');
 // res.send('<h1>Hello world</h1>');
});
app.get('/chat',function(req,res){
res.render('chat');
});

io.on('connection',function(socket){
  var clientip = socket.handshake.address;
  var timea=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  var newuserdata={comein:clientip,comeintime:timea};
  io.emit('newuser',newuserdata);
  socket.on('chat-message',function(data){//接收用户发送的消息
    timea=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    var resu={data:data,time:timea}
    console.log(data);
    io.emit('emit-chat-content',resu);//发送给所有的用户
  });
  //io.emit('a new user come in');
});
// getip(function(data){
//   console.log(data);
// });
//console.log(iptable);
//console.log(getip);
var localipa='';
getip(os,function(localip){
   localipa = localip;
});


http.listen(3000,localipa,function(){
  console.log('listening on'+localipa+'*:3000');
});