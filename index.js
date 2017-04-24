// require Express and Socket.io
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var config = require('./config.js');
var Twit = require('twit');
var dotenv = require('dotenv').config();

var T = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMERKEY,
  consumer_secret:      process.env.TWITTER_CONSUMERSECRET,
  access_token:         process.env.TWITTER_ACCESSTOKEN,
  access_token_secret:  process.env.TWITTER_ACCESSTOKENSECRET,
  timeout_ms:           process.env.TWITTER_TIMEOUT,
});

http.listen(config.PORT, function() {
  console.log('listening on http://localhost:' + config.PORT);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// getting tweets
var stream = T.stream('statuses/filter', { track: config.HASHTAG })
stream.on('tweet', function (tweet) {
    io.sockets.emit('tweet', tweet);
    console.log(tweet.text);
});
