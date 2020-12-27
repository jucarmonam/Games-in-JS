const startBtn = document.querySelector('button');
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.score-display');
const linesDisplay = document.querySelector('.lines-display');
const displaySquares = document.querySelectorAll('.previous-grid div');
let squares = Array.from(grid.querySelectorAll('div'));  //Array.from nos permite crear un arreglo ya sea desde un string, otro arreglo, un map o un set
const width = 10;
const height = 20;
let currentPosition = 3; //ponemos 4 que seria la posicion 5 porque seria el elemento jsuto en el medio de los 9 cuadros de ancho, ademas sera el punto de referencia para indicar la posicion de los cuadritos
let currentIndex;
let timerId;
let score = 0;
let lines = 0;

 function control(e){
     if(e.keyCode === 39){
         moveRight();
     }else if(e.keyCode === 38){
        rotate();
     }else if(e.keyCode === 37){
         moveLeft();
     }else if(e.keyCode === 40){
         moveDown();
     }
 }
 document.addEventListener('keydown', control);

 //The Tetrominoes
 const lTetromino = [
    [1, width+1, width*2+1, 2],   //cada arreglo de estos contiene la posicion de cada uno de los cuadros pequeños
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

  //Randomly select Tetromino

  let random = Math.floor(Math.random()*theTetrominoes.length);//obtenemos un numero random para el arreglo de los tetrominos
  let currentRotation = 0;
  let current = theTetrominoes[random][currentRotation]; //obtenemos un arreglo con las posiciones de una figura o la posicion de cada uno de sus cuadros pequeños

  // draw the shape
  function draw(){
      current.forEach(index => {
        squares[currentPosition + index].classList.add('block');//nos movemos por el arreglo current y vamos agregando en squares cada una de las posiciones que tenemos en current
      })
  }

  //undraw the shape
  function undraw(){
      current.forEach( index => {
          squares[currentPosition + index].classList.remove('block');//lo mismo que arriba, pero borramos los cuadros
      })
  }
 
  //move down shape
  function moveDown(){
      undraw();
      currentPosition = currentPosition += width;
      draw();
      freeze(); //llamamos a esta funcion para que vea si la ficha ya se choco con algo para que se quede ahi
  }

  //move left and prevent collisions with shapes moving left
  function moveRight(){
      undraw();
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);//el metodo some nos permite testear si al menos un elemento en el arreglo pasa el test osea retorna un booleano, en este caso estamos mirando si alguna parte del tetromino esta tocando el borde derecho
      if(!isAtRightEdge) currentPosition +=1;
      if(current.some(index => squares[currentPosition + index].classList.contains('block2'))){
           currentPosition -=1;
      }
      draw();
  }

  function moveLeft(){
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);//el metodo some nos permite testear si al menos un elemento en el arreglo pasa el test osea retorna un booleano, en este caso estamos mirando si alguna parte del tetromino esta tocando el borde derecho
    if(!isAtLeftEdge) currentPosition -=1;
    if(current.some(index => squares[currentPosition + index].classList.contains('block2'))){
         currentPosition +=1;
    }
    draw();
  }

  //rotate Tetromino
  function rotate(){
      undraw();
      currentRotation ++;
      if(currentRotation === current.length){
          currentRotation = 0;
      }
      current = theTetrominoes[random][currentRotation];
      draw();
  }

  //show previous tetromino is displaySquares
  const displayWidth = 4;
  const displayIndex = 0;
  let nextRandom = 0;

  //the Tetrominos without rotations
  const smallTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  function displayShape(){
      displaySquares.forEach(square => {
          square.classList.remove('block')
      })
      smallTetrominoes[nextRandom].forEach(index => {
          displaySquares[displayIndex + index].classList.add('block');
      })
  }

  //frezze the shape
  function freeze(){
      if(current.some(index => squares[currentPosition + index + width].classList.contains('block3'))
      || current.some(index => squares[currentPosition + index + width].classList.contains('block2'))){
          current.forEach(index => squares[index + currentPosition].classList.add('block2'))
          //start a new tetromino falling
          random = nextRandom;
          nextRandom = Math.floor(Math.random() * theTetrominoes.length);
          current = theTetrominoes[random][currentRotation];
          currentPosition = 3;
          draw();
          displayShape(); 
          gameOver();
          addScore();
      }
  }

  startBtn.addEventListener('click', () => {
      if(timerId){
        clearInterval(timerId);
        timerId = null;
      }else{
          draw();
          timerId = setInterval(moveDown, 1000);
          nextRandom = Math.floor(Math.random() * theTetrominoes.length);
          displayShape();
      }
  })

  //game over 
  function gameOver(){
      if(current.some
        (index => squares[currentPosition + index].classList.contains('block2'))){
            scoreDisplay.innerHTML = 'END';
            clearInterval(timerId);
        }
  }

  //add score
  function addScore(){
      for(currentIndex = 0; currentIndex < 199; currentIndex += width){
          const row = [currentIndex, currentIndex+1, currentIndex+2, currentIndex+3, currentIndex+4, currentIndex+5, currentIndex+6, currentIndex+7,
          currentIndex+8, currentIndex+9];

          if(row.every(index => squares[index].classList.contains('block2'))){
            score +=10;
            lines +=1;
            scoreDisplay.innerHTML = score;
            linesDisplay.innerHTML = lines;
            row.forEach(index => {
                squares[index].classList.remove('block2') || squares[index].classList.remove('block')
            })
            //splice Array
            const squaresRemoved = squares.splice(currentIndex, width);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => grid.appendChild(cell));
          }
      }
  }