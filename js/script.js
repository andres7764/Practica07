window.onload = function()
{
    var fil = aument = 4;
    var time = 1800;
    var score = counter = error = veces = generalCont = 0; //Variables a usar
    positions = crearMapa(fil);
    
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

    reiniciarJuego = function(op,filA){
        endInterval();
        veces = 0;
        var confir;
        fil = 4;
        time = 1800;
        nom_div("puntaje").innerHTML = "Su puntaje es: "+score;
        nom_div('reloj').innerHTML = "60";
         if(op == "errores") {
            confir = confirm("ElJuego terminado, ha excedido el maximo de " + error + " errores, ¿Desea volver a jugar?");
            score = error = 0;
         } else if(op == "siguiente") { 
            positions = crearMapa(filA);
            relog();
            pintarPosiciones(positions,time);
         } else {
          confir = confirm("El Juego terminado, ha excedido limite de tiempo sin movimiento");
          score = 0;
        }
        if(confir){
            positions = crearMapa(fil);
            relog();
            pintarPosiciones(positions,time);
        }
    }

    //Para cargar listeners de botones 
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

    //Relog de juego
    relog = function(){
        counter = 60;
        setInterval(function(){
            if(counter > 0){
                    if(counter > 15 && counter < 30 ){
                        nom_div('reloj').innerHTML = "<font color='yellow'>"+counter+"</font>";
                    } else if(counter > 1 && counter <= 14 ){
                        nom_div('reloj').innerHTML = "<font color='red'>"+counter+"</font>";
                    }
                    nom_div('reloj').innerHTML = counter;
                    counter--;
            } else {
                reiniciarJuego("tiempo");
            }
            },1000)  
    };

}

//Recorrer el array para crearlo en el escenario...
crearMapa = function(fil){
    var positions = [];
    nom_div("escenario").innerHTML = "";
    var tabla = "<table border = '1' align = 'center' cellpadding = '0' cellspacing = '0'>";
    for(i = 0; i < fil; i++)
    {
        value = Math.abs(Math.floor(Math.random() * (0 - fil))+1);
        value = value+"_"+i;
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
}

//Acceso al dom de manera rápida
nom_div = function(element){
    return document.getElementById(element);
}

//Pintar posiciones aleatorias
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

//Fuerza bruta, finalizar intervalos
endInterval = function(){
    for (var i = 1; i < 99999; i++)
    window.clearInterval(i);
}

//Creditos de http://toniweb.us/codigo/2011/10/obtener-un-color-aleatorio-random-color-con-javascript/
function get_random_color() {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.round(Math.random() * 15)];
                }
                return color;
}

