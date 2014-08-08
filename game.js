
(function(root) {
  var AG = root.AG = (root.AG || {});
  var Asteroid = AG.Asteroid;
  var Ship = AG.Ship;
  var Bullet = AG.Bullet;
  var Game = AG.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(5);
    this.ship = new Ship(this, [400, 300], [0, 0]);
    this.bullets = [];
    this.score = 0;
    this.gameOver = false;
  };
  
  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.FPS = 30;
    
  Game.prototype.addAsteroids = function(numAsteroids){
    var asteroids = [];
    for(var i = 0; i < numAsteroids; i++){
      asteroids.push(Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
    return asteroids;
  };
  
  Game.prototype.drawScore = function(){
    ctx.fillStyle = "#78CF3E";
    ctx.font = "italic bold "+30+"pt futura ";
    ctx.fillText(this.score, 10, 45);
    ctx.strokeStyle = '#78CF3E';
    ctx.lineWidth = 2;
    ctx.strokeText(this.score, 10, 45);
  };
  
  Game.prototype.draw = function(){
    ctx.drawImage(img, 0, 0);
    var that = this;
    
    this.drawScore();

    
    this.asteroids.forEach(function(rock){
      rock.draw(that.ctx);
    });
    this.bullets.forEach(function(bullet){
      bullet.draw(that.ctx);
    });
    
    if (!(this.gameOver)){
      this.ship.draw(this.ctx);
    };
    
    
  };
  
  Game.prototype.move = function(){
    this.asteroids.forEach(function(rock){
      rock.move();
    });
    this.bullets.forEach(function(bullet){
      bullet.move();
    });
    this.ship.move();
  };
  
  Game.prototype.checkCollisions = function(){
    var that = this;
    this.asteroids.forEach(function(rock){
      if (rock.isCollidedWith(that.ship)){
        

        if(confirm("You died... Play again!")){
          that.stop();
          location.reload();
        } else {
          that.gameOver = true;
          that.ship.pos = [-10, -10]
        }
      }
    });
  };
  
  Game.prototype.stop = function(){
    window.clearInterval(this.timerID);
  };
  
  Game.prototype.checkFallingAsteroids = function(){
    var that = this;
    this.asteroids.forEach(function(rock){
      if(rock.pos[0] > Game.DIM_X){
        rock.pos[0] -= Game.DIM_X;
      } else if (rock.pos[0] < 0){
        rock.pos[0] += Game.DIM_X;
      } 
      if(rock.pos[1] > Game.DIM_Y){
        rock.pos[1] -= Game.DIM_Y;
      } else if (rock.pos[1] < 0){
        rock.pos[1] += Game.DIM_Y;
      }
    });
  };
  
  Game.prototype.checkFallingShip = function(){
    if(this.ship.pos[0] > Game.DIM_X){
      this.ship.pos[0] -= Game.DIM_X;
    } else if (this.ship.pos[0] < 0){
      this.ship.pos[0] += Game.DIM_X;
    } 
    if(this.ship.pos[1] > Game.DIM_Y){
      this.ship.pos[1] -= Game.DIM_Y;
    } else if (this.ship.pos[1] < 0){
      this.ship.pos[1] += Game.DIM_Y;
    }
  };
  
  Game.prototype.fireBullet = function() {
    this.ship.fireBullet(this.bullets);
  };
  
  Game.prototype.explodeAsteroid = function(rock){
    
    if(rock.radius > 12){
      var newRadius = rock.radius / 2;
      var a1 = new Asteroid(rock.pos.slice(), rock.vel.slice(), newRadius);
      var a2 = new Asteroid(rock.pos.slice(), [rock.vel[1] * 2, rock.vel[0]], newRadius);
      this.asteroids = this.asteroids.concat([a1, a2]);
    } else {
      this.asteroids.push(Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
    
    this.score++;
    this.asteroids.splice(this.asteroids.indexOf(rock), 1);
  };
  
  Game.prototype.removeBullet = function(bullet){
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
  };
  
  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key("up", function() {that.ship.power([0, -1]);});
    key("down", function() {that.ship.power([0, 1]);});
    key("left", function() {that.ship.power([-1, 0]);});
    key("right", function() {that.ship.power([1, 0]);});
    key("space", function() {that.fireBullet();});
  };
  
  Game.prototype.checkBullets = function(){
    this.bullets.forEach(function(bullet){
      bullet.hitAsteroids();
    })
  };
  
  Game.prototype.step = function(){
    this.draw();
    this.move();
    var that = this;
    if (!(this.gameOver)){
      this.checkCollisions();
    }
    this.checkFallingAsteroids();
    this.checkFallingShip();
    this.checkBullets();
  };
  
  Game.prototype.start = function(){
    var that = this;
    this.bindKeyHandlers();
    this.timerID = setInterval(function(){
      that.step();
    }, Game.FPS);
  };
  
})(this);
  