import { StyleSheet } from 'react-native';
import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';

const menuStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    },
    menuButton: {
      padding: 10,
      color: "#000000",
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)', // Black background
    },
    menuDropdownContainer: {
      position: 'absolute',
      top: 60, // Adjust this value based on your header height
      right: 20, // Align with the right side of the screen
      backgroundColor: '#000', // Black background for the menu
      borderRadius: 8,
      width: 200, // Width of the dropdown menu
      paddingVertical: 10,
      paddingHorizontal: 10,
      elevation: 5,
      shadowColor: '#000',
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
    },
    divider: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 5,
    },
});

export default menuStyles;