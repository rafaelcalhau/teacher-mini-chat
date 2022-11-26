import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native'
import { ThemeProvider } from '@emotion/react'
import { Provider as PaperProvider } from 'react-native-paper'

import { SafeAreaView } from './src/components/SharedStyled'
import { StateProvider } from './src/store'
import theme from './src/theme'
import Router from './src/Router'

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn); // it's good to explicitly catch and inspect any error

function App () {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <StateProvider>
          <ThemeProvider theme={theme}>
            <PaperProvider>
              <NavigationContainer>
                <Router />
              </NavigationContainer>
            </PaperProvider>
          </ThemeProvider>
        </StateProvider>
      </SafeAreaView>
    </>
  )
};

export default App
