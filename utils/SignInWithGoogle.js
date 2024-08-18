// import React from 'react';
// import { View, Image, TouchableOpacity } from 'react-native';
// import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
// import { auth } from '../firebase';

// function SignInWithGoogle() {
//     function googleLogin() {
//         const provider = new GoogleAuthProvider();
//         signInWithRedirect(auth, provider).then(async(result) => {
//             console.log(result);
//         });
//     }

//     return (
//         <TouchableOpacity onPress={googleLogin} style={{ justifyContent: 'center' }}>
//             <Image 
//                 source={require('../assets/signin with google.jpg')} 
//                 style={{ width: "60%" }} 
//                 resizeMode="contain"
//             />
//         </TouchableOpacity>
//     );
// }

// export default SignInWithGoogle;
