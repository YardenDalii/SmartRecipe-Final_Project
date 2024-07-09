import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeCard: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recipeUrl: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default styles;
