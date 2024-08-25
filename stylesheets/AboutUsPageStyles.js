import { StyleSheet } from 'react-native';
// import { OLIVE_GREEN_COLOR, BACKGROUND_COLOR } from '../assets/colorsConts';
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20, // Consistent padding
        justifyContent: 'flex-start', 
        backgroundColor: LIGHT_GRAY, // Light gray background
    },
    title: {
        fontSize: 26, // Larger title for emphasis
        fontWeight: 'bold',
        marginBottom: 24,
        color: DARK_GREEN,
        textAlign: 'center', // Centered for a balanced look
    },
    description: {
        fontSize: 18,
        marginBottom: 12,
        textAlign: 'left',
        color: DARK_GREEN, // Consistent color usage
    },
    subList: {
        marginLeft: 16, // Slight indentation for sublist
        marginBottom: 12,
    },
    developerSection: {
        marginTop: 40,
        padding: 18,
        backgroundColor: WHITE,
        borderRadius: 12,
        shadowColor: DARK_GREEN,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    developerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
        color: DARK_GREEN,
    },
    developerDescription: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
        color: DARK_GREEN,
    },
    buttonContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    button: {
        backgroundColor: DARK_GREEN,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: '85%',
    },
    buttonText: {
        color: WHITE,
        fontSize: 18,
        fontWeight: '600',
    },
});

export default styles;
