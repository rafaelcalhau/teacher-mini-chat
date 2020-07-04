import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { authenticate, authenticationIsVerified, signout } from '../../store/actions'

const useAuthenticationState = (dispatch) => {
  console.tron('[useAuthenticationState] initiated')
  // didMount
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.tron('[useAuthenticationState] onAuthStateChanged...', user)

      if (user) {
        dispatch(authenticate(user))
      } else {
        dispatch(signout(user))
      }

      dispatch(authenticationIsVerified())
    })

    // onUnmount
    return subscriber
  }, []) // eslint-disable-line
}

export default useAuthenticationState
