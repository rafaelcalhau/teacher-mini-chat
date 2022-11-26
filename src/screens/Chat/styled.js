import styled from '@emotion/native'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { Avatar as PaperAvatar } from 'react-native-paper'
import { Text } from '../../components/SharedStyled'

export const Avatar = styled(PaperAvatar.Image)`
  background-color: transparent;
  margin-left: 15px
`

export const Body = styled.View`
  flex: 1;
  padding: 5px;
  border-bottom-color: transparent;
  border-bottom-width: 50px;
`

export const BackIcon = styled(IonIcon)`
  color: ${({ theme }) => theme.colors.primary}
`

export const Container = styled.View`
  flex: 1;
`

export const Form = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  height: 50px;
  padding-left: 10px;
  position: absolute;
  z-index: 9;
  bottom: 0;
  right: 0;
  left: 0
`

export const FormControls = styled.View`
  align-items: center;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  padding: 0 10px;
`

export const FormIcon = styled(LineIcon)`
  color: white;
`

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  height: 82px;
  margin: 0 10px 25px
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

export const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, .3);
  border-radius: 20px;
  color: white;
  flex: 1;
  padding: 0 20px;
  height: 34px
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
