import React,{useState,useEffect} from 'react';
import { View, Text, ScrollView, Image,StyleSheet} from 'react-native';
import  RecipeCard from '../components/atoms/RecipeCard';

const BASE_URL = 'https://api.spoonacular.com';
const API_KEY = 'e803858775df4b07bcf8f34291b5bf58';

export function Home({navigation}) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/complexSearch?sort=popularity&number=10&apiKey=${API_KEY}&addRecipeNutrition=true`);
        if (!response.ok) {
          throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        setRecipes(data.results);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes()
  }, []);

  

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Recetas que te recomendamos !!!!</Text>
        {recipes.map(recipe => (
          <RecipeCard item={recipe} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});
