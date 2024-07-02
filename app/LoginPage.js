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

const LoginPage = ({ email, setEmail, password, setPassword, handleLogin, switchToRegister }) => {
    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="gray"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title="Sign In" onPress={handleLogin} color="#3498db" />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.toggleText} onPress={switchToRegister}>
                    Need an account? Sign Up
                </Text>
            </View>
        </View>
    );
};

export default LoginPage;