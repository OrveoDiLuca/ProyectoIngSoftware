import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button} from 'react-native';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from '@firebase/firestore';

//Atom de componente UI de las cartas de las recetas



const RecipeCard = ({item, navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [info, setInfo] = useState({id: 0, title: " ", image: " ", summary: " "})
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  const handleInfo = async () => {
      try {

      const response = await fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=2c61721201c14169a56ba648b7daf1da`); //Api key de Alexia

      const data = await response.json();
      setInfo(data);
      navigation.navigate("RecipeInfo", {recipeInfo: data})}
        catch(error) {
          console.error(error);
        };
    };

  const addToFavorites = async (recipe) => {
      if (isLoggedIn) {
        try {
          const userDocRef = doc(db, 'Users', user.uid);
          await updateDoc(userDocRef, {
            recipes: arrayUnion(recipe)
          });
          console.log('Recipe added to favorites:', recipe.title);
        } catch (error) {
          console.error('Error adding recipe to favorites:', error);
        }
      } else {
        console.error('Registrate por favor para añadir a favoritos');
      }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user ? true : false);
    });

    return unsubscribe;
  }, []);

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
        <Button
          title="Add to Favorites"
          onPress={() => addToFavorites(item)}
        />
      </View> 
    </View>
  );
};

export default RecipeCard;