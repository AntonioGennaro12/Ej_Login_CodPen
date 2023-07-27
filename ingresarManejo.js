
const verificaIngreso = document.querySelector("#verifica-ingreso");

let datoUsuario         = ["", "", "", ""];
let encontrado          = false;
let encontradoNombre    = false;
let encontradoIndex     = 0;

let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
let usuario = ["ingreso", "", "", ""];
listaUsuarios[0] = usuario; // modifica y guarda en local storage
localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

let datoIngresado = JSON.parse(localStorage.getItem('datoIngresado'));

console.log(datoIngresado); /// ELIMINAR
console.log(datoUsuario); /// ELIMINAR
encontrado = false;
encontradoNombre = false;
for (let i=1 ; i < listaUsuarios.length; i++) {
    datoUsuario = listaUsuarios[i];
    console.log(datoUsuario);
    if (datoUsuario[0] == datoIngresado[0]) {
        encontradoNombre = true;
        encontradoIndex = i;
        if(datoUsuario[3] == datoIngresado[1]){
            encontrado = true;
            i = listaUsuarios.length;
        }
    }     
}

if (encontrado == true) {
    verificaIngreso.textContent = '¡¡¡Bienvenido '+ datoUsuario[0] +' a Mi "Red-Social"!!!';
}
else {
    verificaIngreso.textContent = "Nombre de usuario y/o contraseña no encontrados";
    if(encontradoNombre == true){ // si nombre estaba bien
        usuario = ["ingreso", "nombre-ok", encontradoIndex, ""];
        listaUsuarios[0] = usuario; // modifica y guarda en local storage
        localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    }
}
// Eliminar la clase "oculto" para activar la transición de opacidad
verificaIngreso.classList.remove("h2-oculto");

// Esperar un breve momento (50ms) para que la transición se active correctamente
setTimeout(function() {
    // Establecer la opacidad en 1 para mostrar el texto gradualmente
    verificaIngreso.style.opacity = 1;
}, 50);
setTimeout(function () {}, 4000 );
setTimeout(function () {
    window.location.href = "index.html"
  }, 3000 );

 