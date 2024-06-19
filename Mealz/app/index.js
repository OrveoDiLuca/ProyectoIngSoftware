import { View, Text,Image } from 'react-native'
import React from 'react'
import {Icon} from "react-native-elements"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Home } from '../views/Home';
import { Account } from '../views/Account';
import {Recipes} from '../views/Recipes'
import {Ingredients} from '../views/Ingredients'
import { createStackNavigator } from '@react-navigation/stack';
import {RecipeInfo} from '../views/RecipeInfo';



const Tab = createBottomTabNavigator() //Creo el boton para la navegacion de la app. 
const Stack = createStackNavigator()


export default function HomeScreen() {
    return (
   
        <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: true,
    tabBarActiveTintColor: '#00a680',
    tabBarInactiveTintColor: '#646464',
    tabBarIcon: ({ color, size }) => screenOptions(route, color, size), // Call your custom tabBarIcon function
    tabBarLabelStyle: {
      fontFamily: 'Inter-ExtraBold',
    },
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}> {/* Arrange icons horizontally and space them out */}
        <Image
          source={require('../assets/images/Icon2.png')}
          style={{ width: 60, height: 80, resizeMode: 'contain' }} // Adjust size as needed
        />
        <View style={{ flex: 1, alignItems: 'center' }}> {/* Center the new image */}
          <Image
            source={require('../assets/images/iconmealz.png')}
            style={{ marginLeft:100, width: 110, height: 80, resizeMode: 'contain' }} // Adjust size as needed
          />
        </View>
      </View>
    ),
  })}
>
            
                <Tab.Screen name="Inicio"> 
                    {()=>(
                    <Stack.Navigator >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
                    </Stack.Navigator>
                )} 
                </Tab.Screen> 
               

                <Tab.Screen name="Recetas">
                 {()=>(
                    <Stack.Navigator >
                        <Stack.Screen name="Mis recetas" component={Recipes} />
                        <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
                    </Stack.Navigator>
                )}
                </Tab.Screen>
               
                <Tab.Screen name='Ingredientes' component={Ingredients}/>
                <Tab.Screen name="Perfil" component={Account}/>
            
        </Tab.Navigator>  


    );

    
}

function screenOptions(route,color,size){
    let iconName =''; 
    if(route.name === 'Inicio'){ //Si la ruta anteriormente incializada coincide con home pues se coloca ese icono.
        iconName = 'home-outline'
    }
    if(route.name === 'Search'){
        iconName = 'magnify'
    }
    if(route.name === 'Recetas'){
        iconName = 'food-variant'
    }
    if(route.name === 'Perfil'){
        iconName = 'account'
    }
    if(route.name === 'Ingredientes'){
        iconName = 'fridge-outline'
    }
    return(
        <Icon type = 'material-community' name = {iconName} size = {size} color = {color}/>
    )
    
}

