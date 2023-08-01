const miBody      = document.querySelector("body");
const exitButon   = document.querySelector("#ex-button");
// IMAGEN DE FONDO REGISTRO EXITOSO 
const IMG_SUCC_REG  = "https://weshineacademy.com/wp-content/uploads/2017/12/ThankyouRegistering-1024x435.png";
const ENTER = 13; // 0Dh carriage return
// ListaUsuarios [0]
const   RUTINA      = 0;
const   NOMBRE_OK   = 1;
const   INDICE      = 2;  
const   vacante1    = 3;
const   vacante2    = 4;
// listaUsuarios = ["nombreDeUsuario", "nombre", "apellido", "email@dom.com", "cantrasenia"]// Recupero el valor de la variable desde localStorage
const   USRNAME     = 0;
const   NOMBRE      = 1;
const   APELLIDO    = 2;
const   EMAIL       = 3;  
const   CLAVE       = 4; 
let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
let usuario = ["registro", "", "", "", ""];
listaUsuarios[RUTINA] = usuario // modifica y guarda en local storage
guardaListaEnLS();

const REPITE_CONTRASENIA = "Repite la Contraseña ingresada";
var questions = [
    {question:"Escribe un Nombre de Usuario"},
    {question:"¿Cuál es tu Nombre de pila?"},
    {question:"¿Cuál es tu Apellido?"},
    {question:"¿Cuál es tu email?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    {question:"Ingresa una Contraseña", type: "password"},
    {question: REPITE_CONTRASENIA, type: "password"}
  ]
  
  /* Función auto invocada ó "Immediately Invoked Function Expression" o IIFE en inglés. */
  
    var tTime = 100  // transition transform time from #register in ms
    var wTime = 200  // transition width time from #register in ms
    var eTime = 1000 // transition width time from inputLabel in ms
  
    // init
    // --------------
    var position = 0;
  
    putQuestion();
  
    progressButton.addEventListener('click', validate)
    inputField.addEventListener('keyup', function(e){
      transform(0, 0) // ie hack to redraw
      if(e.keyCode == ENTER) validate()
    })
  
    // FUNCIONES
    /**
     * Guarda Lista d eUsuarios en Local Storage
     */
    function guardaListaEnLS(){
      localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    }
    
    /**
     * load the next question
     */
    function putQuestion() {
      inputLabel.innerHTML = questions[position].question
      inputField.value = ''
      inputField.type = questions[position].type || 'text'  
      inputField.focus()
      showCurrent()
    }
    
    /**
     * Called when all the questions have been answered
     */
    function done() {
      register.className = 'close'; // remove the box if there is no next question
      // Almacena el nuevo usuario
      for(let i = 0; i < (questions.length-1);i++){
        usuario [i] = questions[i].value;
      }
      listaUsuarios.push(usuario); // agrega nuevo usuario y guarda en local storage
      guardaListaEnLS();
      // add the h2 at the end with the welcome text
      miBody.style.backgroundImage = `url("${IMG_SUCC_REG}")`;
      var h2 = document.createElement('h2')
      h2.appendChild(document.createTextNode('Bienvenido ' + questions[NOMBRE].value + ', has sido registrado!'))
      setTimeout(function() {
        register.parentElement.appendChild(h2)     
        setTimeout(function() {h2.style.opacity = 1}, 50)
      }, eTime)
      exitRegister(5000);     
    }
  
    /**
     * Called when submitting the current question
     */
    function validate() {
      questions[position].value = inputField.value // set the value of the field into the array
      // check if the pattern matches regular expresions
      if (!inputField.value.match(questions[position].pattern || /.+/)) {wrong()}
      // Chequea además si la repetición de la contraseña coincide 
      else if ((questions[position].question == REPITE_CONTRASENIA) && 
              (questions[position].value != questions[position-1].value)) {
          wrong();
          position -= 1; // vuelve a pedir nuevamente la contreña inicial...
          hideCurrent(putQuestion)
        }
      else ok(function() { // todo bien 
        // set the progress of the background
        progress.style.width = ++position * 100 / questions.length + 'vw'
        // if there is a new question, hide current and load next
        if (questions[position]) hideCurrent(putQuestion)
        else hideCurrent(done)          
      })
    }
    
  // helper
  /**
   * Oculta pregunta corriente 
   * @param {Function} callback 
   */
    function hideCurrent(callback) {
      inputContainer.style.opacity = 0
      inputProgress.style.transition = 'none'
      inputProgress.style.width = 0
      setTimeout(callback, wTime)
    }
  /**
   * Muestra pregunta siguiente
   * @param {Function} callback 
   */
    function showCurrent(callback) {
      inputContainer.style.opacity = 1
      inputProgress.style.transition = ''
      inputProgress.style.width = '100%'
      setTimeout(callback, wTime)
    }

  /**
   * Transforma ancho y alto
   * @param {number} x 
   * @param {number} y 
   */
    function transform(x, y) {
      register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
    }
  /**
   * Transforma el box de registro y elimina
   * @param {Function} callback 
   */
    function ok(callback) {
      register.className = ''
      setTimeout(transform, tTime * 0, 0, 10)
      setTimeout(transform, tTime * 1, 0, 0)
      setTimeout(callback,  tTime * 2)
    }
    
  /**
   * Tranforma y sacude box de registro
   * @param {Function} callback 
   */
    function wrong(callback) {
      register.className = 'wrong'
      for(var i = 0; i < 6; i++) // shaking motion
        setTimeout(transform, tTime * i, (i%2*2-1)*20, 0)
        setTimeout(transform, tTime * 6, 0, 0)
        setTimeout(callback,  tTime * 7)
    }
/**
 * Salida temporizada vuelve a la pagina principal
 * @param {number} time 
 */
    function exitRegister(time) {
      setTimeout(function () {
        window.location.href = "index.html";
      }, time )
    } 
  /**
   * Salir del Registro / abandonar  
   */
    function exitRegistration() {
      //oculto boton
      exitButon.style.display = "none";
      // remove the box if there is no next question
      register.className = 'close'
      var h2 = document.createElement('h2')
      h2.appendChild(document.createTextNode('Abandonando Registro de Nuevo Usuario...'))
      setTimeout(function() {
        register.parentElement.appendChild(h2)     
        setTimeout(function() {h2.style.opacity = 1}, 50)
      }, eTime)
      exitRegister(3000);
    }

