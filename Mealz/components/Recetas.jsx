import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, Button } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { styles } from "./StyleRecetas"; // Ensure this file exists and exports a valid styles object

const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";
const db = getFirestore();

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
  const auth = getAuth();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: '79d5d31d011848849104d4d813478b2d', // Ensure your API key is valid
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

  const addToFavorites = async (recipe) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          favorites: arrayUnion({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            nutrition: recipe.nutrition
          })
        });
        console.log('Recipe added to favorites:', recipe.title);
      } catch (error) {
        console.error('Error adding recipe to favorites:', error);
      }
    } else {
      console.error('No user is signed in');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const nutritionalValues = calculateNutritionalValues(item.nutrition);
          return (
            <View style={styles.card}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.image} 
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.nutriente}>Total valor nutricional: {nutritionalValues}</Text>
                <Button title="Añadir a Favoritos" onPress={() => addToFavorites(item)} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Recetas;








