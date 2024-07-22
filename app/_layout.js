import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import index from './index';
import SearchScreen from './SearchScreen';
import HomePage from './HomePage';
import CamSearchPage from './CamSearchPage';
import AddRecipePage from './AddRecipePage';
import NavigationBar from './NavigationBar';
import LoginPage from './LoginPage';
import MyRecipesPage from './MyRecipesPage';
import ProfilePage from './ProfilePage';
import RegisterPage from './RegisterPage';
import AboutPage from './AboutPage';
import PasswordResetPage from './PasswordResetPage';


const Stack = createStackNavigator();

const Layout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" component={index} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="AboutPage" component={AboutPage} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="CamSearchPage" component={CamSearchPage} />
      <Stack.Screen name="AddRecipePage" component={AddRecipePage} />
      <Stack.Screen name="MyRecipesPage" component={MyRecipesPage} />
      <Stack.Screen name="PasswordResetPage" component={PasswordResetPage}/>
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name='NavigationBar' component={NavigationBar}/>
    </Stack.Navigator>
  );
};

export default Layout;
