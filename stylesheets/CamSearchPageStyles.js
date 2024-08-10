import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFDD0', // Cream color for background
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#556B2F', // Dark olive green for text
  },
  predictionContainer: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#556B2F', // Dark olive green for borders
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#FFFFFF', // White background for input container
  },
  textInput: {
    height: 100,
    borderColor: '#556B2F', // Dark olive green for borders
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    textAlignVertical: 'top',
    color: '#000', // Black text color
  },
  boldText: {
    fontWeight: 'bold',
    color: '#556B2F', // Dark olive green for bold text
  },
  searchButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#556B2F', // Dark olive green for buttons
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#FFF', // White text color
    fontSize: 16,
    textAlign: 'center',
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#556B2F', // Dark olive green for edit button
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF', // White text color
    fontSize: 16,
    textAlign: 'center',
  },
  filterImageButton: {
    width: 30,
    height: 30,
    marginVertical: 10,
  },
  filterImage: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFDD0', // Cream color for modal background
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#556B2F', // Dark olive green for modal borders
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#556B2F', // Dark olive green for modal title
  },
  modalCloseButton: {
    backgroundColor: '#e74c3c', // Red for the close button
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#FFF', // White text color
    textAlign: 'center',
  },
  filterButton: {
    backgroundColor: '#556B2F', // Dark olive green for filter buttons
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterSection: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  recipeCard: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#556B2F', // Dark olive green for borders
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background for cards
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#556B2F', // Dark olive green for recipe title
  },
  recipeUrl: {
    fontSize: 14,
    textAlign: 'center',
    color: '#007BFF', // Blue for links
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  meatInputContainer: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#556B2F', // Dark olive green for borders
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#FFFFFF', // White background for input container
  },
  meatInput: {
    height: 50,
    borderColor: '#556B2F', // Dark olive green for borders
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    color: '#000', // Black text color
  },
  meatInputButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#556B2F', // Dark olive green for buttons
    borderRadius: 5,
  },
  meatInputButtonText: {
    color: '#FFF', // White text color
    fontSize: 16,
    textAlign: 'center',
  },
  meatInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#556B2F', // Dark olive green for labels
  },
});

export default styles;
