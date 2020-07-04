import React, { useEffect, useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { store } from '../store'

function Root ({ navigation }) {
  const { state } = useContext(store)
  const { authenticationVerified, user } = state

  useEffect(() => {
    console.tron('state', { authenticationVerified, user })

    if (authenticationVerified) {
      navigation.navigate('SignIn')
    }

  }, [authenticationVerified]) // eslint-disable-line

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  )
}

export default Root
