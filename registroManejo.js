const exitButon   = document.querySelector("#ex-button");
// let   listaUsuarios = [
//  ["nombre", "apellido", "email@dom.com", "cantrasenia"]
// ];
// Recupero el valor de la variable desde localStorage
let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
let usuario = ["registro", "", "", ""];
listaUsuarios[0] = usuario // modifica y guarda en local storage
localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

var questions = [
    {question:"¿Cuál es tu mombre?"},
    {question:"¿Cuál es tu apellido?"},
    {question:"¿Cuál es tu email?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    {question:"Ingresa una contraseña", type: "password"},
    {question:"Repite la contraseña ingresada", type: "password"}
  ]
    
  const ENTER = 13;

  console.log(listaUsuarios[0]);
  
  // ;(function(){  /* Función auto invocada ó "Immediately Invoked Function Expression" o IIFE en inglés. */
  
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
  
    // functions
    // --------------
  
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
      // Almacena el nuevo usuario
      for(let i = 0; i < (questions.length-1);i++){
        usuario [i] = questions[i].value;
      }
      listaUsuarios.push(usuario); // agrega nuevo usuario y guarda en local storage
      localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
      // add the h2 at the end with the welcome text
      var h2 = document.createElement('h2')
      h2.appendChild(document.createTextNode('Bienvenido ' + questions[0].value + ', has sido registrado!'))
      setTimeout(function() {
        register.parentElement.appendChild(h2)     
        setTimeout(function() {h2.style.opacity = 1}, 50)
      }, eTime)
      exitRegister(5000);     
    }
  
    // when submitting the current question
    function validate() {
      // set the value of the field into the array
      questions[position].value = inputField.value
      // check if the pattern matches
      if (!inputField.value.match(questions[position].pattern || /.+/)) {wrong()}
      else if ((questions[position].question == "Repite la contraseña ingresada") && 
              (questions[position].value != questions[position-1].value)) {
          wrong();
          position -= 1;
          hideCurrent(putQuestion)
        }
      else ok(function() {
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
      h2.appendChild(document.createTextNode('Abandonando Registro de Nuevo Usuario...'))
      setTimeout(function() {
        register.parentElement.appendChild(h2)     
        setTimeout(function() {h2.style.opacity = 1}, 50)
      }, eTime)
      exitRegister(3000);
    }

  // }()) 
