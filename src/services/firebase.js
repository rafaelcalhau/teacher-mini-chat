import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { signout } from '../store/actions'

export const addEntryToContactList = async (userUid, contactUid) => {
  const data = await database()
    .ref(`/users/${userUid}`)
    .once('value')
    .then(snapshot => snapshot.val())

  const ref = await database().ref(`/users/${userUid}`)

  if (!data.contacts) {
    // create list
    return ref.set({ ...data, contacts: [contactUid] })
      .catch(error => console.tron('[firebase]: addEntryToContactList error on create', error))
  } else {
    // update list
    if (data.contacts.indexOf(contactUid) === -1) {
      const newList = [...data.contacts, contactUid]
      return ref.set({ ...data, contacts: newList })
        .catch(error => console.tron('[firebase]: addEntryToContactList error on update', error))
    }

    return null
  }
}

export const createContact = async (name, email, password) => {
  const { user } = await auth().createUserWithEmailAndPassword(email, password)

  if (user && user.uid) {
    const userData = {
      accountType: 'alumni',
      name
    }

    await database()
      .ref(`/users/${user.uid}`)
      .set(userData)
      .catch(error => console.tron('[firebase]: createContact error', error))

    return user.uid
  }

  return null
}

export const getContacts = async (uid) => {
  return database()
    .ref(`/users/${uid}/contacts`)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(async contacts => Promise.all(contacts.map(contactUid => {
      return database()
        .ref(`/users/${contactUid}`)
        .once('value')
        .then(async (snapshot) => {
          // retrieve the last message if exists
          const uids = [uid, contactUid].sort((a, b) => a > b ? 1 : -1)
          const chatKey = uids.join('')

          const lastMessage = await database()
            .ref(`/messages/${chatKey}`)
            .limitToLast(1)
            .once('value')
            .then(snapshot => snapshot.val())

          const newMessages = await database()
            .ref(`/users/${uid}/unreaded_messages`)
            .orderByChild('from')
            .equalTo(contactUid)
            .once('value')
            .then(snapshot => snapshot.val())

          return {
            ...snapshot.val(),
            uid: contactUid,
            lastMessage: lastMessage || '',
            newMessages: newMessages || 0
          }
        })
    })))
    .catch(error => console.tron('[firebase]: getContacts error', error.message))
}

export const getProfile = async (uid) => {
  return database()
    .ref(`/users/${uid}`)
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(error => console.tron('[firebase]: getProfile error', error))
}

export const getLastMessages = async (chatKey) => {
  return database()
    .ref(`/messages/${chatKey}`)
    .limitToLast(10)
    .once('value')
    .then(snapshot => {
      const messages = snapshot.val()

      if (messages) {
        return Object.keys(messages).map(key => ({ key, ...messages[key] }))
      }

      return []
    })
    .catch(error => console.tron('[firebase]: getContacts error', error.message))
}

export const logout = async (dispatch) => {
  auth().signOut()

  if (dispatch) {
    dispatch(signout())
  }
}

export const registerProfile = async (uid, data) => {
  const userData = {}
  const ref = await database().ref('/users')

  userData[uid] = data

  return ref
    .set(userData)
    .catch(error => console.tron('[firebase]: registerProfile error', error))
}

export const sendMessage = async (from, chatKey, text) => {
  const { key } = await database().ref(`/messages/${chatKey}`).push()
  const messages = {}

  messages[key] = {
    from,
    text,
    createdAt: new Date().toISOString()
  }

  await database()
    .ref(`/messages/${chatKey}`)
    .update(messages)
    .catch(error => console.tron('[firebase]: createContact error', error))

  return null
}

export const signin = async (email, password) => {
  return auth().signInWithEmailAndPassword(email, password)
}

export const signup = async (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password)
}
