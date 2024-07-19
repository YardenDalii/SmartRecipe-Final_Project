// import React, { useState } from 'react';
// import { View, Text, Button, TextInput } from 'react-native';
// import { useRouter } from 'expo-router';
// import styles from '../stylesheets/LoginPageStyles';


// const LoginPage = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
//     const router = useRouter();
//     const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility

//     return (
//         <View style={styles.authContainer}>
//             <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
//             <TextInput
//              style={styles.input}
//              value={email}
//              onChangeText={setEmail}
//              placeholder="Email"
//              placeholderTextColor="gray"
//              autoCapitalize="none"
//             />

//             <TextInput
//              style={styles.input}
//              value={password}
//              onChangeText={setPassword}
//              placeholder="Password"
//              placeholderTextColor="gray"
//              secureTextEntry
//             />

//             <View style={styles.buttonContainer}>
//                 <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
//             </View>

//             <View style={styles.bottomContainer}>
//                 <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
//                 {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
//                 </Text>
//             </View>
//         </View>
//     )
// };


// export default LoginPage;

import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import styles from '../stylesheets/LoginPageStyles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const LoginPage = ({ email, setEmail, password, setPassword, handleLogin, switchToRegister, switchToReset }) => {
    const navigation = useNavigation();
    
    const continueWithoutLogin = () => {
        navigation.navigate('AboutPage');
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
