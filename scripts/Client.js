class Client{
  constructor(){
    this.socket = io();
    
    this.socket.on('connected', function(msg){
      console.log(msg);
    });
  }
}
