var Game = function() {
  this.board = this.newBoard();
  this.score = 0;
  this.arrows = [37, 38, 39, 40];
};

Game.prototype.newBoard = function(){
  var rand = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Math.random() < 0.9 ? 2 : 4, Math.random() < 0.9 ? 2 : 4];

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  rand = shuffleArray(rand);
  var board = []
  for (var i = 0; i < 4; i++) {
    board.push(rand.splice(0,4))
  };

  set = new Set

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] > 0){
        set.add([i, j, board[i][j]]);
      };
    };
  };

  var array = Array.from(set)
  var rowNum1 = array[0][0]
  var colNum1 = array[0][1]
  var randValue1 = array[0][2]
  var rowNum2 = array[1][0]
  var colNum2 = array[1][1]
  var randValue2 = array[1][2]

  $("#gameboard").append("<div class='tile' data-row='r" + rowNum1 + "', data-col='c" + colNum1 + "' data-val='" + randValue1 + "'>" + randValue1 + "</div>");
  $("#gameboard").append("<div class='tile' data-row='r" + rowNum2 + "', data-col='c" + colNum2 + "' data-val='" + randValue2 + "'>" + randValue2 + "</div>");

  return board;
};

Game.prototype.moveTile = function(tile, direction) {
  var column;
  var row;

  switch(direction) {
    case 38: //up
      tile = tile.sort(function(a,b){
        return a.dataset.row[1] - b.dataset.row[1];
      });
      for (var i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (row[1] - 1 >= 0) {
          console.log("move stuff");
          while (this.board[row[1] - 1][column[1]] === 0) {
            this.removeFromBoard(tile[i]);
            tile[i].dataset.row = row[0] + (parseInt(row[1]) - 1);
            this.addToBoard(tile[i]);
            row = tile[i].dataset.row;
            if (row[1] - 1 < 0) {
              break;
            }
          }
        }
      }
      break;
    case 40: //down
      tile = Array.from(tile);
      tile.sort(function(a,b){
        return (b.dataset.row[1] - a.dataset.row[1]);
      });

      console.log(tile[0]);

      for (i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (parseInt(row[1]) + 1 <= 3) {
          while (this.board[parseInt(row[1]) + 1][column[1]] === 0) {
            this.removeFromBoard(tile[i]);
            tile[i].dataset.row = row[0] + (parseInt(row[1]) + 1);
            this.addToBoard(tile[i]);
            row = tile[i].dataset.row;
            if (parseInt(row[1]) + 1 > 3) {
              break;
            }
          }
        }
      }
      break;
    case 37: //left
      tile = tile.sort(function(a,b){
        return a.dataset.col[1] - b.dataset.col[1];
      });

      for (i = 0; i < tile.length; i++) {
        console.log(i);
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (column[1] - 1 >= 0) {
          while (this.board[row[1]][column[1] - 1] === 0) {
            this.removeFromBoard(tile[i]);
            tile[i].dataset.col = column[0] + (parseInt(column[1]) - 1);
            this.addToBoard(tile[i]);
            column = tile[i].dataset.col;
            if (column[1] -1 < 0) {
              break;
            }
          }
        }
      }
      break;
    case 39: //right
      tile = tile.sort(function(a,b){
        return b.dataset.col[1] - a.dataset.col[1];
      });

      for (i = 0; i < tile.length; i++) {
        row = tile[i].dataset.row;
        column = tile[i].dataset.col;
        if (parseInt(column[1]) + 1 <= 3) {
          while (this.board[row[1]][parseInt(column[1]) + 1] === 0) {
            this.removeFromBoard(tile[i]);
            tile[i].dataset.col = column[0] + (parseInt(column[1]) + 1);
            this.addToBoard(tile[i]);
            column = tile[i].dataset.col;
            if (parseInt(column[1]) + 1 > 3) {
              break;
            }
          }
        }
      }
      break;
    }
};

Game.prototype.removeFromBoard = function(tile) {
  var row = tile.dataset.row[1];
  var column = tile.dataset.col[1];
  this.board[row][column] = 0;
};

Game.prototype.addToBoard = function(tile) {
  var row = tile.dataset.row[1];
  var column = tile.dataset.col[1];
  this.board[row][column] = tile.dataset.val;
};

Game.prototype.newTile = function() {
  console.log("new tile");
  var randValue = Math.random() < 0.9 ? 2 : 4;
  var randCol = Math.floor(Math.random() * 4);
  var randRow = Math.floor(Math.random() * 4);

  if (this.board[randRow][randCol] === 0) {
    $("#gameboard").append("<div class='tile' data-row='r" + randRow + "', data-col='c" + randCol + "' data-val='" + randValue + "'>" + randValue + "</div>");
    this.board[randRow][randCol] = randValue;
    console.log(this.board[randRow][randCol]);
  } else {
    this.newTile();
    this.gameOver();
  }
};

Game.prototype.gameOver = function(){
  var loser;
  var board = this.board;
  var zeros = [];

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0){
        zeros.push(board[i][j]);
      }
    }
  }

  if (zeros.length === 0){
    loser = true;
  } else {
    loser = false;
  }

  var gameOverAlert = function() {
    swal({
      title: "Game Over!",
      text: "Do you want to play again?",
      type: "info",
      showCancelButton: false,
      closeOnConfirm: true,
      confirmButtonText: "Yes, play again!",
      confirmButtonColor: "#ec6c62"
    }, function() {
        window.location.reload();
    });
  };

  if (loser) {
    this.newBoard();
    gameOverAlert();
  }
};

Game.prototype.noAvailableMoves = function(){

};

$(document).ready(function() {
  var game = new Game();

  $('body').keydown(function(event){
    if (game.arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');
      game.moveTile(tile, event.which);
      setTimeout(function() { game.newTile(); }, 200);
    }
  });
});
