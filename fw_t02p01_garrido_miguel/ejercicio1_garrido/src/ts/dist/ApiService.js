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
console.log("Clase ApiService");
var ApiService = /** @class */ (function () {
    function ApiService() {
        this.API_KEY = "1";
        this.API_URL = "https://www.themealdb.com/api/json/v1/" + this.API_KEY + "/";
    }
    //RECETAS ALEATORIAS
    ApiService.prototype.obtenerRecetasAleatorias = function () {
        return __awaiter(this, void 0, Promise, function () {
            var endpoint, respuesta, datos, plato, listIngredientes, i, nombreIngrediente, medidaIngrediente, respuestaPlato;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "random.php";
                        return [4 /*yield*/, fetch("" + this.API_URL + endpoint)];
                    case 1:
                        respuesta = _a.sent();
                        if (!respuesta.ok) {
                            throw new Error("Error en la petici\u00F3n: " + respuesta.status);
                        }
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        datos = _a.sent();
                        plato = datos.meals[0];
                        listIngredientes = [];
                        for (i = 1; i <= 20; i++) {
                            nombreIngrediente = plato["strIngredient" + i];
                            medidaIngrediente = plato["strMeasure" + i];
                            if (nombreIngrediente && nombreIngrediente.trim() !== "") {
                                listIngredientes.push({
                                    name: nombreIngrediente,
                                    measure: medidaIngrediente
                                });
                            }
                        }
                        listIngredientes.sort(function (a, b) { return a.name.localeCompare(b.name); });
                        respuestaPlato = {
                            idMeal: Number(plato.idMeal),
                            strMeal: plato.strMeal,
                            strCategory: plato.strCategory,
                            strArea: plato.strArea,
                            strMealThumb: plato.strMealThumb,
                            ingredients: listIngredientes
                        };
                        return [2 /*return*/, respuestaPlato];
                }
            });
        });
    };
    //RECETAS POR INGREDIENTES
    ApiService.prototype.obtenerRecetasPorIngrediente = function (ingrediente) {
        return __awaiter(this, void 0, Promise, function () {
            var endpoint, respuesta, datos, maxRecetas, listaRecetas, i, id, receta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "filter.php?i=" + ingrediente;
                        return [4 /*yield*/, fetch("" + this.API_URL + endpoint)];
                    case 1:
                        respuesta = _a.sent();
                        if (!respuesta.ok) {
                            throw new Error("Error en la petici\u00F3n: " + respuesta.status);
                        }
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        datos = _a.sent();
                        if (!datos.meals) {
                            return [2 /*return*/, []];
                        }
                        maxRecetas = 8;
                        listaRecetas = [];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < maxRecetas && i < datos.meals.length)) return [3 /*break*/, 6];
                        id = Number(datos.meals[i].idMeal);
                        return [4 /*yield*/, this.obtenerRecetaPorID(id)];
                    case 4:
                        receta = _a.sent();
                        listaRecetas.push(receta);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        listaRecetas.sort(function (a, b) { return a.strMeal.localeCompare(b.strMeal); });
                        return [2 /*return*/, listaRecetas];
                }
            });
        });
    };
    //RECETAS POR ID
    ApiService.prototype.obtenerRecetaPorID = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var endpoint, respuesta, datos, plato, listIngredientes, i, nombreIngrediente, medidaIngrediente, respuestaPlato;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "lookup.php?i=" + id;
                        return [4 /*yield*/, fetch("" + this.API_URL + endpoint)];
                    case 1:
                        respuesta = _a.sent();
                        if (!respuesta.ok) {
                            throw new Error("Error en la peticion: " + respuesta.status);
                        }
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        datos = _a.sent();
                        if (!datos.meals) {
                            throw new Error("Error no tiene datos la peticion");
                        }
                        plato = datos.meals[0];
                        listIngredientes = [];
                        for (i = 1; i <= 20; i++) {
                            nombreIngrediente = plato["strIngredient" + i];
                            medidaIngrediente = plato["strMeasure" + i];
                            if (nombreIngrediente && nombreIngrediente.trim() !== "") {
                                listIngredientes.push({
                                    name: nombreIngrediente,
                                    measure: medidaIngrediente
                                });
                            }
                        }
                        listIngredientes.sort(function (a, b) { return a.name.localeCompare(b.name); });
                        respuestaPlato = {
                            idMeal: Number(plato.idMeal),
                            strMeal: plato.strMeal,
                            strCategory: plato.strCategory,
                            strArea: plato.strArea,
                            strMealThumb: plato.strMealThumb,
                            ingredients: listIngredientes
                        };
                        return [2 /*return*/, respuestaPlato];
                }
            });
        });
    };
    //DETALLES DE UNA RECETA ES DECIR MAS CAMPOS
    ApiService.prototype.obtenerDetallasCompletoReceta = function (receta) {
        return __awaiter(this, void 0, Promise, function () {
            var idRecetaABuscar, endpoint, respuesta, datos, plato, listIngredientes, i, nombreIngrediente, medidaIngrediente, respuestaPlato;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idRecetaABuscar = receta.idMeal;
                        endpoint = "lookup.php?i=" + idRecetaABuscar;
                        return [4 /*yield*/, fetch("" + this.API_URL + endpoint)];
                    case 1:
                        respuesta = _a.sent();
                        if (!respuesta.ok) {
                            throw new Error("Error en la peticion " + respuesta.status);
                        }
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        datos = _a.sent();
                        if (!datos.meals) {
                            throw new Error("Error no tiene datos la peticion");
                        }
                        plato = datos.meals[0];
                        listIngredientes = [];
                        for (i = 1; i <= 20; i++) {
                            nombreIngrediente = plato["strIngredient" + i];
                            medidaIngrediente = plato["strMeasure" + i];
                            if (nombreIngrediente && nombreIngrediente.trim() !== "") {
                                listIngredientes.push({
                                    name: nombreIngrediente,
                                    measure: medidaIngrediente
                                });
                            }
                        }
                        listIngredientes.sort(function (a, b) { return a.name.localeCompare(b.name); });
                        respuestaPlato = {
                            idMeal: Number(plato.idMeal),
                            strMeal: plato.strMeal,
                            strCategory: plato.strCategory,
                            strArea: plato.strArea,
                            strMealThumb: plato.strMealThumb,
                            ingredients: listIngredientes,
                            strInstructions: plato.strInstructions,
                            strYoutube: plato.strYoutube
                        };
                        return [2 /*return*/, respuestaPlato];
                }
            });
        });
    };
    //obtener categorias disponibles
    ApiService.prototype.obtenerCategoriasDisponibles = function () {
        return __awaiter(this, void 0, Promise, function () {
            var endpoint, respuesta, datos, todasCategorias, i, nombreCategoria;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "categories.php";
                        return [4 /*yield*/, fetch("" + this.API_URL + endpoint)];
                    case 1:
                        respuesta = _a.sent();
                        if (!respuesta.ok) {
                            throw new Error("Error al hacer la peticion:  " + respuesta.status);
                        }
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        datos = _a.sent();
                        if (!datos.categories) {
                            return [2 /*return*/, []];
                        }
                        todasCategorias = [];
                        for (i = 0; i < datos.categories.length; i++) {
                            nombreCategoria = datos.categories[i].strCategory;
                            todasCategorias.push(nombreCategoria);
                        }
                        todasCategorias.sort(function (a, b) { return a.localeCompare(b); });
                        return [2 /*return*/, todasCategorias];
                }
            });
        });
    };
    return ApiService;
}());
