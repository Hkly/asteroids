(function(root) {
  var AG = root.AG = (root.AG || {});
  var MovingObject = AG.MovingObject;
  var Bullet = AG.Bullet;
  
  var Ship = AG.Ship = function(game, pos, vel) {
    MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
    this.game = game;
  };
  Ship.inherits(MovingObject);
  Ship.COLOR = "#3EC5CF";
  Ship.RADIUS = 10;
  
  Ship.prototype.power = function(impulse){
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
  
  Ship.prototype.fireBullet = function(bulletsArray){
    var temp =  Math.sqrt( Math.pow(Bullet.SPEED, 2) / (1 + Math.pow(this.vel[1]/this.vel[0], 2)) );
    var x = (this.vel[0] >= 0 ? temp : -temp) || Bullet.SPEED;
    var a = x * (this.vel[1]/this.vel[0]);
    var y = (this.vel[0] === 0 ? Bullet.SPEED :  a);
    var bulletVel = [x, y];
    console.log(bulletVel);
    bulletsArray.push(new Bullet(this.game, [this.pos[0], this.pos[1]], bulletVel));
  
  
   
  };
  
})(this);
