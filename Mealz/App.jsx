import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {HomeScreen} from "./app/index"

// El navigation container gestiona el estado de la navegacion de la app por lo que es sumamente importante. 

export default function App() {
  return (
    <NavigationContainer> 
      <HomeScreen />
    </NavigationContainer>
  );
}