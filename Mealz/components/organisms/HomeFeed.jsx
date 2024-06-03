import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FeatureDisplay } from '../molecules/FeatureDisplay';
import { useEffect } from 'react';





//Vista de la pantalla principal que muestra las recetas más populares, las recetas más recientes y las recetas más valoradas



export function HomeFeed() {
    const [recipes, setRecipes] = useState([{id: 0, title: '',}]);

    const handleSearch = () => {
      fetch(`https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=10&apiKey=2a3a5f802ec24072beae5c801581794f`)
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
           
                
                {
                
            }
            
        </View>
        
    );
}