import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import profilePageStyles from '../stylesheets/ProfilePageStyles'; // Import the profile page styles
import { useNavigation } from '@react-navigation/native'; 

const ProfilePage = ({ onClose }) => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('User USERS');
  const [email, setEmail] = useState('email@email.com');
  const [phoneNumber, setPhoneNumber] = useState('0501111111');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    // Handle saving edited data (e.g., send API request)
    setIsEditing(false);
  };

  const handleFavoriteRecipesPress = () => {
    console.log('Favorite Recipes Button Pressed');
    // Add your navigation logic or actions here
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
      {isEditing ? (
        <TextInput
          style={profilePageStyles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      ) : (
        <Text style={profilePageStyles.text}>{email}</Text>
      )}

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
        <TouchableOpacity style={profilePageStyles.button} onPress={handleEditPress}>
          <Text style={profilePageStyles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={profilePageStyles.button} onPress={handleFavoriteRecipesPress}>
        <Text style={profilePageStyles.buttonText}>Favorite Recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={profilePageStyles.button} onPress={handleMyRecipesPress}>
        <Text style={profilePageStyles.buttonText}>My Recipes</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ProfilePage;
