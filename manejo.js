const loginBoxFade  = document.querySelector(".login-box");

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

let datoIngresado = ["", ""];
document.getElementById("leeDatos").addEventListener("click", function() {
    datoIngresado[0] = document.getElementById("nombre").value;
    datoIngresado[1] = document.getElementById("contrasenia").value;
    // Guardo los valores en el localStorage
    localStorage.setItem('datoIngresado', JSON.stringify(datoIngresado));
    // Redirigir a Ingresar
    window.location.href = "ingresar.html";
});


const MAX_FADE_TIC  = 100;
let counter     = 0;


function fadeInImage (opacidad ){
    loginBoxFade.style.opacity = opacidad;
}

function stopFade() {
    if (counter++ > MAX_FADE_TIC ){
        fadeInImage(1);
        usuario = ["inicio", "", "", ""];
        listaUsuarios[0]= usuario;
        localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    }
    else {
        fadeInImage(counter/MAX_FADE_TIC);  
        setTimeout(stopFade, 30);
    }       
}

function startFadeIn() {
    counter = 1;
    fadeInImage(counter/MAX_FADE_TIC);
    setTimeout(stopFade, 30);
}
for(let i=0; i<listaUsuarios.length; i++){ /// ELIMINAR
console.log(listaUsuarios[i]); /// ELIMINAR
} /// ELIMINAR
usuario = listaUsuarios[0];
if(usuario[0] != "inicio"){startFadeIn();} // chequeo si entra por llamado o retorna d eotra página
