import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesheets/LoginPageStyles';

const RegisterPage = ({
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    firstName, setFirstName,
    lastName, setLastName,
    handleRegister, switchToLogin
}) => {
    const navigation = useNavigation();
    const [emailValid, setEmailValid] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasLowerCase, setHasLowerCase] = useState(false);
    const [hasDigit, setHasDigit] = useState(false);
    const [hasMinLength, setHasMinLength] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailValid(emailRegex.test(text));
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setHasUpperCase(/[A-Z]/.test(text));
        setHasLowerCase(/[a-z]/.test(text));
        setHasDigit(/\d/.test(text));
        setHasMinLength(text.length >= 8);
        setPasswordMatch(text === confirmPassword);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        setPasswordMatch(password === text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.authContainer}>
                <Text style={styles.title}>Create Account</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First Name"
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last Name"
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                />
                <Text style={emailValid ? dynamicStyles.valid : dynamicStyles.invalid}>
                    {emailValid ? '✔' : '✘'} Email must be a valid format
                </Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={handlePasswordChange}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                />
                <Text style={hasUpperCase ? dynamicStyles.valid : dynamicStyles.invalid}>
                    {hasUpperCase ? '✔' : '✘'} Password must contain at least 1 capital letter
                </Text>
                <Text style={hasLowerCase ? dynamicStyles.valid : dynamicStyles.invalid}>
                    {hasLowerCase ? '✔' : '✘'} Password must contain at least 1 lowercase letter
                </Text>
                <Text style={hasDigit ? dynamicStyles.valid : dynamicStyles.invalid}>
                    {hasDigit ? '✔' : '✘'} Password must contain at least 1 digit
                </Text>
                <Text style={hasMinLength ? dynamicStyles.valid : dynamicStyles.invalid}>
                    {hasMinLength ? '✔' : '✘'} Password must be at least 8 characters long
                </Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    placeholder="Confirm Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                />
                {!passwordMatch && confirmPassword.length > 0 && (
                    <Text style={dynamicStyles.errorText}>Passwords do not match!</Text>
                )}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign Up"
                        onPress={() => handleRegister(navigation)}
                        color="#3498db"
                        disabled={!(emailValid && hasUpperCase && hasLowerCase && hasDigit && hasMinLength && passwordMatch)}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.toggleText} onPress={() => switchToLogin(navigation)}>
                        Already have an account? Sign In
                    </Text>
                </View>
            </View>
        </View>
    );
};

const dynamicStyles = StyleSheet.create({
    valid: {
        color: 'green',
    },
    invalid: {
        color: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    }
});

export default RegisterPage;