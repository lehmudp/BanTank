var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));


app.get('/', function(req, res){
  res.sendFile(__dirname + 'index.html');
});

var players = [];
var getPlayerById = function(id){
  for(var i=0;i<players.length;i++){
    if(players[i].id == id){
      return players[i];
    }
  }
}

io.on('connection', function(socket){
  console.log('New User Connected');

  // Send all players' data to the new player
  socket.emit('other_players', players);

  var newPlayerInfo = {
    id  : socket.id,
    x   : Math.random()*3200,
    y   : Math.random()*800
  }
  // Tell the new player where to initiate his tank
  socket.emit('connected', newPlayerInfo);
  // Tell all other players where to initiate new player's tank
  socket.broadcast.emit('new_player_connected', newPlayerInfo);
  // Add new player's info to the array of all players
  players.push(newPlayerInfo);

  socket.on('tank_moved', function(data){
    var playerInfo = getPlayerById(data.id);
    playerInfo.x = data.position.x;
    playerInfo.y = data.position.y;
    socket.broadcast.emit('player_moved', data);
  });

  socket.on('bullet_moved', function(msg){
    socket.broadcast.emit('shot_fired', msg);
  });

  socket.on('tank_died', function(msg){
    socket.broadcast.emit('player_died', msg);
});
});


http.listen(6969, function(){
  console.log('Server started. Listening on *:6969');
});
