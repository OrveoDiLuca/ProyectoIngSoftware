import React, { useState } from 'react';
import { View, Image, Text, Button} from 'react-native';


//Atom de componente UI de las cartas de las recetas

const RecipeCard = ({item, navigation}) => {

  const [info, setInfo] = useState({id: 0, title: " ", image: " ", summary: " "})


  const handleInfo = async () => {
      try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=2a3a5f802ec24072beae5c801581794f`);
      const data = await response.json();
      setInfo(data);
      navigation.navigate("RecipeInfo", {recipeInfo: data})}
        catch(error) {
          console.error(error);
        };
    };



  return (
    //Bloque en blanco de la carta
    <View className="block max-w-[12rem] m-4 bg-green-100 rounded-lg shadow-2xl p-70"> 
      <Image className= "rounded-t-lg h-48 w-full" 
        source={{ uri: item.image }}/> 

      <View className="px-3 pb-4 space-y-4"> 
        <Text className="text-lg text-justify text-lg font-semibold pt-4 pb-4">{item.title}</Text>
        <Button
          title="View Recipe"
          onPress={handleInfo}
          
          
        />
      </View> 
    </View>
  );
};

export default RecipeCard;