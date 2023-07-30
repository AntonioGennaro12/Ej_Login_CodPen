const loginBoxFade      = document.querySelector(".login-box");
const botonRecupero     = document.querySelector("#boton-recupero");
const botonRegistrar    = document.querySelector("#bot-registrar");
// ListaUsuarios [0] usado como estado y retorno de resultados
const   RUTINA      = 0;
const   RESULTADO   = 1;
const   USER_OK     = 2;  
const   INDICE      = 3;
const   vacante     = 4;
// listaUsuarios = ["nombreDeUsuario", "nombre", "apellido", "email@dom.com", "cantrasenia"]// Recupero el valor de la variable desde localStorage
const   USRNAME     = 0;
const   NOMBRE      = 1;
const   APELLIDO    = 2;
const   EMAIL       = 3;  
const   CLAVE       = 4; 
// OJO ESTO BORRA EL LOCAL STORAGE PARA SEAT APLICACIIÓN
//localStorage.clear();
let usuario = ["", "", "", "", ""]; 
// Define e Inicializa la Lista de Tareas
let   listaUsuarios = [usuario];
// Verificar si ya existe en localStorage
if (localStorage.getItem("listaUsuarios")) {
  // Recupero el valor de la variable desde localStorage
  listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
} else {
  // Si la variable no existe en localStorage, la guardo
  // Reservo la primera posición [0] para indicar que es la página de inicio
  usuario = ["inicio", "", "", "", ""];
  guardaUsrLocalStorage (usuario);
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}

const MAX_FADE_TIC  = 20;
let counter         = 0;
let estiraTexto     = false;
botonRecupero.style.display = "none";

// MUESTRA EN CONSOLA LOS USUARIOS DEFINIDOS
for(let i=0; i<listaUsuarios.length; i++){ /// ELIMINAR
    console.log(listaUsuarios[i]); /// ELIMINAR
    } /// ELIMINAR
 
// VERIFICA SI VIENE DE INICIO o DE OTRA PAGINA DEL SITIO
usuario = listaUsuarios[0];
console.log("UsrR: "+usuario);
switch (usuario[RUTINA]) {
    case "inicio"   :
        break;
    case "ingreso"  :
        if (usuario[RESULTADO] == false) {
            if (usuario[USER_OK] == "nombre-ok") {
            botonRecupero.style.display = "block";
            }
        else {
            estiraTexto = true;
            botonRegistrar.style.textAlign = "center";
            botonRegistrar.style.fontSize = "16px";
            }
        }
    case "registro" :
        startFadeIn();  
}

// espera por click en Ingresar...
let datoIngresado = ["", ""];
document.getElementById("bot-ingresar").addEventListener("click", function() {
    datoIngresado[0] = document.getElementById("nombre-usuario").value;
    datoIngresado[1] = document.getElementById("contrasenia").value;
    // Guardo los valores en el localStorage
    localStorage.setItem('datoIngresado', JSON.stringify(datoIngresado));
    // Redirigir a Ingresar
    window.location.href = "ingresar.html";
});


// FUNCIONES 
/**
 * Guarda la Lista de Usuarios en Local Storage 
 * @param {Array*} user 
 */
function guardaUsrLocalStorage (user){
    listaUsuarios[0]= user;
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}
    
/**
 * Carga valor de Opacidad en contenedor
 * @param {number} opacidad 
 */
function fadeInImage (opacidad ){
    loginBoxFade.style.opacity = opacidad;
}

/**
 * Restablece el texto estirado
 */
function cierraEstiraTexto () {
    estiraTexto = false;
    botonRegistrar.style.textAlign = "left";
    botonRegistrar.style.fontSize = "14px";
}

/**
 * Estiarar texto???
 */
function estirarTexto() {
    if (estiraTexto) {
        if(counter % 2) {botonRegistrar.style.letterSpacing= "3px";}
        else {botonRegistrar.style.letterSpacing= "7px";}
    }
}       

/**
 * Detiene el Fade de pantalla
 */
function stopFade() {
    if (counter++ > MAX_FADE_TIC ){
        cierraEstiraTexto ();
        fadeInImage(1);
        usuario[0] = "inicio";
        guardaUsrLocalStorage (usuario);
    }
    else {
        fadeInImage(counter/MAX_FADE_TIC); 
        estirarTexto()
        setTimeout(stopFade, 250);
    }       
}

/**
 * Inicia el fade de pantalla
 */
function startFadeIn() {
    counter = 1;
    fadeInImage(counter/MAX_FADE_TIC);
    setTimeout(stopFade, 30);
}
