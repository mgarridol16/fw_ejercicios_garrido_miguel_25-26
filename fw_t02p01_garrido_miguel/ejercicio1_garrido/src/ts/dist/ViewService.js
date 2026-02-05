"use strict";
exports.__esModule = true;
exports.ViewService = void 0;
console.log("====ViewService====");
var ViewService = /** @class */ (function () {
    function ViewService() {
    }
    ViewService.prototype.renderizarListado = function (contenedor, recetas, estaLogueado, esZonaPrivada) {
        if (esZonaPrivada === void 0) { esZonaPrivada = false; }
        contenedor.innerHTML = "";
        if (recetas.length === 0) {
            this.mostrarAviso(contenedor, "No hay recetas disponibles para mostrarlas.", "info");
            return;
        }
        var html = '<div class="row row-cols-1 row-cols-md-4 g-4">'; //4 columnas por fila en ORDENADOR
        for (var i = 0; i < recetas.length; i++) {
            var r = recetas[i];
            var textoBoton = esZonaPrivada ? "Quitar de favorita" : "Favorito";
            html += "\n    <div class=\"col\">\n        <div class=\"card h-100 shadow-sm\">\n            <img src=\"" + r.strMealThumb + "\" class=\"card-img-top\" alt=\"" + r.strMeal + "\">\n            <div class=\"card-body\">\n                <h5 class=\"card-title\">" + r.strMeal + "</h5>\n\n                <p class=\"card-text mb-1\">\n                    <strong>" + r.strCategory + "</strong> | <small>" + r.strArea + "</small>\n                </p>\n                <span class=\"badge bg-secondary mb-2\">\n                    " + (r.ingredients ? r.ingredients.length : 0) + " Ingredientes\n                </span>\n            </div>\n\n            <div class=\"card-footer bg-white border-top-0 d-grid gap-2\">\n                " + (estaLogueado
                ? "<button class=\"btn btn-outline-primary btn-sm btn-ver-detalle\" data-id=\"" + r.idMeal + "\">\n                        Ver detalles\n                       </button>\n                       <button class=\"btn btn-outline-danger btn-sm btn-guardar-favorito\" data-id=\"" + r.idMeal + "\">\n                         " + textoBoton + "\n                       </button>"
                : "<p>\n                         Inicia sesi\u00F3n para ver detalles\n                       </p>") + "\n            </div>\n        </div>\n    </div>";
        }
        html += "</div>";
        contenedor.innerHTML = html;
    };
    ViewService.prototype.mostrarAviso = function (contenedor, mensaje, tipo) {
        contenedor.innerHTML = "";
        var html = "<div class=\"alert alert-" + tipo + "\" role=\"alert\">\n    " + mensaje + "</div>";
        contenedor.innerHTML = html;
    };
    ViewService.prototype.renderizarDetalles = function (contenedor, receta) {
        contenedor.innerHTML = "";
        // Si por algún motivo la receta no llega o es nula
        if (!receta) {
            this.mostrarAviso(contenedor, "No se ha podido cargar la información de la receta.", "danger");
            return;
        }
        var ingredientesHTML = '<ul class="list-group">';
        for (var i = 0; i < receta.ingredients.length; i++) {
            var ing = receta.ingredients[i];
            ingredientesHTML += "<li class=\"list-group-item\">" + ing.name + " - " + ing.measure + "</li>";
        }
        ingredientesHTML += "</ul>";
        var instrucciones = "No hay instrucciones disponibles.";
        if (receta.strInstructions) {
            instrucciones = receta.strInstructions;
        }
        var botonYoutube = "";
        if (receta.strYoutube) {
            botonYoutube = "<div class=\"d-grid mt-3\">\n                            <a href=\"" + receta.strYoutube + "\" target=\"_blank\" class=\"btn btn-danger\"> Ver en YouTube </a>\n                        </div>";
        }
        var html = "\n        <div class=\"card\">\n            <img src=\"" + receta.strMealThumb + "\" class=\"card-img-top w-25\" alt=\"" + receta.strMeal + "\">\n            <div class=\"card-body\">\n                <h2>" + receta.strMeal + "</h2>\n                <p>" + receta.strCategory + " | " + receta.strArea + "</p>\n\n                <h5>Ingredientes:</h5>\n                " + ingredientesHTML + "\n\n                <h5 class=\"mt-3\">Instrucciones:</h5>\n                <p>" + instrucciones + "</p>\n\n                " + botonYoutube + "\n            </div>\n        </div>\n    ";
        contenedor.innerHTML = html;
    };
    ViewService.prototype.renderizarPlanesSemanales = function (contenedor, planes, idSemanaActual) {
        var _a, _b;
        contenedor.innerHTML = "";
        if (planes.length === 0) {
            this.mostrarAviso(contenedor, "No tienes planes semanales guardados todavía.", "info");
            return;
        }
        var html = "";
        for (var i = 0; i < planes.length; i++) {
            var plan = planes[i];
            var claseDestacado = "";
            var badgeActual = "";
            if (plan.id === idSemanaActual) {
                claseDestacado = "border-primary shadow";
                badgeActual = '<span class="badge bg-primary">Semana Actual</span>';
            }
            html += "<div class=\"card mb-4 " + claseDestacado + "\">";
            html += "<div class=\"card-header d-flex justify-content-between\">\n                    <strong>Plan de la Semana: " + plan.id + "</strong>\n                    " + badgeActual + "\n                </div>";
            html += "<table class=\"table table-bordered mb-0\">";
            // --- CABECERA DE DÍAS ---
            html += "<thead class=\"table-light\"><tr><th>Momento</th>";
            for (var j = 0; j < plan.days.length; j++) {
                html += "<th>" + plan.days[j].day + "</th>";
            }
            html += "</tr></thead>";
            // --- FILA DE COMIDAS (Lunch) ---
            html += "<tbody><tr><td><strong>Comida</strong></td>";
            for (var j = 0; j < plan.days.length; j++) {
                var idComida = "-";
                if (plan.days[j].lunchMealID) {
                    idComida = ((_a = plan.days[j].lunchMealID) === null || _a === void 0 ? void 0 : _a.toString()) || "-";
                }
                html += "<td>" + idComida + "</td>";
            }
            html += "</tr>";
            // --- FILA DE CENAS (Dinner) ---
            html += "<tr><td><strong>Cena</strong></td>";
            for (var j = 0; j < plan.days.length; j++) {
                var idCena = "-";
                if (plan.days[j].dinnerMealID) {
                    idCena = ((_b = plan.days[j].dinnerMealID) === null || _b === void 0 ? void 0 : _b.toString()) || "-";
                }
                html += "<td>" + idCena + "</td>";
            }
            html += "</tr></tbody></table></div>";
        }
        // 4. Inyectamos todo el HTML generado
        contenedor.innerHTML = html;
    };
    return ViewService;
}());
exports.ViewService = ViewService;
