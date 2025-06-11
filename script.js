let nombre = localStorage.getItem("nombre");
let total = 0;
let paquetesAgregados = [];

if (!nombre) {
  nombre = prompt("¿Cómo te llamas?");
  localStorage.setItem("nombre", nombre);
}

document.querySelector("h3").textContent = `Bienvenid@, ${nombre}👋`;

const paquetes = {
  identidad: 500000,
  web: 500000,
  rebranding: 250000,
};

document.querySelectorAll(".btn-anadir").forEach(boton => {
  boton.onclick = () => {
    const tarjeta = boton.closest(".tarjeta");
    const tipo = tarjeta.getAttribute("data-paquete");

    if (paquetesAgregados.includes(tipo) === true) {
      alert("Ya seleccionaste este paquete");
      return;
    }

    total += paquetes[tipo];
    paquetesAgregados.push(tipo);
    document.querySelector(".total").textContent = `$${total.toLocaleString()} CLP`;
  };
});

document.querySelector(".btn-enviar").onclick = () => {
  document.querySelector(".total").textContent = "¡Cotización enviada con éxito!";
};

const contadorTexto = document.querySelector('.contador-texto');

// Me parecía mejor añadir esto en vez de tener que limpiar mi JSON cada vez que quería probar si localStorage funcionaba bien
let visitas = localStorage.getItem('visitas');
if (!visitas) {
  visitas = 0;
}

visitas++;
localStorage.setItem('visitas', visitas);

contadorTexto.textContent = `Visitas totales: ${visitas}`;