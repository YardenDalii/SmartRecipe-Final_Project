import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import styles from '../stylesheets/LoginPageStyles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PasswordResetPage = ({ email, setEmail, handleResetPass, switchToLogin}) => {
    const navigation = useNavigation();
    
    // Use useFocusEffect to reset fields when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setEmail('');
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.authContainer}>
                <Text style={styles.title}>Enter your email</Text>
                <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                />
                <View style={styles.buttonContainer}>
                    <Button title="Reset Password" onPress={() => handleResetPass(navigation)} color="3498db"></Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Back to login page" onPress={() => switchToLogin(navigation)} color="#3498db" />
                </View>
            </View>
        </View>
    );
};

export default PasswordResetPage;
