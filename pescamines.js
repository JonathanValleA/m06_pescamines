// Variables GLOBALES
let width = 10;  
let numBanderas = 0;        // => Número de banderas marcadas
let casillas = [];          // => Array con las casillas
let finPartida = false;     // => Marca de si se ha picado en una bomba
const resultado = document.querySelector('.resultado-juego');

const contadorBanderas = document.getElementById('num-banderas');
const contadorBanderasRestantes = document.getElementById('banderas-restantes');
let rellenarMinas = document.getElementById("minasC").valueAsNumber;

// Contador de Tiempo del Buscaminas
let h2 = document.getElementsByTagName("h2")[0];
let sec = 0;
let min = 0;
let hrs = 0;
let t;

// Funcion para incrementar el tiempo y resetarlo
function tick(){
    sec++;
    if(sec >= 60){
        sec = 0;
        min++;
        if(min >= 60){
            min = 0;
            hrs++;
        }
    }
}
// Agregar el contador
function add(){
    tick();
    h2.textContent = (hrs > 9 ? hrs : "0" + hrs)
            + ":" + (min > 9 ? min : "0" + min)
            + ":" + (sec > 9 ? sec : "0" + sec)
}

function inicialitzaJoc(){
    const contenedorJuego = document.querySelector('.contenedor-juego');

    if (contenedorJuego.classList.contains('hidden')) {
        // Si tiene la clase 'hidden' es porque no hay ningún juego
        contenedorJuego.classList.remove('hidden');
    }
    // En caso de que haya 1 tabla, eliminamelo y creame la siguiente para no duplicarse
    if(document.getElementsByTagName("table").length != 0){
        document.getElementsByTagName("table")[0].remove();
        finPartida = false;
        resultado.innerHTML = '';
        resultado.classList.remove("back-red");
    }
    // Definir estructura table y tbody y empezar tabla desde el body
    let div = document.getElementById("taulaP");
    const tabla = document.createElement("table");
    let tbody = document.createElement("tbody");
    // Llamar a los 2 inputs de tipo numero
    let inputX = document.getElementById("inputX").valueAsNumber;
    let inputY = document.getElementById("inputY").valueAsNumber;


    // Empezar a crear la tabla con las dimensiones que pasare
    for(var x = 0; x < inputX; x++){
        // Crear el elemento tr 
        let tr = document.createElement("tr");
        for(var y = 0; y < inputY; y++){
            // Crear el elemento td
            let td = document.createElement("td");
            td.width = 50;
            td.height = 50;
            td.innerHTML = "&nbsp";
            // Asignamos un id al td y le damos como valor las coordenada x e y de la posición 
            // donde este la celda 
            td.id = x + "," + y;
            casillas.push(td);
            // Unir el elemento td dentro de los elementos tr que se creen
            tr.appendChild(td);
            // Añadimos función al hacer click
            td.addEventListener('click', (event) => {
                
                click(event.target);
                if(event.target.style.backgroundColor == "red"){
                    // Si clicas una mina, se termina la partida
                    finPartida = true;
                    // Se escribe por pantalla un mensaje de que has perdido
                    resultado.textContent = 'Lo siento, PERDISTE!!!';
                    resultado.classList.add('back-red');
                }
            });

            // Añadimos función al hacer click derecho
            td.oncontextmenu = function(event) {
                event.preventDefault();
                anadirBandera(td);
                actualizaNumBanderas();
            }
            
            // Añadimos función al hacer doble-click
            td.addEventListener('dblclick', () => {
                dobleClick(event.target);
            });

        }
        // Unir el elemento tr dentro del tbody 
        tbody.appendChild(tr);
    }
    // Y unir todo el elemento tbody con sus hijos dentro del elemento tabla para crear la tabla
    tabla.appendChild(tbody);
    //Unir toda la tabla dentro del contenedor que seria el body
    div.appendChild(tabla);
    // Definir estilos a la tabla
    tabla.setAttribute("border", 1);
    tabla.setAttribute("id", "taula");

};

function revelarCasillas(td) {
    const idCasilla = parseInt(td.id);
    const estaBordeIzq = (idCasilla % width === 0);             // => Casilla está en el borde izq
    const estaBordeDech = (idCasilla % width === width - 1);    // => Casilla está en el borde dech

    setTimeout(() => {
        // Simulamos clik en la casilla anterior
        if (idCasilla > 0 && !estaBordeIzq) click(casillas[idCasilla-1]);
                    
        // Simulamos clik en la casilla siguiente
        if (idCasilla < (width*width-2) && !estaBordeDech) click(casillas[idCasilla+1]);

        // Simulamos clik en la casilla superior
        if (idCasilla >= width) click(casillas[idCasilla-width]);
        
        // Simulamos clik en la casilla siguiente de la fila anterior
        if (idCasilla > (width-1) && !estaBordeDech) click(casillas[idCasilla+1-width]);
        
        // Simulamos clik en la casilla anterior de la fila anterior
        if (idCasilla > (width+1) && !estaBordeIzq) click(casillas[idCasilla-1-width]);

        // Simulamos clik en la casilla inferior
        if (idCasilla < (width*(width-1))) click(casillas[idCasilla+width]);

        // Simulamos clik en la casilla siguiente de la fila siguiente
        if (idCasilla < (width*width-width-2) && !estaBordeDech) click(casillas[idCasilla+1+width]);
        
        // Simulamos clik en la casilla anterior de la fila siguiente
        if (idCasilla < (width*width-width) && !estaBordeIzq) click(casillas[idCasilla-1+width]);

    }, 10);
}

function click(td) {
    // Comprobamos si la casilla no es clickeable
    if (td.classList.contains('marcada') || td.classList.contains('bandera') || finPartida) return;

    if (td.classList.contains('bomba')) {
        // Casilla bomba
        bomba(casilla);
    } else {
        let total = td.getAttribute('data');
        if (total != 0) {
            // Casilla con bombas cerca
            td.classList.add('marcada');
            td.innerHTML = total;
            return;
        }
        td.classList.add('marcada');
            
        // Casilla sin bombas cerca
        revelarCasillas(td);

    }
}
function dobleClick(td) {
    // Comprobamos si la casilla no es clickeable
    if (!td.classList.contains('marcada') || finPartida) return;

    revelarCasillas(td);
}
// Funcion para borrar el Tablero
function del(){
    const contenedorJuego = document.querySelector('.contenedor-juego');

    if (!(contenedorJuego.classList.contains('hidden'))) {
        // Si tiene la clase 'hidden' es porque no hay ningún juego
        contenedorJuego.classList.add('hidden');
        finPartida = false;
        resultado.innerHTML = '';
        resultado.classList.remove("back-red");
    }
    if(document.getElementsByTagName("table").length != 0){
        document.getElementsByTagName("table")[0].remove();
    }
}
// Funcion Pintar las minas en el tablero
function pintarTablero(mines){
    t = setInterval(add, 1000);

    let rows = document.getElementsByTagName("tbody")[0].children;
    let matrix = [];
    let tabla = document.getElementById("tabla");
    // Recorrer toda la tabla para pintarla
    for(var i = 0; i < rows.length; i++){
        matrix.push(rows[i].children);
        for(var j = 0; j < matrix[i].length; j++){ 
            // Si en minas hay 1        
            if(mines[i][j] == 1){
                // pintame la matriz de rojo
                matrix[i][j].style.backgroundColor = "red";
            }
            let count = countNeighbours(i,j);
            matrix[i][j].innerHTML = count;
        }
    }
}

function anadirBandera(td) {
    if (finPartida) return;

    if (!td.classList.contains('marcada') && numBanderas < rellenarMinas) {
        if (!td.classList.contains('bandera')) {
            td.classList.add('bandera');
            td.innerHTML = '🚩';
            numBanderas++;
            actualizaNumBanderas();

        } else {
            td.classList.remove('bandera');
            td.innerHTML = '';
            numBanderas--;
        }
    }
}
function actualizaNumBanderas() {
    contadorBanderas.textContent = numBanderas;
    contadorBanderasRestantes.textContent = (rellenarMinas - numBanderas);
}

// Funcion Generar una matriz de 0 1 de forma aleatoria
function inicialitzaMines(nMines, midaX, midaY){
    let mines = []; // Matriz mines de 0 y 1
    let mines2 = nMines;
    // Crear Matriz de midaX midaY llenas de 0
    for(var i = 0; i < midaX; i++){
        // Crear matriz nueva
        let nueva = [];
        for (var j = 0; j < midaY; j++){
            // Llenar la matriz nueva de midaX midaY de 0
            nueva.push(0);
        }
        // Llenar toda la matriz nueva de 0 en la matriz mines y tener las dimension
        // de midaX y midaY
        mines.push(nueva);
    }
     // En caso de que haya minas
    while (mines2!=0){
        // Generar numeros aleatorios
        let a = parseInt(Math.random()*midaX);
        let b = parseInt(Math.random()*midaY);
        // En caso de que no haya minas (1)
        if (mines[a][b]!=1){
            // Pon 1 a las minas
            mines[a][b] = 1;}
        mines2--;
    }
    
    return mines;
}
// Funcion Obtener coordenada de una celda
function coordCelda() {
    // Obtenemos el id de mi tabla
    let celda = document.getElementById("taula");
    // Hacemos un evento de tipo click con una funcion callback donde le pasamos un 
    // parametro "event" y ejecutaremos esa funcion una vez que clickemos en una celda
    celda.addEventListener("click", function(event){
        // Obtenemos el id de la celda y en caso de que sea roja se cumplira la condicion
        if(event.target.style.backgroundColor == "red"){
            // Obtenemos el id de la celda
            console.log("La fila y la columna tiene como posición " + event.target.id + "\n\ny es una bomba mortal");
        // En caso de que no sea roja
        }else{
            console.log("La fila y la columna tiene como posición " + event.target.id + "\n\ny no es una bomba mortal");
        }
    });
}

// Iniciar programa Pescamines
function inicialitza(){

    inicialitzaJoc();
    let x = document.getElementById("inputX").valueAsNumber;
    let y = document.getElementById("inputY").valueAsNumber; 
    let rellenarMinas = document.getElementById("minasC").valueAsNumber;
    let mines = inicialitzaMines(rellenarMinas, x,y);

    pintarTablero(mines);
    coordCelda();
    actualizaNumBanderas();
}

// Funcion para contar las Minas (No me los cuenta bien (No va))
function countNeighbours(x,y) {

    let rows = document.getElementsByTagName("tbody")[0].children;
    let matrix = [];
    let count = 0;
    // Recorrer el tablero
    for(let a = 0; a < rows.length; a++){
        matrix.push(rows[a].children);
        for(let b = 0; b < matrix[a].length; b++){
            // Ver las minas que hay al rededor
            for (let i = -1; i<= 1; i++) {
                for (let j = -1; j<= 1; j++) {
                    let suma1 = x+i;
                    let suma2 = y+j;
                    if(suma1<matrix.length && suma1>0 && suma2<matrix[suma1].length && suma2>0){
                        // Cuando encuentre una mina me habra el conteo de las minas al rededor
                        if(matrix[suma1][suma2].style.backgroundColor=="red"){
                            if(suma1!=x || suma2!=y){
                                count++;
                            }
                        }
                    }
                }
            }
        }
    }
    
    return count;
}