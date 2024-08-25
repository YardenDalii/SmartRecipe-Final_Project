import { StyleSheet } from 'react-native';
// import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20, // Additional padding to the top and bottom
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20, // Adjusted for consistent padding
    backgroundColor: LIGHT_GRAY,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: DARK_GREEN,
  },
  tutorialBox: {
    marginBottom: 20,
    padding: 18,
    backgroundColor: WHITE,
    borderRadius: 12,
    shadowColor: DARK_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: DARK_GREEN,
  },
  boxDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    color: DARK_GREEN,
  },
  buttonContainer: {
    marginTop: 10,
//     marginBottom: 16,
//     width: '100%', // Ensure buttons take the full width of the container
// },
// button: {
//     backgroundColor: '#556B2F', // Dark olive green for buttons
//     padding: 10,
//     borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Full width buttons
},
buttonText: {
    color: '#FFFFFF', // White font for buttons
    fontSize: 16,
},
  subList: {
    marginLeft: 16, // Indent for sub-list items
  },
  button: {
    backgroundColor: DARK_GREEN,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '85%',
  },
  buttonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
});


export default styles;