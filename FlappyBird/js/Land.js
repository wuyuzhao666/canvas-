(function () {
  var Land = window.Land = function () {
    this.image = game.R.land;
    this.w = 336;
    this.h = 112;
    this.x = 0;
    this.y = 0.75*game.canvas.height-1;


  }
  Land.prototype.update = function(){
    this.x -= game.speed;
    if(this.x < -this.w){
      this.x = 0;
    }
  }
  Land.prototype.render = function () {
    game.ctx.drawImage(this.image,this.x,this.y);
    game.ctx.drawImage(this.image,this.x + this.w,this.y);
    game.ctx.drawImage(this.image,this.x + this.w*2,this.y);
    game.ctx.fillStyle = "#DED895";
    game.ctx.fillRect(0,this.y + this.h,game.canvas.width,20)
  }
})();
