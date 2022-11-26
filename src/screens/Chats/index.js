import React, { useContext, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { Modal, Snackbar } from 'react-native-paper'

import { SearchBox } from '@app/components'
import { Loader } from '@app/components/SharedStyled'
import { ROUTES } from '@app/constants'
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
  const [studentName, setStudentName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [studentPassword, setStudentPassword] = useState('')
  const [studentPasswordConfirmation, setStudentPasswordConfirmation] = useState('')
  const [contacts, setContacts] = useState([])
  const [contactsLoaded, setContactsLoaded] = useState(false)
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [modalIsActive, setModalIsActive] = useState(false)
  const [searchKeywords, setSearchKeywords] = useState('')
  const [snackbar, handleSnackbar] = useState({ visible: false, text: '' })

  function handleContactPressed (contact) {
    navigation.navigate(ROUTES.Chat, { contact })
  }

  function handleDismissSnackBar () {
    handleSnackbar({ visible: false, text: '' })
  }

  function handleLogout () {
    logout(dispatch)

    UserStorage.delete()
    navigation.navigate(ROUTES.SignIn)
  }

  function handleNewContact () {
    setModalIsActive(true)
  }

  async function handleNewContactSubmit () {
    if (!studentName.length) {
      setSnack('Please enter the Name')
    } else if (!isValidEmail(studentEmail)) {
      setSnack('Please enter a valid Email Address')
    } else if (studentPassword.length < 6) {
      setSnack('Your password must have atleast 6 characters.')
    } else if (studentPasswordConfirmation !== studentPassword) {
      setSnack('Your password confirmation failed.')
    } else {
      setIsAddingContact(true)

      createContact(studentName, studentEmail, studentPassword)
        .then(async contactUid => {
          if (contactUid) {
            // register on teacher contact list
            await addEntryToContactList(user.uid, contactUid)
            setContacts(contacts => [...contacts, {
              name: studentName
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
          <StudentAvatar source={require('@app/assets/student-avatar-large.png')} />
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
    setStudentName('')
    setStudentEmail('')
    setStudentPassword('')
    setStudentPasswordConfirmation('')
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
  }, [user]) // eslint-disable-line

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
            onChangeText={setStudentName}
            value={studentName}
            autoCapitalize='none'
          />
          <Input
            label='Email'
            onChangeText={setStudentEmail}
            value={studentEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Input
            secureTextEntry
            label='Password'
            onChangeText={setStudentPassword}
            value={studentPassword}
            autoCapitalize='none'
          />
          <Input
            secureTextEntry
            label='Confirm Password'
            onChangeText={setStudentPasswordConfirmation}
            value={studentPasswordConfirmation}
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
