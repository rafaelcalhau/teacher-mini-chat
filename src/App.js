import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { SafeAreaView } from './components/SharedStyled'
import { StateProvider } from './store'
import theme from './theme'
import Router from './Router'

function App () {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <StateProvider>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </StateProvider>
      </SafeAreaView>
    </>
  )
};

export default App
