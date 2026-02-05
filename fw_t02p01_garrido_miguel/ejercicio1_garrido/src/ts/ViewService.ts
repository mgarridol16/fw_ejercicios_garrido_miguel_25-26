import { MyMeal } from "./MyMeal.js";
import { WeeklyPlan } from "./WeeklyPlan.js";

console.log("====ViewService====");

export class ViewService {
  renderizarListado(
    contenedor: HTMLElement,
    recetas: MyMeal[],
    estaLogueado: boolean,
    esZonaPrivada: boolean = false,
  ): void {
    contenedor.innerHTML = "";

    if (recetas.length === 0) {
      this.mostrarAviso(
        contenedor,
        "No hay recetas disponibles para mostrarlas.",
        "info",
      );
      return;
    }
    let html = '<div class="row row-cols-1 row-cols-md-4 g-4">'; //4 columnas por fila en ORDENADOR

    for (let i = 0; i < recetas.length; i++) {
      const r = recetas[i];
      const textoBoton = esZonaPrivada ? "Quitar de favorita" : "Favorito";

      html += `
    <div class="col">
        <div class="card h-100 shadow-sm">
            <img src="${r.strMealThumb}" class="card-img-top" alt="${r.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${r.strMeal}</h5>

                <p class="card-text mb-1">
                    <strong>${r.strCategory}</strong> | <small>${r.strArea}</small>
                </p>
                <span class="badge bg-secondary mb-2">
                    ${r.ingredients ? r.ingredients.length : 0} Ingredientes
                </span>
            </div>

            <div class="card-footer bg-white border-top-0 d-grid gap-2">
                ${
                  estaLogueado
                    ? `<button class="btn btn-outline-primary btn-sm btn-ver-detalle" data-id="${r.idMeal}">
                        Ver detalles
                       </button>
                       <button class="btn btn-outline-danger btn-sm btn-guardar-favorito" data-id="${r.idMeal}">
                         ${textoBoton}
                       </button>`
                    : `<p>
                         Inicia sesión para ver detalles
                       </p>`
                }
            </div>
        </div>
    </div>`;
    }

    html += "</div>";
    contenedor.innerHTML = html;
  }

  mostrarAviso(contenedor: HTMLElement, mensaje: string, tipo: string) {
    contenedor.innerHTML = "";

    const html = `<div class="alert alert-${tipo}" role="alert">
    ${mensaje}</div>`;

    contenedor.innerHTML = html;
  }

  renderizarDetalles(contenedor: HTMLElement, receta: MyMeal): void {
    contenedor.innerHTML = "";

    // Si por algún motivo la receta no llega o es nula
    if (!receta) {
      this.mostrarAviso(
        contenedor,
        "No se ha podido cargar la información de la receta.",
        "danger",
      );
      return;
    }

    let ingredientesHTML = '<ul class="list-group">';
    for (let i = 0; i < receta.ingredients.length; i++) {
      const ing = receta.ingredients[i];
      ingredientesHTML += `<li class="list-group-item">${ing.name} - ${ing.measure}</li>`;
    }
    ingredientesHTML += "</ul>";

    let instrucciones = "No hay instrucciones disponibles.";
    if (receta.strInstructions) {
      instrucciones = receta.strInstructions;
    }

    let botonYoutube = "";
    if (receta.strYoutube) {
      botonYoutube = `<div class="d-grid mt-3">
                            <a href="${receta.strYoutube}" target="_blank" class="btn btn-danger"> Ver en YouTube </a>
                        </div>`;
    }

    const html = `
        <div class="card">
            <img src="${receta.strMealThumb}" class="card-img-top w-25" alt="${receta.strMeal}">
            <div class="card-body">
                <h2>${receta.strMeal}</h2>
                <p>${receta.strCategory} | ${receta.strArea}</p>

                <h5>Ingredientes:</h5>
                ${ingredientesHTML}

                <h5 class="mt-3">Instrucciones:</h5>
                <p>${instrucciones}</p>

                ${botonYoutube}
            </div>
        </div>
    `;

    contenedor.innerHTML = html;
  }
  renderizarPlanesSemanales(
    contenedor: HTMLElement,
    planes: WeeklyPlan[],
    idSemanaActual: string,
  ): void {
    contenedor.innerHTML = "";

    if (planes.length === 0) {
      this.mostrarAviso(
        contenedor,
        "No tienes planes semanales guardados todavía.",
        "info",
      );
      return;
    }

    let html = "";

    for (let i = 0; i < planes.length; i++) {
      const plan = planes[i];

      let claseDestacado = "";
      let badgeActual = "";
      if (plan.id === idSemanaActual) {
        claseDestacado = "border-primary shadow";
        badgeActual = '<span class="badge bg-primary">Semana Actual</span>';
      }

      html += `<div class="card mb-4 ${claseDestacado}">`;
      html += `<div class="card-header d-flex justify-content-between">
                    <strong>Plan de la Semana: ${plan.id}</strong>
                    ${badgeActual}
                </div>`;

      html += `<table class="table table-bordered mb-0">`;

      // --- CABECERA DE DÍAS ---
      html += `<thead class="table-light"><tr><th>Momento</th>`;
      for (let j = 0; j < plan.days.length; j++) {
        html += `<th>${plan.days[j].day}</th>`;
      }
      html += `</tr></thead>`;

      // --- FILA DE COMIDAS (Lunch) ---
      html += `<tbody><tr><td><strong>Comida</strong></td>`;
      for (let j = 0; j < plan.days.length; j++) {
        let idComida = "-";
        if (plan.days[j].lunchMealID) {
          idComida = plan.days[j].lunchMealID?.toString() || "-";
        }
        html += `<td>${idComida}</td>`;
      }
      html += `</tr>`;

      // --- FILA DE CENAS (Dinner) ---
      html += `<tr><td><strong>Cena</strong></td>`;
      for (let j = 0; j < plan.days.length; j++) {
        let idCena = "-";
        if (plan.days[j].dinnerMealID) {
          idCena = plan.days[j].dinnerMealID?.toString() || "-";
        }
        html += `<td>${idCena}</td>`;
      }
      html += `</tr></tbody></table></div>`;
    }

    // 4. Inyectamos todo el HTML generado
    contenedor.innerHTML = html;
  }
}
