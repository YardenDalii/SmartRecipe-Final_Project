import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import profilePageStyles from '../stylesheets/ProfilePageStyles'; // Import the profile page styles
import { useNavigation } from '@react-navigation/native'; 
import { db, auth } from '../firebase'; // Import Firebase auth and db
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ProfilePage = ({ user, onClose }) => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('User USERS');
  const [email, setEmail] = useState('email@email.com');
  const [phoneNumber, setPhoneNumber] = useState('0501111111');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFullName(`${userData.firstName} ${userData.lastName}`);
          setEmail(userData.email);
          setPhoneNumber(userData.phoneNumber || ''); // Set phoneNumber or default value
        } else {
          console.error('User document not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    try {
      const [firstName, lastName] = fullName.split(' ');
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      setIsEditing(false);
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleFavoriteRecipesPress = () => {
    console.log('Favorite Recipes Button Pressed');
    // Add the navigation logic or actions here
  };

  const handleMyRecipesPress = () => {
    console.log('My Recipes Button Pressed');
    navigation.navigate('MyRecipesPage'); // Navigate to MyRecipesPage
  };

  return (
    <View style={profilePageStyles.container}>
      <Text style={profilePageStyles.label}>Full Name:</Text>
      {isEditing ? (
        <TextInput
          style={profilePageStyles.input}
          value={fullName}
          onChangeText={text => setFullName(text)}
          autoFocus
        />
      ) : (
        <Text style={profilePageStyles.text}>{fullName}</Text>
      )}

      <Text style={profilePageStyles.label}>Email:</Text>
      <Text style={profilePageStyles.text}>{email}</Text>

      <Text style={profilePageStyles.label}>Phone Number:</Text>
      {isEditing ? (
        <TextInput
          style={profilePageStyles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
      ) : (
        <Text style={profilePageStyles.text}>{phoneNumber}</Text>
      )}

      {isEditing ? (
        <TouchableOpacity style={profilePageStyles.button} onPress={handleSavePress}>
          <Text style={profilePageStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={profilePageStyles.button} onPress={() => setIsEditing(true)}>
          <Text style={profilePageStyles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}
<     TouchableOpacity style={profilePageStyles.button} onPress={handleFavoriteRecipesPress}>
        <Text style={profilePageStyles.buttonText}>Favorite Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={profilePageStyles.button} onPress={handleMyRecipesPress}>
        <Text style={profilePageStyles.buttonText}>My Recipes</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ProfilePage;
