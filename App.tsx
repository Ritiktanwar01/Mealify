import { NavigationContainer } from "@react-navigation/native";
import 'react-native-get-random-values';
import "./global.css"
import { DrawerNavigation } from "./src/Navigation/DrawerNavigation";
import { StatusBar } from "react-native";
import { RealmProvider } from "@realm/react";
import { Recipe } from "./src/db/RecipeSchema";
import { RecipeProvider } from "./hooks/DbContext";
import { StackNavigation } from "./src/Navigation/StackNav";

 
export default function App() {
  return (
    <RealmProvider schema={[Recipe]} deleteRealmIfMigrationNeeded={true}>
    <RecipeProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <StackNavigation />
      </NavigationContainer>
      </RecipeProvider>
    </RealmProvider>
  );
}