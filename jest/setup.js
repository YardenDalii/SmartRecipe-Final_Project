import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-navigation/native-stack', () => {
    return {
      createNativeStackNavigator: jest.fn().mockReturnValue({
        Navigator: ({ children }) => children,
        Screen: ({ children }) => children,
      }),
    };
  });
  
  jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      NavigationContainer: ({ children }) => children,
    };
  });

  jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    return {
      ...originalModule,
      getReactNativePersistence: jest.fn().mockReturnValue({}),
    };
  });
  