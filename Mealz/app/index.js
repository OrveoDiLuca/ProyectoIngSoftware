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
import { FilterSearch } from '../components/molecules/FilterSearch';

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
            <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require('../assets/images/iconmealz.png')}
              style={{
                width: 110,
                height: 50,
                resizeMode: 'contain',
                marginLeft: -10,
              }}
            />
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Home} />
            <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
            <Stack.Screen name="FilterSearch" component={FilterSearch} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Recipes">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Recipes!" component={Recipes} />
            <Stack.Screen name="RecipeInfo" component={RecipeInfo} />
            <Stack.Screen name="FilterSearch" component={FilterSearch} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Ingredients" component={Ingredients} />
      <Tab.Screen name="Profile" component={Account} />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName = '';
  if (route.name === 'Home') {
    iconName = 'home-outline';
  }
  if (route.name === 'Search') {
    iconName = 'magnify';
  }
  if (route.name === 'Recipes') {
    iconName = 'food-variant';
  }
  if (route.name === 'Profile') {
    iconName = 'account';
  }
  if (route.name === 'Ingredients') {
    iconName = 'fridge-outline';
  }
  return <Icon type='material-community' name={iconName} size={size} color={color} />;
}

