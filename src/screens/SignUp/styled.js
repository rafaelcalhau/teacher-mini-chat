import styled from '@emotion/native'
import { Text } from '@app/components/SharedStyled'
import { Button, InputCheckbox, InputText } from '@app/components'

export const CustomButton = styled(Button)`
  margin: 5px 0;
`

export const Form = styled.View`
  flex: 0.9;
  width: 100%
`

export const RadioGroup = styled(InputCheckbox)``

export const Input = styled(InputText)`
  padding: 10px;
`

export const Logo = styled.Image`
  margin: 0 48px 20px;
  height: 60px;
  width: 183px;
`

export const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px
`
