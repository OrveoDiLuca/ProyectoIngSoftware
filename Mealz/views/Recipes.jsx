import { ScrollView } from 'react-native'
import React from 'react'
import UserRecipes from '../components/UserRecipes'

export function Recipes({navigation}) {
  return (
    <ScrollView>
        <UserRecipes navigation={navigation}/>
    </ScrollView>
  )
}