import { useEffect, useContext } from 'react'
import { store } from '../store'

function Root ({ navigation }) {
  const { state } = useContext(store)
  useEffect(() => {
    console.tron(state)
    navigation.navigate('SignIn')
  }, [state]) // eslint-disable-line

  return null
}

export default Root
