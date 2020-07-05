import React, { useEffect, useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import useLocalProfile from '../modules/hooks/useLocalProfile'
import { getProfile } from '../services/firebase'
import { store } from '../store'
import { updateUser } from '../store/actions'

function Root ({ navigation }) {
  const { dispatch, state } = useContext(store)
  const { authenticationVerified, user } = state

  // Authenticate user with local data
  useLocalProfile(dispatch)

  // Redirect after verifiy local user profile
  useEffect(() => {
    if (authenticationVerified) {
      const loadProfile = async () => {
        const profile = await getProfile(user.uid)
        console.tron(profile)

        if (profile) {
          dispatch(updateUser({
            accountType: profile.accountType,
            name: profile.name
          }))
        }

        if (!user.uid) {
          navigation.navigate('SignIn')
        } else {
          navigation.navigate('Chats')
        }
      }

      loadProfile()
    }
  }, [authenticationVerified]) // eslint-disable-line

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  )
}

export default Root
