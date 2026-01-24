"use strict";
exports.__esModule = true;
console.log("Clase Storage Service");
/*
  AQUI SE GESTIONARA EL ACCESO A LocalStorage.
*/
var StorageService = /** @class */ (function () {
    function StorageService() {
        this.USER_KEY_ITEM = "usuarios_app";
        this.USER_MEAL_KEY_ITEM = "recetas_favoritas";
        this.SESSION_KEY_ITEM = "sesion_activa";
    }
    //FUNCIONES ALTA Y VALIDACION DE USUARIOS
    StorageService.prototype.obtenerUsuarios = function () {
        var miVentana = window;
        var texto = miVentana.localStorage.getItem(this.USER_KEY_ITEM);
        if (!texto) {
            return [];
        }
        return JSON.parse(texto);
    };
    StorageService.prototype.registrarUsuario = function (name, email, password) {
        var usuarios = this.obtenerUsuarios();
        var existe = usuarios.some(function (e) { return e.email === email; });
        if (existe) {
            return false;
        }
        var id;
        if (usuarios.length === 0) {
            id = 1;
        }
        else {
            var ultimoUsuario = usuarios[usuarios.length - 1];
            id = ultimoUsuario.id + 1;
        }
        var nuevoUser = {
            id: id,
            name: name,
            email: email,
            password: password
        };
        usuarios.push(nuevoUser);
        var miVentana = window;
        window.localStorage.setItem(this.USER_KEY_ITEM, JSON.stringify(usuarios));
        return true;
    };
    StorageService.prototype.loguearUsuario = function (email, password) {
        var usuarios = this.obtenerUsuarios();
        var usuarioEncontrado = usuarios.find(function (u) { return u.email === email; });
        if (usuarioEncontrado === undefined) {
            console.log("Error: el usuario no existe.");
            return false;
        }
        if (usuarioEncontrado.password !== password) {
            console.log("Error: la contraseña no coincide.");
            return false;
        }
        localStorage.setItem(this.SESSION_KEY_ITEM, JSON.stringify(usuarioEncontrado));
        console.log("Login correcto. ¡Bienvenido!");
        return true;
    };
    StorageService.prototype.obtenerUsuarioLogueado = function () {
        var miVentana = window;
        var user = miVentana.localStorage.getItem(this.SESSION_KEY_ITEM);
        if (!user) {
            return null;
        }
        return JSON.parse(user);
    };
    StorageService.prototype.cerrarSession = function () {
        var miVentana = window;
        miVentana.localStorage.removeItem(this.SESSION_KEY_ITEM);
        console.log("Sesión finalizada");
    };
    //FINALIZA GESTION Y VALIDACION DE USUARIOS
    //GUARDAR Y RECUPERAR RECETAS DEL USUARIO
    StorageService.prototype.obtenerRecetasFavoritaUser = function () {
        var usuario = this.obtenerUsuarioLogueado();
        if (!usuario) {
            return [];
        }
        var miVentana = window;
        var llave = this.USER_MEAL_KEY_ITEM + "_" + usuario.id;
        var datos = miVentana.localStorage.getItem(llave);
        if (datos) {
            return JSON.parse(datos);
        }
        else {
            return [];
        }
    };
    StorageService.prototype.guardarRecetaFav = function (receta) {
        var usuario = this.obtenerUsuarioLogueado();
        if (!usuario) {
            console.warn("Debes estar logueado para guaradr favoritos");
            return false;
        }
        var recetasActuales = this.obtenerRecetasFavoritaUser();
        var yaExiste = recetasActuales.some(function (r) { return r.idMeal === receta.idMeal; });
        if (yaExiste) {
            console.log("Esta receta ya esta en tus favoritos");
            return false;
        }
        recetasActuales.push(receta);
        var llave = this.USER_MEAL_KEY_ITEM + "_" + usuario.id;
        var miVentana = window;
        miVentana.localStorage.setItem(llave, JSON.stringify(recetasActuales));
        return true;
    };
    StorageService.prototype.eliminarRecetaFav = function (receta) {
        var usuario = this.obtenerUsuarioLogueado();
        if (!usuario) {
            console.warn("Debes estar logueado para eliminar una receta en favoritos");
            return false;
        }
        var recetasActuales = this.obtenerRecetasFavoritaUser();
        var recetasNewEliminando = recetasActuales.filter(function (r) { return r.idMeal !== receta.idMeal; });
        var llave = this.USER_MEAL_KEY_ITEM + "_" + usuario.id;
        var miVentana = window;
        miVentana.localStorage.setItem(llave, JSON.stringify(recetasNewEliminando));
        return true;
    };
    return StorageService;
}());
