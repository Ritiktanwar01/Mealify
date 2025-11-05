import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screens/Home/Home';
import Saved from '../Screens/Saved/Saved';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Saved" component={Saved} />
    </Drawer.Navigator>
  );
}