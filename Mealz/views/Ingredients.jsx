import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Modal, TextInput, Button} from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import IngredientCard from '../components/atoms/IngredientCard';
import SearchIngredients from '../components/molecules/SearchIngredients';

export function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('gramos');
  const [expireDate, setExpireDate] = useState('');
  const [date, setDate] = useState(new Date());


  const addIngredient = () => {
    setModalVisible(!modalVisible);
  };

  const onChange = (e, selectedDate) => {
    setExpireDate(selectedDate.toLocaleDateString());
  };

  const handleNewIngredient = (newIngredient) => {
    setNewIngredient(newIngredient["name"])
  }

  const handleAddIngredient = () => {
    const ingredientNumber = ingredients.length + 1;
    setIngredients([...ingredients, {
      name: newIngredient,
      number: ingredientNumber,
      quantity: quantity,
      unit: unit,
      expireDate: expireDate
    }]);
    setNewIngredient('');
    setQuantity('');
    setUnit('gramos');
    setExpireDate('');
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.add}> Agregar Ingredientes </Text>
      <TouchableOpacity onPress={addIngredient} style={styles.button}>
        <Icon type='material-community' name='plus-circle' color='white' size={35} />
      </TouchableOpacity>
      {ingredients.map((ingredient, index) => (
        <IngredientCard ingredient = {ingredient} index = {index}/>
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
            <Text style={styles.modalTitle}>Añadir Nuevo Ingrediente</Text>
            
            <SearchIngredients addIngredient={handleNewIngredient}/>

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
            <View style={styles.row}>
              <Text style={styles.textStyle}>Fecha de vencimiento: </Text>
              <DateTimePicker
                mode={'date'}
                value={date}
                minimumDate={new Date()}
                is24Hour={true}
                onChange = {onChange}
              />
            </View>
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
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Inter-ExtraBold',
    fontSize: 18,
  },
  textStyle:{
    fontFamily: 'Inter-ExtraBold',
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
    width: '45%',
  },
  picker: {
    width: '45%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});





