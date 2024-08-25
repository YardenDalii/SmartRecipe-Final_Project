import { StyleSheet } from 'react-native';
// import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY, // Light gray for the background
    paddingTop: 40,
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 20, // Ensure there's space at the bottom
  },
  header: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Spread out the text and button
    alignItems: 'center', // Center them vertically
    paddingHorizontal: 16, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding for spacing
    backgroundColor: LIGHT_GRAY, // Match background color
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: DARK_GREEN, // Dark green for header text
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK_GREEN, // Dark green for subheaders
    marginVertical: 10,
  },
  noRecipesText: {
    fontSize: 16,
    color: LIGHT_GREEN, // Light green color for "No recipes" message
    textAlign: 'center',
    marginVertical: 10,
  },
  recipeCard: {
    width: 220, // Adjust width for a more prominent card
    height: 270, // Adjust height for a more prominent card
    backgroundColor: WHITE, // White background for cards
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: DARK_GREEN, // Dark green for border
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: 120, // Taller image for better emphasis
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 16, // Slightly larger font size for title
    fontWeight: 'bold',
    marginTop: 10,
    color: DARK_GREEN, // Dark green for recipe title
  },
  recipeUrl: {
    fontSize: 14, // Larger font size for URL
    color: LIGHT_GREEN, // Light green for the URL text
    marginTop: 5,
  },
  userRecipeCard: {
    width: 150, 
    height: 80, 
    backgroundColor: WHITE, 
    borderRadius: 10, 
    padding: 10, 
    margin: 10, 
    borderWidth: 1,
    borderColor: DARK_GREEN, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  userRecipeTitle: {
    fontWeight: 'bold',
    color: DARK_GREEN, 
    textAlign: 'center', 
    fontSize: 18,
  },
  navIcon: {
    position: 'absolute', // Fix position of the star icon
  bottom: 10,           // Align it to the bottom of the card
  right: 10,            // Align it to the right of the card
  padding: 5,
  },
  refreshContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  refreshButton: {
    padding: 8, 
    backgroundColor: LIGHT_GREEN, // Light green background for refresh button
    borderRadius: 50, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  userModalContent: {
    width: '90%', 
    maxHeight: '85%', 
    backgroundColor: WHITE, // White background for the modal
    borderRadius: 15, 
    padding: 20, 
    overflow: 'hidden', 
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: DARK_GREEN,
    textAlign: 'center',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LIGHT_GREEN, // Light green for section titles in the modal
    marginTop: 15,
  },
  modalText: {
    fontSize: 16,
    color: DARK_GREEN,
    marginVertical: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  squareButton: {
    backgroundColor: DARK_GREEN, // Dark green background for square buttons
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  squareButtonText: {
    color: WHITE, // White text color
    fontSize: 14,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#e74c3c', // Red background for the close button
    padding: 10,
    borderRadius: 8, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  closeButtonText: {
    color: WHITE, // White text color for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
