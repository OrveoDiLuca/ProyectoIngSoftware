import React from "react";
import { View, Image, Text, useWindowDimensions,Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import HTML from 'react-native-render-html';


//Vista de la información de la receta

export function RecipeInfo() { 

    const { params } = useRoute();
    const navigation = useNavigation();
    let recipeInfo = params.recipeInfo; 

    const windowWidth = useWindowDimensions().width;

    
    return (
        //Bloque en blanco de la carta

        
        <View className="block max-w-[12rem] m-4 bg-white rounded-lg shadow-lg"> 
            <ScrollView className="block max-w-[12rem] m-4 bg-white rounded-lg shadow-lg"> 
                <Image className= "w-full h-48 object-cover rounded-t-lg" 
                    source={{ uri: recipeInfo.image }}/> 
            

                <View className="px-3 pb-4 space-y-4"> 
                    <Text className="text-lg text-justify text-lg font-semibold pt-3">{recipeInfo.title}</Text>  
                    <Text className="text-lg text-justify text-lg font-semibold pt-3">Summary:</Text>
                    <HTML source={{ html: recipeInfo.summary }} contentWidth={windowWidth}/>
                    <Text className="text-lg text-justify text-lg font-semibold pt-3">Ingredientes:</Text>  
                    <Text className="text-lg text-justify text-lg font-semibold pt-3">Pasos:</Text>  
                    
                </View> 
            </ScrollView>
        </View>
    );
}

