import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';



export function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = ({}) => {
    const newIngredient = <CustomButton/>
    setIngredients([...ingredients, newIngredient]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.add}> Agregar Ingredientes </Text>
      <TouchableOpacity onPress={addIngredient} style={styles.button}>
          <Icon type = 'material-community' name = 'plus-circle' color = 'white' size= {35} />
      </TouchableOpacity>
      
    </ScrollView>
  )
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
  }
});