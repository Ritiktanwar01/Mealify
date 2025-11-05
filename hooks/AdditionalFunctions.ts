import { RecipeInput } from "../src/db/RecipeSchema";
export const transformRecipeData = (raw: Record<string, any>): RecipeInput => {
  console.log(raw)
  const ingredients: string[] = [];
  const measures: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = raw[`strIngredient${i}`]?.trim();
    const measure = raw[`strMeasure${i}`]?.trim();

    if (ingredient) ingredients.push(ingredient);
    if (measure) measures.push(measure);
  }

  return {
    strArea: raw.strArea || '',
    strCategory: raw.strCategory || '',
    strInstructions: raw.strInstructions || '',
    strMealThumb: raw.strMealThumb || '',
    strSource: raw.strSource || '',
    strIngredients: ingredients,
    strMeasures: measures,
    strMeal:raw.strMeal,
    strYoutube:raw.strYoutube,
    idMeal:raw.idMeal.toString()
  };
};
