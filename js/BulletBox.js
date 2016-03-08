var BulletBox = function(){
  this.width = 155;
  this.height = 155;
  this.xOff = 0;
  this.yOff = 0;
};

BulletBox.prototype.CENTER = 320;
BulletBox.prototype.BASE_LINE = 384;
BulletBox.prototype.THICKNESS = 5;

BulletBox.prototype.render = function(ctx){
  ctx.beginPath();
  ctx.rect(
    this.left - this.THICKNESS/2,
    this.top - this.THICKNESS/2,
    this.width + this.THICKNESS,
    this.height + this.THICKNESS
  );
  ctx.lineWidth = this.THICKNESS;
  ctx.strokeStyle = "#FFF";
  ctx.stroke();
};

Object.defineProperties(BulletBox.prototype,{
  "left": {get:function(){
    return Math.floor(this.CENTER + this.xOff - this.width/2);}
  },"right": {get:function(){
    return Math.floor(this.CENTER + this.xOff + this.width/2);}
  },"top": {get:function(){
    return Math.floor(this.BASE_LINE + this.yOff - this.height);}
  },"bottom": {get:function(){
    return Math.floor(this.BASE_LINE + this.yOff);}
  }
});
