import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';                
                
                
const IngredientMiniCard = ({onTouch, item, type, onSelectIngredient}) => {
    const {results} = item
    const [typeCard , setTypeCard] = useState(type)
    const [ingredientName, setIngredientName] = useState('')

    const onPress = () => {
        setTypeCard(1)
        onTouch()
        if (onSelectIngredient) { 
            onSelectIngredient(results[0]);
        }
    }
    console.log(results)

    if (results != undefined && results.length > 0){
        const ingredient = results[0]
        const firstChar = ingredient["name"][0].toUpperCase();
        const remainingStr = ingredient["name"].slice(1);
        const ingredientName = firstChar + remainingStr;
        
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.ingredientContainer}>                        
                        <Image source={ ingredient["image"] }/>
                        <Text>{ingredientName}</Text>  
                </View>
            </TouchableOpacity>
        )
    }

    if (results != undefined && results.length === 0){
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.ingredientContainer}>                        
                        <Text>No se encontraron resultados :c</Text>  
                </View>
            </TouchableOpacity>
        )
    }

    if (typeCard == 0){
        return(
            <TouchableOpacity onPress={onTouch}>
                <View style={styles.ingredientContainer}>                        
                    <Text>Seleccionar Ingrediente</Text>  
                </View>
            </TouchableOpacity>
        ) 
    }

}               



const styles = StyleSheet.create({
    ingredientContainer: {
        margin: 0,
        alignItems: 'center',
        backgroundColor: '#d4fce1',
        padding: 30,
        borderRadius: 10,
      },
});

export default IngredientMiniCard