import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from './components/SharedStyled'
import { StateProvider } from './store'
import Router from './Router'

function App () {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <StateProvider>
          <Router />
        </StateProvider>
      </SafeAreaView>
    </>
  )
};

export default App
