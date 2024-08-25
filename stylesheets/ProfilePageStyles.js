import { StyleSheet } from 'react-native';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';

const profilePageStyles = StyleSheet.create({
  container: {
    backgroundColor: WHITE, // White background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: DARK_GREEN,
    borderWidth: 1,
  },
  fullNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  fullNameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    color: DARK_GREEN, // Dark green for the title text
  },
  fullNameTitleEditing: {
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1, // Allow the input to take up available space
    color: DARK_GREEN,
    minWidth: 0, // Ensure it can shrink to fit within its container
  },
  editButton: {
    backgroundColor: WHITE, // Match the background color
    borderColor: DARK_GREEN, // Dark green border
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginLeft: 10,
  },
  editButtonText: {
    color: DARK_GREEN, // Dark green for button text
    fontSize: 12,
  },
  editButtonContainer: {
    flexDirection: 'column', // Change to column to stack the buttons vertically
    justifyContent: 'center',
    alignItems: 'center', // Center align the buttons
    width: '100%', // Ensure the buttons take full width
    marginBottom: 15, // Add margin to separate from other elements
  },
  saveButton: {
    backgroundColor: LIGHT_GREEN, // Light green for save button
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10, // Add margin at the bottom to separate from cancel button
    width: '80%', // Adjust width to fit the container nicely
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c', // Red for cancel button
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%', // Adjust width to fit the container nicely
    alignItems: 'center',
  },
  saveButtonText: {
    color: WHITE,
    fontSize: 14,
  },
  cancelButtonText: {
    color: WHITE,
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: DARK_GREEN, // Dark green for labels
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: DARK_GREEN, // Dark green for text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: DARK_GREEN, // Dark green for buttons
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: WHITE,
  },
  changePasswordContainer: {
    width: '100%',
  },
  squareButton: {
    backgroundColor: DARK_GREEN, // Dark green for square buttons
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  squareButtonText: {
    color: WHITE,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default profilePageStyles;
