// // import React, { useState } from 'react';
// // import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Modal, Button } from 'react-native';
// // import styles from '../stylesheets/HomePageStyles';
// // import { Entypo } from '@expo/vector-icons';
// // import NavigationBar from '../app/NavigationBar';
// // import ProfilePage from './ProfilePage'; // Import the ProfilePage component
// // import modalStyles from '../stylesheets/ModalStyles'; // Import the modal styles

// // const HomePage = ({ user, handleLogout }) => {
// //   const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility

// //   const handleProfilePress = () => {
// //     setModalVisible(true); // Show the modal
// //   };

// //   const handleCloseModal = () => {
// //     setModalVisible(false); // Hide the modal
// //   };

// //   const data = [
// //     {
// //       type: `header`,
// //       title: `Welcome User!`,
// //     },
// //     {
// //       type: `subHeader`,
// //       text: `Saved Recipes`,
// //     },
// //     {
// //       type: `savedRecipes`,
// //       data: [
// //         { title: <Text>Lorem ipsum</Text>, image: 'https://via.placeholder.com/150' },
// //         { title: <Text>Lorem ipsum</Text>, image: 'https://via.placeholder.com/150' },
// //         { title: <Text>Lorem ipsum</Text>, image: 'https://via.placeholder.com/150' },
// //       ],
// //     },
// //     {
// //       type: `category`,
// //       data: [
// //         { name: `Breakfast`, icon: `archive` },
// //         { name: `Lunch`, icon: `archive` },
// //         { name: `Dinner`, icon: `moon` },
// //         { name: `Healthy`, icon: `heart` },
// //       ],
// //     },
// //   ];

// //   const renderItem = ({ item }) => {
// //     switch (item.type) {
// //       case `header`:
// //         return renderHeader();
// //       case `subHeader`:
// //         return <Text style={styles.subHeader}>{item.text}</Text>
// //       case `savedRecipes`:
// //         return (
// //           <FlatList
// //             horizontal
// //             data={item.data}
// //             renderItem={renderRecipeItem}
// //             keyExtractor={(item, index) => `saved-${index}`}
// //             showsHorizontalScrollIndicator={false}
// //           />
// //         );
// //       case `category`:
// //         return (
// //           <FlatList
// //             data={item.data}
// //             renderItem={renderCategoryItem}
// //             keyExtractor={(item, index) => `category-${index}`}
// //             numColumns={2}
// //             scrollEnabled={false}
// //           />
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   const renderHeader = () => (
// //     <View style={styles.header}>
// //       <Text style={styles.headerText}>Welcome {user.name}</Text>
// //       <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
// //         <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profileImage} />
// //       </TouchableOpacity>
// //     </View>
// //   );

// //   const renderRecipeItem = ({ item }) => (
// //     <View style={styles.recipeCard}>
// //       <Image source={{ uri: item.image }} style={styles.recipeImage} />
// //       <Text style={styles.recipeTitle}>{item.title}</Text>
// //     </View>
// //   );

// //   const renderCategoryItem = ({ item }) => (
// //     <TouchableOpacity style={styles.categoryButton}>
// //       <Entypo name={item.icon} size={48} color="#000" />
// //       <Text style={styles.categoryText}>{item.name}</Text>
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <FlatList
// //         data={data}
// //         renderItem={renderItem}
// //         keyExtractor={(item, index) => `main-${index}`}
// //       />
// //       <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
// //       <NavigationBar showHomeIcon={false} /> 

// //       {/* Profile Modal */}
// //       <Modal
// //         visible={isModalVisible}
// //         animationType="slide"
// //         transparent={true}
// //         onRequestClose={handleCloseModal}
// //       >
// //         <View style={modalStyles.modalContainer}>
// //           <View style={modalStyles.modalContent}>
// //             <ProfilePage />
// //             <TouchableOpacity onPress={handleCloseModal} style={modalStyles.closeButton}>
// //               <Text style={modalStyles.closeButtonText}>Close</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Modal>
// //     </SafeAreaView>
// //   );
// // };

// // export default HomePage;


// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Modal, Button } from 'react-native';
// import { useRouter } from 'expo-router';
// import styles from '../stylesheets/HomePageStyles';
// import { Entypo } from '@expo/vector-icons';
// import NavigationBar from '../app/NavigationBar';
// import ProfilePage from './ProfilePage'; // Import the ProfilePage component
// import modalStyles from '../stylesheets/ModalStyles'; // Import the modal styles


// const HomePage = ({ user, fullName, handleLogout }) => {
//   const router = useRouter();
//   const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility

//   const handleProfilePress = () => {
//     setModalVisible(true); // Show the modal
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false); // Hide the modal
//   };

//   const handleSearchPress = () => {
//     router.push('/SearchScreen');
//   };

//   const data = [
//     {
//       type: `header`,
//       title: `Welcome User!`,
//     },
//     {
//       type: `subHeader`,
//       text: `Saved Recipes`,
//     },
//     {
//       type: `savedRecipes`,
//       data: [
//         { title: <Text>Lorem ipsum</Text>, image: 'https://via.placeholder.com/150' },
//         { title: <Text>Lorem ipsum</Text>, image: 'https://via.placeholder.com/150' },
//         { title: <Text>Lorem ipsum</Text>, image: 'https://via.placeholder.com/150' },
//       ],
//     },
//     {
//       type: `category`,
//       data: [
//         { name: `Breakfast`, icon: `archive` },
//         { name: `Lunch`, icon: `archive` },
//         { name: `Dinner`, icon: `moon` },
//         { name: `Healthy`, icon: `heart` },
//       ],
//     },
//   ];

//   const renderItem = ({ item }) => {
//     switch (item.type) {
//       case `header`:
//         return renderHeader(item.title);

//       case `subHeader`:
//         return <Text style={styles.subHeader}>{item.text}</Text>
//       case `savedRecipes`:
//         return (
//           <FlatList
//             horizontal
//             data={item.data}
//             renderItem={renderRecipeItem}
//             keyExtractor={(item, index) => `saved-${index}`}
//             showsHorizontalScrollIndicator={false}
//           />
//         );
//       case `category`:
//         return (
//           <FlatList
//             data={item.data}
//             renderItem={renderCategoryItem}
//             keyExtractor={(item, index) => `category-${index}`}
//             numColumns={2}
//             scrollEnabled={false}
//           />
//         );
//       default:
//         return null;
//     }
//   };


//   const renderHeader = (title) => (
//     <View style={styles.header}>
//       <Text style={styles.headerText}>{title}</Text>
//       <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
//         <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profileImage} />
//       </TouchableOpacity>
//     </View>
//   );

//   const renderRecipeItem = ({ item }) => (
//     <View style={styles.recipeCard}>
//       <Image source={{ uri: item.image }} style={styles.recipeImage} />
//       <Text style={styles.recipeTitle}>{item.title}</Text>
//     </View>
//   );

//   const renderCategoryItem = ({ item }) => (
//     <TouchableOpacity style={styles.categoryButton}>
//       <Entypo name={item.icon} size={48} color="#000" />
//       <Text style={styles.categoryText}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => `main-${index}`}
//       />
//       <Button title="Logout" onPress={handleLogout} color="#e74c3c" />

//       <NavigationBar showHomeIcon={false} /> 

//       {/* Profile Modal */}
//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={handleCloseModal}
//       >
//         <View style={modalStyles.modalContainer}>
//           <View style={modalStyles.modalContent}>
//             <ProfilePage />
//             <TouchableOpacity onPress={handleCloseModal} style={modalStyles.closeButton}>
//               <Text style={modalStyles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };


// export default HomePage;


import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Modal, Button, Linking } from 'react-native';
import styles from '../stylesheets/HomePageStyles';
import { Entypo } from '@expo/vector-icons';
import NavigationBar from '../app/NavigationBar';
import ProfilePage from './ProfilePage'; // Import the ProfilePage component
import modalStyles from '../stylesheets/ModalStyles'; // Import the modal styles
import { fetchRecipesByMealType } from '../utils/recipeService';
import { useNavigation } from '@react-navigation/native';
import { db, auth, getUserItem } from '../firebase'; // Import Firebase auth
import { doc, getDoc } from 'firebase/firestore';

const HomePage = () => {
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [recipes, setRecipes] = useState([]);
  const [mealType, setMealType] = useState('');
  const [user, setUser] = useState(null); // State to hold user information
  const [fullName, setFullName] = useState(''); // State to hold user's full name
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);

        try {
          const docRef = doc(db, 'users', user.email);
          const docSnap = await getDoc(docRef);
          // const userItem = getUserItem(user);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setFullName(`${userData.firstName} ${userData.lastName}`);
          } else {
            console.error('User document not found');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      } else {
        setUser(null);
        setFullName('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const currentHour = new Date().getHours();
      let mealType = '';

      if (currentHour >= 5 && currentHour < 12) {
        mealType = 'Breakfast';
      } else if (currentHour >= 12 && currentHour < 16) {
        mealType = 'Lunch';
      } else if (currentHour >= 16 && currentHour < 22) {
        mealType = 'Dinner';
      }

      setMealType(mealType);

      try {
        const fetchedRecipes = await fetchRecipesByMealType(mealType);
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleProfilePress = () => {
    setModalVisible(true); // Show the modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Hide the modal
  };

  const handleOpenURL = (url) => {
    Linking.openURL(url);
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Sign-out successful.
        setUser(null);
        setFullName('');
        navigation.navigate('LoginPage'); // Assuming you have a login page to navigate to
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const renderRecipeItem = ({ item, index }) => {
    const { recipe } = item;
    return (
      <View key={index} style={styles.recipeCard}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <Text style={styles.recipeTitle}>{recipe.label}</Text>
        <TouchableOpacity onPress={() => handleOpenURL(recipe.url)}>
          <Text style={styles.recipeUrl}>{recipe.url}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleLogout} title="Logout" color="#e74c3c" />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome {fullName}!</Text>
        {user && ( // Display profile button only if user is logged in
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profileImage} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.subHeader}>Recommended Recipes for {mealType}</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item, index) => `recipe-${index}`}
      />
      
      {user && ( // Display logout button only if user is logged in
        <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
      )}
      
      <NavigationBar showHomeIcon={false} navigation={navigation} user={user} />

      {/* Profile Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <ProfilePage user={user} onClose={handleCloseModal} />
            <TouchableOpacity onPress={handleCloseModal} style={modalStyles.closeButton}>
              <Text style={modalStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomePage;
