import React, { useContext, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { Modal, Snackbar } from 'react-native-paper'
import { SearchBox } from '../../components'
import { Loader } from '../../components/SharedStyled'
import { isValidEmail } from '../../modules/utils'
import { store } from '../../store'
import {
  AvatarAlumini, Body, ButtonLogout, ButtonSubmitNewContact, ContactForm,
  ContactFormTitle, Container, ButtonAddContact, Header, HeaderBody,
  HeaderIcon, Input, Title, UserName, UserType, ZeroContactsText,
  ZeroContactsView
} from './styled'
import {
  addEntryToContactList, createContact,
  logout, getContacts
} from '../../services/firebase'
import { User as UserStorage } from '../../services/localstorage'

function Chats ({ navigation }) {
  const { dispatch, state: { user } } = useContext(store)
  const [alumniName, setAlumniName] = useState('Isa Calhau Monte')
  const [alumniEmail, setAlumniEmail] = useState('isaiannyam@gmail.com')
  const [alumniPassword, setAlumniPassword] = useState('123123')
  const [alumniPasswordConfirmation, setAlumniPasswordConfirmation] = useState('123123')
  const [contacts, setContacts] = useState('')
  const [contactsLoaded, setContactsLoaded] = useState(false)
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [modalIsActive, setModalIsActive] = useState(false)
  const [searchKeywords, setSearchKeywords] = useState('')
  const [snackbar, handleSnackbar] = useState({ visible: false, text: '' })

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

      const contactUid = await createContact(alumniName, alumniEmail, alumniPassword)

      if (contactUid) {
        // register on teacher contact list
        await addEntryToContactList(user.uid, contactUid)
        setContacts(contacts => [...contacts, {
          name: alumniName
        }])
      }

      resetNewContactForm()
      setIsAddingContact(false)
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
          <AvatarAlumini />
          <ZeroContactsText>Your contact list is empty</ZeroContactsText>
        </ZeroContactsView>
      )
    }

    return null
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
    const loadContacts = async () => {
      const contacts = (await getContacts(user.uid)) || []

      setContacts(contacts)
      setContactsLoaded(true)
    }

    loadContacts()
  }, []) // eslint-disable-line

  return (
    <>
      <Container>
        <Header>
          <HeaderIcon name='user' />

          <HeaderBody>
            <UserName>{user.name}</UserName>
            <UserType>{user.accountType}</UserType>
          </HeaderBody>

          <ButtonLogout onPress={handleLogout}>
            <HeaderIcon name='logout' />
          </ButtonLogout>
        </Header>

        <Body>
          <Title>Chats</Title>
          <SearchBox
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={setSearchKeywords}
            placeholder='Search alumnis...'
            value={searchKeywords}
          />

          {
            !contactsLoaded
              ? <Loader />
              : renderContacts()
          }

          <ButtonAddContact
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
          <ContactFormTitle>Add new alumni</ContactFormTitle>

          <Input
            label='Name'
            onChangeText={setAlumniName}
            value={alumniName}
          />
          <Input
            label='Email'
            onChangeText={setAlumniEmail}
            value={alumniEmail}
          />
          <Input
            secureTextEntry
            label='Password'
            onChangeText={setAlumniPassword}
            value={alumniPassword}
          />
          <Input
            secureTextEntry
            label='Confirm Password'
            onChangeText={setAlumniPasswordConfirmation}
            value={alumniPasswordConfirmation}
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
