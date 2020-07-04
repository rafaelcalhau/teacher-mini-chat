import React, { useEffect, useContext } from 'react'
import { ActivityIndicator } from 'react-native'
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

  return <ActivityIndicator />
}

export default Root
