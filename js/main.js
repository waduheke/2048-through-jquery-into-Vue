var biu = new Vue({
  el: '.app',
  methods: {
    keyDown(event) {
      if(this.$refs.success.value == this.successString){
        this.newgame();
        return;
      }
      event.preventDefault();
      //生成一个新数字，并判断游戏是否结束
      this.direction = event.keyCode;

      if(this.move()){
        this.generateOneNum();
        this.isGameOver();
      }
    },

     newgame () {
       this.board = new Array(),
      this.has_conflicted = new Array();

      //初始化数组
      for(var i=0; i<4; i++){
        this.board[i] = new Array();
        this.has_conflicted[i] = new Array();
        for(var j=0; j<4; j++){
          this.board[i][j] = 0;
          this.has_conflicted[i][j] = false;
        }
      }

      //通过new game 按钮初始化棋盘
      this.updateBoardView();
      this.score = 0;
      this.updateScore(this.score);
      //随机出现两个数字
      this.generateOneNum();
      this.generateOneNum();
    },

     generateOneNum (){
      //如果空间满了
      if(this.noSpace()) {
        return false;
      }

      do{
        this.time++;
        this.randX =  Math.floor(Math.random()*4);
        this.randY =  Math.floor(Math.random()*4);
      }while(this.board[this.randX][this.randY]&&(this.time<50))
      if(this.time == 50){
        for(var i=0; i<4; i++){
          for(var j=0; j<4; j++){
            if(!this.board[i][j]){
              this.randX = i;
              this.randY = j;
            }
          }
        }
      }
      //随机生成2||4
      this.randNum = Math.random()>0.5?2:4;
      this.board[this.randX][this.randY] = this.randNum;
      this.showNumAnimate(this.randX, this.randY, this.randNum);
      return true;//what this step's meaning?
    },

     showNumAnimate (i, j, randNum){
      var p = document.createElement("p");
      p.innerHTML = randNum;
      var father = this.nth(this.$refs.table, "tr", i);
      var children = this.nth(father, "td", j);
      // var au = document.createElement("children", p);
      var au = children.appendChild(p);
      console.log(au);
      au.classList.add("au");
      // var tem = $('tr:eq('+i+')').children('td:eq('+j+')').append('<p>'+this.randNum+'</p>').children('p');
      // tem.css('background-color', this.getNumBackcolor(this.randNum));
      // tem.css('color', this.getNumColor(this.randNum));
      // tem.fadeIn('normal');
    },

      nth (parent, ele, num){
        var _ele=Array.prototype.slice.call(parent.childNodes),eleArray=[];
        //将父节点的子节点转换成数组_ele;eleArray为只储存元素节点的数组
        for(var i= 0,len=_ele.length;i<len;i++){
        if(_ele[i].nodeType==1){
        eleArray.push(_ele[i]);//过滤掉非元素节点
        }
        }
        if(arguments.length===2){
        //如果只传入2个参数，则如果第二个参数是数字，则选取父节点下的第几个元素
        //如果第二个参数是字符串，则选取父节点下的所有参数代表的节点
        if(typeof arguments[1]==="string"){
        _ele=Array.prototype.slice.call(parent.getElementsByTagName(arguments[1]));
        return _ele;
        }else if(typeof arguments[1]==="number"){
        return eleArray[arguments[1]];
        }
        }else{
        //如果参数齐全，则返回第几个某节点,索引从0开始
        _ele=Array.prototype.slice.call(parent.getElementsByTagName(ele));
        return _ele[num];
        }
      },

     getNumBackcolor (num){
        switch(num){
            case 2:return "#eee4da";break;
            case 4:return "#eee0c8";break;
            case 8: return '#f2b179'; break;
            case 16: return '#f59563'; break;
            case 32: return '#f67c5f'; break;
            case 64: return '#f65e3b'; break;
            case 128: return '#edcf72'; break;
            case 256: return '#edcc61'; break;
            case 512: return '#9c0'; break;
            case 1024: return '#33b5e5'; break;
            case 2048: return '#09c'; break;
            case 4096: return '#a6c'; break;
            case 8192: return '#93c'; break;
        }
        return "black";
    },

   getNumColor (num){
        if(num>4){
            return "snow";
        }
        else{
            return "#776e65";
        }
    },

    empty(s) {

      while (s.firstChild) {
         s.removeChild(s.firstChild);
       };
    },

    updateBoardView (){
      var t1 = document.getElementById('t1');
      var t2 = document.getElementById('t2');
      var t3 = document.getElementById('t3');
      var t4 = document.getElementById('t4');
      var t5 = document.getElementById('t5');
      var t6 = document.getElementById('t6');
      var t7 = document.getElementById('t7');
      var t8 = document.getElementById('t8');
      var t9 = document.getElementById('t9');
      var t10 = document.getElementById('t10');
      var t11 = document.getElementById('t11');
      var t13 = document.getElementById('t13');
      var t14 = document.getElementById('t14');
      var t15 = document.getElementById('t15');
      var t16 = document.getElementById('t16');
      this.empty(t1);
      this.empty(t2);
      this.empty(t3);
      this.empty(t4);
      this.empty(t5);
      this.empty(t6);
      this.empty(t7);
      this.empty(t8);
      this.empty(t9);
      this.empty(t10);
      this.empty(t11);
      this.empty(t12);
      this.empty(t13);
      this.empty(t14);
      this.empty(t15);
      this.empty(t16);
       // $('td').empty();
       for(var i=0; i<4; i++){
         for(var j=0; j<4; j++){
           if(this.board[i][j]){
             var p = document.createElement("p");
             p.innerHTML = this.board[i][j];
             var father = this.nth(this.$refs.table, "tr", i);
             var children = this.nth(father, "td", j);
             children.appendChild(p);
             // au.classList.add("ah");
             // var tem = $(".ah");
             // var tem = $('tr:eq('+i+')').children('td:eq('+j+')').append("<p>"+this.board[i][j]+"</p>").children("p");
             // tem.css("background-color", this.getNumBackcolor(this.board[i][j]));
             //         tem.css("color", this.getNumColor(this.board[i][j]));
             //         tem.show();
           }
           this.has_conflicted[i][j] = false;
         }
       }
     },

    noSpace() {
      for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
          if(!this.board[i][j]){
            return false;
          }
        }
      }
      return true;
    },

    updateScore() {
      this.$refs.success.setAttribute('value', this.score);
    },

    move() {
      // alert(this.direction);
      //判断这个方向是否能移动
      // if(!this.canMove(this.direction)){
      //   return false;
      // }
      if(this.direction == 39 || this.direction == 40){
        this.a = 2;
        this.b = -1;
        this.c = -1;
        this.d = 3;
      }
    // console.log('第一次', this.a,this.b, this.c, this.d);
      for(var i = 0; i<4; i++){
        for(var j = this.a; j != this.b; j += this.c){
          switch(this.direction){
            case 37:
            case 39:
              if(this.board[i][j]){
                for(var k = this.d; this.direction == 37?(k<j):(k>j); k+=this.c){
                  if(!this.board[i][k]&&(this.direction==37?this.no_block_horizontal(i, j, k):this.no_block_horizontal(i, k, j))){
                    // this.show_move_animation(i, j, i, k);
                    this.board[i][k] = this.board[i][j];
                    this.board[i][j] = 0;
                    break;
                  }
                  else if(this.board[i][j] == this.board[i][k]&&(this.direction==37?this.no_block_horizontal(i, k, j):this.no_block_horizontal(i, j, k))&&!this.has_conflicted[i][k]){
                    // this.show_move_animation(i, j, i, k);
                    this.board[i][k] += this.board[i][j];
                    this.board[i][j] = 0;
                    this.score+=this.board[i][k];
                    this.updateScore(this.score);
                    this.has_conflicted[i][k] = true;
                    break;
                  }
                }
              }
              break;
            case 38:
            case 40:
              if(this.board[j][i]){
                for(var k = this.d; this.direction == 38?(k<j):(k>j); k+=this.c){
                  if(!this.board[k][i]&&(this.direction==37?this.no_block_vertical(i, j, k):this.no_block_vertical(i, k, j))){
                    // this.show_move_animation(j, i, k, i);
                    this.board[k][i] = this.board[j][i];
                    this.board[j][i] = 0;
                    break;
                  }
                  else if(this.board[k][i] == this.board[j][i]&&(this.direction==38?this.no_block_vertical(i, k, j):this.no_block_vertical(i, j, k))&&!this.has_conflicted[k][i]){
                    // this.show_move_animation(j, i, k, i);
                    this.board[k][i] += this.board[j][i];
                    this.board[j][i] = 0;
                    this.score+=this.board[k][i];
                    this.updateScore(this.score);
                    this.has_conflicted[i][k] = true;
                    break;
                  }
                }
              }
              break;
            }
          }
        }
        this.updateBoardView();
        this.a = 1;
        this.b = 4;
        this.c = 1;
        this.d = 0;
        // console.log('第二次',this.a,this.b, this.c, this.d);
        return true;
      },

    no_block_horizontal(row, col1, col2){
      for( i = col1 + 1; i < col2; i++){
        if(this.board[row][i]){
          return false;
        }
      }
      return true;
    },

    no_block_vertical(col, row1, row2){
      for( i = row1 + 1; i < row2; i++){
        if(this.board[i][col]){
          return false;
        }
      }
      return true;
    },

    // show_move_animation(fromX, fromY, toX, toY){
    //   var tem =$('tr:eq('+fromX+')').children('td:eq('+fromY+')').children('p');
    //   console.log('a',fromX);
    //   console.log('b',fromY);
    //   console.log('c',toX);
    //   console.log('d',toY);
    //   tem.animate({
    //     top: (toX*(100+23)+13) + 'px',
    //     left: (toY*(100+23)+13) + 'px'
    //   }, 100);
    // },

    canMove() {
      if(this.direction == 39 || this.direction == 40){
        a = 2, b = -1, c = -1;
      }

      for(var i = 0; i<4; i++){
        for(var j = this.a; j!=this.b; j+=this.c){
          switch(this.direction){
            case 37:
            case 39:
              if(this.board[i][j]){
                if(this.board[i][j-this.c] == 0 || this.board[i][j] == this.board[i][j-this.c]){
                  return true;
                }
              }
              break;
            case 38:
            case 40:
              if(this.board[j][i]){
                if(this.board[j-this.c][i] == 0 || this.board[j][i] == this.board[j-this.c][i]){
                  return true;
                }
              }
            break;
          }
        }
      }
      return false;
    },

    isGameOver() {
      for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
          if(this.board[i][j]==2048){
            if(this.flag){
              alert(this.successString);
              this.flag = false;
              return;
            }
          }
        }
      }
      if(this.noSpace()&&this.noMove()){
        this.gameOver();
      }
    },

    gameOver() {
      alert('gameOverString' + '\nyour score is:' +this.$refs.success.value);
      this.newgame();
    },

    noMove() {
      if(this.canMove(37)||this.canMove(38)||this.canMove(39)||this.canMove(40)){
        return false;
      }
      return true;
    },

  },

  data(){
    return {
      board:[],
      has_conflicted:[],
      flag: true,
      score: 0,
      successString: 'Success',
      gameOverString: 'GameOver',
      direction:0,
      time: 0,
      randX: 0,
      randY: 0,
      randNum: 0,
      a: 1,
      b: 4,
      c: 1,
      d: 0,
    }
  },
  // components: {
  //   game: {
  //     template:`<div class="app"><header>
  //       <h1>--2048</h1>
  //       <button onClick={this.newgame()}>new game</button>
  //       <form>
  //         <label for="">
  //           score: <input type="text" name="" value="0">
  //         </label>
  //       </form>
  //     </header>
  //     <section id="container">
  //         <table id="board">
  //           <tr>
  //             <td></td>
  //             <td></td>
  //             <td></td>
  //             <td></td>
  //           </tr>
  //           <tr>
  //             <td></td>
  //             <td></td>
  //             <td></td>
  //             <td></td>
  //           </tr>
  //           <tr>
  //             <td></td>
  //             <td></td>
  //             <td></td>
  //             <td></td>
  //           </tr>
  //           <tr>
  //             <td></td>
  //             <td></td>
  //             <td></td>
  //             <td></td>
  //           </tr>
  //         </table>
  //     </section></div>`
  //   }
  // },
  mounted() {
    this.newgame();
    document.addEventListener('keyup', this.keyDown);
  },
//~~~~~~~~~~~~~~~~~~~~~~~~~~~分界线

});
