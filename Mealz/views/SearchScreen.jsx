import React from 'react';
import { View, Text } from 'react-native';
import {SearchRecipes} from '../components/atoms/SearchRecipes';



export function SearchScreen() {
  return (
    <View>
     <SearchRecipes/>
      <Text>Search</Text>
    </View>
  );
}
