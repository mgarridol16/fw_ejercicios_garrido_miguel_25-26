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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
// --- SELECTORES ---
var selectCats = document.getElementById("categoriasPub");
var selectCatsPriv = document.getElementById("categoriasPriv");
var recetasContainer = document.getElementById("recetasContainerPub");
var recetasContainerPriv = document.getElementById("recetasContainerPriv");
var linkBienvenida = document.getElementById("btn-home-pub");
var linkFavoritos = document.getElementById("link-favoritos");
var linkLoginOregister = document.getElementById("btn-login-nav");
var navUserInfo = document.getElementById("nav-user-info");
var navLoginItem = document.getElementById("nav-login-item");
var navLogoutItem = document.getElementById("nav-logout-item");
var nombreUserLogNav = document.getElementById("nombreUserLog");
var zonaPublica = document.getElementById("zonaPublica");
var zonaPrivada = document.getElementById("zonaPrivada");
var seccionBienvenida = document.getElementById("sec-bienvenida-pub");
var seccionLogin = document.getElementById("sec-auth");
var seccionFavoritosPriv = document.getElementById("sec-favoritos-priv");
var seccionPlanSemanalPriv = document.getElementById("sec-plan-semanal-priv");
var formRegistro = document.getElementById("formRegistro");
var nombreUser = document.getElementById("regNombre");
var correoRegistro = document.getElementById("regEmail");
var passRegistro = document.getElementById("regPass");
var alertRegistro = document.getElementById("alertRegistro");
var linkLogout = document.getElementById("btnLogout");
function actualizarNav() {
    var usuarioLogueado = storage.obtenerUsuarioLogueado();
    if (usuarioLogueado) {
        if (navLoginItem)
            navLoginItem.classList.add("d-none");
        if (navLogoutItem)
            navLogoutItem.classList.remove("d-none");
        if (navUserInfo)
            navUserInfo.classList.remove("d-none");
        if (nombreUserLogNav)
            nombreUserLogNav.textContent = usuarioLogueado.name;
    }
    else {
        if (navLoginItem)
            navLoginItem.classList.remove("d-none");
        if (navLogoutItem)
            navLogoutItem.classList.add("d-none");
        if (navUserInfo)
            navUserInfo.classList.add("d-none");
    }
}
var recetasActuales = [];
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
                    if (selectCats) {
                        selectCats.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
                            var seleccion;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        seleccion = selectCats.value;
                                        return [4 /*yield*/, cargarRecetas(seleccion)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    configurarZonas();
                    configurarNavegacion();
                    configurarEventosFormularios();
                    configurarEventoLogin();
                    configurarEventosRecetas();
                    configurarEventoLogout();
                    actualizarNav();
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
                    categorias.sort(function (a, b) { return a.localeCompare(b); });
                    if (selectCats) {
                        categorias.forEach(function (cat) {
                            var opcion = document.createElement("option");
                            opcion.value = cat;
                            opcion.textContent = cat;
                            selectCats.appendChild(opcion);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function cargarCategoriasPrivadas() {
    var categorias = Array.from((selectCats === null || selectCats === void 0 ? void 0 : selectCats.options) || []).map(function (opt) { return opt.value; });
    categorias.sort(function (a, b) { return a.localeCompare(b); });
    if (selectCatsPriv) {
        selectCatsPriv.innerHTML = '<option value="todas">Todas</option>';
        categorias.forEach(function (cat) {
            if (cat !== "todas") {
                var opcion = document.createElement("option");
                opcion.value = cat;
                opcion.textContent = cat;
                selectCatsPriv.appendChild(opcion);
            }
        });
    }
}
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
                    recetasFinales = _a.sent();
                    _a.label = 7;
                case 7:
                    estaLogueado = storage.obtenerUsuarioLogueado() !== null;
                    recetasActuales = recetasFinales;
                    view.renderizarListado(recetasContainer, recetasFinales, estaLogueado);
                    return [2 /*return*/];
            }
        });
    });
}
function cargarFavoritosPriv(cat) {
    if (cat === void 0) { cat = "todas"; }
    var misFavoritos = storage.obtenerRecetasFavoritaUser();
    if (cat !== "todas") {
        misFavoritos = misFavoritos.filter(function (r) { return r.strCategory === cat; });
    }
    // Solo las 4 últimas
    var ultimasCuatro = __spreadArrays(misFavoritos).reverse().slice(0, 4);
    if (recetasContainerPriv) {
        view.renderizarListado(recetasContainerPriv, ultimasCuatro, true, true);
    }
}
function cargarFavoritos() {
    cargarFavoritosPriv("todas");
}
function mostrarSeccion(seccionAMostrar) {
    if (seccionBienvenida)
        seccionBienvenida.classList.add("d-none");
    if (seccionLogin)
        seccionLogin.classList.add("d-none");
    if (seccionAMostrar)
        seccionAMostrar.classList.remove("d-none");
}
function mostrarSeccionPrivada(mostrarFavoritos) {
    if (mostrarFavoritos === void 0) { mostrarFavoritos = true; }
    if (mostrarFavoritos) {
        if (seccionFavoritosPriv)
            seccionFavoritosPriv.classList.remove("d-none");
        if (seccionPlanSemanalPriv)
            seccionPlanSemanalPriv.classList.add("d-none");
    }
    else {
        if (seccionFavoritosPriv)
            seccionFavoritosPriv.classList.add("d-none");
        if (seccionPlanSemanalPriv)
            seccionPlanSemanalPriv.classList.remove("d-none");
    }
}
function configurarZonas() {
    var usuarioLogueado = storage.obtenerUsuarioLogueado();
    if (usuarioLogueado) {
        if (zonaPublica)
            zonaPublica.classList.add("d-none");
        if (zonaPrivada)
            zonaPrivada.classList.remove("d-none");
        cargarFavoritos();
        cargarCategoriasPrivadas();
        mostrarSeccionPrivada(true);
    }
    else {
        if (zonaPrivada)
            zonaPrivada.classList.add("d-none");
        if (zonaPublica)
            zonaPublica.classList.remove("d-none");
        mostrarSeccion(seccionBienvenida);
    }
    actualizarNav();
}
function configurarNavegacion() {
    var _this = this;
    if (linkBienvenida) {
        linkBienvenida.addEventListener("click", function (e) {
            e.preventDefault();
            if (zonaPrivada && zonaPrivada.classList.contains("d-none") === false) {
                // Estamos en zona privada, cambiar a pública
                if (zonaPrivada)
                    zonaPrivada.classList.add("d-none");
                if (zonaPublica)
                    zonaPublica.classList.remove("d-none");
                cargarRecetas("todas");
            }
            mostrarSeccion(seccionBienvenida);
        });
    }
    if (linkFavoritos) {
        linkFavoritos.addEventListener("click", function (e) {
            e.preventDefault();
            var usuarioLogueado = storage.obtenerUsuarioLogueado();
            if (usuarioLogueado) {
                if (zonaPublica)
                    zonaPublica.classList.add("d-none");
                if (zonaPrivada)
                    zonaPrivada.classList.remove("d-none");
                cargarFavoritos();
                cargarCategoriasPrivadas();
                mostrarSeccionPrivada(true);
            }
            else {
                mostrarSeccion(seccionLogin);
            }
        });
    }
    if (selectCatsPriv) {
        selectCatsPriv.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
            var seleccion;
            return __generator(this, function (_a) {
                seleccion = selectCatsPriv.value;
                cargarFavoritosPriv(seleccion);
                return [2 /*return*/];
            });
        }); });
    }
    if (linkLoginOregister) {
        linkLoginOregister.addEventListener("click", function (e) {
            e.preventDefault();
            mostrarSeccion(seccionLogin);
        });
    }
}
function configurarEventosFormularios() {
    if (formRegistro) {
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();
            var nombre = Utilities_js_1.Utilities.limpiarTexto(nombreUser.value);
            var correo = Utilities_js_1.Utilities.limpiarTexto(correoRegistro.value);
            var pass = passRegistro.value;
            var errorFormato = Utilities_js_1.Utilities.validarFormulario(nombre, correo, pass);
            if (errorFormato !== "OK") {
                if (alertRegistro) {
                    view.mostrarAviso(alertRegistro, errorFormato, "danger");
                    alertRegistro.style.display = "block";
                }
                return;
            }
            var exito = storage.registrarUsuario(nombre, correo, pass);
            if (!exito) {
                if (alertRegistro)
                    view.mostrarAviso(alertRegistro, "El correo ya está registrado.", "danger");
            }
            else {
                if (alertRegistro)
                    view.mostrarAviso(alertRegistro, "¡Usuario creado! Ya puedes loguearte.", "success");
                formRegistro.reset();
            }
        });
    }
}
function configurarEventoLogin() {
    var formLogin = document.getElementById("formLogin");
    var alertLogin = document.getElementById("alertLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            var correo = document.getElementById("logEmail")
                .value;
            var pass = document.getElementById("logPass")
                .value;
            var loginCorrecto = storage.loguearUsuario(correo, pass);
            if (loginCorrecto) {
                var user = storage.obtenerUsuarioLogueado();
                if (alertLogin)
                    view.mostrarAviso(alertLogin, "\u00A1Bienvenido, " + (user === null || user === void 0 ? void 0 : user.name) + "!", "success");
                setTimeout(function () {
                    configurarZonas();
                }, 1000);
            }
            else {
                if (alertLogin)
                    view.mostrarAviso(alertLogin, "Error de acceso.", "danger");
            }
        });
    }
}
function configurarEventosRecetas() {
    var _this = this;
    // Eventos para el contenedor PÚBLICO
    if (recetasContainer) {
        recetasContainer.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
            var target, idMeal_1, usuarioLogueado, recetaAGuardar, exito;
            return __generator(this, function (_a) {
                target = e.target;
                if (target.classList.contains("btn-guardar-favorito")) {
                    idMeal_1 = target.getAttribute("data-id");
                    usuarioLogueado = storage.obtenerUsuarioLogueado();
                    if (!usuarioLogueado) {
                        alert("Inicia sesión para guardar favoritos.");
                        mostrarSeccion(seccionLogin);
                        return [2 /*return*/];
                    }
                    if (idMeal_1) {
                        recetaAGuardar = recetasActuales.find(function (r) { return r.idMeal === Number(idMeal_1); });
                        if (recetaAGuardar) {
                            exito = storage.guardarRecetaFav(recetaAGuardar);
                            if (exito) {
                                target.textContent = "Guardada";
                                target.classList.replace("btn-outline-danger", "btn-success");
                            }
                            else {
                                alert("Ya está en favoritos.");
                            }
                        }
                    }
                }
                return [2 /*return*/];
            });
        }); });
    }
    // Eventos para el contenedor PRIVADO
    if (recetasContainerPriv) {
        recetasContainerPriv.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
            var target, idMeal;
            return __generator(this, function (_a) {
                target = e.target;
                if (target.classList.contains("btn-guardar-favorito")) {
                    idMeal = target.getAttribute("data-id");
                    // Aquí podrías añadir la lógica de QUITAR favorito si quieres
                    console.log("Clic en favorito de zona privada ID:", idMeal);
                }
                return [2 /*return*/];
            });
        }); });
    }
}
function configurarEventoLogout() {
    if (linkLogout) {
        linkLogout.addEventListener("click", function (e) {
            e.preventDefault();
            storage.cerrarSession();
            configurarZonas();
            cargarRecetas("todas");
        });
    }
}
init();
