import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { Avatar as PaperAvatar } from 'react-native-paper'
import { Text } from '../../components/SharedStyled'

export const Avatar = styled(PaperAvatar.Image).attrs({
  size: 36
})`
  background-color: transparent;
  margin-left: 15px
`

export const Body = styled.View`
  flex: 1
`

export const BackIcon = styled(IonIcon).attrs({
  size: 34
})`
  color: ${({ theme }) => theme.colors.primary}
`

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`

export const Form = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  height: 50px;
  padding-left: 10px;
`

export const FormControls = styled.View`
  align-items: center;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  padding: 0 10px;
`

export const FormIcons = {
  Camera: styled(LineIcon).attrs({
    name: 'camera',
    size: 22
  })`
    color: white
  `,
  Mic: styled(LineIcon).attrs({
    name: 'microphone',
    size: 22
  })`
    color: white
  `,
  Send: styled(IonIcon).attrs({
    name: 'send',
    size: 22
  })`
    color: white
  `
}

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  height: 82px;
  margin-bottom: 25px
`

export const HeaderBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px
`

export const IconButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`

export const Input = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  placeholderTextColor: 'rgba(255, 255, 255, .5)'
})`
  background-color: rgba(255, 255, 255, .3);
  border-radius: 20px;
  color: white;
  flex: 1;
  padding: 0 20px;
  height: 34px
`

export const Messages = styled(FlatList)`
  margin: 25px 0
`

export const UserName = styled(Text)`
  color: ${({ theme }) => theme.colors.silver};
  font-size: 17px
`

export const UserType = styled(Text)`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 12px
`

export const Wrapper = styled.KeyboardAvoidingView`
  flex: 1
`
