import { View, Text,Image } from 'react-native'
import React from 'react'
import {Icon} from "react-native-elements"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Home } from '../views/Home';
import { SearchScreen } from '../views/SearchScreen';
import { Account } from '../views/Account';
import {Recipes} from '../views/Recipes'
import {Ingredients} from '../views/Ingredients'
import { createStackNavigator } from '@react-navigation/stack';
import {RecipeInfo} from '../views/RecipeInfo';
import { NavigationContainer } from '@react-navigation/native';



const Tab = createBottomTabNavigator() //Creo el boton para la navegacion de la app. 
const Stack = createStackNavigator()


export default function HomeScreen() {
    return (
   
        <Tab.Navigator screenOptions={({route}) => (
            {
                headerShown: true, //No muestra el header de la app.
                tabBarActiveTintColor: '#00a680', //El color de cuando esta sobre la vista seleccionada.
                tabBarInactiveTintColor: '#646464', //Pone de color gris a los demas.
                tabBarIcon: ({color, size}) => screenOptions(route,color,size), //Se llama a la funcion creada abajo      
                tabBarLabelStyle: {
                    fontFamily: 'Inter-ExtraBold',
                },
                headerTitle: () => (
                    <View style={{width:1000,height:110}}>
                        <Image source={require('../assets/images/Icon2.png')} style={{width: 60, height: 80}} resizeMode='contain'/>
                    </View>
                    
                ),
                headerTittleAlign: 'center',
            }
        )}>
            
                <Tab.Screen name="Inicio"> 
                    {()=>(
                    <Stack.Navigator >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
                    </Stack.Navigator>
                )} 
                </Tab.Screen> 
               

                <Tab.Screen name="Search">
                 {()=>(
                    <Stack.Navigator >
                        <Stack.Screen name="Busqueda" component={SearchScreen} />
                        <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
                    </Stack.Navigator>
                )}
                </Tab.Screen>
               
                <Tab.Screen name='Recetas' component={Recipes}/>
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

