import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="SearchScreen" />
      <Stack.Screen name="HomePage" />
      <Stack.Screen name="CamSearchPage" />
      <Stack.Screen name="AddRecipePage" />
    </Stack>
  );
};

export default Layout;