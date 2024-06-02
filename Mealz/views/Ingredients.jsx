import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Modal, TextInput, Button} from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

export function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('gramos');
  const [expiryDate, setExpiryDate] = useState('');

  const addIngredient = () => {
    setModalVisible(true);
  };

  const handleAddIngredient = () => {
    const ingredientNumber = ingredients.length + 1;
    setIngredients([...ingredients, {
      name: newIngredient,
      number: ingredientNumber,
      quantity: quantity,
      unit: unit,
      expiryDate: expiryDate
    }]);
    setNewIngredient('');
    setQuantity('');
    setUnit('gramos');
    setExpiryDate('');
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.add}> Agregar Ingredientes </Text>
      <TouchableOpacity onPress={addIngredient} style={styles.button}>
        <Icon type='material-community' name='plus-circle' color='white' size={35} />
      </TouchableOpacity>
      {ingredients.map((ingredient, index) => (
        <View style={styles.ingredientContainer} key={index}>
          <Text style={{ marginBottom: 10 }}>
            Ingrediente {ingredient.number}: {ingredient.name}, {ingredient.quantity} {ingredient.unit}, Fecha de vencimiento: {ingredient.expiryDate}
          </Text>
        </View>
      ))}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Añadir Nuevo Ingrediente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del ingrediente"
              value={newIngredient}
              onChangeText={setNewIngredient}
            />
            <View style={styles.row}>
              <TextInput
                style={styles.inputHalf}
                placeholder="Cantidad"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
              <Picker
                selectedValue={unit}
                style={styles.picker}
                onValueChange={(itemValue) => setUnit(itemValue)}
              >
                <Picker.Item label="Gramos" value="gr" />
                <Picker.Item label="Onzas" value="oz" />
                <Picker.Item label="Mililitros" value="ml" />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Fecha de vencimiento (DD/MM/AAAA)"
              value={expiryDate}
              onChangeText={setExpiryDate}
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Añadir"
                onPress={handleAddIngredient}
              />
              <Button
                title="Cancelar"
                color="red"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  inputHalf: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '45%',
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: '45%',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});





