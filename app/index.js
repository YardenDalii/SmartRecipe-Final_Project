// import React, { useState, useEffect } from 'react';
// import { ScrollView } from 'react-native';
// import LoginPage from './LoginPage';
// import RegisterPage from './RegisterPage';
// import HomePage from './HomePage';
// import styles from '../stylesheets/LoginPageStyles';
// import { auth, db } from '../firebase';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
// import { setDoc, doc } from 'firebase/firestore';

// export default App = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [user, setUser] = useState(null); // Track user authentication state
//   const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log('User signed in successfully!');
//     } catch (error) {
//       console.error('Login error:', error.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log('User signed out successfully!');
//       setUser(null);
//       switchToLogin();// Switch back to login page after logout
//     } catch (error) {
//       console.error('Logout error:', error.message);
//     }
//   };

//   const handleRegister = async () => {
//     if (password !== confirmPassword) {
//       console.error('Passwords do not match!');
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         firstName,
//         lastName,
//         email: user.email,
//       });

//       console.log('User created and stored in Firestore successfully!');
//       return switchToLogin;

//     } catch (error) {
//       console.error('Registration error:', error.message);
//     }
//   };

//   const switchToLogin = () => {
//     setIsLogin(true);
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setFirstName('');
//     setLastName('');
//   };

//   const switchToRegister = () => {
//     setIsLogin(false);
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setFirstName('');
//     setLastName('');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {user ? (
//         <HomePage user={user} handleLogout={handleLogout} />
//       ) : (
//         isLogin ? (
//           <LoginPage
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             handleLogin={handleLogin}
//             switchToRegister={switchToRegister}
//           />
//         ) : (
//           <RegisterPage
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             confirmPassword={confirmPassword}
//             setConfirmPassword={setConfirmPassword}
//             firstName={firstName}
//             setFirstName={setFirstName}
//             lastName={lastName}
//             setLastName={setLastName}
//             handleRegister={handleRegister}
//             switchToLogin={switchToLogin}
//           />
//         )
//       )}
//     </ScrollView>
//   );
// };

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Layout from './_layout';
import AuthHandler from '../utils/AuthHandler';
import NavigationBar from './NavigationBar';

const App = () => {
  return (
      <AuthHandler />
  );
};

export default App;
