import { View, Text } from 'react-native'
import React from 'react'
import {Icon} from "react-native-elements"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Home } from '../views/Home';
import { SearchScreen } from '../views/SearchScreen';
import { Account } from '../views/Account';
import {Recetas} from '../views/Recetas'

const Tab = createBottomTabNavigator() //Creo el boton para la navegacion de la app. 

export default function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={({route}) => (
        {
            tabBarActiveTintColor: '#00a680', //El color de cuando esta sobre la vista seleccionada.
            tabBarInactiveTintColor: '#646464', //Pone de color gris a los demas.
            tabBarIcon: ({color, size}) => screenOptions(route,color,size), //Se llama a la funcion creada abajo
        }
    )}>
        <Tab.Screen name="Home" component={Home} /> 
        <Tab.Screen name="SearchScreen" component={SearchScreen} />
        <Tab.Screen name='Recetas' component={Recetas}/>
        <Tab.Screen name="Account" component={Account}/>
    </Tab.Navigator>
      
  );
}

function screenOptions(route,color,size){
    let iconName =''; 
    if(route.name === 'Home'){ //Si la ruta anteriormente incializada coincide con home pues se coloca ese icono.
        iconName = 'home-outline'
    }
    if(route.name === 'SearchScreen'){
        iconName = 'magnify'
    }
    if(route.name === 'Recetas'){
        iconName = 'food-variant'
    }
    if(route.name === 'Account'){
        iconName = 'account'
    }
    return(
        <Icon type = 'material-community' name = {iconName} size = {size} color = {color}/>
    )
    
}

