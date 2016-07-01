var TankOnline = {
  map : [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]
}

window.onload = function(){
  TankOnline.game = new Phaser.Game(window.innerWidth,
                                    window.innerHeight,
                                    Phaser.AUTO,
                                    '',
                                    { preload: preload,
                                      create: create,
                                      update: update
                                    }
                                  );
}

var tank, etank;
var wallGroup, allyGroup, enemyGroup;
var preload = function(){
  TankOnline.game.load.image('tankDown', './images/tank_player1_down_c0_t1_s1.png');
  TankOnline.game.load.image('tankUp', './images/tank_player1_up_c0_t1_s1.png');
  TankOnline.game.load.image('tankLeft', './images/tank_player1_left_c0_t1_s1.png');
  TankOnline.game.load.image('tankRight', './images/tank_player1_right_c0_t1_s1.png');

  TankOnline.game.load.image('bulletDown', './images/bullet_down.png');
  TankOnline.game.load.image('bulletUp', './images/bullet_up.png');
  TankOnline.game.load.image('bulletLeft', './images/bullet_left.png');
  TankOnline.game.load.image('bulletRight', './images/bullet_right.png');

  TankOnline.game.load.image('enemyDown', './images/tank_power_down_c0_t1_f.png');
  TankOnline.game.load.image('enemyUp', './images/tank_power_up_c0_t1_f.png');
  TankOnline.game.load.image('enemyLeft', './images/tank_power_left_c0_t1_f.png');
  TankOnline.game.load.image('enemyRight', './images/tank_power_right_c0_t1_f.png');

  TankOnline.game.load.image('wall', './images/wall_steel.png');
}

var create = function(){
  TankOnline.game.physics.startSystem(Phaser.Physics.ARCADE);
  TankOnline.keyboard = TankOnline.game.input.keyboard;


  wallGroup = TankOnline.game.add.physicsGroup();
  TankOnline.bulletAGroup = TankOnline.game.add.physicsGroup();
  TankOnline.bulletEGroup = TankOnline.game.add.physicsGroup();
  enemyGroup = TankOnline.game.add.physicsGroup();
  allyGroup = TankOnline.game.add.physicsGroup();

  tank = new Tank(0, window.innerHeight/2, allyGroup);
  etank = new EnemyTank(window.innerWidth, window.innerHeight/2, enemyGroup);


  TankOnline.game.world.setBounds(0, 0, 1500, 800);
  TankOnline.game.camera.follow(tank.sprite);

  for(var i=0;i<TankOnline.map.length;i++){
    for(var j=0;j<TankOnline.map[i].length;j++){
      /*
        0 -> false
        "" -> false
        null -> false
        undefined -> false
        all other -> true
       */
      if(TankOnline.map[i][j]){
        // Because the wall_steel.png image is 16x16 pixels
        new Wall(j*16, i*16, wallGroup);
      }
    }
  }
}

var update = function(){
  // Collide and Overlap for Player 1
  TankOnline.game.physics.arcade.collide(tank.sprite, wallGroup);
  TankOnline.game.physics.arcade.overlap(TankOnline.bulletAGroup,
                                          wallGroup,
                                          onABulletHitWall,
                                          null,
                                          this);
  TankOnline.game.physics.arcade.overlap(TankOnline.bulletAGroup,
                                          enemyGroup,
                                          onABulletHitEnemy,
                                          null,
                                          this);

  // Collide and Overlap for Player 2
  TankOnline.game.physics.arcade.collide(etank.sprite, wallGroup);
  TankOnline.game.physics.arcade.overlap(TankOnline.bulletEGroup,
                                          wallGroup,
                                          onEBulletHitWall,
                                          null,
                                          this);
  TankOnline.game.physics.arcade.overlap(TankOnline.bulletEGroup,
                                          allyGroup,
                                          onEBulletHitAlly,
                                          null,
                                          this);

  TankOnline.game.physics.arcade.collide(tank.sprite, etank.sprite);

  // Player 1 Move
  var direction = new Phaser.Point();
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.A)) direction.x = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.D)) direction.x = 1;
  else direction.x = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.W)) direction.y = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.S)) direction.y = 1;
  else direction.y = 0;

  tank.update(direction);

  // Player 2 Move
  var eDirection = new Phaser.Point();
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.LEFT)) eDirection.x = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.RIGHT)) eDirection.x = 1;
  else eDirection.x = 0;

  if(TankOnline.keyboard.isDown(Phaser.KeyCode.UP)) eDirection.y = -1;
  else if (TankOnline.keyboard.isDown(Phaser.KeyCode.DOWN)) eDirection.y = 1;
  else eDirection.y = 0;

  etank.update(eDirection);

  // Player 1 Shoot
  if (TankOnline.keyboard.isDown(Phaser.KeyCode.SPACEBAR)){
    tank.fire(TankOnline.bulletAGroup);
  }

  // Player 2 Shoot
  if(TankOnline.keyboard.isDown(Phaser.KeyCode.SHIFT)){
    etank.fire(TankOnline.bulletEGroup);
  }
}

//Player 1 Bullet

var onABulletHitWall = function(bulletSprite, wallSprite){
  bulletSprite.kill();
}

var onABulletHitEnemy = function(bulletSprite, enemySprite){
  enemySprite.damage(bulletSprite.bulletDamage);
  bulletSprite.kill();
}

//Player 2 Bullet
var onEBulletHitWall = function(ebullet, wallSprite){
  ebulletSprite.kill();
}

var onEBulletHitAlly = function(ebullet, allySprite){
  allySprite.damage(ebullet.ebulletDamage);
  ebullet.kill();
}
