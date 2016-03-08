function Bullet(){
  this.x = 0;
  this.y = 0;
  this.sprite = null;
  this.rotation = 0;
  this.scale = 1;
  this.engine = undefined;
  this.clippedByBox = false;
  this.timings = this.constructor.prototype.timings.slice();
}

Bullet.prototype.BASE_SPEED = 2/1000*60;

Bullet.prototype.render = function (ctx) {
  if(this.sprite){
    ctx.save();
    if(this.clippedByBox){
      var bb = this.engine.bulletBox;
      ctx.rect(bb.left,bb.top,bb.width,bb.height);
      ctx.clip();
    }
    ctx.translate(this.x,this.y);
    ctx.scale(this.scale,this.scale);
    ctx.rotate(this.rotation);
    ctx.drawImage(this.sprite,-this.sprite.width/2,-this.sprite.height/2);
    ctx.restore();
  }
};

Bullet.prototype.testSoulCollision = function(){
  //Start by seeing if we are inside the box
  var soul = this.engine.soul,
      bBox = this.engine.bulletBox,
      height = this.sprite.height*this.scale,
      width = this.sprite.width*this.scale,
      safeRadius = (height+width)/2;

  if(bBox.left-safeRadius < this.x &&
    bBox.right+safeRadius > this.x &&
    bBox.top-safeRadius < this.y &&
    bBox.bottom+safeRadius > this.y){
      //Inside box
    } else {
      return false;
    }

  //Check collision when aligned to SOUL's rotation (cannot change)
  var aCosR = Math.abs(Math.cos(this.rotation)),
      aSinR = Math.abs(Math.sin(this.rotation));
  //Check overlap along X
  var xRadius = (aCosR*width + aSinR*height)/2,
      dX = Math.abs(soul.x - this.x);
  if (dX > xRadius){ //No overlap
    return false;
  }
  //Check overlap along Y
  var yRadius = (aCosR*height + aSinR*width)/2,
      dY = Math.abs(soul.y - this.y);
  if (dY > yRadius){
    return false;
  }
  //Check overlaps when aligned to the bullet's rotation
  var soulRadius = (aCosR*16 + aSinR*16)/2;
  if (dX*aCosR > soulRadius){
    return false;
  }
  if (dY*aSinR > soulRadius){
    return false;
  }
  return true;
};

Bullet.prototype.destory = function(){
  this.engine.removeBullet(this);
};

Bullet.prototype._doNextTiming = function () {
  this.timings.shift().call(this);
};
Bullet.prototype.nextTimingIn = function (delay) {
  setTimeout(this._doNextTiming.bind(this),delay);
};
Bullet.prototype.timings = [];
Bullet.prototype.step = function () {};
