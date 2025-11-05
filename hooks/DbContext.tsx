import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { BSON } from 'realm';
import { useRealm, useQuery } from '@realm/react';
import { Recipe, RecipeInput } from '../src/db/RecipeSchema';

type RecipeContextType = {
  recipes: Realm.Results<Recipe>;
  savedRecipes: Recipe[];
  getSavedRecipes: () => Recipe[];
  isSaved: (idMeal: string) => boolean;
  createRecipe: (data: RecipeInput) => void;
  updateRecipe: (idMeal: string, updates: Partial<RecipeInput>) => void;
  deleteRecipe: (idMeal: string) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const RecipeProvider = ({ children }: Props): JSX.Element => {
  const realm = useRealm();
  const recipes = useQuery(Recipe);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  const getSavedRecipes = (): Recipe[] => {
    const plain = recipes.map((r) => ({ ...r }));
    setSavedRecipes(plain);
    return plain;
  };

  const isSaved = (idMeal: string): boolean => {
    return !!recipes.filtered('idMeal == $0', idMeal)[0];
  };

  const createRecipe = (data: RecipeInput) => {
    const exists = isSaved(data.idMeal);
    if (exists) return;

    realm.write(() => {
      realm.create(Recipe, {
        _id: new BSON.ObjectId(),
        ...data,
      });
    });

    getSavedRecipes();
  };

  const updateRecipe = (idMeal: string, updates: Partial<RecipeInput>) => {
    const recipe = recipes.filtered('idMeal == $0', idMeal)[0];
    if (!recipe) return;

    realm.write(() => {
      Object.assign(recipe, updates);
    });

    getSavedRecipes();
  };

  const deleteRecipe = (idMeal: string) => {
    const recipe = recipes.filtered('idMeal == $0', idMeal)[0];
    if (!recipe) return;

    realm.write(() => {
      realm.delete(recipe);
    });

    getSavedRecipes();
  };

  useEffect(() => {
    getSavedRecipes();
  }, [recipes]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        savedRecipes,
        getSavedRecipes,
        isSaved,
        createRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};
