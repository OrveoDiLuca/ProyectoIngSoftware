import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Star = ({ filled, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.star}
        source={
          filled
            ? require('./assets/star-filled.png')
            : require('./assets/star-empty.png')
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  star: {
    width: 20,
    height: 20,
    margin: 2,
  },
});

export default Star;
