import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFDD0', // Cream color for background
  },
  scrollContainer: {
    paddingBottom: 20, // Ensure there's space at the bottom
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
    width: 200, // Adjust width to make the card smaller
    height: 250, // Adjust height to make the card smaller
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    elevation: 3, // Light shadow effect for depth
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
  userRecipeCard: {
    width: 150, // Fixed width
    height: 80, // Fixed height
    backgroundColor: '#e0f7fa', // Background color
    borderRadius: 10, // Rounded corners
    padding: 10, // Padding for inner spacing
    margin: 10, // Margin around the card
    borderWidth: 1,
    borderColor: '#00796b', // Border color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    elevation: 5, // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  userRecipeTitle: {
    fontWeight: 'bold',
    color: '#004d40', // Darker text color for contrast
    textAlign: 'center', // Center the text
    // Dynamic font size based on the content
    fontSize: 18,
  },
  userModalContent: {
    width: '90%', // Make the modal content take up most of the screen width
    maxHeight: '85%', // Limit the height to ensure it doesn't overflow the screen
    backgroundColor: '#ffffff', // White background for the modal content
    borderRadius: 15, // Rounded corners for a clean look
    padding: 20, // Padding inside the modal for spacing
    overflow: 'hidden', // Ensure content doesn't overflow the modal borders
    elevation: 10, // Stronger shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004d40',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d40',
    marginTop: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#00695c',
    marginVertical: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  refreshContainer: {
    flexDirection: 'row', // Align refresh button and header text horizontally
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
    padding: 8, // Padding for the touchable area
    backgroundColor: '#f0f0f0', // Background color for better visibility
    borderRadius: 50, // Round the button for aesthetics
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
