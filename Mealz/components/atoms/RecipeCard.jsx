import React from 'react';
import { View, Image, Text } from 'react-native';

//Atom de componente UI de las cartas de las recetas

const RecipeCard = ({ item }) => {
  return (
    //Bloque en blanco de la carta
    <View className="block max-w-[12rem] m-4 bg-white rounded-lg shadow-lg"> 
      <Image className= "rounded-t-lg h-48 w-full" 
        source={{ uri: item.image }}/> 
      
      <View className="px-3 pb-4 space-y-4"> 
        <Text className="text-lg text-justify text-lg font-semibold pt-3">{item.title}</Text>    
      </View> 
    </View>
  );
};

export default RecipeCard;