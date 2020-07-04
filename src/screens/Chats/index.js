import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { User as UserStorage } from '../../modules/localstorage'

function Chats ({ navigation }) {
  useEffect(() => {
    const getProfile = async () => {
      console.tron('root.profile', await UserStorage.get())
    }

    getProfile()
  }, []) // eslint-disable-line

  return (
    <View style={{ flex: 1 }}>
      <Text>Chat</Text>
    </View>
  )
}

export default Chats
