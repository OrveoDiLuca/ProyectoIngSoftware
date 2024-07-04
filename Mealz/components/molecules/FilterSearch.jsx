import Filters from "../atoms/FiltersSearch"
import React, { useState,useEffect } from 'react';
import { ScrollView, View, Text,TextInput, TouchableOpacity, Button, Alert,Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";
const db = getFirestore();
const API_KEY = "e3f2f95509ec4de082e30e4bde81d828";
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
};

export function FilterSearch({navigation}) {
    const [recipes, setRecipes] = useState([]); 
    const [userRecipes, setUserRecipes] = useState([]);
    const [info, setInfo] = useState({id: 0, title: " ", image: " ", summary: " "});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    
    const handleInfo = ({item}) => {
      fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          setInfo(data); 
          navigation.navigate("RecipeInfo", { recipeInfo: data });
        })
        .catch(error => {
          console.error(error);
        });
    };

    useEffect(() => {
      fecthUserRecipes();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(user ? true : false);
      });
      return unsubscribe;
    }, []);
  
    const fecthUserRecipes = async () => {
      if (isLoggedIn) {
        try {
          const userDocRef = doc(db, 'Users', user.uid);
          const userData = await getDoc(userDocRef);
          setUserRecipes(userData.data().recipes);
        } catch (error) {
          console.error('Error fetching user recipes:', error);
        }
      } 
    };
    
    const fetchRecipes = async (filters) => {
      try {
        console.log('Fetching Recipes with Filters:', filters);
        const response = await axios.get(BASE_URL, {
          params: {
            apiKey: API_KEY,
            addRecipeNutrition: true,
            number: 10, 
            ...filters,
          },
        });
        console.log('API Response:', response.data);
        setRecipes(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    const addToFavorites = async (recipe) => {
      if (isLoggedIn) {
        fecthUserRecipes();
        try {
          const userDocRef = doc(db, 'Users', user.uid);
          const userData = await getDoc(userDocRef);
          const userRecipes = userData.data().recipes;
          // Verificar si la receta ya está en favoritos
          const recipeExists = userRecipes.some((r) => r.id === recipe.id);
    
          if (recipeExists) {
            // Mostrar mensaje de error con SweetAlert
            Alert.alert(
              'Error',
              '¡La receta ya está añadida a favoritos!',
              [{ text: 'OK', onPress: () => console.log('Alert closed') }],
              { cancelable: true }
            );
          } else {
            // Añadir la receta a favoritos si no existe
            await updateDoc(userDocRef, {
              recipes: arrayUnion(recipe)
            });
            console.log('Recipe added to favorites:', recipe.title);
          }
        } catch (error) {
          console.error('Error adding recipe to favorites:', error);
        }
      } else {
        console.error('Regístrate por favor para añadir a favoritos');
      }
    };
  
    return (
      <View>
        <Filters onApplyFilters={fetchRecipes} />
        <ScrollView>
          {recipes.map((item) => (
            <TouchableOpacity
            key={item.id.toString()}
            onPress={() => {
              handleInfo(item={item}); 
             
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
                <Button title="Add to favorites" onPress={() => addToFavorites(item)} style={{ pointerEvents: 'box-none' }} />
              </View>
            </View>
          </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  const styles = StyleSheet.create({
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    nutriente: {
      fontSize: 14,
      color: '#555',
    },
    image: {
      width: 100,
      height: 100,
    },
    card: {
      flexDirection: 'row',
      marginVertical: 10,
      backgroundColor: '#DCFCE7',
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#DCDCDC',
      shadowOffset: {
        width: 5,
        height: 4,
      },
      shadowOpacity: 0.34,
      shadowRadius: 4,
    },
    textContainer: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '100%',
      height: 50,
      borderRadius: 10,
      marginVertical: 5
      
    },
    searchInput: {
      flex: 1,
      height: 50,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 1,
      border: '1px solid red',
    },
    searchButton: {
      width: 100,
      height: 50,
      backgroundColor: '#27B009',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 10,
    },
    searchButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });