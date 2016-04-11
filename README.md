# Practica07
El juego es llamado el caminito, tiene 3 archivos los cuales son:

![Imagen](https://raw.githubusercontent.com/andres7764/Practica07/gh-pages/images/juego.PNG)
index.html    //Donde es visualizado el código en el navegador
script.js    //Donde está la lóogica del juego, más adelante lo veremos en detalle
estilos.css //Encontramos los estilos del juego

*Index.html*

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sigue las pistas</title>
    <link rel = "stylesheet" href = "css/animate.css">
    <link rel = "stylesheet" href = "css/estilos.css">
</head>
<body>
    <center>
        <h1>Caminito</h1>
    </center>
    <br>
    <div><p id="reloj">60</p></div> 
    <div><p id="puntaje">Su puntaje es:</p>	</div>
    <div id="escenario"></div>
    <div id="botones">
    	<button id="iniciar">Iniciar Juego</button>
    	<button id="Pistas">Pistas juego</button>
    	<button id="iniciarNuevo">reiniciar Juego</button>
    </div>
    <script src = "js/script.js"></script>
</body>
</html>
```


*En el archivo javascript mencionaremos las funciones que realizan cada tarea*

```javascript
    /*
    Hacemos la declaracion de botones y les creamos sus listeners, 
    en este juego usamos 3 botones:
    1) Iniciar -> Inicializa el relog y recorre las posiciones aleatorias
    2) Ayuda -> Funciona una vez y recorre vuelve a recorrer las posiciones aleatorias
    3) IniciarJuego -> Reinicia y crea un juego con el tamaño inicial (4)
    */
    btnIniciarJuego = document.getElementById('iniciarNuevo');
    btnMostrarAyuda = document.getElementById('Pistas');
    btnIniciar = document.getElementById('iniciar');
    btnIniciarJuego.addEventListener("click", function(){
        score = 0;
        fil = 4;
        reiniciarJuego("siguiente",fil);
    });
    btnMostrarAyuda.addEventListener("click", function(){
        pintarPosiciones(positions,time);
        btnIniciarJuego.onclick = "";
    });
    btnIniciar.addEventListener("click",function(){
        pintarPosiciones(positions,time);
        relog();
    });
```

```javascript
/* Recorrer el array para crearlo en el escenario con base en el tamaño que se le pasó */
crearMapa = function(fil){
    var positions = [];
    nom_div("escenario").innerHTML = "";
    var tabla = "<table border = '1' align = 'center' cellpadding = '0' cellspacing = '0'>";
    for(i = 0; i < fil; i++)
    {
        value = Math.abs(Math.floor(Math.random() * (0 - fil))+1);
        value = value+"_"+i; //Aqui realizamos las posiciones aleatorias
        positions.push(value);
        //Crear las filas...
        tabla += "<tr>";
        for(c = 0; c < fil; c++)
        {
            tabla += "<td class='animated' onclick='checkClick(this)' id='"+i+"_"+c+"'></td>";
        }
        tabla += "</tr>";
    }
    tabla += "</tabla>";
    
    nom_div("escenario").innerHTML = tabla;
    return positions;
} */
```

```javascript
/* Funcion para crear mostrar las pocisiones del caminito con estilos de animate */
pintarPosiciones = function(positions,time) {
    var contadorUnico = 0;
    var animate = ['tada','bounceInDown','bounceInRight','bounceIn','swing','rotateInDownLeft','lightSpeedIn'];
    setInterval(function(){
        if(contadorUnico < positions.length)
        {
            var rand = Math.abs( Math.floor(Math.random() * animate.length));
            var temporal = ".temporal { background-color: "+ get_random_color()+"}";
                nom_div(positions[contadorUnico]).style.backgroundColor = temporal;
                nom_div(positions[contadorUnico]).classList.add(animate[rand]);    
                contadorUnico++;
        } else {
           // endInterval();
        }
   },time);  
}
```
*Nota: El setInterval siempre esta en ejecución, en este caso lo estoy deteniendo por fuerza bruta 
```javascript
//Fuerza bruta, finalizar intervalos
endInterval = function(){
    for (var i = 1; i < 99999; i++)
    window.clearInterval(i);
}
```

### Función para hacer el juego dinámico 
```javascript
    reiniciarJuego = function(op,filA){
        endInterval();
        veces = 0;
        var confir;
        fil = 4;
        time = 1800;
        nom_div("puntaje").innerHTML = "Su puntaje es: "+score;
        nom_div('reloj').innerHTML = "60";
         if(op == "errores") { //Si el usuario falla 3 veces en el juego
            confir = confirm("ElJuego terminado, ha excedido el maximo de " + error + " errores, ¿Desea volver a jugar?");
            score = error = 0;
         } else if(op == "siguiente") { //Si el usuario acertó un camino completo
            positions = crearMapa(filA);
            relog();
            pintarPosiciones(positions,time);
         } else { //No hizo nada durante 1 minuto
          confir = confirm("El Juego terminado, ha excedido limite de tiempo");
          score = 0;
        }
        if(confir){
            positions = crearMapa(fil);
            relog();
            pintarPosiciones(positions,time);
        }
    }
```
*Valida si la posición que ha sido seleccionada por el usuario es correcta o no
```javascript
      checkClick = function(event) {
        for(var e = 0; e < positions.length; e++) {
            if(positions[e] === event.id){
             nom_div(positions[e]).onclick = "";
             score += 10;
             error1 = true;
             veces += 1;
             nom_div("puntaje").innerHTML = "Su puntaje es: "+score;
             break;
            } else {
                error1 = false;
            }
        }
            if(error1 === false) {
                error++;
                if(error === 3) {
                    reiniciarJuego("errores");
                }
            } else if(veces === positions.length) { //recorre las 4 iteraciones de cada nivel  
                veces = 0;
                generalCont++;
                console.log("vamos "+ generalCont);
                if(generalCont === 3){
                    generalCont = 0; 
                    aument = aument + 2;
                    time -= score*3;
                    console.log(aument);
                    positions = crearMapa(aument);
                    pintarPosiciones(positions,time);
                } else {
                    reiniciarJuego("siguiente",aument);
                }
            }
    }
```


Licencia

MIT
