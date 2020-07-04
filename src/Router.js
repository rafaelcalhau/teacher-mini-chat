import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Screens
import { SignIn } from './screens'

const navigationOptions = () => ({
  headerShown: false
})

const MainNavigator = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions
  }
}, {
  initialRouteName: 'SignIn'
})

const Router = createAppContainer(MainNavigator)

export default Router
