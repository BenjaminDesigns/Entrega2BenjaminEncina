document.addEventListener("DOMContentLoaded", () => {
  const btnProyectos = document.querySelector(".btnProyectos");
  const seccionProyectos = document.querySelector(".proyectos");

  let proyectosCargados = false;
  let proyectosData = [];

  function mostrarTodosLosProyectos() {
    seccionProyectos.innerHTML = "";

    proyectosData.forEach((proyecto) => {
      const card = document.createElement("div");
      card.classList.add("card-proyecto");

      card.innerHTML = `
        <img src="${proyecto.imagen}" alt="${proyecto.nombre}" />
        <h4>${proyecto.nombre}</h4>
        <button class="btn-ver-mas" data-id="${proyecto.id}">${proyecto.enlace}</button>
      `;

      seccionProyectos.appendChild(card);
    });

// ---------------------------------------------- //

    document.querySelectorAll(".btn-ver-mas").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        mostrarProyectoDetalle(id);
      });
    });
  }

  function mostrarProyectoDetalle(id) {
    const proyecto = proyectosData.find((p) => p.id == id);
    seccionProyectos.innerHTML = "";

    const detalle = document.createElement("div");
    detalle.classList.add("proyecto-detalle");

    detalle.innerHTML = `
      <img src="${proyecto.imagen}" alt="${proyecto.nombre}" />
      <h1>${proyecto.nombre}</h1>
      <p>${proyecto.descripcion}</p>
      <button class="btn-volver">Volver</button>
    `;

    seccionProyectos.appendChild(detalle);

    document.querySelector(".btn-volver").addEventListener("click", mostrarTodosLosProyectos);
  }

// ---------------------------------------------- //

  btnProyectos.addEventListener("click", () => {
    seccionProyectos.classList.remove("hidden");

    if (!proyectosCargados) {
      fetch("proyectos.json")
        .then((res) => {
          if (!res.ok) throw new Error("Error al cargar proyectos.json");
          return res.json();
        })
        .then((data) => {
          proyectosData = data;
          proyectosCargados = true;
          mostrarTodosLosProyectos();
        })
        .catch((err) => {
          console.error("Error:", err);
          seccionProyectos.innerHTML = "<p>No se pudieron cargar los proyectos.</p>";
        });
    } else {
      mostrarTodosLosProyectos();
    }
  });
});
