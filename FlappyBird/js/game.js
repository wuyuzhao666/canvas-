(function () {
  var Game = window.Game = function () {
    this.canvas = document.getElementById("canvas");
    this.R = {};
    this.ctx = this.canvas.getContext("2d");
    this.speed = 5;
    this.fna = 0;
    this.score = 0;
    var self = this;
    this.init();
    this.loadSource(function(){
      self.start();

    });

  }
  Game.prototype.init = function(){
    //读取视口的宽度和高度，
    var windowW = document.documentElement.clientWidth;
    var windowH = document.documentElement.clientHeight;
    //验收
    if(windowW > 414){
      windowW = 414;
    }else if(windowW < 320){
      windowW = 320;
    }
    //736
    if(windowH > 736){
      windowH = 736;
    }else if(windowH < 500){
      windowH = 500;
    }
    //让canvas匹配视口
    this.canvas.width = windowW;
    this.canvas.height = windowH;
  }
  Game.prototype.loadSource = function (callback) {
    var aleadyNum = 0;
    var self = this;
    var xhr =new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if(xhr.readyState == 4 && xhr.status == 200 ){
        var R_obj = JSON.parse(xhr.responseText);
        for (var i = 0 ; i < R_obj.images.length ; i++){
          self.R[R_obj.images[i].name] = new Image();
          self.R[R_obj.images[i].name].src = R_obj.images[i].url;
          self.R[R_obj.images[i].name].onload = function () {
            aleadyNum++;
            self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
            var txt = "正在加载第" + aleadyNum + "/" + R_obj.images.length + "张图片";
            self.ctx.textAlign = "center";
            self.ctx.font = "20px 微软雅黑";
            self.ctx.fillText(txt, self.canvas.width / 2 ,self.canvas.height * (1 - 0.618));
            if (aleadyNum == R_obj.images.length){
              callback();
            }

          };

        }
      }
    }
    xhr.open("get","R.json",true);
    xhr.send(null);
  }

  Game.prototype.start = function () {

    this.pipeArr = [];
    this.background = new Background();
    this.land = new Land();
    this.bird = new Bird();
    this.scene = new Scene();

    var self = this;
    this.timer = setInterval(function () {

      self.fna++;

      self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);

      self.scene.update();
      self.scene.render();

      self.ctx.font = "16px consolas";
      self.ctx.textAlign = "left";
      self.ctx.fillStyle = "black";
      self.ctx.fillText("FNO:" + self.fna , 10 ,20);


      console.log(self.pipeArr.length)
    },50);
  }
})();
