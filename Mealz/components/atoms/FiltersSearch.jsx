import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';

export default function Filters({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    vegetarian: false,
    protein: false,
    sweet: false,
    calories: [1, 1000],
  });

  const toggleFilter = (filter) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filter]: !prevFilters[filter] };
      applyFilters(newFilters);
      return newFilters;
    });
  };

  const updateCalorieRange = (minCalories, maxCalories) => {
    const newFilters = { ...filters, calories: [minCalories, maxCalories] };
    setFilters(newFilters);
    applyFilters(newFilters);
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
    appliedFilters.minCalories = newFilters.calories[0];
    appliedFilters.maxCalories = newFilters.calories[1];

    console.log('Applied Filters:', appliedFilters);
    onApplyFilters(appliedFilters);
  };

  const clearFilters = () => {
    setFilters({
      vegetarian: false,
      protein: false,
      sweet: false,
      calories: [1, 1000],
    });
    onApplyFilters({});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Filters</Text>

      <View style={styles.buttonContainer}>
        <PaperButton
          mode={filters.vegetarian ? 'contained' : 'outlined'}
          onPress={() => toggleFilter('vegetarian')}
          buttonColor={filters.vegetarian ? '#8BC34A' : '#A5D6A7'}
        >
          Vegetarian
        </PaperButton>
        <PaperButton
          mode={filters.sweet ? 'contained' : 'outlined'}
          onPress={() => toggleFilter('sweet')}
          buttonColor={filters.sweet ? '#8BC34A' : '#A5D6A7'}
        >
          Sweet
        </PaperButton>
        <PaperButton
          mode={filters.protein ? 'contained' : 'outlined'}
          onPress={() => toggleFilter('protein')}
          buttonColor={filters.protein ? '#8BC34A' : '#A5D6A7'}
        >
          Protein
        </PaperButton>
      </View>

      <View style={styles.sliderContainer}>
        <Text>Calories: {filters.calories[0]} - {filters.calories[1]}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={1}
          maximumValue={1000}
          step={1}
          value={filters.calories[0]}
          onValueChange={(value) => updateCalorieRange(value, filters.calories[1])}
        />
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={1}
          maximumValue={1000}
          step={1}
          value={filters.calories[1]}
          onValueChange={(value) => updateCalorieRange(filters.calories[0], value)}
        />
      </View>

      <View style={styles.deleteButtonContainer}>
        <PaperButton
          mode="contained"
          onPress={clearFilters}
          buttonColor="#FF5252"
        >
          Delete Filters
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
    marginBottom: 20,
    color: '#6200ee',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  sliderContainer: {
    marginVertical: 20,
  },
  deleteButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});


//este es un código que en vez de ser un slider es un input donde pones el número de máxima calorías//
/*/ 
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

export default function Filters({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    vegetarian: false,
    protein: false,
    sweet: false,
    calorieRange: '',
  });

  const toggleFilter = (filter) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filter]: !prevFilters[filter] };
      applyFilters(newFilters);
      return newFilters;
    });
  };

  const handleCalorieChange = (value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, calorieRange: value };
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
    if (newFilters.calorieRange) {
      appliedFilters.maxCalories = newFilters.calorieRange;
    }

    console.log('Applied Filters:', appliedFilters);
    onApplyFilters(appliedFilters);
  };

  const clearFilters = () => {
    setFilters({
      vegetarian: false,
      protein: false,
      sweet: false,
      calorieRange: '',
    });
    onApplyFilters({});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Filters</Text>

      <View style={styles.buttonContainer}>
        <PaperButton
          mode={filters.vegetarian ? 'contained' : 'outlined'}
          onPress={() => toggleFilter('vegetarian')}
          buttonColor={filters.vegetarian ? '#8BC34A' : '#A5D6A7'}
        >
          Vegetarian
        </PaperButton>
        <PaperButton
          mode={filters.sweet ? 'contained' : 'outlined'}
          onPress={() => toggleFilter('sweet')}
          buttonColor={filters.sweet ? '#8BC34A' : '#A5D6A7'}
        >
          Sweet
        </PaperButton>
        <PaperButton
          mode={filters.protein ? 'contained' : 'outlined'}
          onPress={() => toggleFilter('protein')}
          buttonColor={filters.protein ? '#8BC34A' : '#A5D6A7'}
        >
          Protein
        </PaperButton>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Max Calories"
          keyboardType="numeric"
          value={filters.calorieRange}
          onChangeText={handleCalorieChange}
        />
      </View>

      <View style={styles.deleteButtonContainer}>
        <PaperButton
          mode="contained"
          onPress={clearFilters}
          buttonColor="#FF5252"
        >
          Delete Filters
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
    marginBottom: 20,
    color: '#6200ee',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

*/