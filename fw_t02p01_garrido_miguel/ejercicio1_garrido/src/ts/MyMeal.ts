console.log("MyMeal interface");

export interface Ingredient {
  name: string;
  measure: string;
}

export interface MyMeal {
  idMeal: number;
  strMeal: string; // nombre de la receta
  strCategory: string;
  strArea: string;
  strMealThumb: string; // imagen tamaño mediana
  ingredients: Ingredient[];
  strInstructions?: string;
  strYoutube?: string;
}
