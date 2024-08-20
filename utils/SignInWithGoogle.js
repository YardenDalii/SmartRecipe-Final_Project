// import React, { useState, useEffect } from 'react';
// import { Button, View, Text } from 'react-native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import { auth } from '../firebase'; // Adjust the path if necessary
// import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

// WebBrowser.maybeCompleteAuthSession();

// export default function App() {
//   const [user, setUser] = useState(null);

//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: '200937507860-pkufjp5jhlqsq6ubarma5fs3kt26apsn.apps.googleusercontent.com',
//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       const googleCredential = GoogleAuthProvider.credential(id_token);
      
//       signInWithCredential(auth, googleCredential)
//         .then((userCredential) => {
//           setUser(userCredential.user);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [response]);

//   return (
//     <View>
//       <Button
//         disabled={!request}
//         title="Sign in with Google"
//         onPress={() => {
//           promptAsync();
//         }}
//       />
//       {user && <Text>Welcome, {user.displayName}</Text>}
//     </View>
//   );
// }

// utils/SignInWithGoogle.js
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export function SignInWithGoogle() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '200937507860-pkufjp5jhlqsq6ubarma5fs3kt26apsn.apps.googleusercontent.com', // Replace with your Web Client ID from Firebase
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log('User signed in with Google:', userCredential.user);
        })
        .catch((error) => {
          console.error('Error during Google sign-in:', error);
        });
    }
  }, [response]);

  return {
    promptAsync,
    request,
  };
}


/*

https://auth.expo.io/@yardeda2/SmartRecipe-Final_Project

*/