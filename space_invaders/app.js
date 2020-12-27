const squares = document.querySelectorAll('.grid div');
const scoreDisplay = document.querySelector('span');
const startBtn = document.querySelector('.start');

const width = 20;
let currentRocketIndex = 370;
let currentInvaderIndex = 0;
let alienInvadersTakenDown = []
let direction = 1;
let score = 0;
let invaderId;

//definimos la posicion de los aliens
let Invaders = [
    0,1,2,3,4,5,6,7,8,9,
    20,21,22,23,24,25,26,27,28,29,
    40,41,42,43,44,45,46,47,48,49,
];

function startGame(){
    Invaders.forEach(index => squares[index].classList.remove('invader'));
    squares[currentRocketIndex].classList.remove('rocket');
    clearInterval(invaderId);
    score = 0;
    direction = 1;
    scoreDisplay.innerText = score;
    currentInvaderIndex = 0;
    alienInvadersTakenDown = [];
    Invaders = [
        0,1,2,3,4,5,6,7,8,9,
        20,21,22,23,24,25,26,27,28,29,
        40,41,42,43,44,45,46,47,48,49,
    ];
    currentRocketIndex = 370;
    Invaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));
    squares[currentRocketIndex].classList.add('rocket');
    invaderId = setInterval(moveInvaders, 500)
}

//movimiento del rocket
function moveRocket(e){
    squares[currentRocketIndex].classList.remove('rocket');
    switch(e.keyCode){
        case 37:
            if(currentRocketIndex % width !==0) currentRocketIndex -=1
            break;
        case 39:
            if(currentRocketIndex % width < width-1) currentRocketIndex +=1
            break;
    }
    squares[currentRocketIndex].classList.add('rocket');
}

function moveInvaders(){
    const leftEdge = Invaders[0] % width === 0;   //booleanos  aqui miramos si estamos pegados a la pared izquierda
    const rightEdge = Invaders[Invaders.length - 1] % width === width -1; //aqui miramos si estamos pegados a la pared derecha

    if((leftEdge && direction === -1) || (rightEdge && direction === 1)){ //miramos si acabamos de llegar a una pared y ponemos la direccion hacia abajo
        direction =  width;
    }else if(direction === width){  //si lo que acabmos de hacer fue bajar moramos por que razon fue y mandamos todo a la derecha o izquierda
        if(leftEdge) direction = 1
        else direction = -1
    }

    for(let i =0; i<= Invaders.length -1; i++){
        squares[Invaders[i]].classList.remove('invader');    //removemos todos las clases invader del arreglo
    }
    for(let i=0; i<= Invaders.length -1; i++){
        Invaders[i] += direction;         //movemos todo en la direccion deseada
    }
    for (let i = 0; i <= Invaders.length - 1; i++) {
        //ADD IF LATER
        if (!alienInvadersTakenDown.includes(i)){
            squares[Invaders[i]].classList.add('invader');  //volvemos a agregar si esque el index no esta en los derribados
        }
    }
    //decide game over si un invader golpea a la nave
    if(squares[currentRocketIndex].classList.contains('invader', 'shooter')){
        scoreDisplay.textContent = 'Game Over';
        squares[currentRocketIndex].classList.add('shot');
        clearInterval(invaderId);
    }

    for(let i=0; i <= Invaders.length - 1; i++){
        if(Invaders[i] > (squares.length - (width-1))){
            scoreDisplay.textContent = 'Game Over';
            clearInterval(invaderId);
        }
    }

    //decide win 
    if(Invaders.length === alienInvadersTakenDown.length){
        scoreDisplay.textContent = 'You Win';
        clearInterval(invaderId);
    }
}

//shoot at aliens
function shoot(e){
    let laserId;
    let currentLaserIndex = currentRocketIndex;
    //move the laser from the shooter to the alien Invader
    function moveLaser(){
        //console.log(laserId);
        squares[currentLaserIndex].classList.remove('shot');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('shot');
        if(squares[currentLaserIndex].classList.contains('invader')){
            squares[currentLaserIndex].classList.remove('shot');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('kill');

            setTimeout(() => squares[currentLaserIndex].classList.remove('kill'),250); //borra kill despues de 1/4 de segundo
            clearInterval(laserId);

            const alienTakeDown = Invaders.indexOf(currentLaserIndex);
            alienInvadersTakenDown.push(alienTakeDown);
            score++;
            scoreDisplay.textContent = score;
        }

        if(currentLaserIndex < width){
            clearInterval(laserId);
            setTimeout(() => squares[currentLaserIndex].classList.remove('shot'),100);
        }
    }
    /*
    document.addEventListener('keydown', e =>{
        if(e.keyCode === 32){
            laserId = setInterval(moveLaser, 100);
        }
    })
    */
    switch(e.keyCode) {
        case 38:
        laserId = setInterval(moveLaser, 100);  //cada 1/10 de segundo llama a movelaser
        break;
    }
}

document.addEventListener('keydown', moveRocket);
document.addEventListener('keydown',shoot);
startBtn.addEventListener('click',startGame);
