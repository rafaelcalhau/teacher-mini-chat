import AsyncStorage from '@react-native-async-storage/async-storage'

export const User = {
  delete: async () => {
    return AsyncStorage.removeItem('user').then(() => true)
  },
  get: async () => {
    return AsyncStorage.getItem('user').then(JSON.parse)
  },
  put: async (data) => {
    return AsyncStorage.setItem('user', JSON.stringify(data))
  }
}
