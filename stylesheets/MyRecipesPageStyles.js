import { StyleSheet } from 'react-native';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY, // Light gray for background
    paddingTop: 40,
    padding: 16,
  },
  noRecipesText: {
    textAlign: 'center',
    fontSize: 18,
    color: DARK_GREEN, // Dark green for text
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
    borderColor: DARK_GREEN, // Dark green for borders
    padding: 10,
    borderRadius: 8,
    backgroundColor: WHITE, // White background for recipe items
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: DARK_GREEN, // Dark green for recipe titles
  },
  recipeDescription: {
    fontSize: 16,
    color: DARK_GREEN, // Dark green for recipe descriptions
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: WHITE, // White background for modal
    borderRadius: 10,
    padding: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: DARK_GREEN, // Dark green for modal borders
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: DARK_GREEN, // Dark green for modal title
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: LIGHT_GREEN, // Dark green for modal subtitle
  },
  modalText: {
    fontSize: 16,
    color: DARK_GREEN,
    marginBottom: 5,
    textAlign: 'left', // Align text to the left
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e74c3c', // Red for close button
    borderRadius: 8,
    alignSelf: 'center',
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: WHITE, // White text for close button
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigPlusButton: {
    alignSelf: 'center',
    backgroundColor: DARK_GREEN, // Dark green for the plus button
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  smallPlusButton: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: DARK_GREEN, // Dark green for small plus button
    padding: 10,
    borderRadius: 50,
  },
  smallPlusButtonText: {
    color: WHITE, // White text for plus button
    fontSize: 16,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: DARK_GREEN, // Dark green background
    padding: 10,
    borderRadius: 8,
    marginVertical: 10, // Add margin for spacing from the list
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: WHITE, // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Red background for delete button
    padding: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10, // Padding around the icon
  },
  modalNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  navButton: {
    padding: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
});