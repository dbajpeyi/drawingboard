var express = require("express");
var app = express();
var http= require('http').Server(app);
var io  = require("socket.io")(http);



app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket){
  socket.on("drawing", function(msg){
    io.emit("drawing",msg);
  });
})


http.listen(3000, function(){
  console.log("Listening on port 3000");
});
