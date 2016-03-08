function HomingBlock(diff){
  Bullet.call(this);
  this.sprite = game.resources["Block.png"];
  this.homing = true;
  this.speed = (0.5+diff*2)*this.BASE_SPEED;
  this.scale = 1-diff*0.7;
  this.damage = Math.round(-1+(1-diff)*6);
  if (this.damage<0) this.damage = 0;
}

HomingBlock.prototype = Object.create(Bullet.prototype);
HomingBlock.prototype.constructor = HomingBlock;

HomingBlock.prototype.step = function(elapsed){
  var dx,dy;
  if (this.homing){
    dx = this.engine.soul.x - this.x;
    dy = this.engine.soul.y - this.y;

    var mag = Math.sqrt(dx*dx+dy*dy);
    var scale = mag/(0.9*this.speed*elapsed);
    if(scale < 1) {
      scale = 1;
      this.homing = false;
    }

    dx/=scale;
    dy/=scale;

    if(dy !== 0 || dx !== 0) {
      this.rotation = Math.atan2(dy,dx);
    }
  } else {
    dx = Math.cos(this.rotation)*this.speed*elapsed;
    dy = Math.sin(this.rotation)*this.speed*elapsed;
  }
  this.x += dx;
  this.y += dy;
};

HomingBlock.prototype.timings = [
  function(){
    this.homing = false;
    this.nextTimingIn(5000);
  },function(){
    this.destory();
  }
];

HomingBlock.prototype.onAdded = function(){
  var bb = this.engine.bulletBox,
      s = this.engine.soul,
      theta = Math.random()*Math.PI*2;

  this.x = s.x + bb.width*2*Math.cos(theta);
  this.y = s.y + bb.height*2*Math.sin(theta);
  this.nextTimingIn(200/this.speed);
};
HomingBlock.prototype.onCollision = function(){
  this.engine.soul.damage(this.damage);
};
