(function () {
  var Scene = window.Scene = function () {
    this.sceneNum = 1;
    this.logoY = -48;
    this.buttonY = game.canvas.height + 78;

    this.bindlistener();

  }
  Scene.prototype.render = function () {
    switch (this.sceneNum) {
      case 1:
        game.background.render();
        game.land.render();
        game.bird.render();
        game.bird.y = 250;

        game.ctx.drawImage(game.R.button_play,game.canvas.width/2-50,this.buttonY);
        game.ctx.drawImage(game.R.logo,game.canvas.width/2-89,this.logoY);
        break;
      case 2:
        game.background.render();
        game.land.render();
        game.bird.y = 200;
        game.bird.render();

        game.ctx.save();
        game.ctx.globalAlpha = this.tutorialOpa;
        game.ctx.drawImage(game.R.tutorial,game.canvas.width/2-57,300);

        game.ctx.restore();

        break;
      case 3:
        game.background.render();
        game.land.render();
        game.bird.render();

        for(var i = 0 ; i < game.pipeArr.length ; i++){
          game.pipeArr[i] && game.pipeArr[i].render();
        }

        var scoreLength = game.score.toString().length;
        //循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
        for(var i = 0 ; i < scoreLength ; i++ ){
          game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
        }
        break;
      case 4:
        game.background.render();
        game.land.render();

        game.bird.render();
        for(var i = 0 ; i < game.pipeArr.length ; i++){
          game.pipeArr[i] && game.pipeArr[i].render();
        }
        break;
      case 5:
        game.background.render();
        game.land.render();
        game.bird.render();
        for(var i = 0 ; i < game.pipeArr.length ; i++){
          game.pipeArr[i] && game.pipeArr[i].render();
        }

        var scoreLength = game.score.toString().length;
        //循环语句去设置图片的显示，有一个基准位置就是self.canvas.width / 2 - scoreLength / 2 * 34
        for(var i = 0 ; i < scoreLength ; i++ ){
          game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i,100);
        }
        break;

    }
  }
  Scene.prototype.update = function () {
    var self = this;
    switch (this.sceneNum) {
      case 1:
          self.logoY+=10;
          if(self.logoY > 100){
            self.logoY = 100;
          }
          self.buttonY-=28;
          if(self.buttonY < 300){
            self.buttonY=300;
          }
      case 2:
        game.bird.wing();
        this.tutorialOpa+= this.tutorialIsDown ? -0.1:0.1;
        if(this.tutorialOpa < 0.1 || this.tutorialOpa > 0.9){
          this.tutorialIsDown = !this.tutorialIsDown;
        }
        break;
      case 3:
        game.bird.update();
        game.background.update();
        game.land.update();
        game.fna%50==0 && game.pipeArr.push(new Pipe());
        for(var i = 0 ; i < game.pipeArr.length ; i++){
          game.pipeArr[i] && game.pipeArr[i].update();
        }
        break;
      case 4:
        game.bird.update();

        break;

    }
  }
  Scene.prototype.enter = function (num) {
    this.sceneNum = num;
    var self = this;
    switch (this.sceneNum) {
      case 1:
        self.logoY = -48;
        self.buttonY =  game.canvas.height + 78;
        break;
      case 2:
        this.tutorialIsDown = true;
        this.tutorialOpa = 1;
        break;
      case 3:
        game.pipeArr = new Array();
        break;
      case 4:

        break;
      case 5:
        game.bird.birdf=0;
        break;
    }
  }
  Scene.prototype.bindlistener = function () {
    var self = this;

    game.canvas.onclick = function (event) {
      var mouseX = event.clientX;
      var mouseY = event.clientY;
      switch (self.sceneNum) {
        case 1:
          if(mouseX > game.canvas.width/2-50 && mouseX < game.canvas.width/2 + 116 && mouseY > self.buttonY && self.buttonY + 78){
            self.enter(2)
          }
          break;
        case 2:
          self.enter(3);
          break;
        case 3:
          game.bird.fly();
          break;
        case 5:
          self.enter(1);
          game.bird.d = 0;
          break;
      }
    }
  }
})();
