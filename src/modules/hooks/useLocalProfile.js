import { useEffect } from 'react'
import { authenticate, authenticationIsVerified } from '../../store/actions'
import { User as UserStorage } from '../../services/localstorage'

const useLocalProfile = (dispatch) => {
  useEffect(() => {
    const verifyProfile = async () => {
      const profile = await UserStorage.get()

      if (profile && profile.uid) {
        dispatch(authenticate(profile))
      }

      dispatch(authenticationIsVerified())
    }

    verifyProfile().catch(err => console.log({ err }))
  }, []) // eslint-disable-line
}

export default useLocalProfile
