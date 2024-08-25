// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   button: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   capturedImage: {
//     width: 300,
//     height: 300,
//     borderRadius: 10,
//   },
//   detectionResult: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     borderRadius: 10,
//   },
//   detectionText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default styles;



import { StyleSheet } from 'react-native';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Evenly space the icons
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: WHITE, // White background for the navigation bar
    borderTopWidth: 1,
    borderTopColor: DARK_GREEN, // Dark green border on top
  },
  navIcon: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    width: '80%',
    backgroundColor: WHITE, // White background for the modal
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DARK_GREEN, // Dark green border for the modal
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e74c3c', // Red background for the close button
    borderRadius: 5,
  },
  closeButtonText: {
    color: WHITE, // White text for the close button
    fontWeight: 'bold',
  },
});

export default styles;