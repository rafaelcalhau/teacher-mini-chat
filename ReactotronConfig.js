import Reactotron, { asyncStorage, openInEditor, trackGlobalErrors } from 'reactotron-react-native'
import { NativeModules } from 'react-native'

let tron

if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode
  const scriptHostname = scriptURL.split('://')[1].split(':')[0]

  tron = Reactotron
    .configure({ host: scriptHostname })
    .useReactNative()
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(asyncStorage())
    .connect()

  tron.clear()
  console.tron = Reactotron.log
}

export default tron
