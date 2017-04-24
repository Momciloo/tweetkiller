// require Express and Socket.io
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var config = require('./config.js');

http.listen(config.PORT, function() {
  console.log('listening on http://localhost:' + config.PORT);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
