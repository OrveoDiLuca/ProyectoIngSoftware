import React from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import RecipeCard from '../atoms/RecipeCard';

//Componente de listado de recetas
//Solo retorna tarjetas en forma de lista si el atributo de imagen no esta vacio

const RecipeList = ({ recipes }) => {
  return (
    <FlatList 
      data={recipes}
      extraData={recipes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => item.image !== '' ? <RecipeCard item={item} /> : null} 
    /> 
  );
};

export default RecipeList;