console.log("Clase ApiService");
export class ApiService {
    constructor() {
        this.API_KEY = "1";
        this.API_URL = `https://www.themealdb.com/api/json/v1/${this.API_KEY}/`;
    }
    //RECETAS ALEATORIAS
    async obtenerRecetasAleatorias() {
        const endpoint = "random.php";
        const respuesta = await fetch(`${this.API_URL}${endpoint}`);
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        const plato = datos.meals[0];
        const listIngredientes = [];
        for (let i = 1; i <= 20; i++) {
            const nombreIngrediente = plato[`strIngredient${i}`];
            const medidaIngrediente = plato[`strMeasure${i}`];
            if (nombreIngrediente && nombreIngrediente.trim() !== "") {
                listIngredientes.push({
                    name: nombreIngrediente,
                    measure: medidaIngrediente || "",
                });
            }
        }
        listIngredientes.sort((a, b) => a.name.localeCompare(b.name));
        const respuestaPlato = {
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
    async obtenerRecetasPorIngrediente(ingrediente) {
        const endpoint = `filter.php?i=${ingrediente}`;
        const respuesta = await fetch(`${this.API_URL}${endpoint}`);
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if (!datos.meals) {
            return [];
        }
        const maxRecetas = 8;
        const listaRecetas = [];
        for (let i = 0; i < maxRecetas && i < datos.meals.length; i++) {
            const id = Number(datos.meals[i].idMeal);
            const receta = await this.obtenerRecetaPorID(id);
            listaRecetas.push(receta);
        }
        listaRecetas.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
        return listaRecetas;
    }
    //RECETAS POR ID
    async obtenerRecetaPorID(id) {
        const endpoint = `lookup.php?i=${id}`;
        const respuesta = await fetch(`${this.API_URL}${endpoint}`);
        if (!respuesta.ok) {
            throw new Error(`Error en la peticion: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if (!datos.meals) {
            throw new Error(`Error no tiene datos la peticion`);
        }
        const plato = datos.meals[0];
        const listIngredientes = [];
        for (let i = 1; i <= 20; i++) {
            const nombreIngrediente = plato[`strIngredient${i}`];
            const medidaIngrediente = plato[`strMeasure${i}`];
            if (nombreIngrediente && nombreIngrediente.trim() !== "") {
                listIngredientes.push({
                    name: nombreIngrediente,
                    measure: medidaIngrediente || "",
                });
            }
        }
        listIngredientes.sort((a, b) => a.name.localeCompare(b.name));
        const respuestaPlato = {
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
    async obtenerDetallasCompletoReceta(receta) {
        const idRecetaABuscar = receta.idMeal;
        const endpoint = `lookup.php?i=${idRecetaABuscar}`;
        const respuesta = await fetch(`${this.API_URL}${endpoint}`);
        if (!respuesta.ok) {
            throw new Error(`Error en la peticion ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if (!datos.meals) {
            throw new Error("Error no tiene datos la peticion");
        }
        const plato = datos.meals[0];
        const listIngredientes = [];
        for (let i = 1; i <= 20; i++) {
            const nombreIngrediente = plato[`strIngredient${i}`];
            const medidaIngrediente = plato[`strMeasure${i}`];
            if (nombreIngrediente && nombreIngrediente.trim() !== "") {
                listIngredientes.push({
                    name: nombreIngrediente,
                    measure: medidaIngrediente || "",
                });
            }
        }
        listIngredientes.sort((a, b) => a.name.localeCompare(b.name));
        const respuestaPlato = {
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
    async obtenerCategoriasDisponibles() {
        const endpoint = "categories.php";
        const respuesta = await fetch(`${this.API_URL}${endpoint}`);
        if (!respuesta.ok) {
            throw new Error(`Error al hacer la peticion:  ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if (!datos.categories) {
            return [];
        }
        const todasCategorias = [];
        for (let i = 0; i < datos.categories.length; i++) {
            const nombreCategoria = datos.categories[i].strCategory;
            todasCategorias.push(nombreCategoria);
        }
        todasCategorias.sort((a, b) => a.localeCompare(b));
        return todasCategorias;
    }
    // RECETAS POR CATEGORÍA
    async obtenerRecetasPorCategoria(categoria) {
        const endpoint = `filter.php?c=${categoria}`;
        const respuesta = await fetch(`${this.API_URL}${endpoint}`);
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if (!datos.meals) {
            return [];
        }
        const listaRecetas = [];
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
//# sourceMappingURL=ApiService.js.map