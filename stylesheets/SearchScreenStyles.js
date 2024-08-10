import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFDD0', // Cream color for background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#556B2F', // Dark olive green for the title text
    marginBottom: 16, // Add space below the title
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 70,
    backgroundColor: '#FFFFFF', // White background for input fields
  },
  searchButton: {
    backgroundColor: '#556B2F', // Dark olive green for the button
    padding: 10,
    borderRadius: 50,
    marginBottom: 30,
    marginTop: 10,
    marginHorizontal: 117,
    width: '40%', 
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
    textAlign: 'center',
  },
  filterButton: {
    backgroundColor: '#556B2F', // Dark olive green for filter buttons
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  filterImageButton: {
    width: 30,
    height: 30,
    marginRight: 10,
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
    backgroundColor: '#FFFFFF', // Cream color for the modal content
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#556B2F', // Dark olive green for modal titles
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#dc3545', // Red for the close button
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#FFFFFF', // White text for the close button
    textAlign: 'center',
  },
  filterSection: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  recipeCard: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // White background for cards
    borderRadius: 8, // Rounded corners for consistency
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8, // Match the border radius with the card
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#556B2F', // Dark olive green for the recipe title
    marginVertical: 10,
  },
  recipeUrl: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default styles;
