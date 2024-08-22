import { StyleSheet } from 'react-native';
import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 16,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left', // Align title text to the left
    color: OLIVE_GREEN_COLOR,
  },
  tutorialBox: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    color: OLIVE_GREEN_COLOR,
  },
  boxDescription: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: OLIVE_GREEN_COLOR,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
export default styles;