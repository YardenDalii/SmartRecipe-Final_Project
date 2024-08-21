import { StyleSheet } from 'react-native';
import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    marginBottom: 16,
    width: '100%', // Ensure buttons take the full width of the container
},
button: {
    backgroundColor: '#556B2F', // Dark olive green for buttons
    padding: 10,
    borderRadius: 5,
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
});

export default styles;