function SansBone(){
  Bullet.call(this);
  this.sprite = game.resources["Bone.png"];
  this.x = game.bulletBox.right+50;
  this.y = game.bulletBox.bottom-this.sprite.height/2;
  this.clippedByBox = true;
}

SansBone.prototype = Object.create(Bullet.prototype);
SansBone.prototype.constructor = SansBone;

SansBone.prototype.step = function(elapsed){
  this.x -= this.BASE_SPEED*elapsed*0.25;
  this.engine.bulletBox.width -= this.BASE_SPEED*elapsed*0.005;
};

SansBone.prototype.onAdded = function(){
  var that = this;
  setInterval(function(){
    that.x = game.bulletBox.right+50;
  },8000);
};

SansBone.prototype.onCollision = function(){
  this.engine.soul.damage(1);
};
