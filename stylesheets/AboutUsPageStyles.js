import { StyleSheet } from 'react-native';
import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        padding: 16,
        justifyContent: 'flex-start', // Align content to the top
        backgroundColor: BACKGROUND_COLOR, // Cream color for background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: OLIVE_GREEN_COLOR,
        textAlign: 'left', // Align title text to the left
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'left', // Align description text to the left
    },
    subList: {
        marginLeft: 50,
    },
    developerSection: {
        marginTop: 40, // Space between recipe section and developer section
        padding: 16,
        backgroundColor: '#FFFFFF', // Light gray background for developer section
        borderRadius: 10,
    },
    developerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left', // Align developer title text to the left
    },
    developerDescription: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left', // Align developer description text to the left
        backgroundColor: "#FFFFFF",
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: OLIVE_GREEN_COLOR, // Orange button color
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
