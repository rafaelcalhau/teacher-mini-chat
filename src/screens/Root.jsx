import { useEffect, useContext } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { ROUTES } from '@app/constants';
import { formatUserData } from '@app/modules/utils';
import { getProfile, signin } from '@app/services/firebase';
import { User as UserStorage } from '@app/services/localstorage'
import { store } from '@app/store';
import { authenticate } from '@app/store/actions';

const Root = ({ navigation }) => {
  const { dispatch } = useContext(store)

  // didMount
  useEffect(() => {
    const verifyProfile = async () => {
      const storedProfile = await UserStorage.get()

      if (!storedProfile) {
        navigation.navigate(ROUTES.SignIn)
        return
      }

      if (storedProfile?.email && storedProfile?.password) {
        await signin(storedProfile.email, storedProfile.password)
          .then(async ({ user }) => {
            if (user) {
              const userData = formatUserData(user)
              const profile = await getProfile(userData.uid)
      
              // Register the authentication
              dispatch(authenticate({ ...userData, ...profile }))
      
              // Register user on local storage
              UserStorage.put({ ...storedProfile, ...userData })

              // Navigate user to Chats
              navigation.navigate(ROUTES.Chats)
            } else {
              console.log('@Root', 'Sorry, something wrong happened.')
            }
          })
          .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message

            if (errorCode === 'auth/user-not-found') {
              console.log('@Root', 'The user is not registered.')
            } else if (errorCode === 'auth/weak-password') {
              console.log('@Root', 'The password is too weak.')
            } else if (errorCode === 'auth/wrong-password') {
              console.log('@Root', 'The password is incorrect.')
            } else {
              console.log('@Root', '[signInWithEmailAndPassword] error', errorMessage)
            }
          })
      } else {
        // Navigate user to Chats
        navigation.navigate(ROUTES.SignIn)
      }
    }

    verifyProfile()
  }, []) // eslint-disable-line

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  )
}

export default Root
