import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F5F5DC', // Cream color for background
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#556B2F', // Dark olive green border for the rectangle
        backgroundColor: '#F5F5DC', // Cream color for frame
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        fontWeight: 'bold', // Bold title
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF', // White background for input fields
    },
    buttonContainer: {
        marginBottom: 16,
        width: '100%', // Ensure buttons take the full width of the container
    },
    button: {
        backgroundColor: '#556B2F', // Dark olive green for buttons
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%', // Full width buttons
    },
    buttonText: {
        color: '#FFFFFF', // White font for buttons
        fontSize: 16,
    },
    toggleTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16, // Closer to the Sign In button
    },
    toggleText: {
        color: '#556B2F', // Dark olive green for "Need an account"
        textAlign: 'center',
    },
    bottomContainer: {
        marginTop: 20,
    },
    emailText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default styles;
