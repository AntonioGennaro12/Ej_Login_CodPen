const  miBody       = document.querySelector("body");
const chkIngreso    = document.querySelector("#chk-ingreso");
// Imagen de cierre
const contenedor    = document.querySelector(".cont-imagen");
const imagen        = document.querySelector(".imagen");
//
const ANCHO_IMG     = 360; // pixels
const ALTO_IMG      = ANCHO_IMG;  // pixels
imagen.style.width  = ANCHO_IMG+"px";
imagen.style.height = ALTO_IMG+"px";
//
const IMAGEN_GIRA1  = "https://s3.amazonaws.com/cdn.wp.m4ecmx/wp-content/uploads/2019/04/09194009/Las-redes-sociales-en-M%C3%A9xico-compressor.jpg";
const IMAGEN_GIRA2  = "https://img.20mn.fr/9hraPiugRNWSLRpKFUSb1ik/1200x768_deux-anciens-de-twitter-vont-lancer-un-nouveau-reseau-social-baptise-spill-illustration"
const IMAGEN_GIRA3  = "https://wallpapers.com/images/high/social-media-network-mess-6ygka7tz3ylmsqsa.webp";
let imagenesGira    = [IMAGEN_GIRA1, IMAGEN_GIRA2, IMAGEN_GIRA3];
const randomNum = Math.floor(Math.random() * 3);
imagen.src = imagenesGira[randomNum];
/// 
const tTime         = 50;
const RADIO         = 300;
const STEP          = 0.05;

// img de fondo
const IMG_RED_SOCIAL    = "https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148874050.jpg?size=626&ext=jpg";
const IMG_ACC_DENIED    = "https://static2.bigstockphoto.com/6/0/8/large1500/8065427.jpg";
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
//
let datoUsuario         = ["", "", "", "", ""];
let encontrado          = false;
let encontradoNombre    = false;
let encontradoIndex     = 0;
let puedeSalir          = false;

let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
// Prepara lo que devuelve
let usuario = ["ingreso", "", "", "", ""];
// Lee datos ingresados
let datoIngresado = JSON.parse(localStorage.getItem('datoIngresado'));
// Verifica contra lista de usuarios
console.log(datoIngresado); /// ELIMINAR
console.log(datoUsuario); /// ELIMINAR
encontrado = false;
encontradoNombre = false;

// REMOVER
let anchoVis = document.documentElement.clientWidth;
let altoVis = document.documentElement.clientHeight;
console.log(anchoVis);
console.log(altoVis);

// VERIFICA LA LISTA CONTRA LOS DATOS RECIBIDOS

for (let i=1 ; i < listaUsuarios.length; i++) {
    datoUsuario = listaUsuarios[i];
    console.log(datoUsuario); // ELIMINAR
    if (datoUsuario[USRNAME] == datoIngresado[0]) {
        encontradoNombre = true;
        encontradoIndex = i;
        if(datoUsuario[CLAVE] == datoIngresado[1]){
            encontrado = true;
            i = listaUsuarios.length;
        }
    }     
}

if (encontrado === true) {
    usuario = ["ingreso", true, "", "", ""];
    miBody.classList.remove("error");
    miBody.classList.add("success");
    miBody.style.backgroundImage = `url("${IMG_RED_SOCIAL}")`;
    contenedor.style.display = "inline-block"; // muestra el contenedor
    puedeSalir = false;
    girarImagen(); // Llamamos a la función para iniciar el movimiento
}
else {
    miBody.classList.remove("success");
    miBody.classList.add("error");
    miBody.style.backgroundImage = `url("${IMG_ACC_DENIED}")`;
    if(encontradoNombre === true){ // si nombre estaba bien
        // Modifico y agrego que el nombre está OK y también el índice...
        usuario = ["ingreso", false, "nombre-ok", encontradoIndex, ""];
    }
    puedeSalir = true;
    finError();
}
// Fin cuerpo 

// FUNCIONES
/**
 * Desplaza el contenedor a las coordenadas x e y
 * @param {Number} x 
 * @param {Number} y 
 */
function transform(x, y) {
    contenedor.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
  }

// Función para mover la imagen en un círculo
/**
 * Gira objeto alrededor del centro de la pantalla visible en forma convergente al mismo...
 */
function girarImagen() {
    var centerX, centerY, radius, angle, step, anchoVisible, altoVisible;
    var intervalId;
    radius = RADIO; // Radio del círculo (ajusta el valor según el tamaño deseado del círculo)
    step = STEP; // Incremento del ángulo (ajusta el valor según la velocidad del movimiento)
/**
 * Mide el tamaño de la pantlla visible
 */
    function obtieneTamanioPantalla() {
        anchoVisible = document.documentElement.clientWidth;
        altoVisible = document.documentElement.clientHeight;
    }
/**
 * Inicia la animación, dispara el "intervalo" de tiempo en quela hace mover
 */
    function iniciarAnimacion() {
        centerX = (anchoVisible - (ANCHO_IMG *1)) / 2; // Coordenada X del centro de la ventana
        centerY = (altoVisible  - (ALTO_IMG*1.1)) / 2; // Coordenada Y del centro de la ventana
        angle = 0; // Ángulo inicial
        intervalId = setInterval(circular, tTime);
    } 
/**
 * Detiene la animanción
 */
    function detenerAnimacion() {
        clearInterval(intervalId);
    }
/**
 * Genera el movimiento en círculo...
 */
    function circular() {
        var x = centerX + radius * Math.cos(angle); // Coordenada X basada en el ángulo
        var y = centerY + radius * Math.sin(angle); // Coordenada Y basada en el ángulo
        transform(x, y);

        angle += step; // Incremento del ángulo para el siguiente movimiento circular
        if (angle >= 2 * Math.PI) {
            angle = 0; // Reinicia el ángulo para que el movimiento forme un círculo completo
            detenerAnimacion();
            obtieneTamanioPantalla(); // por si se redimensionó la pantalla...
            iniciarAnimacion();
        }
        radius -= (radius/50); // a cada paso se reduce el radio en la 50 ava parte
        if (radius < 1) {
            detenerAnimacion();
            puedeSalir = true; 
            console.log("Fin Succ: "+puedeSalir); // Eliminar
            finSuceesfull();
        }        
    }; 
    obtieneTamanioPantalla();
    iniciarAnimacion();
}
/**
 * Finaliza con éxito
 */
function finSuceesfull () {
    chkIngreso.textContent = '¡¡¡Bienvenido '+ datoUsuario[NOMBRE] +' a Mi "Red-Social"!!!';
    finComun();
}
/**
 * Finaliza con Error
 */   
function finError () {
    chkIngreso.textContent = "Nombre de usuario y/o contraseña no encontrados";
    finComun();
}
/**
 * Final común (Succes o Error)
 */
function finComun () {
    // Guarda en posición "0" para volver a Inicio
    listaUsuarios[0] = usuario; // guarda en local storage
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    // Eliminar la clase "oculto" para activar la transición de opacidad
    chkIngreso.classList.remove("h2-oculto");
    // Esperar un breve momento (50ms) para que la transición se active correctamente
    setTimeout(function() {
        // Establecer la opacidad en 1 para mostrar el texto gradualmente
        chkIngreso.style.opacity = 1;
    }, 100);
    esperaParaRegreso(); // y vuelve a Inicio
} 
 
/**
 * Intervalo para esperar y volver a Inicio
 */
function esperaParaRegreso() {
    intervalo = setInterval(sigueEsperando, 1000); 
  }
/**
 * Si la condición se cumple >> regrea a Inicio (index.html)
 */
function sigueEsperando() {
    if (puedeSalir === true) {
        clearInterval(intervalo);
        setTimeout(function () {window.location.href = "index.html" }, 3000 );
    };
  }
 
 