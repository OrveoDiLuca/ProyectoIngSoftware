import Filters from "../atoms/FiltersSearch"
import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';

export function FilterSearch() {
    const [recipes, setRecipes] = useState([]);
  
    const fetchRecipes = async (filters) => {
      try {
        console.log('Fetching Recipes with Filters:', filters); // Log para verificar los filtros en la solicitud
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: 'cfc2ce5786404fceb4c207ddcad3b92f',
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
              <Text>{recipe.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }