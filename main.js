// Elementos HTML
const nombreJugador1 = document.querySelector('#nombre-jugador-1');
const btnCambiarNombre1 = document.querySelector('#cambiar-nombre-1');
const nombreJugador2 = document.querySelector('#nombre-jugador-2');
const btnCambiarNombre2 = document.querySelector('#cambiar-nombre-2');
const imgJugador1 = document.querySelector('#gesto-1');
const imgJugador2 = document.querySelector('#gesto-2');
const botonComenzar = document.querySelector('#boton-comenzar');
const cuentaRegresiva = document.querySelector('#cuenta-regresiva');

// Sonidos
const beepAudio = new Audio('sonidos/beep.mp3');
const daleAudio = new Audio('sonidos/dale.m4a');

// Valores de jugada posibles
const OPCIONES = {
  PIEDRA: "PIEDRA",
  PAPEL: "PAPEL",
  TIJERA: "TIJERA",
  NULO: "NULO"
}

// Rutas a las imágenes de cada jugador según el gesto
const GESTOS = {
  JUGADOR_1: {
    PIEDRA: "imagenes/piedra1.png",
    PAPEL: "imagenes/papel1.png",
    TIJERA: "imagenes/tijera1.png",
    ESPERA: "imagenes/animacion1.gif",
  },
  JUGADOR_2: {
    PIEDRA: "imagenes/piedra2.png",
    PAPEL: "imagenes/papel2.png",
    TIJERA: "imagenes/tijera2.png",
    ESPERA: "imagenes/animacion2.gif",
  },
  NULO: "imagenes/nulo.png",
}

// Inicialización de variables
let jugador1 = OPCIONES.NULO;
let jugador2 = OPCIONES.NULO;
let juegoEnCurso = false;
let segundosRestantes = null;

// Captura de eventos del teclado
document.addEventListener('keydown', function(event) {
  if (!juegoEnCurso) {
    return;
  }

  // Jugador 1
  if (event.code === 'KeyQ') {
    jugador1 = OPCIONES.PIEDRA;
    imgJugador1.src = GESTOS.JUGADOR_1.PIEDRA;
  } else if (event.code === 'KeyA') {
    jugador1 = OPCIONES.PAPEL;
    imgJugador1.src = GESTOS.JUGADOR_1.PAPEL;
  } else if (event.code === 'KeyZ') {
    jugador1 = OPCIONES.TIJERA;
    imgJugador1.src = GESTOS.JUGADOR_1.TIJERA;
  }

  // Jugador 2
  if (event.code === 'KeyO') {
    jugador2 = OPCIONES.PIEDRA;
    imgJugador2.src = GESTOS.JUGADOR_2.PIEDRA;
  } else if (event.code === 'KeyK') {
    jugador2 = OPCIONES.PAPEL;
    imgJugador2.src = GESTOS.JUGADOR_2.PAPEL;
  } else if (event.code === 'KeyM') {
    jugador2 = OPCIONES.TIJERA;
    imgJugador2.src = GESTOS.JUGADOR_2.TIJERA;
  }
});

function comenzarJuego() {
  // Reiniciamos el juego
  reiniciarJuego();

  // Asignamos las animaciones de espera para la cuenta regresiva
  imgJugador1.src = GESTOS.JUGADOR_1.ESPERA;
  imgJugador2.src = GESTOS.JUGADOR_2.ESPERA;
  
  // Comenzamos la cuenta regresiva
  segundosRestantes = 3;
  juegoEnCurso = true;
  botonComenzar.disabled = true;
  cuentaRegresiva.textContent = segundosRestantes;

  // Reproducimos el primer sonido de la cuenta regresiva
  beepAudio.play();

  // Iniciamos el intervalo de la cuenta regresiva
  const intervalo = setInterval(function() {
    segundosRestantes--;
    cuentaRegresiva.textContent = segundosRestantes;

    // Reproducimos el sonido de la cuenta regresiva
    beepAudio.play();

    if (segundosRestantes === 0) {
      clearInterval(intervalo);
      cuentaRegresiva.textContent = '¡VA!';

      // Reproducimos el sonido de "¡VA!"
      daleAudio.play();

      // Damos menos de medio segundo de márgen para que cada jugador elija su jugada
      setTimeout(anunciarGanador, 350);
    }
  }, 1000);
}

function evaluarGanador() {
  // Completar esta función para que devuelva el número 0 si fue un empate, 1 si ganó el jugador1, o 2 si ganó el jugador2
  // En la sección "Captura de eventos del teclado", ya se asignó el valor de la jugada elegida a cada jugador (jugador1 y jugador2), y los valores posibles se encuentran en la constante OPCIONES:
  // OPCIONES.PIEDRA, OPCIONES.PAPEL, OPCIONES.TIJERA, OPCIONES.NULO
  
  if (jugador1 === jugador2) {
    return 0;
  } else if (
    jugador2 === OPCIONES.NULO ||
    jugador1 === OPCIONES.PIEDRA && jugador2 === OPCIONES.TIJERA ||
    jugador1 === OPCIONES.PAPEL && jugador2 === OPCIONES.PIEDRA ||
    jugador1 === OPCIONES.TIJERA && jugador2 === OPCIONES.PAPEL
  ) {
    return 1;
  } else {
    return 2;
  }
}

function anunciarGanador() {
  juegoEnCurso = false;

  // Si alguno de los jugadores no eligió nada, les asignamos la imagen de NULO
  if (jugador1 === OPCIONES.NULO) {
    imgJugador1.src = GESTOS.NULO;
  }
  if (jugador2 === OPCIONES.NULO) {
    imgJugador2.src = GESTOS.NULO;
  }

  // 0 = empate, 1 = jugador1, 2 = jugador2
  const ganador = evaluarGanador();

  if (ganador === 0) {
    cuentaRegresiva.textContent = '¡Empate!';
  } else if (ganador === 1) {
    cuentaRegresiva.textContent = '¡Ganó ' + nombreJugador1.textContent + '!';
  } else {
    cuentaRegresiva.textContent = '¡Ganó ' + nombreJugador2.textContent + '!';
  }

  botonComenzar.disabled = false;
}

function reiniciarJuego() {
  juegoEnCurso = false;
  jugador1 = OPCIONES.NULO;
  jugador2 = OPCIONES.NULO;
  botonComenzar.disabled = false;
  cuentaRegresiva.textContent = '';
  imgJugador1.src = "";
  imgJugador2.src = "";
}

function cambiarNombreJugador1() {
  const input =  prompt("Ingrese el nombre del jugador 1");
  if (input) {
    nombreJugador1.textContent = input;
  }
}

function cambiarNombreJugador2() {
  const input =  prompt("Ingrese el nombre del jugador 2");
  if (input) {
    nombreJugador2.textContent = input;
  }
}

// Asignación de funciones a los botones
botonComenzar.onclick = comenzarJuego;
btnCambiarNombre1.onclick = cambiarNombreJugador1;
btnCambiarNombre2.onclick = cambiarNombreJugador2;
