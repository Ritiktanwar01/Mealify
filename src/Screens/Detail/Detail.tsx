import React, { useEffect, useState } from 'react';
import { View, Text,Image, TouchableOpacity,Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../@types'; 
import { GetDetails } from '../../../hooks/fetchdata';
import { transformRecipeData } from '../../../hooks/AdditionalFunctions';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const Detail = () => {
  const route = useRoute<DetailRouteProp>();
  const [data,setData] = useState({})
  const { id } = route.params;
  const navigation = useNavigation()
  const Back = ()=>{
    navigation.goBack()
  }
  
  const GetData = async ()=>{
    const data = await GetDetails(id)

    const res = transformRecipeData(data[0])
    
    setData(res)
  }

  useEffect(()=>{
    GetData()
  },[])

  const Youtube = (link:string)=>{
    Linking.openURL(link)
  }
  const Web = (link:string)=>{
    Linking.openURL(link)
  }

  const Ingradients = ()=>{
    if (data.strIngredients!= undefined){
      return (
        data.strIngredients.map((item,index)=>(
                  <View key={index} className=' flex-row justify-between px-4 py-6'>
                    <Text className='' >{item}</Text>
                    <Text>{data.strMeasures[index]}</Text>
                  </View>
                ))
      )
    }else{
      return (
        <></>
      )
    }
  }

  return (
    <View className='w-full h-[100vh]'>
      {/* Header */}
      <View className='w-full h-[10vh] justify-center px-4'>
        <TouchableOpacity onPress={Back}>
          <Image className='h-6 w-6' source={require("../../../assets/icons/back.png")} />
        </TouchableOpacity>
      </View>

      {/* content */}

      <Image className='h-[30vh] w-[90%] mx-[5%] mt-[2vh] rounded-lg' source={{uri: data.strMealThumb}} />

      <ScrollView id='control-area' className='w-[90%] mx-[5%] h-[60vh] mt-[2%]'>
          <View className='p-4 flex-row justify-between items-center'>
            <Text className='text-black text-2xl font-bold w-[60%]'>{data.strMeal}</Text>
              <View className='flex-row items-center gap-2 bg-slate-300 p-3 rounded-3xl'>
                <Text className='font-bold'>{data.strArea}</Text>
                <Image className='w-5 h-5' source={require('../../../assets/icons/location.png')} />
              </View>
          </View>
          <View>
            <Text className='px-4 text-2xl font-bold'>Instructions</Text>
              <Text className='px-4 mt-2'>{data.strInstructions}</Text>
          </View>
          <View>
            <Text className='px-4 text-2xl font-bold mt-4'>Ingredients</Text>
              <View className='bg-slate-200 h-max mt-4 rounded-xl'>
                <View className=' flex-row justify-between px-4 py-6'>
                    <Text className='font-bold text-xl' >Item</Text>
                    <Text className='font-bold text-xl'>Measure</Text>
                  </View>
                {
                <Ingradients />
              }
              </View>
          </View>
          <View className='mt-6'>
            <Text className='px-4 text-2xl font-bold mt-4'>Tutorials</Text>
              <View className='bg-slate-200 h-max mt-4 rounded-xl'>
                <View className=' flex-row justify-between px-4 py-6'>
                    <Text className='font-bold text-xl' >Platform</Text>
                    <Text className='font-bold text-xl'>Links</Text>
                  </View>
                    <View  className=' flex-row justify-between px-6 py-6'>
                      <Text className='' >Youtube</Text>
                      <TouchableOpacity onPress={()=>Youtube}><Image className='h-6 w-6' source={require("../../../assets/icons/youtube.png")} /></TouchableOpacity>
                  </View>
                    <View  className=' flex-row justify-between px-4 py-6'>
                      <Text className='' >Web</Text>
                      <TouchableOpacity onPress={()=>Web}><Image className='h-6 w-6' source={require("../../../assets/icons/web.png")} /></TouchableOpacity>
                  </View>
              </View>
          </View>
      </ScrollView>
    </View>
  );
};

export default Detail;
