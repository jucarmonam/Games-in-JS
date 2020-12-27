const square = document.querySelectorAll('.square');   //obtenemos todos los elementos con la clase square del html
const mole = document.querySelectorAll('.mole');       //obtenemos todos los elementos con lac clase mole del html
const timeLeft = document.querySelector('#time-left'); //obtenemos los elementos con id time-left que es donde guardaremos el tiempo actual
let score = document.querySelector('#score');  //obtenemos los elementos con id score del html


let result = 0;
let timerId1 = null;
let timerId2 = null;

function moveMole(){
    timerId1 = setInterval(countDown, 1000);
    timerId2 = setInterval(randomSquare, 1000);
}

document.getElementById("boton").onclick = function(){
    result=0;
    score.textContent = result;
    timeLeft.textContent = 60;
    clearInterval(timerId1);
    clearInterval(timerId2);
    moveMole();
}

function randomSquare(){
    square.forEach(className => {
        className.classList.remove('mole')
    })
    let randomPosition = square[Math.floor(Math.random() * 9)];   //nos da un numero entre 0 y 1 y al multiplicarlo por 9 obtenemos numeros entre 0 y 9
    randomPosition.classList.add('mole');

    //asing the id of the randomPosition to hitPosition for us to use later
    hitPosition = randomPosition.id;
}

square.forEach(id => {    //para cada id del cuadro miramos si el mouse bajo y comparamos si el id que tiene es igual al que se encuentra el topo y esot siempre se esta ejecutando porque no esta dentro de una funcion ni nada es como si todo ese codigo estuviera dentro de un main
    id.addEventListener('mousedown', () => {
        if(id.id === hitPosition){
            result++;
            score.textContent = result;
            hitPosition=null;      //ponemos la hitposition en null para que no se pueda obtener mas de un punto por cuadro
        }
    });
});

function countDown(){
    timeLeft.textContent--;

    if(timeLeft.textContent == 0){
        clearInterval(timerId1);
        clearInterval(timerId2);
        alert('GAME OVER! Your final score is ' + result);
    }
}


