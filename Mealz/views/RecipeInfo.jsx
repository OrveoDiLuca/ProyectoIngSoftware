import React from "react";
import { View, Image, Text, useWindowDimensions,Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState} from "react";
import HTML from 'react-native-render-html';
import { set } from "firebase/database";


//Vista de la información de la receta

export function RecipeInfo() { 

    const { params } = useRoute();
    const navigation = useNavigation();
    let recipeInfo = params.recipeInfo; 

 const windowWidth = useWindowDimensions().width;

  //const [instructions, setInstructions] = useState({parsedInstructions: []});


// Fetch and set the recipe instructions
// const handleInstructions = async () => {
//     try {
//         const response = await fetch(`https://api.spoonacular.com/recipes/${recipeInfo.id}/analyzedInstructions?apiKey=2a3a5f802ec24072beae5c801581794f`);
//         const data = await response.json();
//         setInstructions(data);
//     } catch (error) {
//         console.error(error);
//     }
// };

// Call handleInstructions on component mount
// useEffect(() => {
//     handleInstructions();
// }, []);

    
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
                    <Text className="text-lg text-justify text-lg font-semibold pt-3">Ingredients:</Text> 

                    <Text className="text-lg text-justify text-lg font-semibold pt-3">Steps:</Text>  
                    {/* {instructions.steps.map((step) => (
                    // <Text className="text-lg text-justify text-lg font-semibold pt-3">
                    //   Step {step.number} : {step.step} 
                    // </Text>
                    ))} */}
                </View> 
            </ScrollView>
        </View>
    );
}

