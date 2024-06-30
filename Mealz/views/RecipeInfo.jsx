import React from "react";
import { View, Image, Text, useWindowDimensions,Button, StyleSheet, Linking  } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState} from "react";
import HTML from 'react-native-render-html';
import { set } from "firebase/database";
import { useFonts } from 'expo-font';



//Vista de la información de la receta

export function RecipeInfo() { 

    let [fontsLoaded] = useFonts({
        'PlaywriteNGModern': require('../assets/fonts/PlaywriteNGModern-Regular.ttf'),
      });
    
     

    const { params } = useRoute();
    const navigation = useNavigation();
    let recipeInfo = params.recipeInfo; 

 const windowWidth = useWindowDimensions().width;
 const tagsStyles = {body: {
    fontFamily: 'PlaywriteNGModern',
    textAlign: 'justify', // Justify text alignment
    fontSize: 17, // Larger text size
    lineHeight: 25,
    marginTop: 15,
   
  },
  p: {
    textAlign: 'justify', // Justify text alignment for paragraphs specifically
    fontSize: 18, // Larger text size for paragraphs
    fontFamily: 'PlaywriteNGModern'
  }}



    return (
        
        //Bloque en blanco de la carta

        <View className="block max-w-[12rem] m-4 bg-white rounded-lg shadow-lg"> 
            <ScrollView className="block max-w-[12rem] m-4 bg-white rounded-lg shadow-lg"> 
                <Image className= "w-full h-48 object-cover rounded-t-lg" 
                    source={{ uri: recipeInfo.image }}/> 

                <View className="px-3 pb-4 space-y-4"> 
                    <Text className="text-lg text-justify text-lg" style={styles.titleStyle}>{recipeInfo.title}</Text>  
                    <Text className="text-lg text-justify text-lg font-semibold pt-3" style={{fontFamily: 'PlaywriteNGModern', color: '#297045', fontSize: 24,}}>Summary:</Text>
                    <HTML source={{ html: recipeInfo.summary }} contentWidth={windowWidth} tagsStyles={tagsStyles}/>
                    <Text className="text-lg text-justify text-lg font-semibold pt-3" style={{fontFamily: 'PlaywriteNGModern', color: '#297045', fontSize: 24,}}>Ingredients:</Text> 
                    {recipeInfo.extendedIngredients.map((ingredient) => (
                    <Text className="text-lg text-justify text-lg font-semibold pt-3" style={{fontFamily: 'PlaywriteNGModern', color: '#297045' }}>
                    {ingredient.original}
                    </Text>
))}


                      
                    <Text
                        className="text-lg text-justify text-lg font-semibold pt-3"
                        onPress={() => Linking.openURL(recipeInfo.sourceUrl)}
                        style={{ fontFamily: 'PlaywriteNGModern', color: '#297045', fontSize: 24, textDecorationLine: 'underline' }}
>
                        Get complete recipe on {recipeInfo.sourceName}'s website to check steps and more!
                        </Text>
                    
                </View> 
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
      fontFamily: 'PlaywriteNGModern',
      fontSize: 24,
      textAlign: 'justify',
      fontWeight: 'bold',
      color: '#297045',
      lineHeight: 38,
      marginTop: 20,
    }
  });

