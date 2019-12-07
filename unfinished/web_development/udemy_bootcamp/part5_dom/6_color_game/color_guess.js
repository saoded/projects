function constructColorString(rgb){
  return "rgb(" +
    rgb[0] + ", " +
    rgb[1] + ", " +
    rgb[2] + ")";
}

function invertColor(rgb) {
  rgb = Array.prototype.join.call(arguments).match(/(-?[0-9\.]+)/g);
  return ((rgb[1] > 120) ? [0,0,0] : [255,255,255])

}


function checkSelection(){
  if(this.style.backgroundColor == winnerColor){
    result.textContent = "Correct!";
    title.style.background = winnerColor;
    title.style.color =
      constructColorString(invertColor(winnerColor));
    
    for (var i = 0; i < nSquares; i++) {
      squares[i].style.background = winnerColor;
      squares[i].disabled = true;
    }
    resetBtn.textContent = "Play Again?"
    return;
  }
  this.style.opacity = 0;
  this.disabled = true;
  result.textContent = "Try Again";
}

function setDifficulty(d, btn){
  nSquares = d;
  initGame();
  for (var i = d; i < nSquaresMax; i++) {
    squares[i].style.opacity = 0;
    squares[i].disabled = true;
  }
  for (var i = 0; i < difficultyBtns.length; i++) {
    difficultyBtns[i].disabled = false;
    difficultyBtns[i].classList.remove("currentDifficulty");
  }
  
  btn.disabled = true;
  btn.classList.add("currentDifficulty");
}

function initButtons(){
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", checkSelection);
  }
  document.querySelector("#easy").addEventListener("click", function(){
    setDifficulty(2, this)
  });
  document.querySelector("#hard").addEventListener("click", function(){
    setDifficulty(nSquaresMax, this)
  });
  resetBtn.addEventListener("click", initGame);
}

function initSquares(){
  for (var i = 0; i < nSquares; i++) {
    colors[i] = constructColorString([
      Math.floor(Math.random() * 0x100),
      Math.floor(Math.random() * 0x100),
      Math.floor(Math.random() * 0x100)]);
      squares[i].style.background = colors[i];
      squares[i].style.opacity = 1;
      squares[i].disabled = false;
    }
  }
  
  function initGame(){
    initSquares();
    winner = Math.floor(Math.random() * nSquares);
    winnerColor = colors[winner];
    console.log(winner);
    console.log(winnerColor);
    resetBtn.textContent = "New Colors";
    result.textContent = ""
    winnerDisplay.textContent = winnerColor;
  }
  
  var squares = document.querySelectorAll(".square");
  var result = document.querySelector("#result");
  var title = document.querySelector("#title");
  var resetBtn = document.querySelector("#reset");
  var difficultyBtns = document.querySelectorAll(".difficulty");
  console.log(difficultyBtns)
  initButtons()
  
  var colors = [];
  var nSquaresMax = 6;
  var nSquares = nSquaresMax;
  var winner;
  var winnerColor;
  
  var winnerDisplay = document.querySelector("#winDisplay")
  initGame();
  difficultyBtns[1].disabled = true;
  