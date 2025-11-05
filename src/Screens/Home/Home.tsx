import { View, Text, Image, TextInput, ScrollView, TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FetchInitialData } from '../../../hooks/fetchdata';
import Card from '../../components/Card/Card';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../@types';
import Search from '../../components/Search/Search';
import { useFetchByName } from '../../../hooks/fetchdata';



const Home = () => {
    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
    const [searchText, setSearchText] = useState('');
    const { results: suggestionList, loading } = useFetchByName(searchText);
    const [data, setData] = useState([])
    const [search,setSearch] = useState(false)
    const HandleDrawer = () => {
        navigation.toggleDrawer()
    }
 
    useEffect(() => {
        const fetchData = async () => {
            const initialData = await FetchInitialData();
            setData(initialData.meals);
        };
        fetchData();
    }, []);
    useEffect(()=>{
        if (suggestionList.length === 0 || searchText.length === 0){
            setSearch(false)
        }else{
            setSearch(true)
        }
    },[suggestionList])
    return (
        <View className='h-full w-full bg-white flex-1 pt-[5%]'>
            {/* Header */}
            <TouchableWithoutFeedback>
            <View className='flex-row w-full justify-between items-center h-16 pr-8'>
                <View className='w-[80%] h-16 items-center flex-row gap-2 px-4'>
                    <Image className='h-8 w-8' source={require("../../../assets/icons/chef.png")} />
                    <Text className='text-black text-2xl font-bold'>Mealify</Text>
                </View>
                <TouchableOpacity onPress={HandleDrawer}>
                    <Image className='w-6 h-6' source={require("../../../assets/icons/menu.png")} />
                </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
            {/* Search section */}
            <View className='w-full h-[10vh] items-center justify-center mt-[6%]'>
                <View id='Main input' className='h-[60%] w-[90%] bg-white rounded-lg flex-row items-center px-4 gap-2 border border-black-300 shadow-md'>
                    <Image className='h-6 w-6' source={require("../../../assets/icons/loupe.png")} />
                    <TextInput onFocus={()=>setSearch(true)} onChangeText={(text)=>setSearchText(text)} className='flex-1 h-full text-black font-bold placeholder:text-gray-400' placeholder='Search for recipes...' />
                </View>
                {
                    search?<ScrollView className='bg-white absolute h-[60vh] w-[100vw] z-30 top-20 py-2' contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
                    {
                        suggestionList.map((item,index)=>(
                            <Search title={item.strMeal} image={item.strMealThumb} location={item.strArea} key={index} id={item.idMeal}/>
                        ))
                    }
                </ScrollView>:<></>
                }
            </View>
            {/* List of items */}
            <View className='px-4 pt-4 flex-1'>
                <Text className='font-bold text-2xl'>Featured</Text>
                <ScrollView className='py-[10%] pb-10'>
                    {
                        data?.map((item: any, index: number) => {
                            return (
                                <View key={index} className='mb-16 px-2'>
                                    <Card title={item.strMeal} image={item.strMealThumb} location={item.strArea} category={item.strCategory} data={item} />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default Home