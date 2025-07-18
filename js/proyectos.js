const btnProyectos = document.querySelector(".btnProyectos");
const seccionProyectos = document.querySelector(".proyectos");

let proyectosCargados = false;
let proyectosData = [];

function mostrarTodosLosProyectos() {
  const existingOverlay = document.querySelector(".overlay-activo");
  const existingWrapper = document.querySelector(".proyecto-detalle-wrapper");
  if (existingOverlay) existingOverlay.remove();
  if (existingWrapper) existingWrapper.remove();

  seccionProyectos.innerHTML = "";

  proyectosData.forEach((proyecto, index) => {
    const card = document.createElement("div");
    card.classList.add("card-proyecto");
    card.style.animationDelay = `${0.3 + index * 0.2}s`;
    card.style.opacity = "0";

    card.innerHTML = `
      <img src="${proyecto.imagen}" alt="${proyecto.nombre}" />
      <h4>${proyecto.nombre}</h4>
      <button class="btn-ver-mas" data-id="${proyecto.id}">${proyecto.enlace}</button>
    `;

    seccionProyectos.appendChild(card);
    void card.offsetWidth;
  });

  document.querySelectorAll(".btn-ver-mas").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      mostrarProyectoDetalle(id);
    });
  });
}

function mostrarProyectoDetalle(id) {
  const proyecto = proyectosData.find((p) => p.id == id);
  if (!proyecto) return;

  seccionProyectos.innerHTML = "";

  const overlay = document.createElement("div");
  overlay.classList.add("overlay-activo");
  document.body.appendChild(overlay);

  const wrapper = document.createElement("div");
  wrapper.classList.add("proyecto-detalle-wrapper");

  const detalle = document.createElement("div");
  detalle.classList.add("proyecto-detalle");

  detalle.innerHTML = `
    <img src="${proyecto.imagen}" alt="${proyecto.nombre}" />
    <h1>${proyecto.nombre}</h1>
    <p>${proyecto.descripcion}</p>
    <button class="btn-volver">Volver</button>
  `;

  wrapper.appendChild(detalle);
  document.body.appendChild(wrapper);

  detalle.querySelector(".btn-volver").addEventListener("click", () => {
    wrapper.remove();
    overlay.remove();
    mostrarTodosLosProyectos();
  });
}

btnProyectos.addEventListener("click", () => {
  seccionProyectos.classList.remove("hidden");

  if (!proyectosCargados) {
    fetch("data/proyectos.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar proyectos.json");
        return res.json();
      })
      .then((data) => {
        proyectosData = data;
        proyectosCargados = true;
        mostrarTodosLosProyectos();
      })
      .catch(() => {
        seccionProyectos.innerHTML = "<p>No se pudieron cargar los proyectos.</p>";
      });
  } else {
    mostrarTodosLosProyectos();
  }
});
