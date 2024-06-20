import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Modal, TextInput, Button} from 'react-native';
import { Icon } from 'react-native-elements';
import IngredientCard from '../components/atoms/IngredientCard';
import SearchIngredients from '../components/molecules/SearchIngredients';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from '@firebase/firestore';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';

const db = getFirestore();

export function Ingredients() {




  const [ingredients, setIngredients] = useState ([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userIngredients, setUserIngredients] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;


  const fecthUserIngredients = async () => {
    if (isLoggedIn) {
      try {
        const userDocRef = doc(db, 'Users', user.uid);
        const userData = await getDoc(userDocRef);
        setUserIngredients(userData.data().ingredients)
      } catch (error) {
        console.error('Error fetching user ingredients:', error);
      }
    } 
  }


  const addIngredient = () => {
    setModalVisible(!modalVisible);
  };



  const handleNewIngredient = (newIngredient) => {
    setNewIngredient(newIngredient)
  }

  const handleAddIngredient = () => {
    
    setIngredients([ newIngredient ]);
      
    setNewIngredient('');
    setModalVisible(false);

    console.log(newIngredient)

    if (isLoggedIn) {
      fecthUserIngredients();
      try {
        const userDocRef = doc(db, 'Users', user.uid);
        updateDoc(userDocRef, {
          ingredients: arrayUnion({newIngredient}) // Add the new ingredient to the user's "ingredients" array
        });
        console.log('Ingredient added to favorites:', newIngredient);
      } catch (error) {
        console.error('Error adding ingredient to favorites:', error);
      }
    } else {
      console.error('Registrate porfavor para añadir a favoritos');
    }

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user ? true : false);
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.add}> Agregar Ingredientes Favoritos</Text>
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





