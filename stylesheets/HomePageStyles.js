import { StyleSheet } from 'react-native';
import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR, // Cream color for background
    paddingTop: 40,
    padding:16,
  },
  scrollContainer: {
    paddingBottom: 20, // Ensure there's space at the bottom
  },
  frameContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: OLIVE_GREEN_COLOR, // Dark olive green border for the rectangle
    backgroundColor: BACKGROUND_COLOR, // Cream color for frame
  },
  header: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Spread out the text and button
    alignItems: 'center', // Center them vertically
    paddingHorizontal: 16, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding for spacing
    backgroundColor: BACKGROUND_COLOR, // Match background color
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: OLIVE_GREEN_COLOR,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: OLIVE_GREEN_COLOR, // Dark olive green for subheaders
  },
  recipeCard: {
    width: 200, // Adjust width to make the card smaller
    height: 250, // Adjust height to make the card smaller
    backgroundColor: '#FFFFFF', // White background for cards
    borderRadius: 8,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: OLIVE_GREEN_COLOR, // Dark olive green for border
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  recipeImage: {
    width: '100%',
    height: 90, // Smaller image height
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 14, // Smaller font size for title
    fontWeight: 'bold',
    marginTop: 5,
  },
  recipeUrl: {
    fontSize: 12, // Smaller font size for URL
    color: '#00695c',
    marginTop: 5,
  },
  navIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logoutButton: {
    padding: 8, // Padding around the button
    paddingHorizontal: 10, // Extra horizontal padding for spacing
    backgroundColor: OLIVE_GREEN_COLOR, // Dark olive green for the button
    borderRadius: 5, // Rounded corners
    marginLeft: 10,
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
  userRecipeCard: {
    width: 150, 
    height: 80, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 10, 
    padding: 10, 
    margin: 10, 
    borderWidth: 1,
    borderColor: OLIVE_GREEN_COLOR, 
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
    color: OLIVE_GREEN_COLOR, 
    textAlign: 'center', 
    fontSize: 18,
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
    backgroundColor: '#FFFFFF', // Cream background for the modal
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
    color: OLIVE_GREEN_COLOR,
    textAlign: 'center',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d40',
    marginTop: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  refreshContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 8, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 50, 
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
