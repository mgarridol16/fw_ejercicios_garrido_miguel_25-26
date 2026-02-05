debugger;
console.log("Inicio de la App de comidas");

import { ApiService } from "./ApiService.js";
import { ViewService } from "./ViewService.js";
import { Utilities } from "./Utilities.js";
import { MyMeal } from "./MyMeal.js";
import { StorageService } from "./StorageService.js";

const api = new ApiService();
const view = new ViewService();
const storage = new StorageService();

// --- SELECTORES ---
const selectCats = document.getElementById(
  "categoriasPub",
) as HTMLSelectElement;
const selectCatsPriv = document.getElementById(
  "categoriasPriv",
) as HTMLSelectElement;
const recetasContainer = document.getElementById(
  "recetasContainerPub",
) as HTMLElement;
const recetasContainerPriv = document.getElementById(
  "recetasContainerPriv",
) as HTMLElement;

const linkBienvenida = document.getElementById("btn-home-pub");
const linkFavoritos = document.getElementById("link-favoritos");
const linkLoginOregister = document.getElementById("btn-login-nav");

const navUserInfo = document.getElementById("nav-user-info");
const navLoginItem = document.getElementById("nav-login-item");
const navLogoutItem = document.getElementById("nav-logout-item");
const nombreUserLogNav = document.getElementById("nombreUserLog") as HTMLElement;

const zonaPublica = document.getElementById("zonaPublica") as HTMLElement;
const zonaPrivada = document.getElementById("zonaPrivada") as HTMLElement;

const seccionBienvenida = document.getElementById(
  "sec-bienvenida-pub",
) as HTMLElement;
const seccionLogin = document.getElementById("sec-auth") as HTMLElement;
const seccionFavoritosPriv = document.getElementById(
  "sec-favoritos-priv",
) as HTMLElement;
const seccionPlanSemanalPriv = document.getElementById(
  "sec-plan-semanal-priv",
) as HTMLElement;

const formRegistro = document.getElementById("formRegistro") as HTMLFormElement;
const nombreUser = document.getElementById("regNombre") as HTMLInputElement;
const correoRegistro = document.getElementById("regEmail") as HTMLInputElement;
const passRegistro = document.getElementById("regPass") as HTMLInputElement;

const alertRegistro = document.getElementById("alertRegistro") as HTMLElement;
const linkLogout = document.getElementById("btnLogout") as HTMLElement;

function actualizarNav() {
  const usuarioLogueado = storage.obtenerUsuarioLogueado();

  if (usuarioLogueado) {
    if (navLoginItem) navLoginItem.classList.add("d-none");
    if (navLogoutItem) navLogoutItem.classList.remove("d-none");
    if (navUserInfo) navUserInfo.classList.remove("d-none");
    if (nombreUserLogNav) nombreUserLogNav.textContent = usuarioLogueado.name;
  } else {
    if (navLoginItem) navLoginItem.classList.remove("d-none");
    if (navLogoutItem) navLogoutItem.classList.add("d-none");
    if (navUserInfo) navUserInfo.classList.add("d-none");
  }
}

let recetasActuales: MyMeal[] = [];

//arranque de la app
async function init() {
  console.log("Iniciando la app...");

  await cargarCategorias();
  await cargarRecetas("todas");

  if (selectCats) {
    selectCats.addEventListener("change", async () => {
      const seleccion = selectCats.value;
      await cargarRecetas(seleccion);
    });
  }

  configurarZonas();
  configurarNavegacion();
  configurarEventosFormularios();
  configurarEventoLogin();
  configurarEventosRecetas();
  configurarEventoLogout();
  actualizarNav();
}

async function cargarCategorias() {
  const categorias = await api.obtenerCategoriasDisponibles();
  categorias.sort((a, b) => a.localeCompare(b));

  if (selectCats) {
    categorias.forEach((cat) => {
      const opcion = document.createElement("option");
      opcion.value = cat;
      opcion.textContent = cat;
      selectCats.appendChild(opcion);
    });
  }
}

function cargarCategoriasPrivadas() {
  const categorias = Array.from(selectCats?.options || []).map(
    (opt) => opt.value,
  );
  categorias.sort((a, b) => a.localeCompare(b));

  if (selectCatsPriv) {
    selectCatsPriv.innerHTML = '<option value="todas">Todas</option>';
    categorias.forEach((cat) => {
      if (cat !== "todas") {
        const opcion = document.createElement("option");
        opcion.value = cat;
        opcion.textContent = cat;
        selectCatsPriv.appendChild(opcion);
      }
    });
  }
}

async function cargarRecetas(cat: string) {
  let recetasFinales: MyMeal[] = [];

  if (cat === "todas") {
    for (let i = 0; i < 8; i++) {
      const receta = await api.obtenerRecetasAleatorias();
      recetasFinales.push(receta);
    }
  } else {
    recetasFinales = await api.obtenerRecetasPorCategoria(cat);
  }

  const estaLogueado: boolean = storage.obtenerUsuarioLogueado() !== null;
  recetasActuales = recetasFinales;
  view.renderizarListado(recetasContainer, recetasFinales, estaLogueado);
}

function cargarFavoritosPriv(cat: string = "todas") {
  let misFavoritos = storage.obtenerRecetasFavoritaUser();

  if (cat !== "todas") {
    misFavoritos = misFavoritos.filter((r) => r.strCategory === cat);
  }

  // Solo las 4 últimas
  const ultimasCuatro = [...misFavoritos].reverse().slice(0, 4);

  if (recetasContainerPriv) {
    view.renderizarListado(recetasContainerPriv, ultimasCuatro, true, true);
  }
}

function cargarFavoritos() {
  cargarFavoritosPriv("todas");
}

function mostrarSeccion(seccionAMostrar: HTMLElement) {
  if (seccionBienvenida) seccionBienvenida.classList.add("d-none");
  if (seccionLogin) seccionLogin.classList.add("d-none");
  if (seccionAMostrar) seccionAMostrar.classList.remove("d-none");
}

function mostrarSeccionPrivada(mostrarFavoritos: boolean = true) {
  if (mostrarFavoritos) {
    if (seccionFavoritosPriv) seccionFavoritosPriv.classList.remove("d-none");
    if (seccionPlanSemanalPriv) seccionPlanSemanalPriv.classList.add("d-none");
  } else {
    if (seccionFavoritosPriv) seccionFavoritosPriv.classList.add("d-none");
    if (seccionPlanSemanalPriv) seccionPlanSemanalPriv.classList.remove("d-none");
  }
}

function configurarZonas() {
  const usuarioLogueado = storage.obtenerUsuarioLogueado();

  if (usuarioLogueado) {
    if (zonaPublica) zonaPublica.classList.add("d-none");
    if (zonaPrivada) zonaPrivada.classList.remove("d-none");
    cargarFavoritos();
    cargarCategoriasPrivadas();
    mostrarSeccionPrivada(true);
  } else {
    if (zonaPrivada) zonaPrivada.classList.add("d-none");
    if (zonaPublica) zonaPublica.classList.remove("d-none");
    mostrarSeccion(seccionBienvenida);
  }

  actualizarNav();
}

function configurarNavegacion() {
  if (linkBienvenida) {
    linkBienvenida.addEventListener("click", (e) => {
      e.preventDefault();
      if (zonaPrivada && zonaPrivada.classList.contains("d-none") === false) {
        // Estamos en zona privada, cambiar a pública
        if (zonaPrivada) zonaPrivada.classList.add("d-none");
        if (zonaPublica) zonaPublica.classList.remove("d-none");
        cargarRecetas("todas");
      }
      mostrarSeccion(seccionBienvenida);
    });
  }

  if (linkFavoritos) {
    linkFavoritos.addEventListener("click", (e) => {
      e.preventDefault();
      const usuarioLogueado = storage.obtenerUsuarioLogueado();
      if (usuarioLogueado) {
        if (zonaPublica) zonaPublica.classList.add("d-none");
        if (zonaPrivada) zonaPrivada.classList.remove("d-none");
        cargarFavoritos();
        cargarCategoriasPrivadas();
        mostrarSeccionPrivada(true);
      } else {
        mostrarSeccion(seccionLogin);
      }
    });
  }

  if (selectCatsPriv) {
    selectCatsPriv.addEventListener("change", async () => {
      const seleccion = selectCatsPriv.value;
      cargarFavoritosPriv(seleccion);
    });
  }

  if (linkLoginOregister) {
    linkLoginOregister.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarSeccion(seccionLogin);
    });
  }
}

function configurarEventosFormularios() {
  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = Utilities.limpiarTexto(nombreUser.value);
      const correo = Utilities.limpiarTexto(correoRegistro.value);
      const pass = passRegistro.value;

      const errorFormato = Utilities.validarFormulario(nombre, correo, pass);

      if (errorFormato !== "OK") {
        if (alertRegistro) {
          view.mostrarAviso(alertRegistro, errorFormato, "danger");
          alertRegistro.style.display = "block";
        }
        return;
      }

      const exito = storage.registrarUsuario(nombre, correo, pass);
      if (!exito) {
        if (alertRegistro)
          view.mostrarAviso(
            alertRegistro,
            "El correo ya está registrado.",
            "danger",
          );
      } else {
        if (alertRegistro)
          view.mostrarAviso(
            alertRegistro,
            "¡Usuario creado! Ya puedes loguearte.",
            "success",
          );
        formRegistro.reset();
      }
    });
  }
}

function configurarEventoLogin() {
  const formLogin = document.getElementById("formLogin") as HTMLFormElement;
  const alertLogin = document.getElementById("alertLogin") as HTMLElement;

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const correo = (document.getElementById("logEmail") as HTMLInputElement)
        .value;
      const pass = (document.getElementById("logPass") as HTMLInputElement)
        .value;

      const loginCorrecto = storage.loguearUsuario(correo, pass);

      if (loginCorrecto) {
        const user = storage.obtenerUsuarioLogueado();
        if (alertLogin)
          view.mostrarAviso(
            alertLogin,
            `¡Bienvenido, ${user?.name}!`,
            "success",
          );

        setTimeout(() => {
          configurarZonas();
        }, 1000);
      } else {
        if (alertLogin)
          view.mostrarAviso(alertLogin, "Error de acceso.", "danger");
      }
    });
  }
}

function configurarEventosRecetas() {
  // Eventos para el contenedor PÚBLICO
  if (recetasContainer) {
    recetasContainer.addEventListener("click", async (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("btn-guardar-favorito")) {
        const idMeal = target.getAttribute("data-id");
        const usuarioLogueado = storage.obtenerUsuarioLogueado();

        if (!usuarioLogueado) {
          alert("Inicia sesión para guardar favoritos.");
          mostrarSeccion(seccionLogin);
          return;
        }

        if (idMeal) {
          const recetaAGuardar = recetasActuales.find(
            (r) => r.idMeal === Number(idMeal),
          );
          if (recetaAGuardar) {
            const exito = storage.guardarRecetaFav(recetaAGuardar);
            if (exito) {
              target.textContent = "Guardada";
              target.classList.replace("btn-outline-danger", "btn-success");
            } else {
              alert("Ya está en favoritos.");
            }
          }
        }
      }
    });
  }

  // Eventos para el contenedor PRIVADO
  if (recetasContainerPriv) {
    recetasContainerPriv.addEventListener("click", async (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("btn-guardar-favorito")) {
        const idMeal = target.getAttribute("data-id");
        // Aquí podrías añadir la lógica de QUITAR favorito si quieres
        console.log("Clic en favorito de zona privada ID:", idMeal);
      }
    });
  }
}

function configurarEventoLogout() {
  if (linkLogout) {
    linkLogout.addEventListener("click", (e) => {
      e.preventDefault();
      storage.cerrarSession();
      configurarZonas();
      cargarRecetas("todas");
    });
  }
}

init();
