import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFDD0', // Cream color for background
  },
  frameContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#556B2F', // Dark olive green border for the rectangle
    backgroundColor: '#FFFDD0', // Cream color for frame
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
    borderColor: '#556B2F', // Dark olive green border for the rectangle
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFFDD0', // Cream color for frame
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
  navIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logoutButton: {
    padding: 10,
  },
  squareButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  squareButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles;
