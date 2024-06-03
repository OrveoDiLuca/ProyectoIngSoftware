import {View,Text} from 'react-native';
import React from 'react';  


//Atom de titulo en negrita
export function BoldTitle(props) {
    return (
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 20}}>{props.title}</Text>
        </View>
    );
}
