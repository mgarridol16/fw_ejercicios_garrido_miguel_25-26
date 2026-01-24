import { MyMeal } from "./MyMeal.js";
import { User } from "./User.js";
console.log("Clase Storage Service");

/*
  AQUI SE GESTIONARA EL ACCESO A LocalStorage.
*/

class StorageService {
  private readonly USER_KEY_ITEM: string; // Para los datos de registro de usuarios
  private readonly USER_MEAL_KEY_ITEM: string; // Para las recetas favoritas
  private readonly SESSION_KEY_ITEM: string;

  constructor() {
    this.USER_KEY_ITEM = "usuarios_app";
    this.USER_MEAL_KEY_ITEM = "recetas_favoritas";
    this.SESSION_KEY_ITEM = "sesion_activa";
  }

  //FUNCIONES ALTA Y VALIDACION DE USUARIOS
  private obtenerUsuarios(): User[] {
    const miVentana: Window = window;
    const texto = miVentana.localStorage.getItem(this.USER_KEY_ITEM);
    if (!texto) {
      return [];
    }
    return JSON.parse(texto) as User[];
  }

  registrarUsuario(name: string, email: string, password: string): boolean {
    const usuarios: User[] | null = this.obtenerUsuarios();
    const existe: boolean = usuarios.some((e) => e.email === email);
    if (existe) {
      return false;
    }

    let id: number;
    if (usuarios.length === 0) {
      id = 1;
    } else {
      const ultimoUsuario = usuarios[usuarios.length - 1];
      id = ultimoUsuario.id + 1;
    }
    const nuevoUser: User = {
      id,
      name,
      email,
      password,
    };

    usuarios.push(nuevoUser);

    const miVentana: Window = window;
    window.localStorage.setItem(this.USER_KEY_ITEM, JSON.stringify(usuarios));
    return true;
  }

  loguearUsuario(email: string, password: string): boolean {
    const usuarios: User[] | null = this.obtenerUsuarios();

    const usuarioEncontrado = usuarios.find((u) => u.email === email);

    if (usuarioEncontrado === undefined) {
      console.log("Error: el usuario no existe.");
      return false;
    }

    if (usuarioEncontrado.password !== password) {
      console.log("Error: la contraseña no coincide.");
      return false;
    }
    localStorage.setItem(
      this.SESSION_KEY_ITEM,
      JSON.stringify(usuarioEncontrado),
    );

    console.log("Login correcto. ¡Bienvenido!");
    return true;
  }

  obtenerUsuarioLogueado(): User | null {
    const miVentana: Window = window;
    const user = miVentana.localStorage.getItem(this.SESSION_KEY_ITEM);

    if (!user) {
      return null;
    }

    return JSON.parse(user) as User;
  }

  cerrarSession(): void {
    const miVentana: Window = window;
    miVentana.localStorage.removeItem(this.SESSION_KEY_ITEM);
    console.log("Sesión finalizada");
  }

  //FINALIZA GESTION Y VALIDACION DE USUARIOS

  //GUARDAR Y RECUPERAR RECETAS DEL USUARIO

  obtenerRecetasFavoritaUser(): MyMeal[] {
    const usuario: User | null = this.obtenerUsuarioLogueado();
    if (!usuario) {
      return [];
    }
    const miVentana: Window = window;
    const llave = this.USER_MEAL_KEY_ITEM + "_" + usuario.id;
    const datos = miVentana.localStorage.getItem(llave);

    if (datos) {
      return JSON.parse(datos) as MyMeal[];
    } else {
      return [];
    }
  }

  guardarRecetaFav(receta: MyMeal): boolean {
    const usuario: User | null = this.obtenerUsuarioLogueado();
    if (!usuario) {
      console.warn("Debes estar logueado para guaradr favoritos");
      return false;
    }

    const recetasActuales: MyMeal[] = this.obtenerRecetasFavoritaUser();

    const yaExiste: boolean = recetasActuales.some(
      (r) => r.idMeal === receta.idMeal,
    );
    if (yaExiste) {
      console.log("Esta receta ya esta en tus favoritos");
      return false;
    }

    recetasActuales.push(receta);

    const llave = this.USER_MEAL_KEY_ITEM + "_" + usuario.id;
    const miVentana: Window = window;
    miVentana.localStorage.setItem(llave, JSON.stringify(recetasActuales));
    return true;
  }

  eliminarRecetaFav(receta: MyMeal): boolean {
    const usuario: User | null = this.obtenerUsuarioLogueado();
    if (!usuario) {
      console.warn(
        "Debes estar logueado para eliminar una receta en favoritos",
      );
      return false;
    }

    const recetasActuales: MyMeal[] = this.obtenerRecetasFavoritaUser();

    const recetasNewEliminando: MyMeal[] = recetasActuales.filter(
      (r) => r.idMeal !== receta.idMeal,
    );

    const llave: string = this.USER_MEAL_KEY_ITEM + "_" + usuario.id;
    const miVentana: Window = window;
    miVentana.localStorage.setItem(llave, JSON.stringify(recetasNewEliminando));
    return true;
  }

  //FIN GESTION DE RECETAS USER

  //========== PLANES SEMANALES ==========
  
  //FUNCIONES A REALIZAR:
  /*
Guardar y recuperar planes semanales
Guardar preferencias del usuario*/
}
