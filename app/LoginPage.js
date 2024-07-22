
import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import styles from '../stylesheets/LoginPageStyles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const LoginPage = ({ email, setEmail, password, setPassword, handleLogin, switchToRegister, switchToReset }) => {
    const navigation = useNavigation();
    
    const continueWithoutLogin = () => {
        navigation.navigate('HomePage');
    };
    
    // Use useFocusEffect to reset fields when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setEmail('');
                setPassword('');
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.authContainer}>
            <Text style={styles.title}>Login</Text>
            <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            />
            <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title="Forgot your password?" onPress={() => switchToReset(navigation)} color="3498db"></Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Sign In" onPress={() => handleLogin(navigation)} color="#3498db" />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.toggleText} onPress={() => switchToRegister(navigation)}>
                    Need an account? Sign Up
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Continue without Login" onPress={continueWithoutLogin} color="#2ecc71" />
            </View>
            </View>
        </View>
    );
};

export default LoginPage;
