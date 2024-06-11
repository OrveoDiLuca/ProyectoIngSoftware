import React from 'react';
import { View, Text } from 'react-native';
import {SearchRecipes} from '../components/molecules/SearchRecipes';



export function SearchScreen() {
  return (
    <View className = "flex-col items-centerflex flex-col">
     <SearchRecipes/>
    </View>
  );
}
