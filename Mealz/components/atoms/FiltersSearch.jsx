import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';


export default function Filters({ onApplyFilters }) {
    const [vegetariano, setVegetariano] = useState('');
  const [dulces, setDulces] = useState('');
  const [carnes, setCarnes] = useState('');

  const applyFilters = () => {
    const filters = {};

    if (vegetariano === 'Sí') {
      filters.diet = 'vegetarian';
    }
    if (dulces === 'Sí') {
      filters.includeIngredients = 'sugar';
    }
    if (carnes === 'No') {
      filters.excludeIngredients = 'meat';
    }

    console.log('Applied Filters:', filters); // Log para verificar los filtros
    onApplyFilters(filters);
  };

  const clearFilters = () => {
    setVegetariano('');
    setDulces('');
    setCarnes('');
    onApplyFilters({}); // Llama a la función con un objeto vacío para restablecer los filtros
  };

  return (
    <ScrollView>
      <Text>Filters</Text>

      <Text>Select vegetarian</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <PaperButton mode={vegetariano === 'Sí' ? 'contained' : 'outlined'} onPress={() => setVegetariano('Sí')}>Sí</PaperButton>
        <PaperButton mode={vegetariano === 'No' ? 'contained' : 'outlined'} onPress={() => setVegetariano('No')}>No</PaperButton>
      </View>

      <Text>Select sweets</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <PaperButton mode={dulces === 'Sí' ? 'contained' : 'outlined'} onPress={() => setDulces('Sí')}>Sí</PaperButton>
        <PaperButton mode={dulces === 'No' ? 'contained' : 'outlined'} onPress={() => setDulces('No')}>No</PaperButton>
      </View>

      <Text>Select proteins</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <PaperButton mode={carnes === 'Sí' ? 'contained' : 'outlined'} onPress={() => setCarnes('Sí')}>Sí</PaperButton>
        <PaperButton mode={carnes === 'No' ? 'contained' : 'outlined'} onPress={() => setCarnes('No')}>No</PaperButton>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <PaperButton onPress={applyFilters}>Apply Filters</PaperButton>
        <PaperButton onPress={clearFilters}>Delete Filters</PaperButton>
      </View>
    </ScrollView>
  );
}
