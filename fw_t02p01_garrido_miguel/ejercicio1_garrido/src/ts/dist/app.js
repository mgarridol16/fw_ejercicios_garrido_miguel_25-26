"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
debugger;
console.log("Inicio de la App de comidas");
var ApiService_js_1 = require("./ApiService.js");
var ViewService_js_1 = require("./ViewService.js");
var Utilities_js_1 = require("./Utilities.js");
var StorageService_js_1 = require("./StorageService.js");
var api = new ApiService_js_1.ApiService();
var view = new ViewService_js_1.ViewService();
var storage = new StorageService_js_1.StorageService();
var selectCats = document.getElementById("categoriasOrdenadas");
var recetasContainer = document.getElementById("recetasContainer");
var linkBienvenida = document.getElementById("link-bienvenida");
var zonaPublica = document.querySelector(".zonaPublica"); // el . por que es una clase
var linkFavoritos = document.getElementById("link-favoritos");
var seccionBienvenida = document.querySelector(".seccion-bienvenida");
var seccionLogin = document.querySelector(".seccion-iniciarOregistrarSesion");
// Elementos del formulario de Registro
var formRegistro = document.getElementById("formRegistro");
var nombreUser = document.getElementById("nombreUser");
var correoRegistro = document.getElementById("correoRegistro");
var passRegistro = document.getElementById("passwordRegistro");
var rePassRegistro = document.getElementById("repassword");
var alertRegistro = document.getElementById("alertRegistro");
var linkLogout = document.getElementById("link-logout");
//arranque de la app
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Iniciando la app...");
                    return [4 /*yield*/, cargarCategorias()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, cargarRecetas("todas")];
                case 2:
                    _a.sent();
                    // Activamos el selector
                    selectCats.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
                        var seleccion;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    seleccion = selectCats.value;
                                    recetasContainer.innerHTML = "";
                                    return [4 /*yield*/, cargarRecetas(seleccion)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    // ACTIVAMOS LA NAVEGACIÓN
                    configurarNavegacion();
                    configurarEventosFormularios();
                    configurarEventoLogin();
                    configurarEventosRecetas();
                    configurarEventoLogout();
                    actualizarMenu();
                    return [2 /*return*/];
            }
        });
    });
}
function cargarCategorias() {
    return __awaiter(this, void 0, void 0, function () {
        var categorias;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.obtenerCategoriasDisponibles()];
                case 1:
                    categorias = _a.sent();
                    //ordenamos alfabeticamente antes de mostrarlas en el select
                    categorias.sort(function (a, b) { return a.localeCompare(b); });
                    categorias.forEach(function (cat) {
                        var opcion = document.createElement("option");
                        opcion.value = cat;
                        opcion.textContent = cat;
                        selectCats.appendChild(opcion);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// En app.ts
function cargarRecetas(cat) {
    return __awaiter(this, void 0, void 0, function () {
        var recetasFinales, i, receta, estaLogueado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recetasFinales = [];
                    if (!(cat === "todas")) return [3 /*break*/, 5];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 8)) return [3 /*break*/, 4];
                    return [4 /*yield*/, api.obtenerRecetasAleatorias()];
                case 2:
                    receta = _a.sent();
                    recetasFinales.push(receta);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, api.obtenerRecetasPorCategoria(cat)];
                case 6:
                    // Ahora este método ya existe y no dará error
                    recetasFinales = _a.sent();
                    _a.label = 7;
                case 7:
                    estaLogueado = storage.obtenerUsuarioLogueado() !== null;
                    view.renderizarListado(recetasContainer, recetasFinales, estaLogueado);
                    return [2 /*return*/];
            }
        });
    });
}
// Pista para el orquestador en app.ts
// En app.ts (donde salga el error)
function cargarFavoritos() {
    var misFavoritos = storage.obtenerRecetasFavoritaUser();
    // 1. Calculamos el estado (igual que hiciste en cargarRecetas)
    var estaLogueado = true;
    // 2. Pasamos los TRES argumentos
    view.renderizarListado(recetasContainer, misFavoritos, estaLogueado);
}
function configurarNavegacion() {
    var _this = this;
    if (linkBienvenida) {
        linkBienvenida.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Añadimos async
                        e.preventDefault();
                        mostrarSeccion(seccionBienvenida);
                        // REQUISITO: Volver a cargar las recetas generales
                        console.log("Volviendo a la home...");
                        return [4 /*yield*/, cargarRecetas("todas")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
    if (linkFavoritos) {
        linkFavoritos.addEventListener("click", function (e) {
            e.preventDefault();
            var usuarioLogueado = storage.obtenerUsuarioLogueado();
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
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();
            // 1. Limpieza inicial (KISS)
            var nombre = Utilities_js_1.Utilities.limpiarTexto(nombreUser.value);
            var correo = Utilities_js_1.Utilities.limpiarTexto(correoRegistro.value);
            var pass = passRegistro.value;
            var rePass = rePassRegistro.value;
            // 2. Validación centralizada
            var errorFormato = Utilities_js_1.Utilities.validarFormulario(nombre, correo, pass);
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
            var exito = storage.registrarUsuario(nombre, correo, pass);
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
    var formLogin = document.getElementById("formLogin");
    var alertLogin = document.getElementById("alertLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            var correo = document.getElementById("correoLogin").value;
            var pass = document.getElementById("passwordLogin").value;
            var loginCorrecto = storage.loguearUsuario(correo, pass);
            if (loginCorrecto) {
                var user = storage.obtenerUsuarioLogueado();
                view.mostrarAviso(alertLogin, "\u00A1Bienvenido, " + (user === null || user === void 0 ? void 0 : user.name) + "! Redirigiendo...", "success");
                // 1. Forzamos visibilidad
                alertLogin.style.display = "block";
                // 2. Aseguramos que no tenga clases que lo oculten
                alertLogin.classList.add("show");
                setTimeout(function () {
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
    var _this = this;
    if (recetasContainer) {
        recetasContainer.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
            var target, idMeal, usuarioLogueado;
            return __generator(this, function (_a) {
                target = e.target;
                // 1. Detectamos si el clic fue en el botón de Favoritos
                if (target.classList.contains("btn-guardar-favorito")) {
                    idMeal = target.getAttribute("data-id");
                    usuarioLogueado = storage.obtenerUsuarioLogueado();
                    // 2. Control de acceso: Solo si está logueado (Regla del enunciado)
                    if (!usuarioLogueado) {
                        alert("Debes iniciar sesión para guardar favoritos.");
                        mostrarSeccion(seccionLogin);
                        return [2 /*return*/];
                    }
                    if (idMeal) {
                        console.log("Intentando guardar receta ID:", idMeal);
                        // Aquí llamarás a tu método de storage para guardar
                        // storage.guardarRecetaFav(idMeal);
                    }
                }
                return [2 /*return*/];
            });
        }); });
    }
}
function configurarEventoLogout() {
    var linkLogout = document.getElementById("link-logout");
    if (linkLogout) {
        linkLogout.addEventListener("click", function (e) {
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
    var usuarioLogueado = storage.obtenerUsuarioLogueado();
    var linkLogout = document.getElementById("link-logout");
    var linkFavoritos = document.getElementById("link-favoritos");
    if (usuarioLogueado) {
        // Si hay usuario: mostramos Logout y Favoritos (si estuviera oculto)
        linkLogout === null || linkLogout === void 0 ? void 0 : linkLogout.classList.remove("d-none");
        console.log("Menú actualizado: Usuario dentro");
    }
    else {
        // Si no hay usuario: ocultamos Logout
        linkLogout === null || linkLogout === void 0 ? void 0 : linkLogout.classList.add("d-none");
        console.log("Menú actualizado: Modo público");
    }
}
init();
