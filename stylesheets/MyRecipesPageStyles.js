import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  noRecipesText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginVertical: 20,
  },
  recipeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDescription: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigPlusButton: {
    alignSelf: 'center',
    backgroundColor: '#007BFF',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  smallPlusButton: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: '-50%' }],
    backgroundColor: '#007BFF',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
