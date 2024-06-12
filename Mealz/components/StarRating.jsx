import React from 'react';
import { View, StyleSheet } from 'react-native';
import Star from './Star'; // Adjust the path as necessary

const StarRating = ({ maxStars, rating, onStarPress }) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <Star
        key={i}
        filled={i <= rating}
        onPress={() => onStarPress(i)}
      />
    );
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default StarRating;
