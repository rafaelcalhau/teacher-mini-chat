import styled from '@emotion/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const FormScrollView = styled(KeyboardAwareScrollView)`
  padding: 0 40px;
  width: 100%
`

export const Grid = {
  Column: styled.View`
    ${({ size }) => !size
      ? 'width: 100%;'
      : `width: ${size};`
    }
    flex-direction: ${({ row }) => row ? 'row' : 'column'};
    align-items: ${({ alignItems }) => alignItems ? alignItems : 'center'};
    justify-content: ${({ justifyContent }) => justifyContent ? justifyContent : 'center'};
  `,
  Row: styled.View`
    ${({ flex }) => flex && `flex: ${flex};`}
    ${({ height }) => height && `height: ${height}px;`}
    align-self: stretch;
    flex-direction: ${({ direction }) => direction ? direction : 'column'};
    align-items: ${({ alignItems }) => alignItems ? alignItems : 'center'};
    justify-content: ${({ justifyContent }) => justifyContent ? justifyContent : 'center'};
    margin: 5px 0px;
  `
}

export const ScreenContainerView = styled.View`
  align-items: center;
  align-self: stretch;
  background-color: white;
  flex: 1;
  width: 100%;
`

export const Loader = styled.ActivityIndicator`
  align-self: center;
  color: ${({ theme }) => theme.colors.primary};
  margin: 15px 0
`

export const SafeAreaView = styled.SafeAreaView`
  flex: 1
`

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.default}
`
