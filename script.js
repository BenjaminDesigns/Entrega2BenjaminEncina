let nombre = localStorage.getItem("nombre");
let total = 0;
let paquetesAgregados = [];

const loginContainer = document.querySelector("#loginContainer");
const loginForm = document.querySelector("#loginForm");
const nombreInput = document.querySelector("#nombreInput");

const mainContent = document.querySelector("main");
const paquetesSection = document.querySelector(".paquetes");
const footer = document.querySelector("footer");
const contador = document.querySelector(".contador-visitas");

function mostrarContenido() {
  loginContainer.remove(); 
  mainContent.classList.remove("hidden");
  paquetesSection.classList.remove("hidden");
  footer.classList.remove("hidden");
  contador.classList.remove("hidden");
  document.querySelector("main h3").textContent = `Bienvenid@, ${nombre} 👋`;
}

// Mostrar contenido si ya había iniciado sesión
if (nombre) {
  mostrarContenido();
}

// Recibir nombre
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombreIngresado = nombreInput.value.trim();

  if (nombreIngresado.length < 3) {
    alert("Tu nombre debe tener al menos 3 letras.");
    return;
  }

  nombre = nombreIngresado;
  localStorage.setItem("nombre", nombre);
  mostrarContenido();
});


const paquetes = {
  identidad: 500000,
  web: 500000,
  rebranding: 250000,
};

document.querySelectorAll(".btn-anadir").forEach(boton => {
  boton.addEventListener("click", () => {
    const tarjeta = boton.closest(".tarjeta");
    const tipo = tarjeta.getAttribute("data-paquete");

    if (paquetesAgregados.includes(tipo)) {
      alert("Ya seleccionaste este paquete");
      return;
    }

    total += paquetes[tipo];
    paquetesAgregados.push(tipo);
    document.querySelector(".total").textContent = `$${total.toLocaleString()} CLP`;
  });
});

// Enviar cotización
document.querySelector(".btn-enviar").addEventListener("click", () => {
  document.querySelector(".total").textContent = "¡Cotización enviada con éxito!";
});

// Contador de visitas
const contadorTexto = document.querySelector('.contador-texto');
let visitas = localStorage.getItem('visitas') || 0;
visitas++;
localStorage.setItem('visitas', visitas);
contadorTexto.textContent = `Visitas totales: ${visitas}`;
