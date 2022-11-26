import React, { useContext, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { Modal, Snackbar } from 'react-native-paper'
import { SearchBox } from '@app/components'
import { Loader } from '@app/components/SharedStyled'
import { isValidEmail } from '@app/modules/utils'
import { store } from '@app/store'
import {
  addEntryToContactList,
  createContact,
  getContacts,
  logout
} from '@app/services/firebase'
import { User as UserStorage } from '@app/services/localstorage'

import Contact from './Contact'
import {
  Body,
  ButtonLogout,
  ButtonSubmitNewContact,
  ContactForm,
  ContactFormTitle,
  ContactsList,
  Container,
  ButtonAddContact,
  Header,
  HeaderBody,
  HeaderIcon,
  Input,
  StudentAvatar,
  Title,
  UserName,
  UserType,
  ZeroContactsText,
  ZeroContactsView
} from './styled'

function Chats ({ navigation }) {
  const { dispatch, state: { user } } = useContext(store)
  const [alumniName, setAlumniName] = useState('')
  const [alumniEmail, setAlumniEmail] = useState('')
  const [alumniPassword, setAlumniPassword] = useState('')
  const [alumniPasswordConfirmation, setAlumniPasswordConfirmation] = useState('')
  const [contacts, setContacts] = useState([])
  const [contactsLoaded, setContactsLoaded] = useState(false)
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [modalIsActive, setModalIsActive] = useState(false)
  const [searchKeywords, setSearchKeywords] = useState('')
  const [snackbar, handleSnackbar] = useState({ visible: false, text: '' })

  function handleContactPressed (contact) {
    navigation.navigate('Chat', { contact })
  }

  function handleDismissSnackBar () {
    handleSnackbar({ visible: false, text: '' })
  }

  function handleLogout () {
    logout(dispatch)

    UserStorage.delete()
    navigation.navigate('SignIn')
  }

  function handleNewContact () {
    setModalIsActive(true)
  }

  async function handleNewContactSubmit () {
    if (!alumniName.length) {
      setSnack('Please enter the Name')
    } else if (!isValidEmail(alumniEmail)) {
      setSnack('Please enter a valid Email Address')
    } else if (alumniPassword.length < 6) {
      setSnack('Your password must have atleast 6 characters.')
    } else if (alumniPasswordConfirmation !== alumniPassword) {
      setSnack('Your password confirmation failed.')
    } else {
      setIsAddingContact(true)

      createContact(alumniName, alumniEmail, alumniPassword)
        .then(async contactUid => {
          if (contactUid) {
            // register on teacher contact list
            await addEntryToContactList(user.uid, contactUid)
            setContacts(contacts => [...contacts, {
              name: alumniName
            }])
          }
    
          resetNewContactForm()
        })
        .catch(err => setSnack(err?.message ?? 'Whoops, something went wrong.'))
        .finally(() => setIsAddingContact(false))
    }
  }

  function hideModal () {
    if (!isAddingContact) {
      setModalIsActive(false)
    }
  }

  function renderContacts () {
    if (!contacts.length) {
      return (
        <ZeroContactsView>
          <StudentAvatar source={require('@app/assets/avatar-alumni-large.png')} />
          <ZeroContactsText>Your contact list is empty</ZeroContactsText>
        </ZeroContactsView>
      )
    }

    return (
      <ContactsList
        data={(contacts || [])}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <Contact key={item.uid} data={item} onPress={() => handleContactPressed(item)} />
        )}
      />
    )
  }

  function resetNewContactForm () {
    setAlumniName('')
    setAlumniEmail('')
    setAlumniPassword('')
    setAlumniPasswordConfirmation('')
  }

  function setSnack (text = '') {
    handleSnackbar({ visible: true, text })
  }

  // onMount
  useEffect(() => {
    if (!user.uid) return
    const loadContacts = async () => {
      try {
        const contacts = (await getContacts(user.uid)) || []

        setContacts(contacts)
        setContactsLoaded(true)
      } catch (error) {
        setSnack(error?.message ?? 'Whoops, something went wrong.')
      }
    }

    loadContacts()
  }, []) // eslint-disable-line

  return (
    <>
      <Container>
        <Header>
          <HeaderIcon name='user' size={34} />

          <HeaderBody>
            <UserName>{user.name}</UserName>
            <UserType>{user.accountType}</UserType>
          </HeaderBody>

          <ButtonLogout onPress={handleLogout}>
            <HeaderIcon name='logout' size={34} />
          </ButtonLogout>
        </Header>

        <Body>
          <Title>Chats</Title>
          <SearchBox
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={setSearchKeywords}
            placeholder='Search students...'
            value={searchKeywords}
          />

          {
            !contactsLoaded
              ? <Loader size='small' />
              : renderContacts()
          }

          <ButtonAddContact
            color='white'
            icon='plus'
            onPress={handleNewContact}
          />

          <Snackbar
            visible={snackbar.visible}
            onDismiss={handleDismissSnackBar}
          >
            {snackbar.text}
          </Snackbar>
        </Body>
      </Container>

      <Modal visible={modalIsActive} onDismiss={hideModal}>
        <ContactForm onTouchStart={() => Keyboard.dismiss()}>
          <ContactFormTitle>Add new student</ContactFormTitle>

          <Input
            label='Name'
            onChangeText={setAlumniName}
            value={alumniName}
            autoCapitalize='none'
          />
          <Input
            label='Email'
            onChangeText={setAlumniEmail}
            value={alumniEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Input
            secureTextEntry
            label='Password'
            onChangeText={setAlumniPassword}
            value={alumniPassword}
            autoCapitalize='none'
          />
          <Input
            secureTextEntry
            label='Confirm Password'
            onChangeText={setAlumniPasswordConfirmation}
            value={alumniPasswordConfirmation}
            autoCapitalize='none'
          />

          <ButtonSubmitNewContact
            label='Add'
            loading={isAddingContact}
            onPress={handleNewContactSubmit}
          />
        </ContactForm>
      </Modal>
    </>
  )
}

export default Chats
