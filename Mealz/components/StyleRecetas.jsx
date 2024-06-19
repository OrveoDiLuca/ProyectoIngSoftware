import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#DCFCE7',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#DCDCDC',
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 0.34,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nutriente: {
    fontSize: 14,
    color: '#555',
  },
});