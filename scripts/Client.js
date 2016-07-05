class Client{
  constructor(){
    this.socket = io();

    this.socket.on('connected', function(msg){
      TankOnline.onConnected(msg);
    });
  }
}
