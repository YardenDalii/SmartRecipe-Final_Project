import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../stylesheets/LoginPageStyles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import AboutPage from './AboutPage';


const LoginPage = ({ email, setEmail, password, setPassword, handleLogin, switchToRegister, switchToReset }) => {
    const navigation = useNavigation();

    const continueWithoutLogin = () => {
        navigation.navigate('HomePage');
    };

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
                    <TouchableOpacity style={styles.button} onPress={() => handleLogin(navigation)}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.toggleTextContainer}>
                        <Text style={styles.toggleText} onPress={() => switchToReset(navigation)}>
                            Forgot your password?</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={continueWithoutLogin}>
                        <Text style={styles.buttonText}>Continue without Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.toggleTextContainer}>
                    <Text style={styles.toggleText} onPress={() => switchToRegister(navigation)}>
                        Need an account? Sign Up
                    </Text>
                </View>
                <View style={styles.buttonContainer} >
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AboutPage")}>
                        <Text styles={styles.buttonText}>About the app</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginPage;
