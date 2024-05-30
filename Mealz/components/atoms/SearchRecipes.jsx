import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import React from "react";
import { Image, StyleSheet, Platform } from 'react-native';



export function SearchRecipes() {

  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([{id: 0, title: '',}]);

  const handleSearch = () => {
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchText}&apiKey=d924d7bad0fd40bd96ec1adb4d9c6945`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data); // Save the retrieved recipes in state
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter ingredients"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View> 

      <View style={styles.resultsContainer}>
    {recipes.map((recipe, index) => (
      <View key={index} style={styles.recipe}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
      </View>
    ))}
  </View>

    </View>
    

    

  );
} 


const styles = StyleSheet.create({
  
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginVertical: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    padding: 10,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 10,
  },
  searchButton: {
    width: 100,
    height: 50,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  resultsContainer: {
    marginTop: 20,
  },
  recipe: {
    marginBottom: 20,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
});