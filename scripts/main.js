var TankOnline = {};
window.onload = function() {
  TankOnline.game = new Phaser.Game(window.innerWidth,
                                    window.innerHeight,
                                    Phaser.AUTO,
                                    '',
                                    {preload: preload, create: create, update: update});
}

var tank;
var bullet;
var preload = function() {
  TankOnline.game.load.image('tankDown', './images/tank_player1_down_c0_t1_s1.png');
  TankOnline.game.load.image('tankUp', './images/tank_player1_up_c0_t1_s1.png');
  TankOnline.game.load.image('tankLeft', './images/tank_player1_left_c0_t1_s1.png');
  TankOnline.game.load.image('tankRight', './images/tank_player1_right_c0_t1_s1.png');
  TankOnline.game.load.image('bullet', './images/bullet_right.png');

}

var create = function(){

  bullet = TankOnline.game.add.sprite(0, window.innerHeight/2,'bullet');
  tank = new Tank(window.innerWidth/2, window.innerHeight/2);
  tank2 = new Tank(window.innerWidth/2, window.innerHeight/2 - 100);
  TankOnline.game.physics.startSystem(Phaser.Physics.ARCADE);
  TankOnline.game.physics.arcade.enable(tank);
  TankOnline.game.physics.arcade.enable(bullet);

  TankOnline.keyboard = TankOnline.game.input.keyboard;
}

var update = function(){
  var directionX, directionY;
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)) directionX = -1;
  else if(TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)) directionX = 1;
  else direcionX = 0

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.UP)) directionY = -1;
  else if(TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)) directionY = 1;
  else direcionY = 0

  tank.update(directionX, directionY);
  tank2.update(directionX, directionY);

  if (TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
    bullet.body.velocity.x = 1000;
  }


}
