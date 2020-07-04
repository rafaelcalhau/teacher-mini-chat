import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Screens
import { SignIn, Root } from './screens'

const navigationOptions = () => ({
  headerShown: false
})

const MainNavigator = createStackNavigator({
  SignIn: {
    screen: SignIn,
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
