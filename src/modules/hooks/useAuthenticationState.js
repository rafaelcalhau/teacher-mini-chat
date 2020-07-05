import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { authenticate, authenticationIsVerified, signout } from '../../store/actions'
import { User as UserStorage } from '../../services/localstorage'
import { formatUserData } from '../utils'

const useAuthenticationState = (dispatch) => {
  // didMount
  useEffect(() => {
    // auth().signOut()
    auth().onAuthStateChanged(async user => {
      if (user) {
        const formattedUser = formatUserData(user)
        const profile = await UserStorage.get()
        const data = { ...profile, ...formattedUser }

        console.tron('[useAuthenticationState]')
        await UserStorage.put(data)
        dispatch(authenticate(data))
      } else {
        dispatch(signout(user))
      }

      dispatch(authenticationIsVerified())
    })
  }, []) // eslint-disable-line
}

export default useAuthenticationState
