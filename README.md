Els propers exercicis tenen la finalitat de guiar-vos per acabar creant el joc del pescamines.

Començarem creant **l'àrea de joc** de manera dinàmica.

Necessitem:

-  un **botó** que creï el "taulell" 
- 2 **inputs** que indiquin les dimensions de l'àrea de joc.
- 1 **div** que contingui el taulell.

Fins ara hem estat fent servir funcions que accedien i modificaven elements. Ara necessitarem funcions per afegir nous elements al **DOM**.

Consulteu les funcions [createElement](https://www.w3schools.com/jsref/met_document_createelement.asp) i [appendChild](https://www.w3schools.com/jsref/met_node_appendchild.asp)


# Exercici 1
Crea una funció anomenada `inicialitzaJoc` associada amb un botó; de tal manera que quan premis el botó es creï una taula amb les dimensions especificades en els inputs.

# Exercici 2
~~~
function matriuBinaria(matrix) {
    var matrix2 =[];
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
        }
    }
    return matrix2;
}
~~~

Completeu la següent funció de manera que creï una matriu binària (amb 1's i 0's) a partir de la matriu de la taula html.

És a dir hem de passar de tenir una matriu d'elements html a una matriu de números on els 1 són les posicions que tenien el color "red" i 0 la resta.

Experimenteu amb el mètode push dels arrays:
~~~
var a = [];
a.push(3);
// a
// [3]
~~~
