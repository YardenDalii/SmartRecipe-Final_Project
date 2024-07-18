import React, { useState, useEffect, useRef } from 'react';
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
import SearchScreen from '../app/SearchScreen'; 
import AddRecipePage from '../app/AddRecipePage';
import CamSearchPage from '../app/CamSearchPage';
import AboutPage from '../app/AboutPage';

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
  const [loading, setLoading] = useState(false); 
    const listenerRef = useRef(null); 

    useEffect(() => {
      listenerRef.current = onAuthStateChanged(auth, async (user) => {
          if (loading) return; // If loading, bypass setting user state
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

      return () => listenerRef.current();
  }, [loading]);

  const handleLogin = async (navigation) => {
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

  const handleRegister = async (navigation) => {
    setLoading(true);
    // TODO: add password regex
    if (password !== confirmPassword) {
      console.error('Passwords do not match!');
      setLoading(false);
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
      // Sign out the user immediately after registration
      await signOut(auth);
      setUser(null);
      setLoading(false);
      switchToLogin(navigation);
    } catch (error) {
      console.error('Registration error:', error.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully!');
      setUser(null);
      setIsLogin(true); // Ensure isLogin state is set to true
      switchToLogin(navigation);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      });
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const switchToLogin = (navigation) => {
    setIsLogin(true);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    navigation.navigate('LoginPage');
  };

  const switchToRegister = (navigation) => {
    setIsLogin(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    navigation.navigate('RegisterPage');
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
                  handleLogin={(navigation) => handleLogin(navigation)}
                  switchToRegister={(navigation) => switchToRegister(navigation)}
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
                  handleRegister={(navigation) => handleRegister(navigation)}
                  switchToLogin={(navigation) => switchToLogin(navigation)}
                />
              )}
            </Stack.Screen>
          </>
        )}
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="AddRecipePage" component={AddRecipePage} />
        <Stack.Screen name="CamSearchPage" component={CamSearchPage} />
        <Stack.Screen name="AboutPage" component={AboutPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
