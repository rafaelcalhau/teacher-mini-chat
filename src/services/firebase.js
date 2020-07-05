import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { signout } from '../store/actions'

export const addEntryToContactList = async (userUid, contactUid) => {
  try {
    const contactRef = await database().ref(`/users/${contactUid}`)
    const contactData = await contactRef.once('value').then(snapshot => snapshot.val())

    const userRef = await database().ref(`/users/${userUid}`)
    const userData = await userRef.once('value').then(snapshot => snapshot.val())

    userRef.transaction(async current => {
      if (current) {
        if (!contactData.contacts) {
          // create list
          await contactRef.set({ ...contactData, contacts: [userUid] })
            .catch(error => console.tron('[firebase]: addEntryToContactList error on create', error.message))
        } else {
          // update list
          if (contactData.contacts.indexOf(userUid) === -1) {
            const newList = [...contactData.contacts, userUid]
            await contactRef.set({ ...contactData, contacts: newList })
              .catch(error => console.tron('[firebase]: addEntryToContactList error on update', error.message))
          }
        }

        if (!userData.contacts) {
          // create list
          await userRef.set({ ...userData, contacts: [contactUid] })
            .catch(error => console.tron('[firebase]: addEntryToContactList error on create', error.message))
        } else {
          // update list
          if (userData.contacts.indexOf(contactUid) === -1) {
            const newList = [...userData.contacts, contactUid]
            await userRef.set({ ...userData, contacts: newList })
              .catch(error => console.tron('[firebase]: addEntryToContactList error on update', error.message))
          }
        }
      }

      return current
    })
  } catch (error) {
    console.tron('[firebase]: addEntryToContactList main error', error.message)
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

export const getLastMessages = async (chatKey, length = 15) => {
  return database()
    .ref(`/messages/${chatKey}`)
    .orderByKey()
    .limitToLast(length)
    .once('value')
    .then(snapshot => {
      const messages = snapshot.val()
      console.tron('[firebase]: getLastMessages', messages)

      if (messages) {
        return Object.keys(messages)
          .map(key => ({ key, ...messages[key] }))
          .sort((a, b) => a > b ? 1 : -1)
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
  return database()
    .ref(`/users/${uid}`)
    .set(data)
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

  return database()
    .ref(`/messages/${chatKey}`)
    .update(messages)
    .catch(error => console.tron('[firebase]: createContact error', error))
}

export const signin = async (email, password) => {
  return auth().signInWithEmailAndPassword(email, password)
}

export const signup = async (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password)
}

export const subscribeToNewMessages = async (chatKey, callback) => {
  return database()
    .ref(`/messages/${chatKey}`)
    .orderByChild('createdAt')
    .startAt(new Date().toISOString())
    .on('child_added', snapshot => callback(snapshot.val()))
}

export const unsubscribeToNewMessages = async (chatKey, subscriscription) => {
  return database()
    .ref(`/messages/${chatKey}`)
    .off('child_added', subscriscription)
}
