import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    export { auth, db, storage };