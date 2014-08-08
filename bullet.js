

(function(root) {
  var AG = root.AG = (root.AG || {});
  var MovingObject = AG.MovingObject;
  var Bullet = AG.Bullet = function(game, pos, vel){
    MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
    this.game = game;
  };
  Bullet.inherits(MovingObject);
  
  Bullet.prototype.hitAsteroids = function() {
    var that = this;
    this.game.asteroids.forEach(function(rock){
      if(rock.isCollidedWith(that)){
        that.game.explodeAsteroid(rock);
        that.game.removeBullet(that);
      }
    });
  };
  
  Bullet.RADIUS = 3;
  Bullet.COLOR = "orange";
  Bullet.SPEED = 20;
})(this);
  