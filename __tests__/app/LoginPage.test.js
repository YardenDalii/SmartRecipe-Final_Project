import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginPage from '../../app/LoginPage';
import { useNavigation } from '@react-navigation/native';

const mockNavigate = jest.fn(); 
// Mock the useNavigation and useFocusEffect hooks
jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
      useFocusEffect: jest.fn(), // Mock useFocusEffect
    };
  });
  
  // Mock AsyncStorage
  jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }));
  
  // Mock Firebase Auth
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    initializeAuth: jest.fn(),
    getReactNativePersistence: jest.fn(() => jest.fn()),
  }));
  
  // Mock expo-linking
  jest.mock('expo-linking', () => ({
    createURL: jest.fn(),
    resolveScheme: jest.fn(),
  }));
  
  // Mock expo-auth-session and expo-auth-session/providers/Google
  jest.mock('expo-auth-session', () => ({
    useIdTokenAuthRequest: jest.fn(() => [{}, {}, jest.fn()]),
  }));
  jest.mock('expo-auth-session/providers/Google', () => ({
    useIdTokenAuthRequest: jest.fn(() => [{}, {}, jest.fn()]),
  }));
  
  describe('LoginPage', () => {
    const mockSetEmail = jest.fn();
    const mockSetPassword = jest.fn();
    const mockHandleLogin = jest.fn();
    const mockSwitchToRegister = jest.fn();
    const mockSwitchToReset = jest.fn();
  
    it('renders all elements correctly', () => {
        const { getByPlaceholderText, getByText, getAllByText } = render(
          <LoginPage
            email=""
            setEmail={mockSetEmail}
            password=""
            setPassword={mockSetPassword}
            handleLogin={mockHandleLogin}
            switchToRegister={mockSwitchToRegister}
            switchToReset={mockSwitchToReset}
          />
        );
      
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText('Sign In')).toBeTruthy();
        expect(getByText('Forgot your password?')).toBeTruthy();
        expect(getByText('Need an account? Sign Up')).toBeTruthy();
        
      });
  
    it('calls handleLogin when Sign In button is pressed', () => {
      const { getByText } = render(
        <LoginPage
          email=""
          setEmail={mockSetEmail}
          password=""
          setPassword={mockSetPassword}
          handleLogin={mockHandleLogin}
          switchToRegister={mockSwitchToRegister}
          switchToReset={mockSwitchToReset}
        />
      );
  
      fireEvent.press(getByText('Sign In'));
      expect(mockHandleLogin).toHaveBeenCalled();
    });
    it('updates email and password fields correctly', () => {
        const { getByPlaceholderText } = render(
          <LoginPage
            email=""
            setEmail={mockSetEmail}
            password=""
            setPassword={mockSetPassword}
            handleLogin={mockHandleLogin}
            switchToRegister={mockSwitchToRegister}
            switchToReset={mockSwitchToReset}
          />
        );
      
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
      
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        expect(mockSetPassword).toHaveBeenCalledWith('password123');
      });
      it('navigates to the registration page when Sign Up is pressed', () => {
        const { getByText } = render(
          <LoginPage
            email=""
            setEmail={mockSetEmail}
            password=""
            setPassword={mockSetPassword}
            handleLogin={mockHandleLogin}
            switchToRegister={mockSwitchToRegister}
            switchToReset={mockSwitchToReset}
          />
        );
      
        fireEvent.press(getByText('Need an account? Sign Up'));
        expect(mockSwitchToRegister).toHaveBeenCalled();
      });
      it('navigates to the password reset page when Forgot your password? is pressed', () => {
        const { getByText } = render(
          <LoginPage
            email=""
            setEmail={mockSetEmail}
            password=""
            setPassword={mockSetPassword}
            handleLogin={mockHandleLogin}
            switchToRegister={mockSwitchToRegister}
            switchToReset={mockSwitchToReset}
          />
        );
      
        fireEvent.press(getByText('Forgot your password?'));
        expect(mockSwitchToReset).toHaveBeenCalled();
      });
    //   it('calls handleLogin with correct email and password when Sign In button is pressed', () => {
    //     const mockHandleLogin = jest.fn();
    //     const { getByPlaceholderText, getByText } = render(
    //       <LoginPage
    //         email=""
    //         setEmail={mockSetEmail}
    //         password=""
    //         setPassword={mockSetPassword}
    //         handleLogin={mockHandleLogin}
    //         switchToRegister={mockSwitchToRegister}
    //         switchToReset={mockSwitchToReset}
    //       />
    //     );
      
    //     // Simulate user input
    //     fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    //     fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
      
    //     // Simulate button press
    //     fireEvent.press(getByText('Sign In'));
      
    //     // Check the exact object passed to handleLogin
    //     expect(mockHandleLogin).toHaveBeenCalledWith({
    //       email: 'test@example.com',
    //       password: 'password123',
    //       navigate: mockNavigate,  // Explicitly match the mockNavigate function
    //     });
    //   });
      
      
      
    //   it('navigates to the home page when Continue without Login is pressed', () => {
    //     console.log('Before pressing button');
        
    //     const { getAllByText } = render(
    //       <LoginPage
    //         email=""
    //         setEmail={mockSetEmail}
    //         password=""
    //         setPassword={mockSetPassword}
    //         handleLogin={mockHandleLogin}
    //         switchToRegister={mockSwitchToRegister}
    //         switchToReset={mockSwitchToReset}
    //       />
    //     );
      
    //     fireEvent.press(getAllByText('Continue without Login')[0]); // Press the first button
        
    //     console.log('After pressing button');
    //     console.log('Calls:', mockNavigate.mock.calls); // Check if the mock function was called
      
    //     expect(mockNavigate).toHaveBeenCalledWith('HomePage');
    //   });
      
  });