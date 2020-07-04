import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Screens
import { Chats, SignIn, SignUp, Root } from './screens'

const navigationOptions = () => ({
  headerShown: false
})

const MainNavigator = createStackNavigator({
  Chats: {
    screen: Chats,
    navigationOptions
  },
  SignIn: {
    screen: SignIn,
    navigationOptions
  },
  SignUp: {
    screen: SignUp,
    navigationOptions
  },
  Root: {
    screen: Root,
    navigationOptions
  }
}, {
  initialRouteName: 'Root'
})

const Router = createAppContainer(MainNavigator)

export default Router
