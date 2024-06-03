import {View, Text, ScrollView} from 'react-native';
import React from 'react';  
import {BoldTitle} from '../atoms/BoldTitle';
import RecipeCard from '../atoms/RecipeCard';

export function FeatureDisplay(item) {
    return (
        <ScrollView>
            <View>
                <BoldTitle title="Featured Recipes"/>
                <RecipeCard item={item}/>

            </View>
        </ScrollView>
    );
}