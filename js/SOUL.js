function Soul(engine){
  this.engine = engine;
  this.colour = this.COLOURS.RED;
  this.state = this.STATES.BATTLE;
  this.x = 0;
  this.y = 0;

  this.curHealth = 92;
  this.maxHealth = 92;
  this.immunity  = 0;

  this.flash = false;

  //Add keybindings
  this._keys = {ArrowUp:0,ArrowDown:0,ArrowLeft:0,ArrowRight:0};
  var _keys = this._keys;
  window.addEventListener('keydown',function(e){
    if (_keys[e.code] !== undefined){
      _keys[e.code] = 1;
    }
  },true);
  window.addEventListener('keyup',function(e){
    if (_keys[e.code] !== undefined){
      _keys[e.code] = 0;
    }
  },true);
}

Soul.prototype.keyCheck = function (elapsed){
  this.immunity -= elapsed;
  if(this.immunity < 0) this.immunity = 0;
  switch (this.state){
    case this.STATES.BATTLE:
      var newX = this.x, newY = this.y;
      if(this._keys.ArrowUp){
        newY -= this.SPEED*elapsed;
      } else if (this._keys.ArrowDown){
        newY += this.SPEED*elapsed;
      }
      if(this._keys.ArrowLeft){
        newX -= this.SPEED*elapsed;
      } else if (this._keys.ArrowRight){
        newX += this.SPEED*elapsed;
      }
      this.position(newX,newY);
      break;
  }
  //Check this._keys and mark those that where just pressed
  for (var key in this._keys) {
    if(this._keys[key] == 1){
      this._keys[key] = 2;
    }
  }
};

Soul.prototype.position = function (newX,newY){
  this.x = newX;
  this.y = newY;
  if (this.x < this.engine.bulletBox.left + this.WIDTH/2){
    this.x = this.engine.bulletBox.left + this.WIDTH/2;
  } else if (this.x > this.engine.bulletBox.right - this.WIDTH/2){
    this.x = this.engine.bulletBox.right - this.WIDTH/2;
  }
  if (this.y < this.engine.bulletBox.top + this.HEIGHT/2){
    this.y = this.engine.bulletBox.top + this.HEIGHT/2;
  } else if (this.y > this.engine.bulletBox.bottom - this.HEIGHT/2){
    this.y = this.engine.bulletBox.bottom - this.HEIGHT/2;
  }
};

Soul.prototype.render = function (ctx){
  this.flash = this.immunity && !this.flash;
  if (!this.flash){
    ctx.drawImage(
      this.engine.resources[this.SPRITES[this.colour]],
      this.x-this.WIDTH/2,
      this.y-this.HEIGHT/2
    );
  }

  //Health
  var maxWidth = Math.round(this.maxHealth*this.HEALTH_WIDTH_MULT)+this.HEALTH_WIDTH_BASE,
      curWidth = Math.round(this.curHealth*this.HEALTH_WIDTH_MULT)+this.HEALTH_WIDTH_BASE;
  ctx.fillStyle = "red";
  ctx.fillRect(this.HEALTH_X,this.HEALTH_Y,maxWidth,this.HEALTH_HEIGHT);
  ctx.fillStyle = "yellow";
  ctx.fillRect(this.HEALTH_X,this.HEALTH_Y,curWidth,this.HEALTH_HEIGHT);
  ctx.font = "24px 'Mars-Needs-Cunnilingus'";
  ctx.fillStyle = "white";
  ctx.fillText(this.curHealth + " / " + this.maxHealth,this.HEALTH_X+maxWidth+this.HEALTH_SEP,this.TEXT_BOTTOM);//*/

};

Soul.prototype.damage = function (amount){
  if(!this.immunity){
    this.immunity = this.IMMUNITY;
    this.curHealth -= amount;
  }
};

//Constants
Soul.prototype.SPEED = 2/1000*60;
Soul.prototype.WIDTH = 16;
Soul.prototype.HEIGHT = 16;
Soul.prototype.COLOURS = {RED:0, BLUE:1, PURPLE:2, GREEN:3, YELLOW:4};
Soul.prototype.STATES = {BATTLE:0, MENU:3, TARGET:2};
Soul.prototype.SPRITES = ["soul.png"];

Soul.prototype.HEALTH_Y = 399;
Soul.prototype.HEALTH_X = 256;
Soul.prototype.HEALTH_HEIGHT = 21;
Soul.prototype.HEALTH_WIDTH_MULT = 1.2;
Soul.prototype.HEALTH_WIDTH_BASE = 1;
Soul.prototype.HEALTH_SEP = 33;
Soul.prototype.TEXT_BOTTOM = 417;

Soul.prototype.IMMUNITY = 1000;
