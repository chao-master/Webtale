function Engine(canvas){
  this.canvas = canvas;

  //Resources
  this._toLoad = 0;
  this.resources = {};
  this.preloadPromise = Promise.resolve([]);
  this.preload([],["soul.png"],[],".")

  //Bullets
  this.bullets = [];

  this.soul = new Soul(this);
  this.bulletBox = new BulletBox();

  //TODO move to SOUL
  this.health = {max:92,cur:92};

  //Center the soul
  this.soul.position(
    (this.bulletBox.left+this.bulletBox.right)/2,
    (this.bulletBox.top+this.bulletBox.bottom)/2
  );

  //Setup Render
  this.lastRender = 0;
  this.render();
}

Engine.prototype.GAME_WIDTH = 640;
Engine.prototype.GAME_HEIGHT = 480;

Engine.prototype.render = function(timestamp){
  if(!timestamp){
    window.requestAnimationFrame(this.render.bind(this));
    return;
  }
  var elapsed = timestamp - this.lastRender;
  this.lastRender = timestamp;
  var ctx = this.canvas.getContext("2d");
  ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

  this.soul.keyCheck(elapsed);
  for(var i=0;i<this.bullets.length;i++){
    var b = this.bullets[i];
    b.step(elapsed);
    if (b.onCollision && b.testSoulCollision()){
      b.onCollision();
    }
  }

  this.bulletBox.render(ctx);
  for(i=0;i<this.bullets.length;i++){
    this.bullets[i].render(ctx);
  }
  ctx.restore();
  this.soul.render(ctx);

  window.requestAnimationFrame(this.render.bind(this));
};

Engine.prototype.preload = function(scripts,sprites,sounds,folder){
  var prefix;
  if(!folder){
    var regex = /^(?:[a-z]+:)\//i,
        curSrc = document.currentScript.src;
    prefix = curSrc.substring(0,curSrc.lastIndexOf("/")+1);
  } else {
    prefix = folder;
  }

  function getPath(path){
    return !regex || regex.test(path) ? path : prefix+path;
  }

  function getFile(path){
    var lastSlash = path.lastIndexOf("/");
    return lastSlash == -1 ? path : path.substr(lastSlash+1);
  }
  var promises = [this.preloadPromise],
      that=this;
  promises = promises.concat(sprites.map(function(path){
    return new Promise(function(resolve, reject) {
      var i = new Image();
      i.onload = function(){resolve(i);};
      i.onerror = function(){reject(i);};
      i.src = getPath(path);
      that.resources[getFile(path)] = i;
    });
  }));
  promises = promises.concat(scripts.map(function(path){
    return new Promise(function(resolve, reject) {
      var s = document.createElement("script");
      s.onload = function(){resolve(s);};
      s.onerror = function(){reject(s);};
      s.src = getPath(path);
      document.currentScript.parentNode.insertBefore(s, document.currentScript);
    });
  }));
  promises = promises.concat(sounds.map(function(path){
    return new Promise(function(resolve, reject) {
      var a = new Audio(getPath(path));
      a.oncanplaythrough = function(){resolve(a);};
      a.onerror = function(){reject(a);};
      that.resources[getFile(path)] = a;
    });
  }));
  this.preloadPromise = Promise.all(promises);
  return this.preloadPromise;
};

Engine.prototype.addBullet = function (bullet) {
  bullet.engine = this;
  this.bullets.push(bullet);
  if (bullet.onAdded) {
    bullet.onAdded();
  }
};

Engine.prototype.removeBullet = function (bullet) {
  var i = this.bullets.indexOf(bullet);
  if (i > -1){
    this.bullets.splice(i,1);
  } else {
    console.warn("Bullet",bullet,"is already removed");
  }
};
