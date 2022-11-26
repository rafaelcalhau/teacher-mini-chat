import { useEffect, useContext } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import useLocalProfile from '../modules/hooks/useLocalProfile';
import { getProfile } from '../services/firebase';
import { store } from '../store';
import { updateUser } from '../store/actions';

const Root = ({ navigation }) => {
  const { dispatch, state } = useContext(store)
  const { authenticationVerified, user } = state

  // Authenticate user with local data
  useLocalProfile(dispatch)

  // Redirect after verifiy local user profile
  useEffect(() => {
    if (authenticationVerified) {
      const loadProfile = async () => {
        try {
          const profile = await getProfile(user.uid)
          console.log('@tron', profile)

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
        } catch (error) {
          console.log('@error', error?.message ?? error)
        }
      }

      loadProfile()
    }
  }, [authenticationVerified]) // eslint-disable-line

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  )
}

export default Root
