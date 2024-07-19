import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import profilePageStyles from '../stylesheets/ProfilePageStyles'; // Import the profile page styles
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebase'; // Import Firebase db and auth
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

const ProfilePage = ({ user, onClose }) => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPasswordFields, setShowPasswordFields] = useState(false); // State to toggle password fields

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

  const handleSavePress = async () => {
    try {
      const [firstName, lastName] = fullName.split(' ');
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        firstName,
        lastName,
        phoneNumber,
      });
      setIsEditing(false);
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleFavoriteRecipesPress = () => {
    console.log('Favorite Recipes Button Pressed');
    // Add the navigation logic or actions here
  };

  const handleMyRecipesPress = () => {
    console.log('My Recipes Button Pressed');
    navigation.navigate('MyRecipesPage'); // Navigate to MyRecipesPage
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user);
      await deleteDoc(doc(db, 'users', user.uid));
      console.log('User account deleted successfully');
      navigation.navigate('LoginPage');
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: handleDeleteAccount },
      ],
      { cancelable: false }
    );
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert('Success', 'Password changed successfully.');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setShowPasswordFields(false); // Hide password fields after successful change
    } catch (error) {
      let errorMessage = 'Error changing password.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'The old password you entered is incorrect.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The new password is too weak.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid credentials. Please try again.';
      }
      Alert.alert('Error', errorMessage);
      console.error('Error changing password:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
      <TouchableOpacity style={profilePageStyles.button} onPress={handleFavoriteRecipesPress}>
        <Text style={profilePageStyles.buttonText}>Favorite Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={profilePageStyles.button} onPress={handleMyRecipesPress}>
        <Text style={profilePageStyles.buttonText}>My Recipes</Text>
      </TouchableOpacity>

      {/* Button to Show/Hide Password Fields */}
      <TouchableOpacity
        style={profilePageStyles.button}
        onPress={() => setShowPasswordFields(!showPasswordFields)}
      >
        <Text style={profilePageStyles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Change Password Fields */}
      {showPasswordFields && (
        <View style={profilePageStyles.changePasswordContainer}>
          <TextInput
            style={profilePageStyles.input}
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
          <TextInput
            style={profilePageStyles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={profilePageStyles.input}
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry
          />
          <TouchableOpacity style={profilePageStyles.button} onPress={handleChangePassword}>
            <Text style={profilePageStyles.buttonText}>Save New Password</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[profilePageStyles.button, profilePageStyles.deleteButton]}
        onPress={confirmDeleteAccount}
      >
        <Text style={profilePageStyles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePage;
