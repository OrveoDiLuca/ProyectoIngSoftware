import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const IngredientCard = ({ingredient, index}) => {
    const firstChar = ingredient.name[0].toUpperCase();
    const remainingStr = ingredient.name.slice(1);
    const ingredientName = firstChar + remainingStr;
    
    return (
        <View style={styles.ingredientContainer} key={index}>
            <Text style={{ marginBottom: 10 }}>
                Ingrediente {ingredient.number}: {ingredientName}, {ingredient.quantity} {ingredient.unit}, Fecha de vencimiento: {ingredient.expireDate}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ingredientContainer: {
        margin: 20,
        alignItems: 'center',
        backgroundColor: '#00ffa6',
        padding: 30,
        borderRadius: 40,
      },
});


export default IngredientCard;