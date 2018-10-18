(function () {
  var Pipe = window.Pipe = function(){
    this.imageUp = game.R.pipe_up;
    this.imageDown = game.R.pipe_down;
    this.interHeight = 120;
    this.allHeight = parseInt(game.canvas.height * 0.75);
    this.h = 320;
    this.w = 52;
    this.pass = false;
    this.upHeight = 100 + (parseInt(Math.random()*(this.h-100)));
    this.downHeight = this.allHeight - this.upHeight - this.interHeight;
    this.x = game.canvas.width;
    game.pipeArr.push(this);
  }
  Pipe.prototype.update = function(){
    this.x -= game.speed;
    if(game.bird.R > this.x && game.bird.L < (this.x + this.w)){
      if(game.bird.T < this.upHeight || game.bird.B > this.upHeight + this.interHeight){
          game.scene.enter(4);
      }
    }
    if(game.bird.x > this.x + this.w && !this.pass){
      game.score++;
      this.pass = true;
    }
    if(this.x < -52){
      for (var i = 0 ; i < game.pipeArr.length ; i++){
        game.pipeArr.splice(i,1);
      }
    }

  }
  Pipe.prototype.render = function () {
    game.ctx.drawImage(this.imageDown,0,this.h - this.upHeight,this.w,this.upHeight,this.x,0,this.w,this.upHeight);
    game.ctx.drawImage(this.imageUp,0,0,this.w,this.downHeight,this.x,this.interHeight+this.upHeight,this.w,this.downHeight);
  }

})();
