import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from '@firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';

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

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, username, setUsername, description, setDescription }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
          />
        </>
      )}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
};

const ProfileScreen = ({ user, profile, handleLogout }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setProfile({ ...profile, profilePicture: downloadURL });
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={profile.profilePicture ? { uri: profile.profilePicture } : require('../assets/images/FotoEmilioGonzález.jpg')}
          style={styles.profilePicture}
        />
      </TouchableOpacity>
      <Text style={styles.profileText}>Username: {profile.username}</Text>
      <Text style={styles.profileText}>Description: {profile.description}</Text>
      <Text style={styles.profileText}>Recetas Favoritas:</Text>
      {favorites.length > 0 ? (
        favorites.map((recipe, index) => (
          <View key={index} style={styles.favoriteRecipe}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.profileText}>No tienes recetas favoritas aún.</Text>
      )}
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
};



export function Account() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [profile, setProfile] = useState({ username: '', description: '', profilePicture: '' });
  const [isConnected, setIsConnected] = useState(true);

  const auth = getAuth(app);

  const checkConnection = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setProfile(userDoc.data());
      }
      setIsConnected(true);
    } catch (error) {
      console.error('Connection error:', error.message);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await checkConnection();
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            username: '',
            email: email,
            description: '',
            profilePicture: ''
          });
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <ProfileScreen
          user={user}
          profile={profile}
          handleLogout={handleLogout}
        />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  offlineContainer: {
    padding: 16,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },
  offlineText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  favoriteRecipe: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 16,
    color: '#333',
  }
});

export default Account;


