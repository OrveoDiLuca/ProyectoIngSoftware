import React from 'react';
import { View, Text } from 'react-native';
import {SearchRecipes} from '../components/molecules/SearchRecipes';



export function SearchScreen({navigation}) {
  return (
    <View className = "flex-col items-centerflex flex-col">
     <SearchRecipes navigation={navigation} />
    </View>
  );
}
