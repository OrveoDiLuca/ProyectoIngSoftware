import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

export default function Filters({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    vegetarian: false,
    protein: false,
    sweet: false,
  });

  const toggleFilter = (filter) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filter]: !prevFilters[filter] };
      applyFilters(newFilters);
      return newFilters;
    });
  };

  const applyFilters = (newFilters) => {
    const appliedFilters = {};

    if (newFilters.vegetarian) {
      appliedFilters.diet = 'vegetarian';
    }
    if (newFilters.sweet) {
      appliedFilters.includeIngredients = 'sugar';
    }
    if (!newFilters.protein) {
      appliedFilters.excludeIngredients = 'meat';
    }

    console.log('Applied Filters:', appliedFilters);
    onApplyFilters(appliedFilters);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Filters</Text>

      <View style={styles.buttonContainer}>
        <PaperButton
          mode={filters.vegetarian ? 'contained' : 'outlined'}
          onPress={() => toggleFilter('vegetarian')}
          buttonColor={filters.vegetarian ? '#8BC34A' : '#A5D6A7'} // Light green colors
        >
          Vegetarian
        </PaperButton>
        <PaperButton
          mode={filters.sweet ? 'contained' : 'outlined'}
          onPress={() => toggleFilter('sweet')}
          buttonColor={filters.sweet ? '#8BC34A' : '#A5D6A7'} // Light green colors
        >
          Sweet
        </PaperButton>
        <PaperButton
          mode={filters.protein ? 'contained' : 'outlined'}
          onPress={() => toggleFilter('protein')}
          buttonColor={filters.protein ? '#8BC34A' : '#A5D6A7'} // Light green colors
        >
          Protein
        </PaperButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6200ee', // Adjust the color as needed
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});
