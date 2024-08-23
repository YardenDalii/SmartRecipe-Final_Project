// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';
// import { Entypo, Feather } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import styles from '../stylesheets/NavigationBarStyles';
// import { openCameraAndSendImage } from '../utils/cameraUtils';
// import { auth } from '../firebase'; // Import Firebase auth
// import ProfilePage from './ProfilePage'; 

// const NavigationBar = ({ showHomeIcon = true, showSearchIcon = true, showPlusButton = true, user }) => {
//   const navigation = useNavigation();
//   const [predictions, setPredictions] = useState([]);
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isProfileModalVisible, setProfileModalVisible] = useState(false); 


//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setIsLoggedIn(!!user); // Update isLoggedIn based on whether user is logged in
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleHomePress = () => {
//     navigation.navigate('HomePage', { user });
//   };

//   const handleSearchPress = () => {
//     navigation.navigate('SearchScreen', { user });
//   };

//   const handleCameraPress = async () => {
//     setPredictions([]);
//     setRecipes([]);
//     setLoading(true);

//     const { predictions: newPredictions, recipes: newRecipes } = await openCameraAndSendImage(navigation);

//     setPredictions(newPredictions);
//     setRecipes(newRecipes);
//     setLoading(false);

//     if (newPredictions.length > 0) {
//       navigation.navigate('CamSearchPage', { predictions: newPredictions, recipes: newRecipes, user });
//     }
//   };

//   const handleProfilePress = () => {
//     setProfileModalVisible(true); // Show the profile modal
//   };

//   const closeProfileModal = () => {
//     setProfileModalVisible(false); // Hide the profile modal
//   };

//   return (
//     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
//       {showHomeIcon && (
//         <TouchableOpacity style={styles.navIcon} onPress={handleHomePress}>
//           <Entypo name="home" size={24} color="green" />
//         </TouchableOpacity>
//       )}
//       {showSearchIcon && (
//         <TouchableOpacity style={styles.navIcon} onPress={handleSearchPress}>
//           <Feather name="search" size={24} color="black" />
//         </TouchableOpacity>
//       )}
//       <TouchableOpacity style={styles.navIcon} onPress={handleCameraPress}>
//         <Feather name="camera" size={24} color="black" />
//       </TouchableOpacity>
//       {isLoggedIn && (
//         <TouchableOpacity style={styles.navIcon} onPress={handleProfilePress}>
//           <Feather name="user" size={24} color="black" />
//         </TouchableOpacity>
//       )}
//       {loading && (
//         <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       )}
//       <Modal
//         visible={isProfileModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={closeProfileModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <ProfilePage user={user} onClose={closeProfileModal} />
//             <TouchableOpacity onPress={closeProfileModal} style={styles.closeButton}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default NavigationBar;


import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Modal, Text, Alert } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../stylesheets/NavigationBarStyles';
import { openCameraAndSendImage } from '../utils/cameraUtils';
import { auth } from '../firebase'; // Import Firebase auth
import ProfilePage from './ProfilePage'; 
import { DARK_GREEN, LIGHT_GREEN, WHITE, LIGHT_GRAY } from '../assets/colorsConts';

const NavigationBar = ({ user }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [predictions, setPredictions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Update isLoggedIn based on whether user is logged in
    });

    return () => unsubscribe();
  }, []);

  const handleHomePress = () => {
    navigation.navigate('HomePage', { user });
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen', { user });
  };

  const handleCameraPress = async () => {
    setPredictions([]);
    setRecipes([]);
    setLoading(true);

    const { predictions: newPredictions, recipes: newRecipes } = await openCameraAndSendImage(navigation);

    setPredictions(newPredictions);
    setRecipes(newRecipes);
    setLoading(false);

    if (newPredictions.length > 0) {
      navigation.navigate('CamSearchPage', { predictions: newPredictions, user: user });
    }
    else {
      navigate.navigate('HomaPage', user);
    }
  };

  const handleProfilePress = () => {
    if (isLoggedIn) {
      setProfileModalVisible(true); // Show the profile modal
    } else {
      Alert.alert('Not Logged In', 'Please log in to view your profile.');
    }
  };

  const closeProfileModal = () => {
    setProfileModalVisible(false); // Hide the profile modal
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navIcon} onPress={handleHomePress}>
        <Entypo name="home" size={24} color={route.name === 'HomePage' ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navIcon} onPress={handleSearchPress}>
        <Feather name="search" size={24} color={route.name === 'SearchScreen' ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navIcon} onPress={handleCameraPress}>
        <Feather name="camera" size={24} color={route.name === 'CamSearchPage' ? 'blue' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navIcon} onPress={handleProfilePress}>
        <Feather name="user" size={24} color={isProfileModalVisible ? 'blue' : 'black'} />
      </TouchableOpacity>
      {loading && (
        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={DARK_GREEN} />
        </View>
      )}
      <Modal
        visible={isProfileModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeProfileModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ProfilePage user={user} onClose={closeProfileModal} />
            <TouchableOpacity onPress={closeProfileModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NavigationBar;