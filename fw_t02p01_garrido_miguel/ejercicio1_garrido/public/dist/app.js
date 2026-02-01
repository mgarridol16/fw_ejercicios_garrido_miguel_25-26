debugger;
console.log("Inicio de la App de comidas");
import { ApiService } from "./ApiService.js";
import { ViewService } from "./ViewService.js";
import { Utilities } from "./Utilities.js";
import { StorageService } from "./StorageService.js";
const api = new ApiService();
const view = new ViewService();
const storage = new StorageService();
const selectCats = document.getElementById("categoriasOrdenadas");
const recetasContainer = document.getElementById("recetasContainer");
const linkBienvenida = document.getElementById("link-bienvenida");
const zonaPublica = document.querySelector(".zonaPublica"); // el . por que es una clase
const linkFavoritos = document.getElementById("link-favoritos");
const seccionBienvenida = document.querySelector(".seccion-bienvenida");
const seccionLogin = document.querySelector(".seccion-iniciarOregistrarSesion");
// Elementos del formulario de Registro
const formRegistro = document.getElementById("formRegistro");
const nombreUser = document.getElementById("nombreUser");
const correoRegistro = document.getElementById("correoRegistro");
const passRegistro = document.getElementById("passwordRegistro");
const rePassRegistro = document.getElementById("repassword");
const alertRegistro = document.getElementById("alertRegistro");
const linkLogout = document.getElementById("link-logout");
//arranque de la app
async function init() {
    console.log("Iniciando la app...");
    await cargarCategorias();
    await cargarRecetas("todas");
    // Activamos el selector
    selectCats.addEventListener("change", async () => {
        const seleccion = selectCats.value;
        recetasContainer.innerHTML = "";
        await cargarRecetas(seleccion);
    });
    // ACTIVAMOS LA NAVEGACIÓN
    configurarNavegacion();
    configurarEventosFormularios();
    configurarEventoLogin();
    configurarEventosRecetas();
    configurarEventoLogout();
    actualizarMenu();
}
async function cargarCategorias() {
    const categorias = await api.obtenerCategoriasDisponibles();
    //ordenamos alfabeticamente antes de mostrarlas en el select
    categorias.sort((a, b) => a.localeCompare(b));
    categorias.forEach((cat) => {
        const opcion = document.createElement("option");
        opcion.value = cat;
        opcion.textContent = cat;
        selectCats.appendChild(opcion);
    });
}
// En app.ts
async function cargarRecetas(cat) {
    let recetasFinales = [];
    if (cat === "todas") {
        for (let i = 0; i < 8; i++) {
            const receta = await api.obtenerRecetasAleatorias();
            recetasFinales.push(receta);
        }
    }
    else {
        // Ahora este método ya existe y no dará error
        recetasFinales = await api.obtenerRecetasPorCategoria(cat);
    }
    const estaLogueado = storage.obtenerUsuarioLogueado() !== null;
    view.renderizarListado(recetasContainer, recetasFinales, estaLogueado);
}
// Pista para el orquestador en app.ts
// En app.ts (donde salga el error)
function cargarFavoritos() {
    const misFavoritos = storage.obtenerRecetasFavoritaUser();
    // 1. Calculamos el estado (igual que hiciste en cargarRecetas)
    const estaLogueado = true;
    // 2. Pasamos los TRES argumentos
    view.renderizarListado(recetasContainer, misFavoritos, estaLogueado);
}
function configurarNavegacion() {
    if (linkBienvenida) {
        linkBienvenida.addEventListener("click", async (e) => {
            // Añadimos async
            e.preventDefault();
            mostrarSeccion(seccionBienvenida);
            // REQUISITO: Volver a cargar las recetas generales
            console.log("Volviendo a la home...");
            await cargarRecetas("todas");
        });
    }
    if (linkFavoritos) {
        linkFavoritos.addEventListener("click", (e) => {
            e.preventDefault();
            const usuarioLogueado = storage.obtenerUsuarioLogueado();
            if (usuarioLogueado) {
                mostrarSeccion(seccionBienvenida); // Aseguramos que el contenedor sea visible
                cargarFavoritos();
            }
            else {
                mostrarSeccion(seccionLogin);
            }
        });
    }
}
function mostrarSeccion(seccionAMostrar) {
    // Primero ocultamos todas las secciones principales
    seccionBienvenida.classList.add("d-none");
    seccionLogin.classList.add("d-none");
    // Luego mostramos solo la que queremos
    seccionAMostrar.classList.remove("d-none");
}
function configurarEventosFormularios() {
    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();
            // 1. Limpieza inicial (KISS)
            const nombre = Utilities.limpiarTexto(nombreUser.value);
            const correo = Utilities.limpiarTexto(correoRegistro.value);
            const pass = passRegistro.value;
            const rePass = rePassRegistro.value;
            // 2. Validación centralizada
            const errorFormato = Utilities.validarFormulario(nombre, correo, pass);
            if (errorFormato !== "OK") {
                view.mostrarAviso(alertRegistro, errorFormato, "danger");
                // Mostramos el contenedor
                alertRegistro.style.display = "block";
                // Forzamos las clases de visibilidad de Bootstrap por si acaso
                alertRegistro.classList.add("show", "fade");
                // Hacemos scroll para que el usuario lo vea
                alertRegistro.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
            // 3. Validaciones específicas del enunciado
            if (pass !== rePass) {
                view.mostrarAviso(alertRegistro, "La revalidación no coincide.", "danger");
                alertRegistro.style.display = "block";
                return;
            }
            if (pass.length < 4) {
                view.mostrarAviso(alertRegistro, "Mínimo 4 caracteres requeridos.", "danger");
                alertRegistro.style.display = "block";
                return;
            }
            // 4. Ejecución del registro
            const exito = storage.registrarUsuario(nombre, correo, pass);
            if (!exito) {
                view.mostrarAviso(alertRegistro, "El correo ya está registrado.", "danger");
            }
            else {
                view.mostrarAviso(alertRegistro, "¡Usuario creado! Ya puedes loguearte.", "success");
                formRegistro.reset();
            }
            alertRegistro.style.display = "block";
        });
    }
}
function configurarEventoLogin() {
    const formLogin = document.getElementById("formLogin");
    const alertLogin = document.getElementById("alertLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const correo = document.getElementById("correoLogin").value;
            const pass = document.getElementById("passwordLogin").value;
            const loginCorrecto = storage.loguearUsuario(correo, pass);
            if (loginCorrecto) {
                const user = storage.obtenerUsuarioLogueado();
                view.mostrarAviso(alertLogin, `¡Bienvenido, ${user?.name}! Redirigiendo...`, "success");
                // 1. Forzamos visibilidad
                alertLogin.style.display = "block";
                // 2. Aseguramos que no tenga clases que lo oculten
                alertLogin.classList.add("show");
                setTimeout(() => {
                    actualizarMenu();
                    mostrarSeccion(seccionBienvenida);
                }, 1500);
            }
            else {
                view.mostrarAviso(alertLogin, "Correo o contraseña incorrectos.", "danger");
                alertLogin.style.display = "block";
                alertLogin.classList.add("show");
            }
        });
    }
}
function configurarEventosRecetas() {
    if (recetasContainer) {
        recetasContainer.addEventListener("click", async (e) => {
            const target = e.target;
            // 1. Detectamos si el clic fue en el botón de Favoritos
            if (target.classList.contains("btn-guardar-favorito")) {
                const idMeal = target.getAttribute("data-id");
                const usuarioLogueado = storage.obtenerUsuarioLogueado();
                // 2. Control de acceso: Solo si está logueado (Regla del enunciado)
                if (!usuarioLogueado) {
                    alert("Debes iniciar sesión para guardar favoritos.");
                    mostrarSeccion(seccionLogin);
                    return;
                }
                if (idMeal) {
                    console.log("Intentando guardar receta ID:", idMeal);
                    // Aquí llamarás a tu método de storage para guardar
                    // storage.guardarRecetaFav(idMeal);
                }
            }
        });
    }
}
function configurarEventoLogout() {
    const linkLogout = document.getElementById("link-logout");
    if (linkLogout) {
        linkLogout.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Cerrando sesión...");
            storage.cerrarSession();
            actualizarMenu(); // <-- Añadir aquí
            mostrarSeccion(seccionBienvenida);
            cargarRecetas("todas");
        });
    }
}
function actualizarMenu() {
    const usuarioLogueado = storage.obtenerUsuarioLogueado();
    const linkLogout = document.getElementById("link-logout");
    const linkFavoritos = document.getElementById("link-favoritos");
    if (usuarioLogueado) {
        // Si hay usuario: mostramos Logout y Favoritos (si estuviera oculto)
        linkLogout?.classList.remove("d-none");
        console.log("Menú actualizado: Usuario dentro");
    }
    else {
        // Si no hay usuario: ocultamos Logout
        linkLogout?.classList.add("d-none");
        console.log("Menú actualizado: Modo público");
    }
}
init();
//# sourceMappingURL=app.js.map