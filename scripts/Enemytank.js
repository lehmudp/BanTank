class EnemyTank{
  constructor(x, y, group){
    this.sprite = group.create(x, y, 'enemyDown');
    TankOnline.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.set(0.5,0.5);
    this.eDirection = new Phaser.Point(0,1);
    this.lastShotTime = TankOnline.game.time.now;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.health = 5;
    this.sprite.body.immovable = true;
  }

  update(eDirection){
    if(eDirection.x < 0){
      this.sprite.body.velocity.x = -250;
      this.sprite.loadTexture('enemyLeft');
      this.eDirection = new Phaser.Point(-1,0);
    }
    else if (eDirection.x > 0){
      this.sprite.body.velocity.x = 250;
      this.sprite.loadTexture('enemyRight');
      this.eDirection = new Phaser.Point(1,0);
    }
    else{
      this.sprite.body.velocity.x = 0;
    }

    if(eDirection.y < 0){
      this.sprite.body.velocity.y = -250;
      this.sprite.loadTexture('enemyUp');
      this.eDirection = new Phaser.Point(0,-1);
    }
    else if (eDirection.y > 0){
      this.sprite.body.velocity.y = 250;
      this.sprite.loadTexture('enemyDown');
      this.eDirection = new Phaser.Point(0,1);
    }
    else{
      this.sprite.body.velocity.y = 0;
    }
  }

  fire(){
    if(TankOnline.game.time.now - this.lastShotTime > 200 && this.sprite.alive){
      this.lastShotTime = TankOnline.game.time.now;
      new enemyBullet(this);
    }

  }
}
