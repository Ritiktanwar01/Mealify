import { BSON } from 'realm';

export class Recipe extends Realm.Object<Recipe> {
  _id!: BSON.ObjectId;
  strArea!: string;
  strCategory!: string;
  strInstructions!: string;
  strMealThumb!: string;
  strSource!: string;
  strIngredients!: string[];
  strMeasures!: string[];
  strYoutube!: string;
  idMeal!:string
  

  static schema: Realm.ObjectSchema = {
    name: 'Recipe',
    primaryKey: '_id',
    properties: {

      _id: 'objectId',
      strArea: 'string',
      strCategory: 'string',
      strInstructions: 'string',
      strMealThumb: 'string',
      strSource: 'string',
      strIngredients: 'string[]',
      strMeasures: 'string[]',
      strMeal: 'string',
      strYoutube: 'string',
      idMeal: 'string',
    },
  };
}

export type RecipeInput = {
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strSource: string;
  strIngredients: string[];
  strMeasures: string[];
  strMeal: string;
  strYoutube:string;
  idMeal:string
};
