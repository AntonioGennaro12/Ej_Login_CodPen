const exitButon   = document.querySelector("#ex-button");
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
let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
let usuario = listaUsuarios[0];
usuario[0] = "recupero";
listaUsuarios[0] = usuario // modifica y guarda en local storage
localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
const Q_EMAIL   = 0;
const Q_CLAVE1  = 1;
const Q_CLAVE2  = 2;
var questions = [
    {question:"Ingresa tu email de registro", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    {question:"Ingresa una nueva contraseña", type: "password"},
    {question:"Repite la contraseña ingresada", type: "password"}
  ]
    
  const ENTER = 13; // 0DH carriage return
   
  // ;(function(){  /* Función auto invocada ó "Immediately Invoked Function Expression" o IIFE en inglés. */
  
    var tTime = 100  // transition transform time from #register in ms
    var wTime = 200  // transition width time from #register in ms
    var eTime = 1000 // transition width time from inputLabel in ms
  
    // init
    // --------------
    let position    = Q_EMAIL;
    let indiceUser  = usuario[INDICE]; // cargo el índice al que quiere regenerar la clave.
    let currEmail   = (listaUsuarios[indiceUser])[EMAIL]; // leo email para chequear   
    let nuevaClave  = "";
    putQuestion();
  
    progressButton.addEventListener('click', validate)
    inputField.addEventListener('keyup', function(e){
      transform(0, 0) // ie hack to redraw
      if(e.keyCode == ENTER) validate()
    })
  
    // functions
      
    // load the next question
    function putQuestion() {
      inputLabel.innerHTML = questions[position].question
      inputField.value = ''
      inputField.type = questions[position].type || 'text'  
      inputField.focus()
      showCurrent()
    }
    
    // when all the questions have been answered
    function done() {
      // remove the box if there is no next question
      register.className = 'close'
      // Almacena la nueva clave
      usuario = listaUsuarios[indiceUser];
      usuario[CLAVE] = nuevaClave;
      listaUsuarios[indiceUser] = usuario;
      listaUsuarios[0] = ["recupero", "", "", "", ""];
      localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
      // add the h2 at the end with the welcome text
      var h2 = document.createElement('h2')
      h2.appendChild(document.createTextNode('Felicitaciones ' + usuario[NOMBRE] + ', Contraseña Recuperada!'))
      setTimeout(function() {
        register.parentElement.appendChild(h2)     
        setTimeout(function() {h2.style.opacity = 1}, 50)
      }, eTime)
      exitRegister(5000);     
    }
  
    // when submitting the current question
    function validate() {
    //check if the pattern matches
        if (!inputField.value.match(questions[position].pattern || /.+/)) {
            wrong()
        }
        switch (position) {
            case Q_EMAIL:
                if (currEmail != inputField.value) {
                    wrong();
                    hideCurrent(putQuestion)
                    break;
                }
            case Q_CLAVE1:
                nuevaClave = inputField.value;
                okFunction();
                break;
            case Q_CLAVE2:
                if (nuevaClave != inputField.value) {
                    wrong();
                    position -= 1;
                    hideCurrent(putQuestion)
                    break;
                }
                okFunction();    
            }
    }
    
    function okFunction () {
        ok(function() {
            // set the progress of the background
            progress.style.width = ++position * 100 / questions.length + 'vw'
            // if there is a new question, hide current and load next
            if (questions[position]) hideCurrent(putQuestion)
            else hideCurrent(done)
        })  
    }

    // helper
    // --------------
  
    function hideCurrent(callback) {
      inputContainer.style.opacity = 0
      inputProgress.style.transition = 'none'
      inputProgress.style.width = 0
      setTimeout(callback, wTime)
    }
  
    function showCurrent(callback) {
      inputContainer.style.opacity = 1
      inputProgress.style.transition = ''
      inputProgress.style.width = '100%'
      setTimeout(callback, wTime)
    }
  
    function transform(x, y) {
      register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
    }
  
    function ok(callback) {
      register.className = ''
      setTimeout(transform, tTime * 0, 0, 10)
      setTimeout(transform, tTime * 1, 0, 0)
      setTimeout(callback,  tTime * 2)
    }
  /**
   * 
   * @param {} callback 
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
      h2.appendChild(document.createTextNode('Abandonando Recupero de Contraseña...'))
      setTimeout(function() {
        register.parentElement.appendChild(h2)     
        setTimeout(function() {h2.style.opacity = 1}, 50)
      }, eTime)
      exitRegister(3000);
    }

  // }()) 
