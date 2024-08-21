import React from 'react';
import AuthHandler from '../utils/AuthHandler';
import { LogBox } from 'react-native';


LogBox.ignoreAllLogs();

const App = () => {
  return (
      <AuthHandler />
  );
};

export default App;



// npx expo start -> localy
// npx expo start --tunnel -> globaly
