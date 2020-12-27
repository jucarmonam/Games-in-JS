const squares = document.querySelectorAll('.grid div');
const scoreDisplay = document.querySelector('span');
const startBtn = document.querySelector('.start');

const width = 10; // ancho de la cudricula 
let currentIndex = 0; //so first div in our grid o posicion inicial de snake
let appleIndex = 0; //so first div in our grid
let currentSnake = [2,1,0]; //so the div in our grid being 2 (or the HEAD), and 0 being the end (TAIL, with all 1'sbeing the body from now on)
let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

//to start, and restart the game 
function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'));  //forEach ejecuta la funcion indicada una vez por cada elemento del arreglo y el index es el valor actual del arreglo
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval); //reiniciamos el intervalo
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 200;
    currentSnake = [2,1,0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutComes, intervalTime);
}


//function that deals with ALL the move outcomes of the snake
function moveOutComes(){

    //deals with snake hitting border and snake hitting self : funcion que se ocupa de todos los movimientos de la serpiente
    if(
        (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall 
        (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ){
        return clearInterval(interval);   //reiniciamos el intervalo
    }

    const tail = currentSnake.pop(); //removes last item of the array and shows it 
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction); //unshift method puede añadir uno o mas elementos al inicio de un arreglo en este caso agrega la cabeza + lo que se movio

    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        randomApple()
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutComes, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');
}

//generate new apple once apple is eaten
function randomApple(){
    do{
        appleIndex = Math.floor(Math.random() * squares.length);   //generamos una posicion de la manzana aleatoria hasta que consigamos una posicion del tablero donde no este snake
    }while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
}


//assign functions to keycodes
function control(e){
    //squares[currentIndex].classList.remove('snake') //we are removing the class of the snake

    if(e.keyCode === 39){   //keycode representa la tecla que estamos oprimiendo no es ascii si no un numero que representa una tecla en el teclado 
        direction = 1;
    }else if (e.keyCode === 38){
        direction = -width;
    }else if(e.keyCode === 37){
        direction = -1;
    }else if(e.keyCode === 40){
        direction = +width;
    }
}

document.addEventListener('keydown', control);
startBtn.addEventListener('click',startGame);   //referencia de la funcion por lo cual no se pone () ya que no la estamos llamando como tal estamos diciendo que el listener sea el que la llame 