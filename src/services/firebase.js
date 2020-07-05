import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { signout } from '../store/actions'

export const logout = async (dispatch) => {
  auth().signOut()

  if (dispatch) {
    dispatch(signout())
  }
}

export const getProfile = async (uid) => {
  return database()
    .ref(`/users/${uid}`)
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(error => console.tron('[firebase]: getProfile error', error))
}

export const registerProfile = async (uid, data) => {
  const userData = {}
  const ref = await database().ref('/users')

  userData[uid] = data

  return ref
    .set(userData)
    .catch(error => console.tron('[firebase]: registerProfile error', error))
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
