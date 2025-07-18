let nombre = localStorage.getItem("nombre");

const loginContainer = document.querySelector("#loginContainer");
const loginForm = document.querySelector("#loginForm");
const nombreInput = document.querySelector("#nombreInput");

const mainContent = document.querySelector("main");
const paquetesSection = document.querySelector(".paquetes");
const proyectosSection = document.querySelector(".proyectos");
const resumenPaquetes = document.querySelector(".resumen-paquetes");
const footer = document.querySelector("footer");
const contador = document.querySelector(".contador-visitas");
const totalElemento = document.querySelector(".total");
const navbar = document.querySelector(".navbar");
const nosotros = document.querySelector(".Nosotros");
const btnScroll = document.querySelector(".btnScrollTop");

let total = 0;
let paquetesAgregados = [];
let paquetes = [];

// ------------------------------------------------------ //

function mostrarContenido() {
  loginContainer.remove();
  mainContent.classList.remove("hidden");
  paquetesSection.classList.remove("hidden");
  proyectosSection.classList.remove("hidden");
  resumenPaquetes.classList.remove("hidden");
  footer.classList.remove("hidden");
  contador.classList.remove("hidden");
  nosotros.classList.remove("hidden");
  navbar.classList.remove("hidden");
  btnScroll.classList.remove("hidden");
  document.querySelector("main h3").textContent = `Bienvenid@, ${nombre} 👋`;
}

// ------------------------------------------------------ //

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
      backgroundColor: "#1b1b1b",
    }).showToast();
    return;
  }

  nombre = nombreIngresado;
  localStorage.setItem("nombre", nombre);
  mostrarContenido();
});

// ------------------------------------------------------ //

document.querySelector(".btn-enviar").addEventListener("click", () => {
  const nombreCliente = document.querySelector("#nombreCliente").value.trim();
  const empresaCliente = document.querySelector("#empresaCliente").value.trim();
  const direccionCliente = document.querySelector("#direccionCliente").value.trim();
  const email = document.querySelector("#email").value.trim();

  if (!nombreCliente || !direccionCliente || !email.includes("@")) {
    Toastify({
      text: "Completa todos los campos obligatorios.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#e63946",
    }).showToast();
    return;
  }

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

Swal.fire({
  title: "¡Cotización Enviada!",
  html: `
    <p><strong>Nombre:</strong> ${nombreCliente}</p>
    <p><strong>Empresa:</strong> ${empresaCliente || "No indicada"}</p>
    <p><strong>Dirección:</strong> ${direccionCliente}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Total:</strong> $${total.toLocaleString()} CLP</p>
  `,
  icon: "success",
  confirmButtonText: "Cerrar",
  background: '#2746DF',
  color: '#FFFFFF'
});

  confetti();
  totalElemento.textContent = "¡Cotización enviada con éxito!";
});

document.querySelector(".btn-cancelar").addEventListener("click", () => {
  total = 0;
  paquetesAgregados = [];
  totalElemento.textContent = "$0 CLP";
  document.querySelectorAll(".estado-paquete").forEach(el => el.remove());

  ["nombreCliente", "empresaCliente", "direccionCliente", "email"].forEach(id => {
    const input = document.querySelector(`#${id}`);
    if (input) input.value = "";
  });

  Toastify({
    text: "Cotización cancelada.",
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "#6c757d",
  }).showToast();
});

// ------------------------------------------------------ //

function cargarPaquetes() {
  fetch("data/paquetes.json")
    .then((res) => {
      if (!res.ok) throw new Error("No se pudo cargar el archivo paquetes.json");
      return res.json();
    })
    .then((data) => {
      paquetes = data;
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
          <div class="estado-paquete-container"></div>
        `;

        contenedor.appendChild(tarjeta);
      });

      activarBotones();
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
}

// ------------------------------------------------------ //

function activarBotones() {
  const botones = document.querySelectorAll(".btn-anadir");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const tarjeta = boton.closest(".tarjeta");
      const id = tarjeta.getAttribute("data-paquete");
      const estadoContenedor = tarjeta.querySelector(".estado-paquete-container");

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

      const paquete = paquetes.find(p => p.id === id);
      if (!paquete) return;

      total += paquete.precio;
      paquetesAgregados.push(id);
      totalElemento.textContent = `$${total.toLocaleString()} CLP`;

      const estado = document.createElement("div");
      estado.classList.add("estado-paquete");
      estado.innerHTML = `
        <p class="texto-añadido">Paquete añadido ✅</p>
        <button data-id="${paquete.id}" class="btn-quitar">Quitar</button>
      `;

      estadoContenedor.innerHTML = "";
      estadoContenedor.appendChild(estado);

      estado.querySelector(".btn-quitar").addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const paquete = paquetes.find(p => p.id === id);
        if (!paquete) return;

        total -= paquete.precio;
        paquetesAgregados = paquetesAgregados.filter(pid => pid !== id);
        totalElemento.textContent = `$${total.toLocaleString()} CLP`;
        estado.remove();
      });
    });
  });
}

// ------------------------------------------------------ //

cargarPaquetes();

const contadorTexto = document.querySelector(".contador-texto");
let visitas = localStorage.getItem("visitas") || 0;
visitas++;
localStorage.setItem("visitas", visitas);
contadorTexto.textContent = `Visitas totales: ${visitas}`;

btnScroll.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});