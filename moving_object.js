(function (root) {
  var AG = root.AG = (root.AG || {});
  var MovingObject = AG.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };
  
  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };
  
  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var temp = Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
        Math.pow((this.pos[1] - otherObject.pos[1]), 2);
    var distance = Math.sqrt(temp);
    return distance < (this.radius + otherObject.radius);
  };
  
})(this);
