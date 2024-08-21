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
import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';


const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Ensure even spacing between icons
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: BACKGROUND_COLOR, // Cream color for the background
    borderTopWidth: 1,
    borderTopColor: OLIVE_GREEN_COLOR, // Dark olive green for the border
  },
  navIcon: {
    padding: 10,
    color: OLIVE_GREEN_COLOR, // Dark olive green for icons
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    width: '80%',
    backgroundColor: BACKGROUND_COLOR, // Cream color for the modal background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: OLIVE_GREEN_COLOR, // Dark olive green for the border
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e74c3c', // Red for the close button
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default styles;
