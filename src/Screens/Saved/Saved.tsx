import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../@types';
import { useRecipe } from '../../../hooks/DbContext';
import Card from '../../components/Card/Card';

const Saved = () => {
  const { savedRecipes } = useRecipe();
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  const HandleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View className="h-full w-full bg-white flex-1 pt-[5%]">
      {/* Header */}
      <View className="flex-row w-full justify-between items-center h-16 pr-8 mb-12">
        <View className="w-[80%] h-16 items-center flex-row gap-2 px-4">
          <Image className="h-8 w-8" source={require("../../../assets/icons/chef.png")} />
          <Text className="text-black text-2xl font-bold">Mealify</Text>
        </View>
        <TouchableOpacity onPress={HandleDrawer}>
          <Image className="w-6 h-6" source={require("../../../assets/icons/menu.png")} />
        </TouchableOpacity>
      </View>

      <View className="px-4 pt-4 flex-1">
        {/* <View className="flex-row gap-2 items-center">
          <Image className="w-6 h-6" source={require('../../../assets/icons/save.png')} />
          <Text className="font-bold text-2xl">Saved</Text>
        </View> */}

        <ScrollView className="py-[10%] pb-10">
          {savedRecipes.map((item, index) => (
            <View key={index} className="mb-16 px-2">
              <Card
                title={item.strMeal}
                image={item.strMealThumb}
                location={item.strArea}
                category={item.strCategory}
                data={item}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Saved;
