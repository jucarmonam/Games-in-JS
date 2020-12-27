
   //card options
    const cardArray = [
        {
            name: 'bear',
            img: 'images/bear.jpg'
        },
        {
            name: 'bear',
            img: 'images/bear.jpg'
        },
        {
            name: 'camel',
            img: 'images/camel.jpg'
        },
        {
            name: 'camel',
            img: 'images/camel.jpg'
        },
        {
            name: 'eagle',
            img: 'images/eagle.jpg'
        },
        {
            name: 'eagle',
            img: 'images/eagle.jpg'
        },
        {
            name: 'koala',
            img: 'images/koala.jpg'
        },
        {
            name: 'koala',
            img: 'images/koala.jpg'
        },
        {
            name: 'sheep',
            img: 'images/sheep.jpg'
        },
        {
            name: 'sheep',
            img: 'images/sheep.jpg'
        },
        {
            name: 'snake',
            img: 'images/snake.jpg'
        },
        {
            name: 'snake',
            img: 'images/snake.jpg'
        }
    ]

    cardArray.sort(() => {return 0.5 - Math.random()});    //la flecha retorna esto es sitnaxis de (ES6) se basa en restar el valor que tenemos en la posicion del arreglo con los que nos devuelve 0.5-.. y si da negativo deja el elemento igual y si da postivo lo intercambia con el que sigue en el arreglo

    const grid = document.querySelector('.grid');   //sirve igual que el get element by class o byId pero se le especifica en el parentesis con '.' una clase o '*' un id
    const resultDisplay = document.querySelector('#result'); //cogemos el id result del h3
    var cardsChosen = [];                          //hacemos un arreglo de cartas que han sido seleccionadas exactamente guardamos es su nombre
    var cardsChosenId = [];                       //creamos un arreglo de cartas seleccioanadas pero por ID
    var cardsWon = [];                            //creamos otro arreglo donde ponemos las cartas que ya fueron encontradas

    //crate your board
    function createBoard() {
        for(let i = 0; i < cardArray.length; i++){
            var card = document.createElement('img');  //podemos crear una varible que sea un elemento de cualquier tipo por ejemplo div, img etc.
            card.setAttribute('src','images/prueba2.jpg');      //establecemos el source de card la parte de atras la tarjeta blanca
            card.setAttribute('data-id', i);   //el data-id es muy diferente al id porque es un elemento en el cual podemos guardar cualquier tipo de dato
            card.addEventListener('click', flipCard);   //le ponemos un evento de cuando la carta sea seleccionada llamamos a la funcion voltear carta
            grid.appendChild(card);     //(adjuntar-append) permite agrear el elemento card al grid
        } 
    }

    //flip your card
    function flipCard(){
        var cardId = this.getAttribute('data-id')    //usamos this porque estamos llamando este metodo en la varible card entonces con this nos referimos a esta 
        cardsChosen.push(cardArray[cardId].name)     //el metodo push pérmite agregar una carta del arreglo de cartas a la ultima posicion del arreglo de cartas seleccionadas en este caso solo estamos agregando los nombres al nuevo arreglo
        //console.log("nombre de la carta: ",cardArray[cardId].name);
        cardsChosenId.push(cardId)
        //console.log("numero de la carta: ",cardId);
        this.setAttribute('src', cardArray[cardId].img)   //ponemos la imagen que corresponda al voltear las cartas
        if(cardsChosen.length === 2){
            setTimeout(checkForMatch, 500)          //con esta funcion llamamos a la funcion checkformatch despues de un tiempo especificado, en este caso es despues de 500ms o 1/2 segundo 
        }
    }

    //check for matches
    function checkForMatch(){
        var cards = document.querySelectorAll('img');    //obtenemos todos los elementos de tipo imagen del documento los cuales fueron agregados en la funcion de arriba
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if(cardsChosen[0] === cardsChosen[1]){
            alert('You found a match');
            cards[optionOneId].setAttribute('src', 'images/blank.jpg');
            cards[optionTwoId].setAttribute('src', 'images/blank.jpg');
            cardsWon.push(cardsChosen);
        }else{
            cards[optionOneId].setAttribute('src', 'images/prueba2.jpg');
            cards[optionTwoId].setAttribute('src', 'images/prueba2.jpg');
            alert('Sorry, try again');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if(cardsWon.length === cardArray.length/2){
            resultDisplay.textContent = 'Congratulations! you found them all';
        }
    }


    createBoard();
