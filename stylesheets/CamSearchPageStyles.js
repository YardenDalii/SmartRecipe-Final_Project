import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  predictionContainer: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    textAlignVertical: 'top',
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold',
  },
  searchButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#28A745',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  filterImageButton: {
    width: 30,
    height: 30,
    marginRight: 300,
      },
  filterImage: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  filterButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterSection: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  recipeCard: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  recipeUrl: {
    fontSize: 14,
    textAlign: 'center',
    color: '#007BFF',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  meatInputContainer: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  meatInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    color: '#000',
  },
  meatInputButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  meatInputButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  meatInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
