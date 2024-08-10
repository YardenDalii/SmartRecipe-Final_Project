import { StyleSheet } from 'react-native';

const profilePageStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Cream color for background
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
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
    color: '#556B2F', // Dark olive green for the title text
  },
  fullNameTitleEditing: {
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    paddingHorizontal: 10,
    flex: 1,
    color: '#556B2F', // Dark olive green for the title text
  },
  editButton: {
    backgroundColor: '#FFFFFF', // Match the background color
    borderColor: '#556B2F', // Dark olive green border
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginLeft: 10,
  },
  editButtonText: {
    color: '#556B2F', // Dark olive green for button text
    fontSize: 12,
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#556B2F', // Dark olive green for save button
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#556B2F', // Dark olive green for labels
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: '#556B2F', // Dark olive green for text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  button: {
    backgroundColor: '#556B2F', // Dark olive green for buttons
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: 'red',
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Red color for delete button
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF', // White background for input fields
  },
  changePasswordContainer: {
    width: '100%',
  },
  squareButton: {
    backgroundColor: '#556B2F', // Dark olive green for square buttons
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
});

export default profilePageStyles;
