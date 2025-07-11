let nombre = localStorage.getItem("nombre");

const loginContainer = document.querySelector("#loginContainer");
const loginForm = document.querySelector("#loginForm");
const nombreInput = document.querySelector("#nombreInput");

const mainContent = document.querySelector("main");
const paquetesSection = document.querySelector(".paquetes");
const proyectosSection = document.querySelector(".proyectos");
const footer = document.querySelector("footer");
const contador = document.querySelector(".contador-visitas");
const totalElemento = document.querySelector(".total");
const navbar = document.querySelector(".navbar");
const nosotros = document.querySelector(".Nosotros");
const btnScroll = document.querySelector(".btnScrollTop");

let total = 0;
let paquetesAgregados = [];

// ---------------------------------------- //


// Tal vez haya un método más elegante para esto, pero no lo descubrí ;( 
function mostrarContenido() {
  loginContainer.remove();
  mainContent.classList.remove("hidden");
  paquetesSection.classList.remove("hidden");
  proyectosSection.classList.remove("hidden");
  footer.classList.remove("hidden");
  contador.classList.remove("hidden");
  nosotros.classList.remove("hidden");
  navbar.classList.remove("hidden");
  btnScroll.classList.remove("hidden");
  document.querySelector("main h3").textContent = `Bienvenid@, ${nombre} 👋`;
}

if (nombre) mostrarContenido();

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombreIngresado = nombreInput.value.trim();

  if (nombreIngresado.length < 3) {
    Toastify({
      text: "Tu nombre debe tener al menos 3 letras.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#1b1b1bff",
    }).showToast();
    return;
  }

  nombre = nombreIngresado;
  localStorage.setItem("nombre", nombre);
  mostrarContenido();
});

// ---------------------------------------- //

document.querySelector(".btn-enviar").addEventListener("click", () => {
  const emailInput = document.querySelector("#email");
  const email = emailInput.value.trim();

  if (total === 0) {
    Toastify({
      text: "Primero debes añadir un paquete.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#ffa502",
    }).showToast();
    return;
  }

  if (email === "" || !email.includes("@")) {
    Toastify({
      text: "Por favor, ingresa un correo válido.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#e63946",
    }).showToast();
    return;
  }

  totalElemento.textContent = "¡Cotización enviada con éxito!";

  Swal.fire({
    title: "¡Cotización Enviada!",
    text: `Gracias por confiar en eccco™ studio.\nTe responderemos a: ${email}`,
    icon: "success",
    confirmButtonText: "Cerrar",
  });

  confetti();
});

document.querySelector(".btn-cancelar").addEventListener("click", () => {
  total = 0;
  paquetesAgregados = [];
  totalElemento.textContent = "$0 CLP";

  const emailInput = document.querySelector("#email");
  if (emailInput) emailInput.value = "";

  Toastify({
    text: "Cotización cancelada.",
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "#6c757d",
  }).showToast();
});

// ---------------------------------------- //

function cargarPaquetes() {
  fetch("paquetes.json")
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo cargar el archivo paquetes.json");
      return res.json();
    })
    .then((paquetes) => {
      const contenedor = document.querySelector(".paquetes");

      paquetes.forEach((paquete) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.setAttribute("data-paquete", paquete.id);

        tarjeta.innerHTML = `
          <img src="${paquete.imagen}" class="icono" alt="Ícono de ${paquete.nombre}">
          <h4>${paquete.nombre}</h4>
          <p class="valor">$${paquete.precio.toLocaleString()} CLP</p>
          <p class="descripcion">${paquete.descripcion}</p>
          <button class="btn-anadir">Añadir</button>
        `;

        contenedor.appendChild(tarjeta);
      });

      activarBotones();
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
}

// ---------------------------------------- //

function activarBotones() {
  const botones = document.querySelectorAll(".btn-anadir");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const tarjeta = boton.closest(".tarjeta");
      const id = tarjeta.getAttribute("data-paquete");

      if (paquetesAgregados.includes(id)) {
        Toastify({
          text: "Ya seleccionaste este paquete.",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#ffc107",
        }).showToast();
        return;
      }

      const valorTexto = tarjeta.querySelector(".valor").textContent;
      const precio = parseInt(valorTexto.replace(/\D/g, ""), 10);

      total += precio;
      paquetesAgregados.push(id);
      totalElemento.textContent = `$${total.toLocaleString()} CLP`;
    });
  });
}

cargarPaquetes();

// ---------------------------------------- //

const contadorTexto = document.querySelector(".contador-texto");
let visitas = localStorage.getItem("visitas") || 0;
visitas++;
localStorage.setItem("visitas", visitas);
contadorTexto.textContent = `Visitas totales: ${visitas}`;

// ---------------------------------------- //

btnScroll.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
