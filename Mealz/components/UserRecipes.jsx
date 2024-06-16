import { View, Text, FlatList, ActivityIndicator, Image, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion, collection } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { styles } from "./StyleRecetas"; // Ensure this file exists and exports a valid styles object

const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";
const db = getFirestore();
const API_KEY = "e803858775df4b07bcf8f34291b5bf58"

const calculateNutritionalValues = (nutrition) => {
  if (!nutrition || !nutrition.nutrients) {
    return {
      total: 0,
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
  return {
    total: total.toFixed(1),
    calories: calories.toFixed(1) + " kcal",
    protein: protein.toFixed(1) + " g",
    carbohydrates: carbohydrates.toFixed(1) + " g",
    fat: fat.toFixed(1) + " g"
  };
}



const UserRecipes = ({navigation}) => {
  const [info, setInfo] = useState({id: 0, title: " ", image: " ", summary: " "})
  const [recipes, setRecipes] = useState([]);
  const [recipes1, setRecipes1] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  const fetchUserRecipes = async () => {
    if (user) {
      const userDocRef = doc(db, 'Users', user.uid);
      const recipeNames = collection(userDocRef, 'recipes');

      try {
        for (const recipeName of recipeNames) {
          const response = await axios.get(BASE_URL, {
            params: {
              apiKey: API_KEY, // Ensure your API key is valid
              query: recipeName,
              addRecipeNutrition: true,
            }
          });
          console.log(response.data.results)
          if (response.data && response.data.results) {
            setRecipes1(response.data.results);
          } else {
            console.error('No results found');
          }
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchUserRecipes(); 
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: API_KEY, // Ensure your API key is valid
          number: 3,
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
    if (!user) {
      console.error('No user is signed in. Please sign in to add favorites.');
    }
    if (user) {
      try {
        const userDocRef = doc(db, 'Users', user.uid);
        await updateDoc(userDocRef, {
          recipes: arrayUnion({
            title: recipe.title,
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

  const handleInfo = ({item}) => {
    fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setInfo(data); // Guarda las recetas obtenidas en el estado
      })
      .catch(error => {
        console.error(error);
      });
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
      <Text> Mis Recetas </Text>
      <Text> Recetas recomendadas según tus ingredientes! </Text>
      <FlatList
  data={recipes}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => {
    const { total, calories, protein, carbohydrates, fat } = calculateNutritionalValues(item.nutrition);
    return (
      <TouchableOpacity 
        onPress={() => {
          handleInfo(item={item});
          navigation.navigate("RecipeInfo", {recipeInfo: info});
        }}>
        <View style={styles.card}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.image} 
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.nutriente}>Calorías: {calories}</Text>
            <Text style={styles.nutriente}>Proteínas: {protein}</Text>
            <Text style={styles.nutriente}>Carbohidratos: {carbohydrates}</Text>
            <Text style={styles.nutriente}>Grasas: {fat}</Text>
            <Button title="Añadir a Favoritos" onPress={() => addToFavorites(item)} style={{ pointerEvents: 'box-none' }} />
          </View>
        </View>
      </TouchableOpacity>  
    );
  }}
/>


      <Text>La loquera</Text>
      <FlatList
  data={recipes}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => {
    const { total, calories, protein, carbohydrates, fat } = calculateNutritionalValues(item.nutrition);
    return (
      <TouchableOpacity 
        onPress={() => {
          handleInfo(item={item});
          navigation.navigate("RecipeInfo", {recipeInfo: info});
        }}>
        <View style={styles.card}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.image} 
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.nutriente}>Calorías: {calories}</Text>
            <Text style={styles.nutriente}>Proteínas: {protein}</Text>
            <Text style={styles.nutriente}>Carbohidratos: {carbohydrates}</Text>
            <Text style={styles.nutriente}>Grasas: {fat}</Text>
            <Button title="Añadir a Favoritos" onPress={() => addToFavorites(item)} style={{ pointerEvents: 'box-none' }} />
          </View>
        </View>
      </TouchableOpacity>  
    );
  }}
/>


    </View>
  );
};

export default UserRecipes;








