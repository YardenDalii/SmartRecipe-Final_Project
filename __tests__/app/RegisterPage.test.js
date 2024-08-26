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
  NavigationContainer: ({ children }) => children,
}));

describe('RegisterPage', () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockSetConfirmPassword = jest.fn();
  const mockSetFirstName = jest.fn();
  const mockSetLastName = jest.fn();
  const mockHandleRegister = jest.fn();
  const mockSwitchToLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
  it('calls switchToLogin when Sign In is pressed', () => {
    const { getByText } = render(
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
  
    fireEvent.press(getByText('Already have an account? Sign In'));
  
    // Check that switchToLogin is called with the navigation object
    expect(mockSwitchToLogin).toHaveBeenCalledWith({ navigate: mockNavigate });
  });

  it('calls handleRegister with correct values when Sign Up is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <RegisterPage
        email="test@example.com"
        setEmail={mockSetEmail}
        password="Password123"
        setPassword={mockSetPassword}
        confirmPassword="Password123"
        setConfirmPassword={mockSetConfirmPassword}
        firstName="John"
        setFirstName={mockSetFirstName}
        lastName="Doe"
        setLastName={mockSetLastName}
        handleRegister={mockHandleRegister}
        switchToLogin={mockSwitchToLogin}
      />
    );
  
    // Ensure the button is enabled by meeting all validation criteria
    fireEvent.changeText(getByPlaceholderText('First Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'Password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'Password123');
  
    const signUpButton = getByText('Sign Up');
    expect(signUpButton.props.disabled).toBe(false);  // Ensure the button is enabled
  
    fireEvent.press(signUpButton);
  
    expect(mockHandleRegister).toHaveBeenCalledWith(expect.any(Object));  // Check that the function was called
  }); 
});
