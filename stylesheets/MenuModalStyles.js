import { StyleSheet } from 'react-native';
// import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE, // Use the defined white color for the background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DARK_GREEN, // Dark green for the header text
  },
  menuButton: {
    padding: 10,
    color: DARK_GREEN, // Dark green color for the menu button icon
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black overlay
  },
  menuItemLogout: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e74c3c', // Red background for the logout button
    borderRadius: 8, // Rounded corners
    marginVertical: 10, // Space between items
    alignItems: 'center', // Center the text
    justifyContent: 'center', // Center the text vertically
    flexDirection: 'row', // Row direction for possible icons
  },
  menuItemLogoutText: {
    color: WHITE, // White text color for good contrast against red background
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuDropdownContainer: {
    position: 'absolute',
    top: 60, // Adjust this value based on your header height
    right: 20, // Align with the right side of the screen
    backgroundColor: DARK_GREEN, // Dark green background for the menu
    borderRadius: 8,
    width: 200, // Width of the dropdown menu
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 5, // Elevation for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  closeButton: {
    alignSelf: 'flex-end', // Align the close button to the right
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: LIGHT_GREEN, // Light green background for the button
    borderRadius: 8, // Rounded corners
    marginVertical: 10, // Space between items
    alignItems: 'center', // Center the text
    justifyContent: 'center', // Center the text vertically
    flexDirection: 'row', // Row direction for possible icons
},
menuItemText: {
  color: DARK_GREEN, // Dark green text color for good contrast
  fontSize: 18,
  fontWeight: 'bold',
},
  divider: {
    height: 1,
    backgroundColor: LIGHT_GRAY, // Light gray for divider lines
    marginVertical: 5,
  },
});

export default menuStyles;