class Client{
  constructor(){
    this.socket = io();
    this.location = new Phaser.Point(1,2);
    this.socket.on('connected', function(newTank){
      TankOnline.createTank(newTank);
      console.log('TankX : ' + newTank.x);
      console.log('TankY : ' + newTank.y);
    });
  }
}
