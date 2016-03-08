var game = new Engine(document.querySelector("#game"));

game.preload([
  "bone.js"
],[
  "Bone.png"
],[
  "song.mp3"
]).then(function(v){
  console.log(v);
  game.resources["song.mp3"].loop = true;
  game.resources["song.mp3"].play();
  game.addBullet(new SansBone());
});
