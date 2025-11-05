import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../Screens/Detail/Detail";
import { DrawerNavigation } from "./DrawerNavigation";


const Stack = createStackNavigator()


export const StackNavigation = ()=>(
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="main" component={DrawerNavigation} />
        <Stack.Screen name="details" component={Detail} />
    </Stack.Navigator>
)