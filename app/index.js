import React from 'react';
import HomePage from './HomePage';
import styles from '../stylesheets/LoginPageStyles';
import { auth, db } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { Route } from 'expo-router/build/Route';
import { router } from 'expo-router';

export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [fullName, setFullName] = useState(''); // Store full name
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register

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
  }, [auth]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully!');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error('Passwords do not match!');
      // TODO: add password regex
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
      switchToLogin(); // Redirect to login page after successful signup
      return (<LoginPage/>);
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully!');
      setUser(null);
      switchToLogin(); // Switch back to login page after logout
      return;
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


export default function App() {
  return <HomePage />;
}
