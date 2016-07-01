class enemyBullet{
constructor(etank){
  var ebullet;
  if(etank.eDirection.x > 0){
    ebullet = 'bulletRight';
  }
  else if(etank.eDirection.x < 0){
    ebullet = 'bulletLeft';
  }
  else if(etank.eDirection.y > 0){
    ebullet = 'bulletDown';
  }
  else if(etank.eDirection.y < 0){
    ebullet = 'bulletUp';
  }

  this.sprite = TankOnline.bulletEGroup.create(etank.sprite.x, etank.sprite.y, ebullet);
  this.sprite.anchor.set(0.5,0.5);

  this.sprite.body.velocity = new Phaser.Point(etank.eDirection.x * 500, etank.eDirection.y * 500);
  this.sprite.ebulletDamage = 1;
  }
}
