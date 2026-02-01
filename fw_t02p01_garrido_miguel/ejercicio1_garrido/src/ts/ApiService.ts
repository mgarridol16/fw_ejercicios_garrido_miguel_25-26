import { MyMeal } from "./MyMeal.js";

console.log("Clase ApiService");

interface RecetaDeLaApi {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export class ApiService {
  private readonly API_URL: string;
  private readonly API_KEY: string;

  constructor() {
    this.API_KEY = "1";
    this.API_URL = `https://www.themealdb.com/api/json/v1/${this.API_KEY}/`;
  }

  //RECETAS ALEATORIAS
  async obtenerRecetasAleatorias(): Promise<MyMeal> {
    const endpoint: string = "random.php";
    const respuesta: Response = await fetch(`${this.API_URL}${endpoint}`);

    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const plato: RecetaDeLaApi = datos.meals[0];

    const listIngredientes: Ingredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const nombreIngrediente = plato[`strIngredient${i}`] as
        | string
        | undefined;
      const medidaIngrediente = plato[`strMeasure${i}`] as string | undefined;
      if (nombreIngrediente && nombreIngrediente.trim() !== "") {
        listIngredientes.push({
          name: nombreIngrediente,
          measure: medidaIngrediente || "",
        });
      }
    }
    listIngredientes.sort((a, b) => a.name.localeCompare(b.name));

    const respuestaPlato: MyMeal = {
      idMeal: Number(plato.idMeal),
      strMeal: plato.strMeal,
      strCategory: plato.strCategory,
      strArea: plato.strArea,
      strMealThumb: plato.strMealThumb,
      ingredients: listIngredientes,
    };
    return respuestaPlato;
  }

  //RECETAS POR INGREDIENTES
  async obtenerRecetasPorIngrediente(ingrediente: string): Promise<MyMeal[]> {
    const endpoint: string = `filter.php?i=${ingrediente}`;
    const respuesta: Response = await fetch(`${this.API_URL}${endpoint}`);

    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    if (!datos.meals) {
      return [];
    }

    const maxRecetas = 8;
    const listaRecetas: MyMeal[] = [];

    for (let i = 0; i < maxRecetas && i < datos.meals.length; i++) {
      const id = Number(datos.meals[i].idMeal);
      const receta = await this.obtenerRecetaPorID(id);
      listaRecetas.push(receta);
    }

    listaRecetas.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    return listaRecetas;
  }

  //RECETAS POR ID
  async obtenerRecetaPorID(id: number): Promise<MyMeal> {
    const endpoint: string = `lookup.php?i=${id}`;
    const respuesta: Response = await fetch(`${this.API_URL}${endpoint}`);

    if (!respuesta.ok) {
      throw new Error(`Error en la peticion: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    if (!datos.meals) {
      throw new Error(`Error no tiene datos la peticion`);
    }

    const plato: RecetaDeLaApi = datos.meals[0];
    const listIngredientes: Ingredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const nombreIngrediente = plato[`strIngredient${i}`] as
        | string
        | undefined;
      const medidaIngrediente = plato[`strMeasure${i}`] as string | undefined;
      if (nombreIngrediente && nombreIngrediente.trim() !== "") {
        listIngredientes.push({
          name: nombreIngrediente,
          measure: medidaIngrediente || "",
        });
      }
    }
    listIngredientes.sort((a, b) => a.name.localeCompare(b.name));

    const respuestaPlato: MyMeal = {
      idMeal: Number(plato.idMeal),
      strMeal: plato.strMeal,
      strCategory: plato.strCategory,
      strArea: plato.strArea,
      strMealThumb: plato.strMealThumb,
      ingredients: listIngredientes,
    };
    return respuestaPlato;
  }

  //DETALLES DE UNA RECETA ES DECIR MAS CAMPOS
  async obtenerDetallasCompletoReceta(receta: MyMeal): Promise<MyMeal> {
    const idRecetaABuscar: number = receta.idMeal;
    const endpoint: string = `lookup.php?i=${idRecetaABuscar}`;
    const respuesta: Response = await fetch(`${this.API_URL}${endpoint}`);

    if (!respuesta.ok) {
      throw new Error(`Error en la peticion ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    if (!datos.meals) {
      throw new Error("Error no tiene datos la peticion");
    }

    const plato: RecetaDeLaApi = datos.meals[0];
    const listIngredientes: Ingredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const nombreIngrediente = plato[`strIngredient${i}`] as
        | string
        | undefined;
      const medidaIngrediente = plato[`strMeasure${i}`] as string | undefined;
      if (nombreIngrediente && nombreIngrediente.trim() !== "") {
        listIngredientes.push({
          name: nombreIngrediente,
          measure: medidaIngrediente || "",
        });
      }
    }
    listIngredientes.sort((a, b) => a.name.localeCompare(b.name));

    const respuestaPlato: MyMeal = {
      idMeal: Number(plato.idMeal),
      strMeal: plato.strMeal,
      strCategory: plato.strCategory,
      strArea: plato.strArea,
      strMealThumb: plato.strMealThumb,
      ingredients: listIngredientes,
      strInstructions: plato.strInstructions,
      strYoutube: plato.strYoutube,
    };
    return respuestaPlato;
  }

  //obtener categorias disponibles

  async obtenerCategoriasDisponibles(): Promise<string[]> {
    const endpoint: string = "categories.php";
    const respuesta: Response = await fetch(`${this.API_URL}${endpoint}`);

    if (!respuesta.ok) {
      throw new Error(`Error al hacer la peticion:  ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    if (!datos.categories) {
      return [];
    }

    const todasCategorias: string[] = [];

    for (let i = 0; i < datos.categories.length; i++) {
      const nombreCategoria: string = datos.categories[i].strCategory;
      todasCategorias.push(nombreCategoria);
    }
    todasCategorias.sort((a, b) => a.localeCompare(b));
    return todasCategorias;
  }

  // RECETAS POR CATEGORÍA
  async obtenerRecetasPorCategoria(categoria: string): Promise<MyMeal[]> {
    const endpoint: string = `filter.php?c=${categoria}`;
    const respuesta: Response = await fetch(`${this.API_URL}${endpoint}`);

    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    if (!datos.meals) {
      return [];
    }

    const listaRecetas: MyMeal[] = [];
    // Cogemos las 8 primeras recetas que devuelve la API para esta categoría
    const maxRecetas = 8;

    for (let i = 0; i < maxRecetas && i < datos.meals.length; i++) {
      const id = Number(datos.meals[i].idMeal);
      // Usamos tu método existente para obtener los detalles (ingredientes, etc.)
      const receta = await this.obtenerRecetaPorID(id);
      listaRecetas.push(receta);
    }

    return listaRecetas;
  }
}
