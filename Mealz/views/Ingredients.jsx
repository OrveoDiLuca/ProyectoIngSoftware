import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import React, { useState } from 'react';
import CustomButton from '../components/CustomButton';

export function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    const ingredientNumber = ingredients.length + 1; // Get the next ingredient number
    setIngredients([...ingredients, <View style={styles.ingredientContainer} key={ingredients.length}>
      <Text style={{ marginBottom: 10 }}>Ingrediente {ingredientNumber}</Text>
      {/* Add input fields or other ingredient details here */}
    </View>]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.add}> Agregar Ingredientes </Text>
      <TouchableOpacity onPress={addIngredient} style={styles.button}>
        <Icon type='material-community' name='plus-circle' color='white' size={35} />
      </TouchableOpacity>
      {ingredients.map((ingredient, index) => (
        <View key={index}>{ingredient}</View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  button: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#00ffa6',
    padding: 30,
    borderRadius: 40,
  },
  add: {
    textAlign: 'center',
    marginTop: 22.5,
    fontFamily: 'Inter-ExtraBold',
  },
  ingredientContainer: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#00ffa6',
    padding: 30,
    borderRadius: 40,
  },
});


