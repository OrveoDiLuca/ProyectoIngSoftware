import { View, Text, ActivityIndicator, Image, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { styles } from "./StyleRecetas"; // Ensure this file exists and exports a valid styles object
import {SearchRecipes} from '../components/molecules/SearchRecipes';

const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";
const db = getFirestore();
const API_KEY = "c016da5a0e124df3a0390878cb339126"

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
  const [userRecipes, setUserRecipes] = useState([]);
  const [ingredientRecipes, setIngredientRecipes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const fecthUserRecipes = async () => {
    if (isLoggedIn) {
      try {
        const userDocRef = doc(db, 'Users', user.uid);
        const userData = await getDoc(userDocRef);
        setUserRecipes(userData.data().recipes)
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    } 
  }

  const fetchIngredientRecipes = async () => {
    if (isLoggedIn) {
      const userDocRef = doc(db, 'Users', user.uid);
      const userData = await getDoc(userDocRef);
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apiKey: API_KEY,
            includeIngredients: userData.data().ingredients.join(", "),
            addRecipeNutrition: true,
          }
        });
        if (response.data && response.data.results) {
          setIngredientRecipes(response.data.results);
        } else {
          console.error('No results found');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user ? true : false);
    });

    return unsubscribe;
  }, []);

  useEffect(() =>{
    fetchIngredientRecipes();
    fecthUserRecipes();
  }, []);

  const addToFavorites = async (recipe) => {
    
      if (isLoggedIn) {
        fecthUserRecipes();
        try {
          const userDocRef = doc(db, 'Users', user.uid);
          await updateDoc(userDocRef, {
            recipes: arrayUnion(recipe)
          });
          console.log('Recipe added to favorites:', recipe.title);
        } catch (error) {
          console.error('Error adding recipe to favorites:', error);
        }
      } else {
        console.error('Registrate porfavor para añadir a favoritos');
      }

  };

  const removeFromFavorites = async (recipe) => {
    if (isLoggedIn) {
      const userDocRef = doc(db, "Users", user.uid);
      try {
        await updateDoc(userDocRef, {
          recipes: arrayRemove(recipe),
        });
        fecthUserRecipes();
        console.log("Recipe removed from favorites:", recipe.title);
      } catch (error) {
        console.error("Error removing recipe from favorites:", error);
      }
    } else {
      console.error("No user is signed in. Please sign in to remove favorites.");
    }
  }

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
    <View>
      {isLoggedIn ? (
          <View style={styles.listContainer}>
          {userRecipes.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                onPress={() => {
                  handleInfo(item={item}); 
                  navigation.navigate("RecipeInfo", { recipeInfo: info });
                }}
              >
                <View style={styles.card}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.nutriente}>Calorías: {calculateNutritionalValues(item.nutrition).calories}</Text>
                    <Text style={styles.nutriente}>Proteínas: {calculateNutritionalValues(item.nutrition).protein}</Text>
                    <Text style={styles.nutriente}>Carbohidratos: {calculateNutritionalValues(item.nutrition).carbohydrates}</Text>
                    <Text style={styles.nutriente}>Grasas: {calculateNutritionalValues(item.nutrition).fat}</Text>
                    <Button title="Eliminar de Favoritos" onPress={() => removeFromFavorites(item)} color = 'red' style={{ pointerEvents: 'box-none' }} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          <Text className="text-center text-xl text-black font-bold mb-4 mt-3" >Recetas recomendadas según tus ingredientes!</Text>
          {ingredientRecipes.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                onPress={() => {
                  handleInfo(item={item}); 
                  navigation.navigate("RecipeInfo", { recipeInfo: info });
                }}
              >
                <View style={styles.card}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.nutriente}>Calorías: {calculateNutritionalValues(item.nutrition).calories}</Text>
                    <Text style={styles.nutriente}>Proteínas: {calculateNutritionalValues(item.nutrition).protein}</Text>
                    <Text style={styles.nutriente}>Carbohidratos: {calculateNutritionalValues(item.nutrition).carbohydrates}</Text>
                    <Text style={styles.nutriente}>Grasas: {calculateNutritionalValues(item.nutrition).fat}</Text>
                    <Button title="Añadir a Favoritos" onPress={() => addToFavorites(item)} style={{ pointerEvents: 'box-none' }} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}

          <View className = "flex-col items-centerflex flex-col">
            <Text className="text-center text-xl text-black font-bold mb-4 mt-3" >
              ¿Buscas una receta con un ingrediente específico? Ingrésalo aquí!
            </Text>
            <SearchRecipes navigation={navigation} />
          </View>

        </View>
      ) : (
        <View style={styles.listContainer}>
          <Text className="text-center text-xl text-black font-bold mb-4 mt-3" > Inicia sesión para poder guardar recetas y recibir recomendaciones! </Text>
          
          <View className = "flex-col items-centerflex flex-col">
            <Text className="text-center text-xl text-black font-bold mb-4 mt-3">
              ¿Buscas una receta con un ingrediente específico? Ingrésalo aquí!
            </Text>
            <SearchRecipes navigation={navigation} />
          </View>
            
        </View>
    )}
    </View>
  )}

export default UserRecipes;

