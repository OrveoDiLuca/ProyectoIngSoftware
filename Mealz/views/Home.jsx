import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {HomeFeed} from '../components/organisms/HomeFeed';


export function Home() {


  return (
    <View>
      <ScrollView showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{
            paddingBottom:20}}>

      {/*categorias*/}


     
     
      {/*Descripciones*/}


      <View className="mt-5">
        <View className="flex flex-row justify-between">
          <Text className="text-lg font-bold">Featured Recipes</Text>
          <Text className="text-sm text-blue-500">View All</Text>
        </View>
        <HomeFeed/>
      </View>
        
      </ScrollView>
    </View>

     


      //

  );
}

