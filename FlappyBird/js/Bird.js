(function () {
  var Bird = window.Bird = function () {
    this.imageArr = [];
    this.color = parseInt(Math.random()*3);
    this.index = 0;
    this.init();
    this.x = game.canvas.width/2;
    this.y = game.canvas.height*0.45;
    this.birdf = 0;
    this.d = 0;
    this.hasEnergy = false;


  }
  Bird.prototype.init = function () {
    this.imageArr[0] = game.R["bird" + this.color +"_0"];
    this.imageArr[1] = game.R["bird" + this.color +"_1"];
    this.imageArr[2] = game.R["bird" + this.color +"_2"];
  }
  Bird.prototype.wing = function(){
    game.fna%8 == 0 && this.index++;
    if(this.index > 2){
      this.index = 0;
    }
  }
  Bird.prototype.update = function(){
    this.wing();
    if(!this.hasEnergy){
      this.y += 0.6 * this.birdf;
      this.d+=0.04;
    }else{

      this.y -= 0.78 * (10 - this.birdf);
      if(this.birdf > 10){
        this.birdf = 0;
        this.hasEnergy = false;
      }
    }

    this.birdf++;
    this.T = this.y - 12; //12是图片的上面空隙
    this.R = this.x + 17;
    this.B = this.y + 12;
    this.L = this.x - 17;
    //掉落20帧之后，要让小鸟没有能量

    if(this.B > game.canvas.height*0.75){
      game.scene.enter(5);
    }
  }
  Bird.prototype.render = function(){
    game.ctx.save();
    //移动
    game.ctx.translate(this.x , this.y); //将坐标系拉动到小鸟中点
    game.ctx.rotate(this.d);
    game.ctx.drawImage(this.imageArr[this.index],-24,-24);	//显示小鸟图片
    //恢复ctx
    game.ctx.restore();
  }


  Bird.prototype.fly = function () {
    this.birdf = 0;
    this.d = -0.6;
    this.hasEnergy = true;
    //保存ctx

  }

})();
