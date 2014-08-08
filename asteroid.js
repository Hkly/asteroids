Function.prototype.inherits = function(superClass){
  var Surrogate = function(){};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
};



(function(root) {
  var AG = root.AG = (root.AG || {});
  var MovingObject = AG.MovingObject;
  
  var Asteroid = AG.Asteroid = function(pos, vel, radius) {
    MovingObject.call(this, pos, vel, radius, Asteroid.COLOR);
  };
  Asteroid.inherits(MovingObject);
  Asteroid.COLOR = "#1F0B0F";
  Asteroid.MAX_RADIUS = 30;
  Asteroid.MAX_VELOCITY = 5;
  
  Asteroid.randomAsteroid = function(dimX, dimY) {
    var pos = [];
    pos[0] = dimX * Math.random();
    pos[1] = dimY * Math.random();
    
    var radius = (Math.random() * Asteroid.MAX_RADIUS) + 10;
    
    return new Asteroid(pos, Asteroid.randomVel(), radius);
  };
   
  Asteroid.randomVel = function() {
    return [2 * Asteroid.MAX_VELOCITY * Math.random() - Asteroid.MAX_VELOCITY,
            2 * Asteroid.MAX_VELOCITY * Math.random() - Asteroid.MAX_VELOCITY];

  };
  
  
})(this);
