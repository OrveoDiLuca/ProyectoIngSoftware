import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, addDoc, collection, doc, updateDoc, getDoc, setDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesome } from 'react-native-vector-icons';
import DropdownMenu from '../components/DropdownMenu'


const firebaseConfig = {
  apiKey: "AIzaSyDoYXpg0KY7ICo7StLLIAMjh1S1obeEU_s",
  authDomain: "mealz-f885e.firebaseapp.com",
  projectId: "mealz-f885e",
  storageBucket: "mealz-f885e.appspot.com",
  messagingSenderId: "847182744486",
  appId: "1:847182744486:web:e077135c5be8059edc1d67",
  measurementId: "G-J4LDTRWR2W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const AuthScreen = ({ email, setEmail, password, setPassword, name, setName, lastName, setLastName, favoriteFood, setFavoriteFood, isLogin, setIsLogin, handleAuthentication, create }) => {
  const [error, setError] = useState('');

  const validateFields = () => {
    if (!isLogin) {
      if (!name || !lastName || !favoriteFood || !email || !password) {
        setError('Por favor completa todos los campos');
        return false;
      }
    } else {
      if (!email || !password) {
        setError('Por favor completa todos los campos');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return;
    }

    setError('');
    setName('');
    setLastName('');
    setFavoriteFood('');
    
    if (handleAuthentication) {
      handleAuthentication();
    } else if (create) {
      create();
    }
  };
  
  const capitalizeFirstLetter = (text) => {
    return text && text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</Text>
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(capitalizeFirstLetter(text))}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(capitalizeFirstLetter(text))}
            placeholder="Apellido"
          />
          <TextInput
            style={styles.input}
            value={favoriteFood}
            onChangeText={(text) => setFavoriteFood(capitalizeFirstLetter(text))}
            placeholder="Comida favorita"
          />
        </>
      )}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Correo electrónico"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Iniciar sesión' : 'Registrarse'} onPress={handleSubmit} color="#3498db" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? '¿No tienes una cuenta? Registrarse' : '¿Ya tienes una cuenta? Iniciar sesión'}
        </Text>
      </View>
    </View>
  );
}



export function Account() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');



  const auth = getAuth(app);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);


  const AuthenticatedScreen = ({ handleAuthentication }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true)

    const fetchUserData = async () => {
      const userDocRef = doc(db, 'Users', user.uid);
      const userD = await getDoc(userDocRef);
      if (userD.exists()){
        console.log(userD.data())
        setUserData(userD)
        setLoading(false)
      }
    }
    

  
    useEffect(() => {
      fetchUserData();
      const fetchProfileImage = async () => {
        const storage = getStorage();
        const storageRef = ref(storage, `profile_images/${user.uid}`);
  
        try {
          const url = await getDownloadURL(storageRef);
          setImageUrl(url);
        } catch (error) {
          setImageUrl(null);
          console.log('No profile image found for the user:', error.message);
        }
      };
  
      if (user) {
        fetchProfileImage();
      }
    }, [user]);
  
    const pickImage = async () => {
      // Solicitar permisos para acceder a la galería
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Lo siento, necesitamos permisos para acceder a tu galería!');
        return;
      }
  
      // Seleccionar imagen de la galería
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        uploadImage(result.assets[0].uri); 
      }
    };
  
    const uploadImage = async (imageUri) => {
      const userId = user.uid; 
      const storageRef = ref(storage, `profile_images/${userId}`); 
    
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
    
        await uploadBytes(storageRef, blob);
    
        const url = await getDownloadURL(storageRef);
    
        await updateProfileImage(url);
    
        setImageUrl(url);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image: ' + error.message);
      }
    };
  
    const updateProfileImage = async (userId) => {
      const storageRef = ref(storage, `profile_images/${userId}`);
    
      try {
        const url = await getDownloadURL(storageRef);
        const userRef = doc(db, "Users", userId);
    
        await updateDoc(userRef, {
          profileImageUrl: url
        });
    
        console.log('URL de imagen de perfil actualizada correctamente en Firestore');
      } catch (error) {
      }
    };

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.authContainer}>
        <View style={styles.profileImageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.profileImage} />
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>Add Photo</Text>
                <FontAwesome name="camera" size={24} style={styles.cameraIcon} />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>¡Bienvenido {userData.data().name}!</Text>
        <Text style={styles.dataText}>
        <Text style={{ fontWeight: 'bold' }}>Nombre: </Text>
        {userData.data().name}
        </Text>
        <Text style={styles.dataText}>
          <Text style={{ fontWeight: 'bold' }}>Apellido: </Text>
          {userData.data().lastname}
        </Text>
        <Text style={styles.dataText}>
          <Text style={{ fontWeight: 'bold' }}>Comida Favorita: </Text>
          {userData.data().favoritefood}
        </Text>
        <Text style={styles.dataText}>
          <Text style={{ fontWeight: 'bold' }}>Correo Electrónico: </Text>
          {user.email}
        </Text>
        <Button title="Cerrar sesión" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    );
  };
  

  const handleAuthentication = async () => {
    
    try {
      if (user) {
        // Si el usuario esta autenticado, log out
        console.log('User logged out successfully!');
        isLogin
        setEmail('');
        setPassword('');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
          create(userCredential.user);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const create = async () => {
    try {
      const user = auth.currentUser;
      const userId = user.uid; // Get the user ID
      const userDocRef = doc(collection(db, "Users"), userId); // Create reference with user ID

      setDoc(userDocRef, {
        email: email,
        favoritefood: favoriteFood,
        lastname: lastName,
        name: name,
        ingredients: [],
        recipes: [],
        profileImageUrl: null
      }).then(() => {
        console.log('Usuario creado correctamente en Firestore');
      }).catch((error) => {
        console.log(error);
      });

    } catch (error) {
      console.error('Error al crear o actualizar usuario en Firestore:', error.message);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        console.log(user),
        <AuthenticatedScreen handleAuthentication={handleAuthentication} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          lastName={lastName}
          setLastName={setLastName}
          favoriteFood={favoriteFood}
          setFavoriteFood={setFavoriteFood}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
          create={create}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  placeholderText: {
    color: '#888',
    fontSize: 18,
  },
  cameraIcon: {
    color: '#888',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  toggleText: {
    color: '#365',
  },
  bottomContainer: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  dataText: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
    color: '#333',
  },
});

