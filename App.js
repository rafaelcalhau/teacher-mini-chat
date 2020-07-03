import React from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'

function App () {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <View>
          <Text>Hello!</Text>
        </View>
      </SafeAreaView>
    </>
  )
};

export default App
