let nombre = localStorage.getItem("nombre");
let total = 0;
let paquetesAgregados = [];

if (!nombre) {
  nombre = prompt("¿Cuál es tu nombre?");
  localStorage.setItem("nombre", nombre);
}

document.querySelector("h3").textContent = `Bienvenid@, ${nombre}`;

const paquetes = {
  identidad: 250000,
  web: 250000,
  completo: 500000,
};

document.querySelectorAll(".btn-anadir").forEach(boton => {
  boton.onclick = () => {
    const tarjeta = boton.closest(".tarjeta");
    const tipo = tarjeta.getAttribute("data-paquete");

    if (paquetesAgregados.includes(tipo)) {
      alert("No puedes sumar otra vez este paquete");
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

let visitas = localStorage.getItem('visitas');

if (!visitas) {
  visitas = 0;
}

visitas++;
localStorage.setItem('visitas', visitas);

contadorTexto.textContent = `Visitas totales: ${visitas}`;