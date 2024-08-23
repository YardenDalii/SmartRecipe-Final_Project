import { StyleSheet } from 'react-native';
// import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20,
    backgroundColor: LIGHT_GRAY, // Light gray background for consistency
  },
  title: {
    fontSize: 26, // Increase font size for emphasis
    fontWeight: 'bold',
    marginBottom: 20,
    color: DARK_GREEN, // Dark green for text consistency
    textAlign: 'center',
  },
  predictionContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: DARK_GREEN, // Dark green for borders
    borderRadius: 8,
    width: '100%',
    backgroundColor: WHITE, // White background for input container
  },
  textInput: {
    height: 120, // Increase height for better input space
    borderColor: DARK_GREEN, // Dark green for borders
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    color: DARK_GREEN, // Dark green text color
  },
  buttonsContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Space buttons evenly
    marginBottom: 20,
  },
  editButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: LIGHT_GREEN, // Lighter green for edit button
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterImage: {
    width: 50,
    height: 50,
  },
  searchButton: {
    marginTop: 5,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: DARK_GREEN, // Dark green for search button
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: WHITE, // White text color
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: WHITE, // White for modal background
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: DARK_GREEN, // Dark green for modal borders
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: DARK_GREEN, // Dark green for modal title
  },
  modalCloseButton: {
    backgroundColor: '#e74c3c', // Red for the close button
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: WHITE, // White text color
    fontSize: 16,
  },
  filterSection: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  recipeCard: {
    marginVertical: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: DARK_GREEN, // Dark green for borders
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    backgroundColor: WHITE, // White background for cards
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: DARK_GREEN, // Dark green for recipe title
  },
  recipeUrl: {
    fontSize: 14,
    textAlign: 'center',
    color: '#007BFF', // Blue for links
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  meatInputContainer: {
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: DARK_GREEN, // Dark green for borders
    borderRadius: 8,
    width: '100%',
    backgroundColor: WHITE, // White background for input container
  },
  meatInput: {
    height: 50,
    borderColor: DARK_GREEN, // Dark green for borders
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    textAlignVertical: 'top',
    color: DARK_GREEN, // Dark green text color
  },
  meatInputButton: {
    marginTop: 10,
    padding: 16,
    backgroundColor: DARK_GREEN, // Dark green for buttons
    borderRadius: 8,
    alignItems: 'center',
  },
  meatInputButtonText: {
    color: WHITE, // White text color
    fontSize: 18,
    fontWeight: '600',
  },
  meatInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DARK_GREEN, // Dark green for labels
  },
});

export default styles;