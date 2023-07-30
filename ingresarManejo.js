
const  miBody         = document.querySelector("body");
const verificaIngreso = document.querySelector("#verifica-ingreso");
// img de fondo
const IMG_RED_SOCIAL    = "https://s3.amazonaws.com/cdn.wp.m4ecmx/wp-content/uploads/2019/04/09194009/Las-redes-sociales-en-M%C3%A9xico-compressor.jpg"
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
for (let i=1 ; i < listaUsuarios.length; i++) {
    datoUsuario = listaUsuarios[i];
    console.log(datoUsuario);
    if (datoUsuario[USRNAME] == datoIngresado[0]) {
        encontradoNombre = true;
        encontradoIndex = i;
        if(datoUsuario[CLAVE] == datoIngresado[1]){
            encontrado = true;
            i = listaUsuarios.length;
        }
    }     
}

if (encontrado == true) {
    verificaIngreso.textContent = '¡¡¡Bienvenido '+ datoUsuario[NOMBRE] +' a Mi "Red-Social"!!!';
    miBody.style.backgroundImage = "url("+IMG_RED_SOCIAL+")";
    usuario = ["ingreso", true, "", "", ""];
}
else {
    verificaIngreso.textContent = "Nombre de usuario y/o contraseña no encontrados";
    if(encontradoNombre == true){ // si nombre estaba bien
        // Modifico y agrego que el nombre está OK y el índice...
        usuario = ["ingreso", false, "nombre-ok", encontradoIndex, ""];
    }
}
// Guarda en posición "0" para volver a Inicio
listaUsuarios[0] = usuario; // guarda en local storage
localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
// Eliminar la clase "oculto" para activar la transición de opacidad
verificaIngreso.classList.remove("h2-oculto");
// Esperar un breve momento (50ms) para que la transición se active correctamente
setTimeout(function() {
    // Establecer la opacidad en 1 para mostrar el texto gradualmente
    verificaIngreso.style.opacity = 1;
}, 50);
setTimeout(function () {}, 1000 );
setTimeout(function () {
    window.location.href = "index.html"
  }, 4000 );

 