const loginBoxFade      = document.querySelector(".login-box");
const botonRecupero     = document.querySelector("#boton-recupero");
const botonRegistrar    = document.querySelector("#bot-registrar");

let usuario = ["", "", "", ""]; 
// Define e Inicializa la Lista de Tareas
let   listaUsuarios = [usuario];
// Verificar si ya existe en localStorage
if (localStorage.getItem("listaUsuarios")) {
  // Recupero el valor de la variable desde localStorage
  listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
} else {
  // Si la variable no existe en localStorage, la guardo
  // Reservo la primera posición [0] para indicar que es la página de inicio
  usuario = ["inicio", "", "", ""];
  listaUsuarios[0]= [usuario];
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}

const MAX_FADE_TIC  = 20;
let counter         = 0;
let estiraTexto     = false;
botonRecupero.style.display = "none";


// MUESTRA EN CONSOLE LOS USUARIOS DEFINIDOS
for(let i=0; i<listaUsuarios.length; i++){ /// ELIMINAR
    console.log(listaUsuarios[i]); /// ELIMINAR
    } /// ELIMINAR
    
usuario = listaUsuarios[0];
console.log("Usr: "+usuario);
switch (usuario[0]) {
    case "inicio"   :
        break;
    case "ingreso"  :
        if (usuario[1]== "nombre-ok") {
            botonRecupero.style.display = "block";
        }
        else{ 
            estiraTexto = true;
            botonRegistrar.style.textAlign = "center";
            botonRegistrar.style.fontSize = "16px";
        }
    case "registro" :
        startFadeIn();  
}

// espera por click en Ingresar...

let datoIngresado = ["", ""];
document.getElementById("bot-ingresar").addEventListener("click", function() {
    datoIngresado[0] = document.getElementById("nombre").value;
    datoIngresado[1] = document.getElementById("contrasenia").value;
    // Guardo los valores en el localStorage
    localStorage.setItem('datoIngresado', JSON.stringify(datoIngresado));
    // Redirigir a Ingresar
    window.location.href = "ingresar.html";
});



// FUNCIONES 

function fadeInImage (opacidad ){
    loginBoxFade.style.opacity = opacidad;
}

function stopFade() {
    if (counter++ > MAX_FADE_TIC ){
        estiraTexto = false;
        botonRegistrar.style.textAlign = "left";
        botonRegistrar.style.fontSize = "14px";
        fadeInImage(1);
        usuario[0] = "inicio";
        listaUsuarios[0]= usuario;
        localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    }
    else {
        fadeInImage(counter/MAX_FADE_TIC); 
        if (estiraTexto) {
            if(counter % 2) {botonRegistrar.style.letterSpacing= "3px";}
            else {botonRegistrar.style.letterSpacing= "7px";}
        }
        setTimeout(stopFade, 250);
    }       
}

function startFadeIn() {
    counter = 1;
    fadeInImage(counter/MAX_FADE_TIC);
    setTimeout(stopFade, 30);
}
