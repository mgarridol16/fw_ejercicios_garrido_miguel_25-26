console.log("Clase Storage Service");
/*
  AQUI SE GESTIONARA EL ACCESO A LocalStorage.
*/
export class StorageService {
    constructor() {
        this.USER_KEY_ITEM = "usuarios_app";
        this.USER_MEAL_KEY_ITEM = "recetas_favoritas";
        this.SESSION_KEY_ITEM = "sesion_activa";
        this.USER_WEEKLYPLAN_KEY_ITEM = "planes_semanales";
        this.USER_PREFS_KEY_ITEM = "preferencias_user";
    }
    //FUNCIONES ALTA Y VALIDACION DE USUARIOS
    obtenerUsuarios() {
        const miVentana = window;
        const texto = miVentana.localStorage.getItem(this.USER_KEY_ITEM);
        if (!texto) {
            return [];
        }
        return JSON.parse(texto);
    }
    registrarUsuario(name, email, password) {
        const usuarios = this.obtenerUsuarios();
        const existe = usuarios.some((e) => e.email === email);
        if (existe) {
            return false;
        }
        let id;
        if (usuarios.length === 0) {
            id = 1;
        }
        else {
            const ultimoUsuario = usuarios[usuarios.length - 1];
            id = ultimoUsuario.id + 1;
        }
        const nuevoUser = {
            id,
            name,
            email,
            password,
        };
        usuarios.push(nuevoUser);
        const miVentana = window;
        window.localStorage.setItem(this.USER_KEY_ITEM, JSON.stringify(usuarios));
        return true;
    }
    loguearUsuario(email, password) {
        const usuarios = this.obtenerUsuarios();
        const usuarioEncontrado = usuarios.find((u) => u.email === email);
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
    }
    obtenerUsuarioLogueado() {
        const miVentana = window;
        const user = miVentana.localStorage.getItem(this.SESSION_KEY_ITEM);
        if (!user) {
            return null;
        }
        return JSON.parse(user);
    }
    cerrarSession() {
        const miVentana = window;
        miVentana.localStorage.removeItem(this.SESSION_KEY_ITEM);
        console.log("Sesión finalizada");
    }
    //FINALIZA GESTION Y VALIDACION DE USUARIOS
    //GUARDAR Y RECUPERAR RECETAS DEL USUARIO
    obtenerRecetasFavoritaUser() {
        const usuario = this.obtenerUsuarioLogueado();
        if (!usuario) {
            return [];
        }
        const miVentana = window;
        const llave = this.USER_MEAL_KEY_ITEM + "_" + usuario.id;
        const datos = miVentana.localStorage.getItem(llave);
        if (datos) {
            return JSON.parse(datos);
        }
        else {
            return [];
        }
    }
    guardarRecetaFav(receta) {
        const usuario = this.obtenerUsuarioLogueado();
        if (!usuario) {
            console.warn("Debes estar logueado para guaradr favoritos");
            return false;
        }
        const recetasActuales = this.obtenerRecetasFavoritaUser();
        const yaExiste = recetasActuales.some((r) => r.idMeal === receta.idMeal);
        if (yaExiste) {
            console.log("Esta receta ya esta en tus favoritos");
            return false;
        }
        recetasActuales.push(receta);
        const llave = this.USER_MEAL_KEY_ITEM + "_" + usuario.id;
        const miVentana = window;
        miVentana.localStorage.setItem(llave, JSON.stringify(recetasActuales));
        return true;
    }
    eliminarRecetaFav(receta) {
        const usuario = this.obtenerUsuarioLogueado();
        if (!usuario) {
            console.warn("Debes estar logueado para eliminar una receta en favoritos");
            return false;
        }
        const recetasActuales = this.obtenerRecetasFavoritaUser();
        const recetasNewEliminando = recetasActuales.filter((r) => r.idMeal !== receta.idMeal);
        const llave = this.USER_MEAL_KEY_ITEM + "_" + usuario.id;
        const miVentana = window;
        miVentana.localStorage.setItem(llave, JSON.stringify(recetasNewEliminando));
        return true;
    }
    //FIN GESTION DE RECETAS USER
    //========== PLANES SEMANALES ==========
    obtenerPlanesSemanales() {
        const user = this.obtenerUsuarioLogueado();
        if (!user) {
            console.log("Error debes estar logueado antes de obtener los planes");
            return [];
        }
        const miVentana = window;
        const llave = this.USER_WEEKLYPLAN_KEY_ITEM + "_" + user.id;
        const datos = miVentana.localStorage.getItem(llave);
        if (datos) {
            return JSON.parse(datos);
        }
        else {
            return [];
        }
    }
    guardarPlanesSemanales(plan) {
        const user = this.obtenerUsuarioLogueado();
        if (!user) {
            console.log("Error debes estar logueado antes de guardar los planes semanales");
            return false;
        }
        const planesSemanalesActuales = this.obtenerPlanesSemanales();
        const existe = planesSemanalesActuales.some((w) => w.id === plan.id);
        if (existe) {
            console.log("Error este plan semanal ya existe.");
            return false;
        }
        planesSemanalesActuales.push(plan);
        const llave = this.USER_WEEKLYPLAN_KEY_ITEM + "_" + user.id;
        const miVentana = window;
        miVentana.localStorage.setItem(llave, JSON.stringify(planesSemanalesActuales));
        return true;
    }
    eliminarPlanesSemanales(plan) {
        const user = this.obtenerUsuarioLogueado();
        if (!user) {
            console.log("Error debes estar logueado para eliminar un plan semanal");
            return false;
        }
        const planesActuales = this.obtenerPlanesSemanales();
        const planSinElBorrado = planesActuales.filter((p) => p.id !== plan.id);
        const llave = this.USER_WEEKLYPLAN_KEY_ITEM + "_" + user.id;
        const miVentana = window;
        miVentana.localStorage.setItem(llave, JSON.stringify(planSinElBorrado));
        return true;
    }
    //PLANES SEMANALES FINALIZADO
    //========== PREFERENCIAS DEL USUARIO ==========
    obtenerPreferencias() {
        const user = this.obtenerUsuarioLogueado();
        const valorPorDefecto = {
            favoriteCategory: "Todas las categorías",
            theme: "light",
            lastAccess: new Date().toISOString(),
        }; //para si no esta logueado o no tiene valor
        if (!user) {
            console.log("Error no se encontro ningun usuario logueado");
            return valorPorDefecto;
        }
        const llave = this.USER_PREFS_KEY_ITEM + "_" + user.id;
        const miVentana = window;
        const datos = miVentana.localStorage.getItem(llave);
        if (!datos) {
            console.log("Este usuario no tiene preferencias guardadas");
            return valorPorDefecto;
        }
        return JSON.parse(datos);
    }
    guardarPrefenciasUser(categoria) {
        const user = this.obtenerUsuarioLogueado();
        if (!user) {
            console.log("No hay ningun usuario logueado");
            return false;
        }
        const llave = this.USER_PREFS_KEY_ITEM + "_" + user.id;
        const nuevasPreferencias = {
            favoriteCategory: categoria,
            theme: "light",
            lastAccess: new Date().toISOString(),
        };
        const miVentana = window;
        miVentana.localStorage.setItem(llave, JSON.stringify(nuevasPreferencias));
        return true;
    }
    eliminarPreferenciasUser() {
        const user = this.obtenerUsuarioLogueado();
        if (!user) {
            console.log("No se encuentra ningun usuario logueado");
            return false;
        }
        const llave = this.USER_PREFS_KEY_ITEM + "_" + user.id;
        const miVentana = window;
        miVentana.localStorage.removeItem(llave);
        return true;
    }
}
//# sourceMappingURL=StorageService.js.map