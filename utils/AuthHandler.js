import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../app/LoginPage';
import RegisterPage from '../app/RegisterPage';
import HomePage from '../app/HomePage';
import styles from '../stylesheets/LoginPageStyles';
import { auth, db } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';

const Stack = createNativeStackNavigator();

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [fullName, setFullName] = useState(''); // Store full name
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFullName(`${userData.firstName} ${userData.lastName}`);
        }
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user details from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const fullName = `${userData.firstName} ${userData.lastName}`;
        setFullName(fullName);

        // Navigate to HomePage and pass user information
        navigation.navigate('HomePage', { 
          user,
          fullName,
          handleLogout
        });
      } else {
        console.log('No such document!');
      }

      console.log('User signed in successfully!');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleRegister = async () => {
    // TODO: add password regex
    if (password !== confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email: user.email,
      });

      console.log('User created and stored in Firestore successfully!');
      navigation.navigate('LoginPage');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully!');
      setUser(null);
      setIsLogin(true); // Ensure isLogin state is set to true
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      });
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="HomePage">
            {(props) => <HomePage {...props} user={user} fullName={fullName} handleLogout={handleLogout} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="LoginPage">
              {(props) => (
                <LoginPage
                  {...props}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                  switchToRegister={switchToRegister}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RegisterPage">
              {(props) => (
                <RegisterPage
                  {...props}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  handleRegister={handleRegister}
                  switchToLogin={switchToLogin}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
