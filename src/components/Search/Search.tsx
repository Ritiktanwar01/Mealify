import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

interface SearchCardProps {
  title?: string;
  location?: string;
  id: number
}

const Search = ({title, location,id}:SearchCardProps) => {
    const navigation = useNavigation()
    const Details = ()=>{
        navigation.navigate('details',{id:id} as never)
    }
  return (
    <TouchableOpacity onPress={Details} className='w-[90%] min-h-16 h-max bg-[#F5F5F0] rounded flex-row items-center justify-between px-4 mb-2'>
      <Text className='font-bold text-wrap w-[60%]'>{title}</Text>
      <View className='flex-row items-center gap-2'>
        <Image className='w-5 h-5' source={require('../../../assets/icons/location.png')} />
        <Text className='font-bold'>{location}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Search