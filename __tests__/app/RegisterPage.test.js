import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterPage from '../../app/RegisterPage';
import { useNavigation } from '@react-navigation/native';

// Mock the useNavigation hook
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('RegisterPage', () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockSetConfirmPassword = jest.fn();
  const mockSetFirstName = jest.fn();
  const mockSetLastName = jest.fn();
  const mockHandleRegister = jest.fn();
  const mockSwitchToLogin = jest.fn();

  it('renders all elements correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <RegisterPage
        email=""
        setEmail={mockSetEmail}
        password=""
        setPassword={mockSetPassword}
        confirmPassword=""
        setConfirmPassword={mockSetConfirmPassword}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        handleRegister={mockHandleRegister}
        switchToLogin={mockSwitchToLogin}
      />
    );

    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('validates email and password correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <RegisterPage
        email=""
        setEmail={mockSetEmail}
        password=""
        setPassword={mockSetPassword}
        confirmPassword=""
        setConfirmPassword={mockSetConfirmPassword}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        handleRegister={mockHandleRegister}
        switchToLogin={mockSwitchToLogin}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalidemail');
    expect(getByText('✘ Email must be a valid format')).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText('Password'), 'abc');
    expect(getByText('✘ Password must contain at least 1 capital letter')).toBeTruthy();
    expect(getByText('✘ Password must contain at least 1 digit')).toBeTruthy();
    expect(getByText('✘ Password must be at least 8 characters long')).toBeTruthy();
  });

  it('disables Sign Up button when inputs are invalid', () => {
    const { getByText } = render(
      <RegisterPage
        email="invalidemail"
        setEmail={mockSetEmail}
        password="abc"
        setPassword={mockSetPassword}
        confirmPassword="abc"
        setConfirmPassword={mockSetConfirmPassword}
        firstName=""
        setFirstName={mockSetFirstName}
        lastName=""
        setLastName={mockSetLastName}
        handleRegister={mockHandleRegister}
        switchToLogin={mockSwitchToLogin}
      />
    );

    const signUpButton = getByText('Sign Up');
    expect(signUpButton.props.disabled).toBe(true);
  });

//   it('calls handleRegister with correct values when Sign Up is pressed', () => {
//     const mockHandleRegister = jest.fn();
//     const { getByText } = render(
//       <RegisterPage
//         email="test@example.com"
//         setEmail={mockSetEmail}
//         password="Password123"
//         setPassword={mockSetPassword}
//         confirmPassword="Password123"
//         setConfirmPassword={mockSetConfirmPassword}
//         firstName="John"
//         setFirstName={mockSetFirstName}
//         lastName="Doe"
//         setLastName={mockSetLastName}
//         handleRegister={mockHandleRegister}
//         switchToLogin={mockSwitchToLogin}
//       />
//     );
  
//     fireEvent.press(getByText('Sign Up'));
  
//     // Log what is being passed to mockHandleRegister
//     console.log("mockHandleRegister called with:", mockHandleRegister.mock.calls);
  
//     expect(mockHandleRegister).toHaveBeenCalledWith(mockNavigate);
//   });
  

//   it('calls switchToLogin when Sign In is pressed', () => {
//     const { getByText } = render(
//       <RegisterPage
//         email=""
//         setEmail={mockSetEmail}
//         password=""
//         setPassword={mockSetPassword}
//         confirmPassword=""
//         setConfirmPassword={mockSetConfirmPassword}
//         firstName=""
//         setFirstName={mockSetFirstName}
//         lastName=""
//         setLastName={mockSetLastName}
//         handleRegister={mockHandleRegister}
//         switchToLogin={mockSwitchToLogin}
//       />
//     );
  
//     fireEvent.press(getByText('Already have an account? Sign In'));
  
//     // Log what is being passed to mockSwitchToLogin
//     console.log("mockSwitchToLogin called with:", mockSwitchToLogin.mock.calls);
  
//     expect(mockSwitchToLogin).toHaveBeenCalledWith(mockNavigate);
//   });
  
});
