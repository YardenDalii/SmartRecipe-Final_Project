import { StyleSheet } from 'react-native';
// import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
  editIcon: {
    alignItems: 'flex-end',  // Align to the end of the row (right)
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
  modalContentContainer: {
    width: '90%', // More flexible width
    maxHeight: '80%', // Limit the maximum height to avoid going off-screen
    backgroundColor: WHITE, // White background for the modal content
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: DARK_GREEN, // Dark green border for the modal
    // justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%', // Full width within container
    // alignItems: 'center', // Center the content
  },
  modalScrollContent: {
    width: '100%', // Ensure full width
    paddingBottom: 20, // Ensure there's some space at the bottom
  },
  modalTitle: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK_GREEN, // Dark green for modal titles
    marginBottom: 20,
    textAlign: 'center', // Center the title text
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

  filterSection: {
    paddingTop: 15,
    width: '100%', // Full width for each section
    paddingHorizontal: 10, // Padding to ensure text isn't right up against the edge
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DARK_GREEN, // Dark green for filter titles
    alignSelf: 'center',
  },
  picker: {
    width: '100', // Ensures picker uses full width of the container
  },
  divider: {
    height: 1, // Thickness of the divider
    backgroundColor: LIGHT_GRAY, // Color of the divider
    marginVertical: 10, // Space around the divider
    width: '100%', // Full width
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
  
  iconRow: {
    flexDirection: 'row',  // Aligns items in a row
    justifyContent: 'space-between',  // Ensures the filter image is on the left and the edit icon is on the right
    alignItems: 'center',  // Vertically centers the icons within the row
    width: '100%',  // Takes the full width of the container
    paddingHorizontal: 10,  // Add some horizontal padding
  },
});

export default styles;