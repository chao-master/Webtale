var game = new Engine(document.querySelector("#game"));

var delay = 1000;
function addBlock(){
  game.addBullet(new HomingBlock(1-delay/1000));

  if (delay > 100){
    delay -=10;
  } else if (delay > 0) {
    delay --;
  } else {
    delay = 1000;
  }
  setTimeout(addBlock,delay);
}

game.preload([
  "HomingBlock.js"
],[
  "Block.png"
],[]).then(function(v){
    console.log(v);
    setTimeout(addBlock,delay);
});
