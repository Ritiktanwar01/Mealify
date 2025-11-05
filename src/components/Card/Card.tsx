import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRecipe } from '../../../hooks/DbContext';
import { transformRecipeData } from '../../../hooks/AdditionalFunctions';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  title?: string;
  image?: string;
  location?: string;
  category?: string;
  data: {
    strArea: string;
    strCategory: string;
    strInstructions: string;
    strMealThumb: string;
    strSource: string;
    strIngredients: string[];
    strMeasures: string[];
    strMeal: string;
    idMeal:string
  };
}

const Card = ({ title, image, location, category, data }: CardProps) => {
  const { isSaved, createRecipe, deleteRecipe } = useRecipe();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data.idMeal) {
      setSaved(isSaved(data.idMeal));
    }
  }, [data.idMeal, isSaved]);

  const handleSave = () => {
    if (!data.idMeal) return;

    if (isSaved(data.idMeal)) {
      deleteRecipe(data.idMeal);
      setSaved(false);
    } else {
      const formatted = transformRecipeData(data);
      createRecipe({ ...formatted, idMeal: data.idMeal });
      setSaved(true);
    }
  };
  const navigation = useNavigation()

  const Detail = (idMeal:string)=>{
    navigation.navigate('details',{id:idMeal} as never)
  }

  return (
    <TouchableWithoutFeedback>
    <View className="relative w-full h-[50vh]">
      <TouchableOpacity
        onPress={handleSave}
        className="absolute top-5 right-4 bg-white p-2 rounded-full shadow z-10"
      >
        <Image
          className="h-6 w-6"
          source={
            saved
              ? require('../../../assets/icons/save.png')
              : require('../../../assets/icons/save-out.png')
          }
        />
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: image }}
          className="w-full h-[70%] rounded-t"
          resizeMode="cover"
        />
        <View className="px-2 py-2">
          <Text className="font-bold text-lg text-black">{title}</Text>
        </View>
        <View className="mt-1 flex-row justify-between items-end px-3">
          <View>
            <View className="flex-row items-center gap-2">
              <Image
                className="h-6 w-6"
                source={require('../../../assets/icons/location.png')}
              />
              <Text className="text-gray-400">{location}</Text>
            </View>
            <View className="bg-gray-300 rounded-full px-2 py-2 mt-4 w-max items-center justify-center">
              <Text className="text-black font-bold">{category}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={()=>Detail(data.idMeal)}>
            <Text className="text-black font-bold">View Recipe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
