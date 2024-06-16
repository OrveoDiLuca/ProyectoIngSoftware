import React, { useState } from 'react';
import { View, Image, Text, Button} from 'react-native';

//Atom de componente UI de las cartas de las recetas

const RecipeCard = ({item, navigation}) => {



  const [info, setInfo] = useState({id: 0, title: " ", image: " ", summary: " "})


  const handleInfo = () => {
      fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=2a3a5f802ec24072beae5c801581794f`)
        .then(response => response.json())
        .then(data => {
          setInfo(data); // Guarda las recetas obtenidas en el estado
        })
        .catch(error => {
          console.error(error);
        });
    };



  return (
    //Bloque en blanco de la carta
    <View className="block max-w-[12rem] m-4 bg-white rounded-lg shadow-lg"> 
      <Image className= "rounded-t-lg h-48 w-full" 
        source={{ uri: item.image }}/> 

      <View className="px-3 pb-4 space-y-4"> 
        <Text className="text-lg text-justify text-lg font-semibold pt-3">{item.title}</Text>  
        <Button
          title="View Recipe"
          onPress={() => {
            handleInfo()
            navigation.navigate("RecipeInfo", {recipeInfo: info})
          }}
        />
      </View> 
    </View>
  );
};

export default RecipeCard;