import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import React from "react";
import { Image, StyleSheet, Platform } from 'react-native';
import  RecipeList from "./RecipeList";

//Componente de busqueda de recetas, usa el formato RecipeList para mostrar las recetas

export function SearchRecipes({navigation}) {

  {/*Fetch API con el endpoint debusqueda por recetas */}

  const [searchText, setSearchText] = useState(''); //Salva el estado del input de la barra de busqueda
  const [recipes, setRecipes] = useState([{id: 0, title: '', image:'',}]); //Guarda las recetas obtenidas en el estado

  const handleSearch = () => {
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchText}&apiKey=2a3a5f802ec24072beae5c801581794f`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data); // Guarda las recetas obtenidas en el estado
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View className =  "flex ">

      {/*Barra de busqueda de recetas por ingredientes*/}

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

      {/*Display de los resultados*/}

      <View className = "flex pb-10" >

       <RecipeList recipes={recipes} navigation={navigation}/>

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
    marginVertical: 5
    
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