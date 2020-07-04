import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('[Reactotron]: I am ready!'))
}

AppRegistry.registerComponent(appName, () => App)
