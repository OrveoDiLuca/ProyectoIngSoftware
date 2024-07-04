import React, {useState} from "react";
import { ScrollView, View, StyleSheet, Text, Modal, TouchableOpacity, TextInput, Button } from "react-native";
import IngredientMiniCard from "../atoms/IngredientMiniCard";


const SearchIngredients = ({addIngredient}) => {
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [ingredients, setIngredients] = useState([{number: 1, offset: 0, results: [], totalResults: 0,}]);
    const [selectedIngredient, setSelectedIngredient] = useState([{number: 1, offset: 0, results: [], totalResults: 0,}]);

    const handleSearch = () => {
        fetch(`https://api.spoonacular.com/food/ingredients/search?query=${searchText}&number=1&apiKey=e3f2f95509ec4de082e30e4bde81d828`)
          .then(response => response.json())
          .then(data => {
            setIngredients(data); // Guarda las recetas obtenidas en el estado
          })
          .catch(error => {
            console.error(error);
          });
      };
    
    const handleSelectIngredient = (newIngredient) => {
        setSelectedIngredient(newIngredient);
        if (addIngredient) { 
            addIngredient(newIngredient);
        }
    };
    
    const handlePress = () => {
        setModalVisible(!modalVisible)
    }

    const handleCancel = () => {
        setModalVisible(!modalVisible)
        setIngredients([{number: 1, offset: 0, results: [], totalResults: 0,}])
    }

    return (
        <View>
            <View>
                <IngredientMiniCard onTouch={handlePress} item={ingredients} type={0}/>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.listView}>
                        <Text style={styles.modalTitle}> Selecciona un Ingrediente</Text>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.inputHalf}
                                placeholder="Buscar ingrediente"
                                value={searchText}
                                onChangeText={text => setSearchText(text)}
                            />
                            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                                <Text>Search</Text>
                            </TouchableOpacity>
                        </View>
                        <View className = "flex pb-10">
                            <IngredientMiniCard onTouch={handlePress} item={ingredients} onSelectIngredient={handleSelectIngredient}/>
                        </View>
                        <Button
                            title="Cancelar"
                            color="red"
                            onPress={handleCancel}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginVertical: 5
        
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Inter-ExtraBold',
        fontSize: 18,
      },
    ingredientContainer: {
        margin: 0,
        alignItems: 'center',
        backgroundColor: '#d4fce1',
        padding: 30,
        borderRadius: 10,
      },
      listView: {
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
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%',
        marginBottom: '50%'
      },
      inputHalf: {
        padding: 5,
        borderRadius: 8,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '50%',
      },
      searchButton: {
        width: 100,
        height: 40,
        backgroundColor: '#afedc4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
      },
});


export default SearchIngredients
