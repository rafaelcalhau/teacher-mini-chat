import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { ROUTES } from './constants';

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
    navigation.navigate(ROUTES.Root);
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.Root} component={Root} options={screenDefaultOptions} />
      <Stack.Screen name={ROUTES.SignIn} component={SignIn} options={screenDefaultOptions} />
      <Stack.Screen name={ROUTES.SignUp} component={SignUp} options={screenDefaultOptions} />
      <Stack.Screen name={ROUTES.Chats} component={Chats} options={screenDefaultOptions} />
      <Stack.Screen name={ROUTES.Chat} component={Chat} options={screenDefaultOptions} />
    </Stack.Navigator>
  )
}

export default Router
