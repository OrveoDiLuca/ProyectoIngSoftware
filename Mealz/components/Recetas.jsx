import { View, Text,StyleSheet,FlatList,ActivityIndicator } from 'react-native'
import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {styles} from "./StyleRecetas"

const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch"
const calculateNutritionalValues = (nutrition) => {
    if (!nutrition || !nutrition.nutrients) {
      return {
        calories: 0, 
        protein: 0, 
        carbohydrates: 0, 
        fat: 0,
      };
    }
  
    const calories = nutrition.nutrients.find(nutrient => nutrient.name === 'Calories')?.amount || 0;
    const protein = nutrition.nutrients.find(nutrient => nutrient.name === 'Protein')?.amount || 0;
    const carbohydrates = nutrition.nutrients.find(nutrient => nutrient.name === 'Carbohydrates')?.amount || 0;
    const fat = nutrition.nutrients.find(nutrient => nutrient.name === 'Fat')?.amount || 0;
  
    const total = (calories + protein + carbohydrates + fat) / 100;
    return `${total.toFixed(1)}`;
  }
  
  const Recetas = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apiKey: '830ae5b92d6141f086417e0be25133fe',
            number: 100,
            addRecipeNutrition: true,
          }
        });
  
        if (response.data && response.data.results) {
          setRecipes(response.data.results);
        } else {
          console.error('No results found');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchRecipes();
    }, []);
  
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      );
    }
  
    return (
      <View>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const nutritionalValues = calculateNutritionalValues(item.nutrition);
            return (
              <View style = {styles.conteiner}>
                <Text style = {styles.title}>{item.title}</Text>
                <Text style = {styles.nutriente}>Total valor nutricional: {nutritionalValues}</Text>
              </View>
            );
          }}
        />
      </View>
    );
};

export default Recetas;

