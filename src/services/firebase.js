import auth from '@react-native-firebase/auth'
import { signout } from '../store/actions'

export const logout = async (dispatch) => {
  auth().signOut()

  if (dispatch) {
    dispatch(signout())
  }
}

export const updateProfile = async (data) => {
  return auth().currentUser.updateProfile(data)
}

export const signin = async (email, password) => {
  return auth().signInWithEmailAndPassword(email, password)
}

export const signup = async (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password)
}
