import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

// Screens
import Chat from './screens/Chat';
import Chats from './screens/Chats';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Root from './screens/Root';

const screenDefaultOptions = {
  gestureEnabled: false,
  headerShown: false
};

const Stack = createNativeStackNavigator();

const Router = () => {
  const navigation = useNavigation();

  // didMount
  useEffect(() => {
    SplashScreen.hideAsync()
    navigation.navigate('Root');
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={Root} options={screenDefaultOptions} />
      <Stack.Screen name='SignIn' component={SignIn} options={screenDefaultOptions} />
      <Stack.Screen name='SignUp' component={SignUp} options={screenDefaultOptions} />
      <Stack.Screen name='Chats' component={Chats} options={screenDefaultOptions} />
      <Stack.Screen name='Chat' component={Chat} options={screenDefaultOptions} />
    </Stack.Navigator>
  )
}

export default Router
