import { StyleSheet } from 'react-native';
import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR, // Cream color for background
    paddingTop: 40,
    padding:16,
  },
  noRecipesText: {
    textAlign: 'center',
    fontSize: 18,
    color: OLIVE_GREEN_COLOR, // Dark olive green for text
    marginVertical: 20,
  },
  recipeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeItem: {
    flex: 1,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: OLIVE_GREEN_COLOR, // Dark olive green for borders
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF', // White background for recipe items
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: OLIVE_GREEN_COLOR, // Dark olive green for recipe titles
  },
  recipeDescription: {
    fontSize: 16,
    color: OLIVE_GREEN_COLOR, // Dark olive green for recipe descriptions
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: BACKGROUND_COLOR, // Cream color for modal background
    borderRadius: 10,
    padding: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: OLIVE_GREEN_COLOR, // Dark olive green for modal borders
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: OLIVE_GREEN_COLOR, // Dark olive green for modal title
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: OLIVE_GREEN_COLOR, // Dark olive green for modal subtitle
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color: OLIVE_GREEN_COLOR, // Dark olive green for modal text
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e74c3c', // Red color for close button
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: '#FFFFFF', // White text color for close button
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigPlusButton: {
    alignSelf: 'center',
    backgroundColor: OLIVE_GREEN_COLOR, // Dark olive green for the plus button
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  smallPlusButton: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: OLIVE_GREEN_COLOR, // Dark olive green for small plus button
    padding: 10,
    borderRadius: 50,
  },
  smallPlusButtonText: {
    color: '#FFFFFF', // White text color for plus button text
    fontSize: 16,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: OLIVE_GREEN_COLOR, // Dark olive green background
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: '#FFFFFF', // White text color for edit button
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Red background for delete button
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10, // Padding around the icon
  },
});


