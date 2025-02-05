import React,{useState,useEffect} from 'react';
import { View, Text, ScrollView, Image,StyleSheet} from 'react-native';
import  RecipeCard from '../components/atoms/RecipeCard';

const BASE_URL = 'https://api.spoonacular.com';
const API_KEY = '2c61721201c14169a56ba648b7daf1da';

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
        <Text style={styles.title}>Recipes that we recommend</Text>
        {recipes.map(recipe => (
          <RecipeCard key= {recipe.id} item={recipe} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
 
});
