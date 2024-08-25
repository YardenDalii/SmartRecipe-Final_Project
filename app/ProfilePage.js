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
  const [originalFullName, setOriginalFullName] = useState('');
  const [email, setEmail] = useState('');
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
          setOriginalFullName(fullName);
          setEmail(userData.email);
        } else {
          Alert.alert(
            "User Not Authorized",
            `Can't find authorized user. Try logging in.`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          // console.error('User document not found (ProfilePage)');
        }
      } catch (error) {
        Alert.alert(
          "Error",
          `Error fetching user: ${error.message}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        // console.error('Error fetching user:', error);
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
      });
      setIsEditing(false);
      setOriginalFullName(fullName);
      console.log('User data updated successfully');
    } catch (error) {
      Alert.alert(
        "Error",
        `Error updating user data: ${error.message}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      // console.error('Error updating user data:', error);
    }
  };

  const handleCancelPress = () => {
    setFullName(originalFullName);
    setIsEditing(false);
  };

  const handleFavoriteRecipesPress = () => {
    console.log('Favorite Recipes Button Pressed');
    console.log(`${user.email}`);
    navigation.navigate("FavoriteRecipesPage", {user});
    onClose();
    // Add the navigation logic or actions here
  };

  const handleMyRecipesPress = () => {
    console.log('My Recipes Button Pressed');
    navigation.navigate('MyRecipesPage', { user }); // Navigate to MyRecipesPage
    onClose(); // Closing the profile Modal
  };
  const handleCancelPasswordChange = () => {
    setShowPasswordFields(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user);
      await deleteDoc(doc(db, 'users', user.uid));
      console.log('User account deleted successfully');
      navigation.navigate('LoginPage');
    } catch (error) {
      Alert.alert(
        "Error",
        `Error deleting user account: ${error.message}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      // console.error('Error deleting user account:', error);
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
      handleCancelPasswordChange();
    } catch (error) {
      let errorMessage = 'Error changing password.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'The old password you entered is incorrect.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The new password is too weak.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid credentials. Please try again.';
      }
      Alert.alert(
        "Error",
        `Error changing password: ${error.message}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      // console.error('Error changing password:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={profilePageStyles.container}>
      <View style={profilePageStyles.fullNameContainer}>
        {isEditing ? (
          <TextInput
            style={profilePageStyles.fullNameTitleEditing}
            value={fullName}
            onChangeText={text => setFullName(text)}
            autoFocus
            numberOfLines={1} // Ensure it stays on one line
            ellipsizeMode="tail"  
          />
        ) : (
          <Text style={profilePageStyles.fullNameTitle}>{fullName}</Text>
        )}
        
        {!isEditing && (
          <TouchableOpacity
            style={profilePageStyles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={profilePageStyles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      {isEditing && (
        <View style={profilePageStyles.editButtonContainer}>
          <TouchableOpacity style={profilePageStyles.saveButton} onPress={handleSavePress}>
            <Text style={profilePageStyles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={profilePageStyles.cancelButton} onPress={handleCancelPress}>
            <Text style={profilePageStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={profilePageStyles.label}>Email:</Text>
      <Text 
      style={profilePageStyles.text}   
      numberOfLines={1}
      ellipsizeMode="tail"
      >
        {user.email}
      </Text>

      <View style={profilePageStyles.buttonContainer}>
        <TouchableOpacity style={profilePageStyles.squareButton} onPress={handleMyRecipesPress}>
          <Text style={profilePageStyles.squareButtonText}>My Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profilePageStyles.squareButton} onPress={handleFavoriteRecipesPress}>
          <Text style={profilePageStyles.squareButtonText}>Favorite Recipes</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={profilePageStyles.button}
        onPress={() => setShowPasswordFields(!showPasswordFields)}
      >
        <Text style={profilePageStyles.buttonText}>Change Password</Text>
      </TouchableOpacity>

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
          <View style={profilePageStyles.editButtonContainer}>
            <TouchableOpacity style={profilePageStyles.saveButton} onPress={handleChangePassword}>
              <Text style={profilePageStyles.saveButtonText}>Save New Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={profilePageStyles.cancelButton} onPress={handleCancelPasswordChange}>
              <Text style={profilePageStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
