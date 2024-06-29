import Filters from "../atoms/FiltersSearch"
import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';
import RecipeCard from '../atoms/RecipeCard'

export function FilterSearch({navigation}) {
  console.log(navigation)
    const [recipes, setRecipes] = useState([]);
  
    const fetchRecipes = async (filters) => {
      try {
        console.log('Fetching Recipes with Filters:', filters); // Log para verificar los filtros en la solicitud
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: 'be51aa0b03234561a3f2478f15317316',
            number: 10, // Limitar el número de resultados
            ...filters,
          },
        });
        console.log('API Response:', response.data); // Log para verificar la respuesta de la API
        setRecipes(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <View>
        <Filters onApplyFilters={fetchRecipes} />
        <ScrollView>
          {recipes.map((recipe) => (
            <View key={recipe.id}>
              <RecipeCard item={recipe} navigation={navigation} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }