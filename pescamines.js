function inicialitzaJoc(){
    // En caso de que haya 1 tabla, eliminamelo y creame la siguiente para no duplicarse
    if(document.getElementsByTagName("table").length != 0){
        document.getElementsByTagName("table")[0].remove();
    }
    // Definir estructura table y tbody y empezar tabla desde el body
    const contenedor = document.getElementsByTagName("body")[0];
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
            // Asignamos un id al td y le damos como valor las coordenada x e y de la posición 
            // donde este la celda 
            td.id = x + "," + y;
            // Unir el elemento td dentro de los elementos tr que se creen
            tr.appendChild(td);

        }
        // Unir el elemento tr dentro del tbody 
        tbody.appendChild(tr);
    }
    // Y unir todo el elemento tbody con sus hijos dentro del elemento tabla para crear la tabla
    tabla.appendChild(tbody);
    //Unir toda la tabla dentro del contenedor que seria el body
    contenedor.appendChild(tabla);
    // Definir estilos a la tabla
    tabla.setAttribute("width", "30%");
    tabla.setAttribute("height", "30%");
    tabla.setAttribute("border", 1);
    tabla.setAttribute("id", "taula");

};

// Funcion Pintar las minas en el tablero
function pintarTablero(mines){
    let rows = document.getElementsByTagName("tbody")[0].children;
    let matrix = [];

    // Recorrer toda la tabla para pintarla
    for(var i = 0; i < rows.length; i++){
        matrix.push(rows[i].children);
        for(var j = 0; j < matrix[i].length; j++){ 
            // Si en minas hay 1        
            if(mines[i][j] == 1){
                // pintame la matriz de rojo
                matrix[i][j].style.backgroundColor = "red";
            }
        }
    }
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
// Iniciar programa Pescamines
function inicialitza(){

    inicialitzaJoc();
    let x = document.getElementById("inputX").valueAsNumber;
    let y = document.getElementById("inputY").valueAsNumber; 
    let rellenarMinas = document.getElementById("minasC").valueAsNumber;
    mines = inicialitzaMines(rellenarMinas, x,y);
    pintarTablero(mines);
    coordCelda();
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
            console.log("- La celda tiene como posicion: " + event.target.id 
            + "\nes una mina");
        // En caso de que no sea roja
        }else{
            console.log("La celda tiene como posicion: " + event.target.id 
            + "\nno es mina");
        }
    });
}