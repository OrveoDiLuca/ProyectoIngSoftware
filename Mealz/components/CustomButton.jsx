import { Image, Pressable, Text, StyleSheet } from 'react-native';

export default function CustomButton({}) {
  return (
    <TouchableOpacity style={styles.button}>
        <Icon type = 'material-community' name = 'plus-circle' color = 'white' size= {35} />
    </TouchableOpacity>
  );
}
