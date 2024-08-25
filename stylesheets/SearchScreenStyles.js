import { StyleSheet } from 'react-native';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 16,
    backgroundColor: WHITE, // White background
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: DARK_GREEN, // Dark green for the title text
    marginBottom: 16, // Add space below the title
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: DARK_GREEN, // Dark green for the title text
    marginBottom: 16, // Add space below the title
  },
  searchInput: {
    borderColor: LIGHT_GRAY,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: WHITE, // White background for input fields
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: WHITE, // White background for the modal content
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: DARK_GREEN, // Dark green border for the modal
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK_GREEN, // Dark green for modal titles
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#e74c3c', // Red for the close button
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: WHITE, // White text for the close button
  },
  
  recipeCard: {
    borderColor: LIGHT_GRAY,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: WHITE, // White background for cards
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
    color: DARK_GREEN, // Dark green for the recipe title
    marginVertical: 10,
  },
  recipeUrl: {
    color: LIGHT_GREEN, // Light green for the URL
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',  // Aligns items in a row
    justifyContent: 'space-between',  // Ensures the filter image is on the left and the edit icon is on the right
    alignItems: 'center',  // Vertically centers the icons within the row
    width: '100%',  // Takes the full width of the container
    paddingHorizontal: 10,  // Add some horizontal padding
    marginBottom: 10,
  },
});

export default styles;
