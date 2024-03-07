import React, {useEffect} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppProvider} from '../providers/AppProvider';

const Stack = createNativeStackNavigator();
const AppNavigator: React.FC = () => {
  const navigationRef = useNavigationContainerRef();
  const {isLoading, session} = useAppProvider();

  useEffect(() => {
    const route = navigationRef.getCurrentRoute();
    if (!isLoading) {
      if (session) {
        if (route?.name === 'HomeScreen') {
          return;
        }
        navigationRef.resetRoot({
          index: 4,
          routes: [{name: 'HomeScreen'}],
        });
      } else {
        if (route?.name === 'Welcome') {
          return;
        }
        navigationRef.resetRoot({
          index: 1,
          routes: [{name: 'Welcome'}],
        });
      }
    }
  }, [isLoading, navigationRef, session]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
