import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import UserRecipes from '../components/UserRecipes'
import {SearchRecipes} from '../components/molecules/SearchRecipes';

export function Recipes({navigation}) {
  return (
    <ScrollView>
      <View>
        <UserRecipes navigation={navigation}/>
      </View>
      <View className = "flex-col items-centerflex flex-col">
        <Text>
          ¿Buscas una receta con un ingrediente específico? Ingrésalo aquí!
        </Text>
        <SearchRecipes navigation={navigation} />
      </View>
    </ScrollView>
  )
}