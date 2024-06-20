import React, {useCallback} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {HomeScreen} from "./app/index"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// El navigation container gestiona el estado de la navegacion de la app por lo que es sumamente importante. 


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  
  return (
        <NavigationContainer> 
            <HomeScreen />
        </NavigationContainer>
  );
}

