import { StyleSheet } from "react-native";
// import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: LIGHT_GRAY, // Light gray background
    },
    authContainer: {
        width: '90%',
        maxWidth: 400,
        padding: 25,
        borderRadius: 15, // More rounded for a modern look
        borderWidth: 2,
        borderColor: DARK_GREEN,
        backgroundColor: WHITE, // White for clear visibility
        shadowColor: DARK_GREEN,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 6, // Slightly higher shadow for depth
    },
    title: {
        fontSize: 28, // Larger and more impactful
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: DARK_GREEN,
    },
    input: {
        height: 45,
        borderColor: LIGHT_GREEN, // Use the light green for borders
        borderWidth: 1.5,
        marginBottom: 18,
        padding: 10,
        borderRadius: 8,
        backgroundColor: WHITE,
        color: DARK_GREEN,
    },
    buttonContainer: {
        marginBottom: 20,
        width: '100%',
    },
    button: {
        backgroundColor: DARK_GREEN, // Dark green buttons for emphasis
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: WHITE,
        fontSize: 18, // Larger font for better readability
        fontWeight: '600',
    },
    toggleTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10, // Adjust spacing between toggles
    },
    toggleText: {
        color: LIGHT_GREEN, // Light green for less critical actions
        textAlign: 'center',
        fontSize: 16, // Increase font size
        fontWeight: '500',
    },
});


export default styles;
