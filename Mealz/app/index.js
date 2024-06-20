import { View, Image } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../views/Home';
import { Account } from '../views/Account';
import { Recipes } from '../views/Recipes';
import { Ingredients } from '../views/Ingredients';
import { createStackNavigator } from '@react-navigation/stack';
import { RecipeInfo } from '../views/RecipeInfo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#00a680',
        tabBarInactiveTintColor: '#646464',
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        tabBarLabelStyle: {
          fontFamily: 'Inter-ExtraBold',
        },
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require('../assets/images/iconmealz.png')}
              style={{
                width: 110,
                height: 80,
                resizeMode: 'contain',
                alignSelf: 'center', // Ensures horizontal centering on most devices
                marginTop: 'auto', // Positions logo vertically within available space
                marginBottom: 'auto',
                marginLeft: 'auto',
                marginRight:'auto'
              }}
            />

            </View>
          </View>
        ),
      })}
    >
      <Tab.Screen name="Inicio">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Recetas">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Mis recetas" component={Recipes} />
            <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Ingredientes" component={Ingredients} />
      <Tab.Screen name="Perfil" component={Account} />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName = '';
  if (route.name === 'Inicio') {
    iconName = 'home-outline';
  }
  if (route.name === 'Search') {
    iconName = 'magnify';
  }
  if (route.name === 'Recetas') {
    iconName = 'food-variant';
  }
  if (route.name === 'Perfil') {
    iconName = 'account';
  }
  if (route.name === 'Ingredientes') {
    iconName = 'fridge-outline';
  }
  return <Icon type='material-community' name={iconName} size={size} color={color} />;
}

