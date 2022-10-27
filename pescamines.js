//Definir Boton para hacer un evento
let enviar = document.getElementById("inicialitzaJoc");
// Hacer un evento de tipo click y ejecutar codigo despues (callback)
enviar.addEventListener("click", function(){
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
});
// Matriz Binaria
let matrix = [];
function matriuBinaria(matrix) {
    var matrix2 =[];
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if(matrix2[0].style.backgroundColor == "white"){
                matrix2[i].push(0);
            }else{
                matrix2[i].push(1);
            }
        }
    }
    return matrix2;
}