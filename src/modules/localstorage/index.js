import AsyncStorage from '@react-native-community/async-storage'

export const User = {
  get: async () => {
    return AsyncStorage.getItem('user').then(JSON.parse)
  },
  put: async (data) => {
    return AsyncStorage.setItem('user', JSON.stringify(data))
  }
}
